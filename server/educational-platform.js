// server/educational-platform.js
// AcademyAxis Educational Platform - Bitrix24-inspired Multi-Tenant Architecture

const express = require('express');
const cors = require('cors');
const path = require('path');

// Try to import Google Cloud libraries (they might not be installed yet)
let Firestore, Storage, SecretManagerServiceClient;
try {
  ({ Firestore } = require('@google-cloud/firestore'));
  ({ Storage } = require('@google-cloud/storage'));
  ({ SecretManagerServiceClient } = require('@google-cloud/secret-manager'));
} catch (error) {
  console.warn('Google Cloud libraries not available, running in local mode');
}

// Try to import optional middleware
let helmet, compression, morgan;
try {
  helmet = require('helmet');
  compression = require('compression');
  morgan = require('morgan');
} catch (error) {
  console.warn('Optional middleware not available, running in basic mode');
}

class EducationalPlatform {
  constructor() {
    this.app = express();
    this.isGoogleCloudMode = process.env.GOOGLE_CLOUD_PROJECT ? true : false;
    
    // Initialize Google Cloud services if available
    if (this.isGoogleCloudMode && Firestore) {
      this.firestore = new Firestore();
      this.storage = new Storage();
      this.secretManager = new SecretManagerServiceClient();
    }
    
    this.educationalConfig = null;
    
    this.initializeMiddleware();
    this.initializeEducationalConfig();
    this.initializeRoutes();
  }

  async initializeEducationalConfig() {
    try {
      if (this.isGoogleCloudMode && this.secretManager) {
        // Load educational configuration from Secret Manager
        const [version] = await this.secretManager.accessSecretVersion({
          name: `projects/${process.env.GOOGLE_CLOUD_PROJECT}/secrets/educational-platform-config/versions/latest`
        });
        
        this.educationalConfig = JSON.parse(version.payload.data.toString());
        console.log(`Ìæì Educational platform initialized for region: ${this.educationalConfig.region}`);
      } else {
        // Local development configuration
        this.educationalConfig = {
          region: process.env.EDUCATIONAL_REGION || 'global',
          supported_languages: (process.env.SUPPORTED_LANGUAGES || 'en-US').split(','),
          grading_system: process.env.GRADING_SYSTEM || 'flexible',
          payment_providers: (process.env.PAYMENT_PROVIDERS || 'stripe').split(','),
          sms_provider: process.env.SMS_PROVIDER || 'twilio',
          email_provider: process.env.EMAIL_PROVIDER || 'sendgrid'
        };
        console.log('Ìæì Educational platform initialized in local mode');
      }
    } catch (error) {
      console.error('Failed to load educational configuration:', error);
      // Use default configuration
      this.educationalConfig = {
        region: 'global',
        supported_languages: ['en-US'],
        grading_system: 'flexible',
        payment_providers: ['stripe'],
        sms_provider: 'twilio',
        email_provider: 'sendgrid'
      };
    }
  }

