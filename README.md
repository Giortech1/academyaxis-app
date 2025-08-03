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
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
Test single workflow
