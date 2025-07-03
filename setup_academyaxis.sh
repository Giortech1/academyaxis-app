#!/bin/bash
# Complete setup for all AcademyAxis projects

set -e

# Configuration
GITHUB_ORG="Giortech1"
GITHUB_REPO="academyaxis-app"  # Your app repository name
GITHUB_INFRA_REPO="org-infrastructure"  # Your infrastructure repository name

# Project configurations with their project numbers
declare -A PROJECTS=(
    ["academyaxis-dev-project"]="1052274887859"
    ["academyaxis-uat-project"]="415071431590"
    ["academyaxis-prod-project"]="552816176477"
)

# Required APIs
REQUIRED_APIS=(
    "run.googleapis.com"
    "cloudbuild.googleapis.com"
    "compute.googleapis.com"
    "storage.googleapis.com"
    "iam.googleapis.com"
    "secretmanager.googleapis.com"
    "dns.googleapis.com"
    "monitoring.googleapis.com"
    "logging.googleapis.com"
    "billingbudgets.googleapis.com"
    "certificatemanager.googleapis.com"
    "iamcredentials.googleapis.com"
    "artifactregistry.googleapis.com"
)

# Required IAM roles
REQUIRED_ROLES=(
    "roles/serviceusage.serviceUsageAdmin"
    "roles/run.admin"
    "roles/storage.admin"
    "roles/artifactregistry.admin"
    "roles/iam.serviceAccountUser"
    "roles/secretmanager.secretAccessor"
    "roles/cloudbuild.builds.editor"
    "roles/compute.networkAdmin"
    "roles/dns.admin"
    "roles/monitoring.editor"
    "roles/logging.admin"
)

# Function to setup a single project
setup_project() {
    local PROJECT_ID=$1
    local PROJECT_NUMBER=$2
    
    echo "🚀 Setting up project: $PROJECT_ID"
    
    # Set current project
    gcloud config set project $PROJECT_ID
    
    # Check if project exists and is accessible
    if ! gcloud projects describe $PROJECT_ID >/dev/null 2>&1; then
        echo "❌ Cannot access project $PROJECT_ID. Please check permissions."
        return 1
    fi
    
    # Enable required APIs
    echo "📡 Enabling APIs for $PROJECT_ID..."
    for API in "${REQUIRED_APIS[@]}"; do
        echo "  Enabling $API..."
        gcloud services enable $API --project=$PROJECT_ID --quiet
    done
    
    # Create service account if it doesn't exist
    SA_EMAIL="github-actions-sa@$PROJECT_ID.iam.gserviceaccount.com"
    if ! gcloud iam service-accounts describe $SA_EMAIL --project=$PROJECT_ID >/dev/null 2>&1; then
        echo "👤 Creating service account for $PROJECT_ID..."
        gcloud iam service-accounts create github-actions-sa \
            --display-name="GitHub Actions Service Account" \
            --description="Service account for GitHub Actions workflows" \
            --project=$PROJECT_ID
    else
        echo "✅ Service account already exists: $SA_EMAIL"
    fi
    
    # Grant necessary roles
    echo "🔑 Granting IAM roles to service account..."
    for ROLE in "${REQUIRED_ROLES[@]}"; do
        echo "  Granting $ROLE..."
        gcloud projects add-iam-policy-binding $PROJECT_ID \
            --member="serviceAccount:$SA_EMAIL" \
            --role="$ROLE" \
            --quiet
    done
    
    # Create Workload Identity Pool if it doesn't exist
    if ! gcloud iam workload-identity-pools describe github-pool --location=global --project=$PROJECT_ID >/dev/null 2>&1; then
        echo "🆔 Creating Workload Identity Pool for $PROJECT_ID..."
        gcloud iam workload-identity-pools create github-pool \
            --project=$PROJECT_ID \
            --location=global \
            --display-name="GitHub Actions Pool" \
            --description="Workload Identity Pool for GitHub Actions"
    else
        echo "✅ Workload Identity Pool already exists"
    fi
    
    # Create Workload Identity Provider if it doesn't exist  
    if ! gcloud iam workload-identity-pools providers describe github-provider \
        --workload-identity-pool=github-pool \
        --location=global \
        --project=$PROJECT_ID >/dev/null 2>&1; then
        
        echo "🔗 Creating Workload Identity Provider for $PROJECT_ID..."
        gcloud iam workload-identity-pools providers create-oidc github-provider \
            --project=$PROJECT_ID \
            --location=global \
            --workload-identity-pool=github-pool \
            --display-name="GitHub Provider" \
            --description="GitHub Actions OIDC Provider" \
            --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository,attribute.repository_owner=assertion.repository_owner,attribute.ref=assertion.ref" \
            --issuer-uri="https://token.actions.githubusercontent.com" \
            --attribute-condition="assertion.repository_owner == '$GITHUB_ORG'"
    else
        echo "✅ Workload Identity Provider already exists"
    fi
    
    # Add IAM binding for both repositories
    echo "🔐 Adding IAM bindings for GitHub repositories..."
    
    # For the app repository
    gcloud iam service-accounts add-iam-policy-binding $SA_EMAIL \
        --project=$PROJECT_ID \
        --role="roles/iam.workloadIdentityUser" \
        --member="principalSet://iam.googleapis.com/projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/github-pool/attribute.repository/$GITHUB_ORG/$GITHUB_REPO" \
        --quiet
    
    # For the infrastructure repository
    gcloud iam service-accounts add-iam-policy-binding $SA_EMAIL \
        --project=$PROJECT_ID \
        --role="roles/iam.workloadIdentityUser" \
        --member="principalSet://iam.googleapis.com/projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/github-pool/attribute.repository/$GITHUB_ORG/$GITHUB_INFRA_REPO" \
        --quiet
    
    echo "✅ Project $PROJECT_ID setup completed successfully!"
    echo "📋 Workload Identity Provider: projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/github-pool/providers/github-provider"
    echo "📧 Service Account: $SA_EMAIL"
    echo ""
}

