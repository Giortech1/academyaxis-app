# AcademyAxis Educational Platform

AcademyAxis is a comprehensive educational platform that provides both mobile app functionality and web-based learning management, part of the AcademyAxis.io ecosystem.

## 🚀 Features

### 📱 Mobile-First Design
- Responsive design optimized for mobile devices
- Progressive Web App (PWA) capabilities
- Real-time learning updates
- Mobile-optimized course streaming

### 🎓 Learning Management
- Course creation and management
- Interactive lessons with rich content
- Progress tracking and analytics
- Real-time collaboration features
- Assignment and quiz system

### 👥 Multi-Role Support
- **Students**: Enroll, learn, track progress
- **Instructors**: Create courses, manage content, track student progress
- **Administrators**: Platform management and analytics

### ⚡ Real-Time Features
- Live chat and discussions
- Real-time progress updates
- Instant notifications
- Collaborative learning spaces

## 🛠 Technical Stack

- **Backend**: Node.js with Express
- **Real-time**: Socket.IO for live features
- **Authentication**: JWT-based secure authentication
- **Content**: Markdown support for rich content
- **Security**: Helmet, CORS, rate limiting

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/:id` - Get specific course
- `POST /api/courses` - Create course (instructor only)

### Lessons
- `GET /api/lessons/:courseId` - Get course lessons
- `POST /api/lessons` - Create lesson (instructor only)

### Progress Tracking
- `GET /api/progress` - Get user progress
- `POST /api/progress/update` - Update learning progress

### System
- `GET /health` - Health check
- `GET /ready` - Readiness check
- `GET /api/info` - Platform information

## 🏃‍♂️ Quick Start

### Local Development
```bash
npm install
npm start
```

Visit http://localhost:8080

### Testing API

```bash
# Register a new student
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "student1",
    "email": "student@example.com", 
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "role": "student"
  }'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "student1",
    "password": "password123"
  }'

# Get courses (save token from login)
curl -X GET http://localhost:8080/api/courses \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🚀 Deployment

This application is automatically deployed via GitHub Actions:

- `dev` branch → Development environment
- `uat` branch → UAT environment  
- `main` branch → Production environment

## 🔧 Environment Variables

Create a `.env` file based on `.env.example`:

```bash
PORT=8080
ENVIRONMENT=local
JWT_SECRET=your-super-secret-jwt-key
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in this repository
- Contact: support@academyaxis.io

---

**AcademyAxis** - Empowering education through technology 🎓# Billing fixed
