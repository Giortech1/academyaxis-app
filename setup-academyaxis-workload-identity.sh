#!/bin/bash
# Setup Workload Identity for AcademyAxis projects

set -e

# Configuration
GITHUB_ORG="Giortech1"
GITHUB_REPO="academyaxis-app"
PROJECTS=(
    "academyaxis-dev-project:1052274887859"
    "academyaxis-uat-project:415071431590" 
    "academyaxis-prod-project:552816176477"
)

echo "Ì∫Ä Setting up Workload Identity for AcademyAxis projects..."

for project_info in "${PROJECTS[@]}"; do
    PROJECT_ID=$(echo "$project_info" | cut -d':' -f1)
    PROJECT_NUMBER=$(echo "$project_info" | cut -d':' -f2)
    
    echo ""
    echo "Ì≥ù Setting up $PROJECT_ID ($PROJECT_NUMBER)..."
    
    # Set current project
    gcloud config set project $PROJECT_ID
    
    # Enable required APIs
    echo "ÔøΩÔøΩ Enabling required APIs..."
    gcloud services enable \
        iamcredentials.googleapis.com \
        cloudresourcemanager.googleapis.com \
        iam.googleapis.com \
        run.googleapis.com \
        cloudbuild.googleapis.com \
        secretmanager.googleapis.com \
        --project=$PROJECT_ID
    
    # Create Workload Identity Pool
    echo "Ìøä Creating Workload Identity Pool..."
    if ! gcloud iam workload-identity-pools describe github-pool \
        --location=global \
        --project=$PROJECT_ID >/dev/null 2>&1; then
        
        gcloud iam workload-identity-pools create github-pool \
            --project=$PROJECT_ID \
            --location=global \
            --display-name="GitHub Actions Pool for AcademyAxis"
        
        echo "‚úÖ Created Workload Identity Pool"
    else
        echo "‚úÖ Workload Identity Pool already exists"
    fi
    
    # Create Workload Identity Provider
    echo "Ì¥ë Creating Workload Identity Provider..."
    if ! gcloud iam workload-identity-pools providers describe github-provider \
        --workload-identity-pool=github-pool \
        --location=global \
        --project=$PROJECT_ID >/dev/null 2>&1; then
        
        gcloud iam workload-identity-pools providers create-oidc github-provider \
            --project=$PROJECT_ID \
            --location=global \
            --workload-identity-pool=github-pool \
            --display-name="GitHub Provider for AcademyAxis" \
            --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository,attribute.repository_owner=assertion.repository_owner,attribute.ref=assertion.ref" \
            --issuer-uri="https://token.actions.githubusercontent.com" \
            --attribute-condition="assertion.repository_owner == '$GITHUB_ORG'"
        
        echo "‚úÖ Created Workload Identity Provider"
    else
        echo "‚úÖ Workload Identity Provider already exists"
    fi
    
    # Create Service Account
    echo "Ì±§ Creating Service Account..."
    SA_EMAIL="github-actions-sa@$PROJECT_ID.iam.gserviceaccount.com"
    
    if ! gcloud iam service-accounts describe $SA_EMAIL \
        --project=$PROJECT_ID >/dev/null 2>&1; then
        
        gcloud iam service-accounts create github-actions-sa \
            --display-name="GitHub Actions Service Account for AcademyAxis" \
            --project=$PROJECT_ID
        
        echo "‚úÖ Created Service Account"
    else
        echo "‚úÖ Service Account already exists"
    fi
    
    # Grant necessary roles to Service Account
    echo "Ì¥ê Granting roles to Service Account..."
    ROLES=(
        "roles/run.admin"
        "roles/storage.admin"
        "roles/iam.serviceAccountUser"
        "roles/secretmanager.secretAccessor"
        "roles/cloudbuild.builds.editor"
        "roles/compute.networkAdmin"
        "roles/monitoring.editor"
        "roles/logging.admin"
    )
    
    for role in "${ROLES[@]}"; do
        gcloud projects add-iam-policy-binding $PROJECT_ID \
            --member="serviceAccount:$SA_EMAIL" \
            --role="$role" \
            --quiet
    done
    
    echo "‚úÖ Granted all necessary roles"
    
    # Add IAM binding for GitHub repository
    echo "Ì¥ó Adding IAM binding for GitHub repository..."
    gcloud iam service-accounts add-iam-policy-binding $SA_EMAIL \
        --project=$PROJECT_ID \
        --role="roles/iam.workloadIdentityUser" \
        --member="principalSet://iam.googleapis.com/projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/github-pool/attribute.repository/$GITHUB_ORG/$GITHUB_REPO" \
        --quiet
    
    echo "‚úÖ Added IAM binding for repository access"
    
    # Output the Workload Identity Provider details
    echo ""
    echo "Ì≥ã Workload Identity Provider for $PROJECT_ID:"
    echo "   Provider: projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/github-pool/providers/github-provider"
    echo "   Service Account: $SA_EMAIL"
    echo ""
done

echo "Ìæâ Workload Identity setup completed for all AcademyAxis projects!"
echo ""
echo "Ì¥ß Next steps:"
echo "1. Run your GitHub Actions workflow again"
echo "2. The authentication should now work properly"
echo "3. Monitor the deployment logs for success"