# Main execution
echo "🎓 Starting AcademyAxis GCP Environment Setup..."
echo "================================================="

# Check if gcloud is installed and authenticated
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI is not installed. Please install it first."
    exit 1
fi

if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q "@"; then
    echo "❌ You are not authenticated with gcloud. Please run 'gcloud auth login'"
    exit 1
fi

echo "🔍 Current authenticated account: $(gcloud auth list --filter=status:ACTIVE --format='value(account)')"
echo ""

# Setup each project
for PROJECT_ID in "${!PROJECTS[@]}"; do
    PROJECT_NUMBER=${PROJECTS[$PROJECT_ID]}
    setup_project $PROJECT_ID $PROJECT_NUMBER
done

# Create Terraform state bucket if it doesn't exist (in dev project)
TERRAFORM_BUCKET="academyaxis-terraform-state"
echo "🪣 Checking Terraform state bucket..."
if ! gcloud storage buckets describe gs://$TERRAFORM_BUCKET --project=academyaxis-dev-project >/dev/null 2>&1; then
    echo "Creating Terraform state bucket..."
    gcloud storage buckets create gs://$TERRAFORM_BUCKET \
        --location=us-central1 \
        --uniform-bucket-level-access \
        --project=academyaxis-dev-project
    echo "✅ Terraform state bucket created"
else
    echo "✅ Terraform state bucket already exists"
fi

echo ""
echo "🎉 All AcademyAxis projects setup completed successfully!"
echo ""
echo "📋 Summary:"
echo "==========="
for PROJECT_ID in "${!PROJECTS[@]}"; do
    PROJECT_NUMBER=${PROJECTS[$PROJECT_ID]}
    echo "Project: $PROJECT_ID"
    echo "  Workload Identity: projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/github-pool/providers/github-provider"
    echo "  Service Account: github-actions-sa@$PROJECT_ID.iam.gserviceaccount.com"
    echo ""
done

echo "🚀 You can now run your GitHub Actions workflows!"
echo "💡 Make sure your workflows use the correct PROJECT_NUMBER for each environment."