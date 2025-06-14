const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;
const ENVIRONMENT = process.env.ENVIRONMENT || 'local';
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: ENVIRONMENT === 'prod' ? 100 : 1000,
  message: { error: 'Too many requests from this IP, please try again later.' }
});
app.use('/api/', limiter);

// In-memory storage (replace with real database in production)
let users = [];
let courses = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn the basics of HTML, CSS, and JavaScript',
    instructor: 'John Doe',
    duration: '8 weeks',
    difficulty: 'Beginner',
    price: 99.99,
    category: 'Programming'
  },
  {
    id: '2',
    title: 'Advanced React Development',
    description: 'Master advanced React concepts and patterns',
    instructor: 'Jane Smith',
    duration: '12 weeks',
    difficulty: 'Advanced',
    price: 199.99,
    category: 'Programming'
  }
];

// Validation schemas
const userRegistrationSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().min(1).max(50).required(),
  lastName: Joi.string().min(1).max(50).required(),
  role: Joi.string().valid('student', 'instructor', 'admin').default('student')
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: ENVIRONMENT,
    uptime: process.uptime(),
    version: '1.0.0'
  });
});

// Readiness check
app.get('/ready', (req, res) => {
  res.status(200).json({
    status: 'ready',
    timestamp: new Date().toISOString(),
    environment: ENVIRONMENT
  });
});

// API info
app.get('/api/info', (req, res) => {
  res.json({
    name: 'AcademyAxis API',
    version: '1.0.0',
    description: 'Educational platform API for mobile app and web interface',
    environment: ENVIRONMENT,
    endpoints: {
      authentication: ['/api/auth/register', '/api/auth/login'],
      courses: ['/api/courses', '/api/courses/:id'],
      system: ['/health', '/ready', '/api/info']
    }
  });
});

// Authentication routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { error, value } = userRegistrationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.details.map(detail => detail.message)
      });
    }

    const { username, email, password, firstName, lastName, role } = value;

    // Check if user already exists
    const existingUser = users.find(u => u.username === username || u.email === email);
    if (existingUser) {
      return res.status(409).json({
        error: 'User already exists with this username or email'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = {
      id: uuidv4(),
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
      createdAt: new Date().toISOString()
    };

    users.push(user);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Find user
    const user = users.find(u => u.username === username || u.email === username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Course routes
app.get('/api/courses', (req, res) => {
  const { category, difficulty, search } = req.query;
  
  let filteredCourses = [...courses];
  
  if (category) {
    filteredCourses = filteredCourses.filter(course => 
      course.category.toLowerCase().includes(category.toLowerCase())
    );
  }
  
  if (difficulty) {
    filteredCourses = filteredCourses.filter(course => 
      course.difficulty.toLowerCase() === difficulty.toLowerCase()
    );
  }
  
  if (search) {
    filteredCourses = filteredCourses.filter(course => 
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  res.json({
    courses: filteredCourses,
    total: filteredCourses.length,
    filters: { category, difficulty, search }
  });
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === req.params.id);
  
  if (!course) {
    return res.status(404).json({ error: 'Course not found' });
  }
  
  res.json({ course });
});

// Main page route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AcademyAxis - Educational Platform</title>
        <style>
            body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                margin: 0; 
                padding: 20px; 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                min-height: 100vh;
            }
            .container { 
                max-width: 800px; 
                margin: 0 auto; 
                background: rgba(255,255,255,0.1); 
                padding: 40px; 
                border-radius: 20px;
                backdrop-filter: blur(10px);
            }
            h1 { 
                color: #fff; 
                text-align: center; 
                font-size: 3em; 
                margin-bottom: 10px;
            }
            .subtitle { 
                text-align: center; 
                font-size: 1.2em; 
                margin-bottom: 40px; 
                opacity: 0.9;
            }
            .stats { 
                display: grid; 
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
                gap: 20px; 
                margin: 40px 0;
            }
            .stat-card { 
                background: rgba(255,255,255,0.2); 
                padding: 20px; 
                border-radius: 15px; 
                text-align: center;
            }
            .stat-number { 
                font-size: 2.5em; 
                font-weight: bold; 
                margin-bottom: 5px;
            }
            .endpoints { 
                background: rgba(255,255,255,0.1); 
                padding: 30px; 
                border-radius: 15px; 
                margin: 30px 0;
            }
            .endpoint { 
                background: rgba(255,255,255,0.1); 
                padding: 15px; 
                margin: 10px 0; 
                border-radius: 10px; 
                font-family: 'Courier New', monospace;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🎓 AcademyAxis</h1>
            <div class="subtitle">Educational Platform - Mobile App & Web Interface</div>
            
            <div class="stats">
                <div class="stat-card">
                    <div class="stat-number">${courses.length}</div>
                    <div>Courses Available</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${users.length}</div>
                    <div>Registered Users</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${ENVIRONMENT.toUpperCase()}</div>
                    <div>Environment</div>
                </div>
            </div>

            <div class="endpoints">
                <h2>🔗 API Endpoints</h2>
                <div class="endpoint">POST /api/auth/register - User registration</div>
                <div class="endpoint">POST /api/auth/login - User authentication</div>
                <div class="endpoint">GET /api/courses - List courses</div>
                <div class="endpoint">GET /api/courses/:id - Get specific course</div>
                <div class="endpoint">GET /health - Health check</div>
                <div class="endpoint">GET /ready - Readiness check</div>
                <div class="endpoint">GET /api/info - API information</div>
            </div>
        </div>
    </body>
    </html>
  `);
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 AcademyAxis server running on port ${PORT}`);
  console.log(`📱 Environment: ${ENVIRONMENT}`);
  console.log(`🎓 Educational platform ready for students!`);
  console.log(`📚 Available courses: ${courses.length}`);
  console.log(`👥 Registered users: ${users.length}`);
});