  initializeMiddleware() {
    // Basic middleware
    this.app.use(cors());
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true }));
    
    // Optional security middleware
    if (helmet) {
      this.app.use(helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            scriptSrc: ["'self'"],
          },
        },
      }));
    }
    
    // Optional compression middleware
    if (compression) {
      this.app.use(compression());
    }
    
    // Optional logging middleware (skip health checks)
    if (morgan) {
      this.app.use(morgan('combined', {
        skip: (req) => req.url === '/health' || req.url === '/ready'
      }));
    }

    // Serve React build files (if they exist)
    const buildPath = path.join(__dirname, '..', 'build');
    this.app.use(express.static(buildPath));

    // Educational authentication middleware (for API routes)
    this.app.use('/api', this.educationalAuthMiddleware.bind(this));
    
    // School isolation middleware (for school-specific routes)
    this.app.use('/api/schools/:schoolId', this.schoolIsolationMiddleware.bind(this));
    
    // Cross-school parent middleware
    this.app.use('/api/cross-school-parents', this.crossSchoolParentMiddleware.bind(this));
  }

  // School isolation middleware (similar to Bitrix24's account isolation)
  async schoolIsolationMiddleware(req, res, next) {
    try {
      const schoolId = req.params.schoolId;
      
      if (!schoolId || !schoolId.match(/^[a-zA-Z0-9_-]+$/)) {
        return res.status(400).json({ 
          error: 'Invalid school ID',
          code: 'INVALID_SCHOOL_ID'
        });
      }

      // In local mode, create a mock school context
      if (!this.isGoogleCloudMode || !this.firestore) {
        req.school = {
          id: schoolId,
          name: `School ${schoolId}`,
          region: this.educationalConfig?.region || 'global',
          settings: {
            gradingSystem: this.educationalConfig?.grading_system || 'flexible'
          },
          namespace: `school_${schoolId}`,
          collections: {
            students: `schools/${schoolId}/students`,
            teachers: `schools/${schoolId}/teachers`,
            classes: `schools/${schoolId}/classes`,
            grades: `schools/${schoolId}/grades`,
            attendance: `schools/${schoolId}/attendance`,
            parents: `schools/${schoolId}/parents`,
            assignments: `schools/${schoolId}/assignments`
          }
        };
        return next();
      }

      // Production: Verify school exists in Firestore
      const schoolDoc = await this.firestore
        .collection('schools')
        .doc(schoolId)
        .get();

      if (!schoolDoc.exists) {
        return res.status(404).json({ 
          error: 'School not found',
          code: 'SCHOOL_NOT_FOUND'
        });
      }

      const schoolData = schoolDoc.data();
      
      // Set school context for all subsequent operations
      req.school = {
        id: schoolId,
        name: schoolData.name,
        region: schoolData.region || 'global',
        settings: schoolData.settings || {},
        namespace: `school_${schoolId}`,
        collections: {
          students: `schools/${schoolId}/students`,
          teachers: `schools/${schoolId}/teachers`,
          classes: `schools/${schoolId}/classes`,
          grades: `schools/${schoolId}/grades`,
          attendance: `schools/${schoolId}/attendance`,
          parents: `schools/${schoolId}/parents`,
          assignments: `schools/${schoolId}/assignments`
        }
      };

      next();
    } catch (error) {
      console.error('School isolation error:', error);
      res.status(500).json({ 
        error: 'School isolation failed',
        code: 'SCHOOL_ISOLATION_ERROR'
      });
    }
  }

  // Cross-school parent middleware
  async crossSchoolParentMiddleware(req, res, next) {
    try {
      const parentId = req.headers['x-parent-id'];
      
      if (!parentId) {
        return res.status(400).json({ 
          error: 'Parent ID required for cross-school access',
          code: 'PARENT_ID_REQUIRED'
        });
      }

      // In local mode, create mock parent data
      if (!this.isGoogleCloudMode || !this.firestore) {
        req.crossSchoolParent = {
          parentId,
          schools: [
            {
              schoolId: 'demo_school_123',
              permissions: ['view_child_data'],
              children: ['demo_student_456']
            }
          ],
          hasMultipleSchools: false
        };
        return next();
      }

      // Production: Get parent's schools from Firestore
      const parentSchoolsQuery = this.firestore
        .collectionGroup('parents')
        .where('parentId', '==', parentId);
      
      const parentSchoolsSnapshot = await parentSchoolsQuery.get();
      
      const schools = [];
      parentSchoolsSnapshot.forEach(doc => {
        const schoolPath = doc.ref.path.split('/');
        const schoolId = schoolPath[1];
        schools.push({
          schoolId,
          permissions: doc.data().permissions || ['view_child_data'],
          children: doc.data().children || []
        });
      });

      req.crossSchoolParent = {
        parentId,
        schools,
        hasMultipleSchools: schools.length > 1
      };

      next();
    } catch (error) {
      console.error('Cross-school parent error:', error);
      res.status(500).json({ 
        error: 'Cross-school parent access failed',
        code: 'CROSS_SCHOOL_ACCESS_ERROR'
      });
    }
  }

  // Educational authentication middleware
  async educationalAuthMiddleware(req, res, next) {
    // Skip auth for public endpoints
    if (req.path === '/info' || req.path.startsWith('/public')) {
      return next();
    }

    // In local mode, create mock user
    if (!this.isGoogleCloudMode) {
      req.user = {
        id: 'local_user_123',
        email: 'demo@academyaxis.local',
        role: 'teacher',
        permissions: ['view_students', 'edit_grades']
      };
      return next();
    }

    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
          error: 'Authentication required',
          code: 'AUTH_REQUIRED'
        });
      }

      const token = authHeader.substring(7);
      const user = await this.verifyEducationalToken(token);
      
      req.user = user;
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(401).json({ 
        error: 'Invalid authentication',
        code: 'INVALID_AUTH'
      });
    }
  }

  async verifyEducationalToken(token) {
    // Placeholder for JWT verification
    // In production, verify against Firebase Auth or your auth provider
    return {
      id: 'user123',
      email: 'user@school.edu',
      role: 'teacher',
      permissions: ['view_students', 'edit_grades']
    };
  }

  initializeRoutes() {
    // Health checks
    this.app.get('/health', (req, res) => {
      res.json({ 
        status: 'healthy',
        platform: 'academyaxis-educational',
        environment: process.env.NODE_ENV || 'development',
        region: this.educationalConfig?.region || 'unknown',
        mode: this.isGoogleCloudMode ? 'production' : 'local',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      });
    });

    this.app.get('/ready', (req, res) => {
      res.json({ 
        status: 'ready',
        services: {
          firestore: this.isGoogleCloudMode && this.firestore ? 'connected' : 'local',
          storage: this.isGoogleCloudMode && this.storage ? 'connected' : 'local',
          secretManager: this.isGoogleCloudMode && this.secretManager ? 'connected' : 'local'
        },
        educational: {
          region: this.educationalConfig?.region,
          gradingSystem: this.educationalConfig?.grading_system,
          multiTenant: true,
          schoolIsolation: true,
          crossSchoolParents: true
        }
      });
    });

    // Educational platform info
    this.app.get('/api/info', (req, res) => {
      res.json({
        platform: 'AcademyAxis Educational Platform',
        version: '1.0.0',
        architecture: 'Bitrix24-inspired multi-tenant',
        features: {
          multiTenant: true,
          schoolIsolation: true,
          crossSchoolParents: true,
          regionalCompliance: true,
          academicScheduling: true
        },
        configuration: {
          region: this.educationalConfig?.region,
          supportedLanguages: this.educationalConfig?.supported_languages,
          gradingSystem: this.educationalConfig?.grading_system,
          paymentProviders: this.educationalConfig?.payment_providers,
          smsProvider: this.educationalConfig?.sms_provider
        },
        environment: {
          mode: this.isGoogleCloudMode ? 'production' : 'local',
          project: process.env.GOOGLE_CLOUD_PROJECT || 'local-dev'
        },
        endpoints: {
          health: '/health',
          ready: '/ready',
          info: '/api/info',
          schools: '/api/schools',
          onboard: 'POST /api/schools/onboard',
          students: '/api/schools/{schoolId}/students',
          teachers: '/api/schools/{schoolId}/teachers',
          parentDashboard: '/api/cross-school-parents/dashboard'
        }
      });
    });

    // School management routes
    this.initializeSchoolRoutes();
    
    // Student management routes
    this.initializeStudentRoutes();
    
    // Teacher management routes
    this.initializeTeacherRoutes();
    
    // Cross-school parent routes
    this.initializeCrossSchoolParentRoutes();
    
    // Educational content routes
    this.initializeEducationalContentRoutes();

    // Serve React app for all other routes (SPA routing)
    this.app.get('*', (req, res) => {
      const buildPath = path.join(__dirname, '..', 'build', 'index.html');
      res.sendFile(buildPath, (err) => {
        if (err) {
          res.status(404).json({ 
            error: 'React app not built. Run npm run build first.',
            code: 'REACT_BUILD_MISSING',
            help: 'Run "npm run build" to build the React frontend'
          });
        }
      });
    });
  }

  initializeSchoolRoutes() {
    // List schools (for demonstration)
    this.app.get('/api/schools', async (req, res) => {
      try {
        if (!this.isGoogleCloudMode || !this.firestore) {
          // Local mode - return demo data
          return res.json({
            success: true,
            schools: [
              {
                id: 'demo_school_123',
                name: 'AcademyAxis Demo Elementary',
                region: this.educationalConfig?.region || 'global',
                status: 'active',
                students: 150,
                teachers: 12,
                createdAt: new Date().toISOString()
              },
              {
                id: 'demo_school_456', 
                name: 'AcademyAxis Demo High School',
                region: this.educationalConfig?.region || 'global',
                status: 'active',
                students: 300,
                teachers: 25,
                createdAt: new Date().toISOString()
              }
            ],
            count: 2,
            mode: 'local_development'
          });
        }

        const schoolsSnapshot = await this.firestore
          .collection('schools')
          .limit(20)
          .get();

        const schools = [];
        schoolsSnapshot.forEach(doc => {
          schools.push({
            id: doc.id,
            ...doc.data()
          });
        });

        res.json({
          success: true,
          schools,
          count: schools.length
        });
      } catch (error) {
        console.error('List schools error:', error);
        res.status(500).json({ 
          error: 'Failed to list schools',
          code: 'LIST_SCHOOLS_ERROR'
        });
      }
    });

    // School onboarding (automated like Bitrix24 account creation)
    this.app.post('/api/schools/onboard', async (req, res) => {
      try {
        const { schoolName, region, adminEmail, settings } = req.body;
        
        if (!schoolName || !adminEmail) {
          return res.status(400).json({
            error: 'School name and admin email are required',
            code: 'MISSING_REQUIRED_FIELDS'
          });
        }
        
        // Generate unique school ID
        const schoolId = `school_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
        
        // Create school document
        const schoolData = {
          id: schoolId,
          name: schoolName,
          region: region || this.educationalConfig?.region || 'global',
          adminEmail,
          settings: {
            gradingSystem: this.educationalConfig?.grading_system || 'flexible',
            supportedLanguages: this.educationalConfig?.supported_languages || ['en-US'],
            defaultLanguage: this.educationalConfig?.supported_languages?.[0] || 'en-US',
            academicYearStart: 9,
            schoolHours: {
              start: 8,
              end: 16
            },
            timezone: 'America/New_York',
            ...settings
          },
          createdAt: new Date(),
          status: 'active',
          features: {
            multiTenant: true,
            schoolIsolation: true,
            crossSchoolParents: true,
            academicScheduling: true
          }
        };

        if (this.isGoogleCloudMode && this.firestore) {
          await this.firestore.collection('schools').doc(schoolId).set(schoolData);

          // Create school-specific storage bucket
          const bucketName = `${process.env.GOOGLE_CLOUD_PROJECT}-school-${schoolId}`;
          try {
            await this.storage.createBucket(bucketName, {
              location: process.env.STORAGE_REGION || 'US',
              uniformBucketLevelAccess: true
            });
          } catch (bucketError) {
            console.warn('Could not create storage bucket:', bucketError.message);
          }

          res.json({
            success: true,
            school: {
              id: schoolId,
              name: schoolName,
              region: region || this.educationalConfig?.region,
              bucketName,
              adminEmail
            },
            message: 'School onboarded successfully to AcademyAxis Educational Platform',
            nextSteps: [
              'Configure school administrators',
              'Set up teacher accounts', 
              'Upload curriculum content',
              'Configure parent portal access',
              'Test student enrollment process'
            ]
          });
        } else {
          // Local mode - just return success
          res.json({
            success: true,
            school: {
              id: schoolId,
              name: schoolName,
              region: region || 'global',
              adminEmail
            },
            message: 'School onboarded successfully (local development mode)',
            mode: 'local_development',
            note: 'In production, this will create isolated school data and storage'
          });
        }
      } catch (error) {
        console.error('School onboarding error:', error);
        res.status(500).json({ 
          error: 'School onboarding failed',
          code: 'SCHOOL_ONBOARDING_ERROR',
          details: error.message
        });
      }
    });

    // Get school information
    this.app.get('/api/schools/:schoolId', async (req, res) => {
      try {
        if (!this.isGoogleCloudMode || !this.firestore) {
          // Local mode
          return res.json({
            success: true,
            school: req.school,
            mode: 'local_development'
          });
        }

        const schoolDoc = await this.firestore
          .collection('schools')
          .doc(req.school.id)
          .get();

        if (!schoolDoc.exists) {
          return res.status(404).json({ 
            error: 'School not found',
            code: 'SCHOOL_NOT_FOUND'
          });
        }

        res.json({
          success: true,
          school: schoolDoc.data()
        });
      } catch (error) {
        console.error('Get school error:', error);
        res.status(500).json({ 
          error: 'Failed to get school information',
          code: 'GET_SCHOOL_ERROR'
        });
      }
    });
  }

  initializeStudentRoutes() {
    // Get students for a school (isolated per school)
    this.app.get('/api/schools/:schoolId/students', async (req, res) => {
      try {
        if (!this.isGoogleCloudMode || !this.firestore) {
          // Local mode - return demo data
          return res.json({
            success: true,
            students: [
              {
                id: 'student_demo_123',
                name: 'Alice Johnson',
                grade: '5th Grade',
                age: 10,
                schoolId: req.school.id,
                enrolledAt: new Date().toISOString()
              },
              {
                id: 'student_demo_456',
                name: 'Bob Smith', 
                grade: '5th Grade',
                age: 11,
                schoolId: req.school.id,
                enrolledAt: new Date().toISOString()
              }
            ],
            count: 2,
            school: req.school.name,
            mode: 'local_development'
          });
        }

        const studentsSnapshot = await this.firestore
          .collection(req.school.collections.students)
          .get();

        const students = [];
        studentsSnapshot.forEach(doc => {
          students.push({
            id: doc.id,
            ...doc.data()
          });
        });

        res.json({
          success: true,
          students,
          count: students.length,
          school: req.school.name
        });
      } catch (error) {
        console.error('Get students error:', error);
        res.status(500).json({ 
          error: 'Failed to get students',
          code: 'GET_STUDENTS_ERROR'
        });
      }
    });

    // Add student to school
    this.app.post('/api/schools/:schoolId/students', async (req, res) => {
      try {
        const studentData = {
          ...req.body,
          schoolId: req.school.id,
          enrolledAt: new Date(),
          status: 'active'
        };

        if (!this.isGoogleCloudMode || !this.firestore) {
          // Local mode - return success
          return res.json({
            success: true,
            student: {
              id: `student_${Date.now()}`,
              ...studentData
            },
            message: 'Student added successfully (local mode)',
            mode: 'local_development'
          });
        }

        const docRef = await this.firestore
          .collection(req.school.collections.students)
          .add(studentData);

        res.json({
          success: true,
          student: {
            id: docRef.id,
            ...studentData
          },
          message: 'Student added successfully'
        });
      } catch (error) {
        console.error('Add student error:', error);
        res.status(500).json({ 
          error: 'Failed to add student',
          code: 'ADD_STUDENT_ERROR'
        });
      }
    });
  }

  initializeTeacherRoutes() {
    // Get teachers for a school
    this.app.get('/api/schools/:schoolId/teachers', async (req, res) => {
      try {
        if (!this.isGoogleCloudMode || !this.firestore) {
          // Local mode - return demo data
          return res.json({
            success: true,
            teachers: [
              {
                id: 'teacher_demo_123',
                name: 'Ms. Sarah Wilson',
                subject: 'Mathematics',
                grade: '5th Grade',
                schoolId: req.school.id,
                email: 'sarah.wilson@' + req.school.id + '.edu'
              },
              {
                id: 'teacher_demo_456',
                name: 'Mr. John Davis',
                subject: 'Science', 
                grade: '5th Grade',
                schoolId: req.school.id,
                email: 'john.davis@' + req.school.id + '.edu'
              }
            ],
            count: 2,
            school: req.school.name,
            mode: 'local_development'
          });
        }

        const teachersSnapshot = await this.firestore
          .collection(req.school.collections.teachers)
          .get();

        const teachers = [];
        teachersSnapshot.forEach(doc => {
          teachers.push({
            id: doc.id,
            ...doc.data()
          });
        });

        res.json({
          success: true,
          teachers,
          count: teachers.length,
          school: req.school.name
        });
      } catch (error) {
        console.error('Get teachers error:', error);
        res.status(500).json({ 
          error: 'Failed to get teachers',
          code: 'GET_TEACHERS_ERROR'
        });
      }
    });
  }

  initializeCrossSchoolParentRoutes() {
    // Get parent dashboard with children from multiple schools
    this.app.get('/api/cross-school-parents/dashboard', async (req, res) => {
      try {
        if (!this.isGoogleCloudMode || !this.firestore) {
          // Local mode - return demo data
          return res.json({
            success: true,
            parentId: req.crossSchoolParent.parentId,
            schools: [
              {
                schoolId: 'demo_school_123',
                schoolName: 'AcademyAxis Demo Elementary',
                children: [
                  {
                    id: 'student_demo_456',
                    name: 'Demo Child',
                    grade: '3rd Grade',
                    currentGrade: 'A-'
                  }
                ],
                permissions: ['view_child_data', 'contact_teachers']
              }
            ],
            hasMultipleSchools: false,
            mode: 'local_development',
            features: {
              crossSchoolAccess: true,
              unifiedDashboard: true,
              multiSchoolNotifications: true
            }
          });
        }

        const parentDashboard = [];

        for (const school of req.crossSchoolParent.schools) {
          const childrenData = [];
          
          for (const childId of school.children) {
            const childDoc = await this.firestore
              .collection(`schools/${school.schoolId}/students`)
              .doc(childId)
              .get();
              
            if (childDoc.exists) {
              childrenData.push({
                id: childDoc.id,
                ...childDoc.data()
              });
            }
          }

          const schoolDoc = await this.firestore
            .collection('schools')
            .doc(school.schoolId)
            .get();

          parentDashboard.push({
            schoolId: school.schoolId,
            schoolName: schoolDoc.exists ? schoolDoc.data().name : 'Unknown School',
            children: childrenData,
            permissions: school.permissions
          });
        }

        res.json({
          success: true,
          parentId: req.crossSchoolParent.parentId,
          schools: parentDashboard,
          hasMultipleSchools: req.crossSchoolParent.hasMultipleSchools
        });
      } catch (error) {
        console.error('Cross-school parent dashboard error:', error);
        res.status(500).json({ 
          error: 'Failed to get parent dashboard',
          code: 'PARENT_DASHBOARD_ERROR'
        });
      }
    });
  }

  initializeEducationalContentRoutes() {
    // Educational content management
    this.app.get('/api/schools/:schoolId/content', async (req, res) => {
      try {
        res.json({
          success: true,
          content: {
            curriculum: 'Available for ' + req.school.name,
            assignments: 'Ready for upload',
            resources: 'Educational materials storage ready'
          },
          bucketName: this.isGoogleCloudMode ? 
            `${process.env.GOOGLE_CLOUD_PROJECT}-school-${req.school.id}` : 
            'local-storage-simulation',
          uploadEndpoint: `/api/schools/${req.school.id}/content/upload`,
          mode: this.isGoogleCloudMode ? 'production' : 'local_development'
        });
      } catch (error) {
        console.error('Content management error:', error);
        res.status(500).json({ 
          error: 'Content management failed',
          code: 'CONTENT_MANAGEMENT_ERROR'
        });
      }
    });

    // Upload educational content (placeholder)
    this.app.post('/api/schools/:schoolId/content/upload', async (req, res) => {
      try {
        res.json({
          success: true,
          message: 'Content upload endpoint ready',
          bucketName: this.isGoogleCloudMode ? 
            `${process.env.GOOGLE_CLOUD_PROJECT}-school-${req.school.id}` : 
            'local-storage-simulation',
          schoolId: req.school.id,
          schoolName: req.school.name,
          mode: this.isGoogleCloudMode ? 'production' : 'local_development',
          note: 'File upload functionality would be implemented here'
        });
      } catch (error) {
        console.error('Content upload error:', error);
        res.status(500).json({ 
          error: 'Content upload failed',
          code: 'CONTENT_UPLOAD_ERROR'
        });
      }
    });
  }

  start() {
    const port = process.env.PORT || 8080;
    const host = process.env.HOST || '0.0.0.0';
    
    this.app.listen(port, host, () => {
      console.log('');
      console.log('Ìæì AcademyAxis Educational Platform');
      console.log('=====================================');
      console.log(`Ì∫Ä Server running on http://${host}:${port}`);
      console.log(`Ì≥ö Multi-tenant mode: enabled`);
      console.log(`Ìºç Educational region: ${this.educationalConfig?.region || 'global'}`);
      console.log(`Ìø´ School isolation: enabled`);
      console.log(`Ì±®‚ÄçÌ±©‚ÄçÌ±ß‚ÄçÌ±¶ Cross-school parents: enabled`);
      console.log(`‚öôÔ∏è  Mode: ${this.isGoogleCloudMode ? 'production (Google Cloud)' : 'local development'}`);
      console.log(`Ì≥ä Grading system: ${this.educationalConfig?.grading_system || 'flexible'}`);
      console.log(`Ì∑£Ô∏è  Languages: ${this.educationalConfig?.supported_languages?.join(', ') || 'en-US'}`);
      console.log('');
      console.log('Ì¥ó API Endpoints:');
      console.log(`   Health Check: http://${host}:${port}/health`);
      console.log(`   Ready Check: http://${host}:${port}/ready`);
      console.log(`   Platform Info: http://${host}:${port}/api/info`);
      console.log(`   List Schools: http://${host}:${port}/api/schools`);
      console.log(`   Onboard School: POST http://${host}:${port}/api/schools/onboard`);
      console.log(`   School Students: http://${host}:${port}/api/schools/{schoolId}/students`);
      console.log(`   School Teachers: http://${host}:${port}/api/schools/{schoolId}/teachers`);
      console.log(`   Parent Dashboard: http://${host}:${port}/api/cross-school-parents/dashboard`);
      console.log('');
      console.log('Ì∑™ Test Commands:');
      console.log(`   curl http://localhost:${port}/health`);
      console.log(`   curl http://localhost:${port}/api/info`);
      console.log(`   curl http://localhost:${port}/api/schools`);
      console.log('');
      if (!this.isGoogleCloudMode) {
        console.log('Ì≤° Running in local development mode.');
        console.log('   Set GOOGLE_CLOUD_PROJECT environment variable for production mode.');
        console.log('');
      }
    });
  }
}

// Initialize and start the educational platform
if (require.main === module) {
  const platform = new EducationalPlatform();
  platform.start();
}

module.exports = EducationalPlatform;
