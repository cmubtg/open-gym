# OpenGym

OpenGym is a comprehensive web application designed to provide Carnegie Mellon University students with real-time occupancy levels of campus fitness facilities. The application helps students make informed decisions about when to visit the gym by displaying current occupancy data, historical trends, and predictive analytics.

## 🏗️ Architecture

OpenGym follows a modern full-stack architecture with clear separation of concerns:

- **Frontend**: React-based single-page application with responsive design
- **Backend**: Node.js/Express API server with TypeScript
- **Database**: MongoDB for data persistence
- **Authentication**: Google OAuth integration
- **Data Processing**: Python-based machine learning for occupancy prediction
- **Background Jobs**: Automated data collection and processing

## 🚀 Features

- **Real-time Occupancy Tracking**: Live occupancy data for multiple CMU fitness facilities
- **Historical Analytics**: View occupancy trends and patterns over time
- **Predictive Modeling**: ML-powered occupancy predictions to help plan gym visits
- **Facility Information**: Detailed information about each gym including hours, capacity, and amenities
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Google Authentication**: Secure login system for CMU students
- **Dark/Light Mode**: User preference-based theming

## 🏢 Supported Facilities

- **CUC Fitness Center Lower** (cohonFC) - Active
- **CUC Fitness Center Upper** (cohon2FC) - Coming Soon
- **Tepper Fitness Center** (tepperFC) - Coming Soon
- **Wiegand Gym** (wiegand) - Coming Soon
- **Highmark Gym** (highmark) - Coming Soon

## 📋 Prerequisites

Before running OpenGym, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **MongoDB** (v5 or higher)
- **Python** (v3.8 or higher) - for ML predictions
- **Git**

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/cmubtg/open-gym.git
cd open-gym
```

### 2. Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in the server directory with the following configuration:

```env
# Server Configuration
PORT=5000

# Database Configuration
MONGO_URI=mongodb://localhost:27017/opengym

# Google OAuth Configuration (optional for development)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Session Configuration
SESSION_SECRET=your_session_secret

# Environment
NODE_ENV=development
```

### 3. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd ../frontend
npm install
```

### 4. Database Setup

Ensure MongoDB is running on your system. The application will automatically create the necessary collections on first run.

### 5. Python Environment (Optional)

For ML predictions, set up the Python environment:

```bash
cd ../server/forecast
pip install -r requirements.txt
```

## 🚀 Running the Application

### Development Mode

1. **Start the Backend Server**:
   ```bash
   cd server
   npm run dev
   ```
   The server will start on `http://localhost:5000`

2. **Start the Frontend Application**:
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will start on `http://localhost:3000`

### Production Mode

1. **Build the Frontend**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Build and Start the Backend**:
   ```bash
   cd server
   npm run build
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Metadata Endpoints
- `GET /api/metadata` - Get all facility metadata
- `GET /api/metadata/:gym` - Get specific facility metadata

#### Occupancy Endpoints
- `GET /api` - Get all occupancy records
- `GET /api/:gym` - Get occupancy records for specific gym
- `GET /api/occupancy` - Get current occupancy for all gyms
- `GET /api/occupancy/:gym` - Get current occupancy for specific gym
- `GET /api/occupancy/:gym/:timestamp` - Get occupancy at specific time
- `POST /api/:gym` - Submit new occupancy data (requires authentication)

#### Authentication Endpoints
- `POST /api/auth/google` - Google OAuth login
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/status` - Check authentication status

#### Analytics Endpoints
- `GET /api/analytics/:gym` - Get analytics data for specific gym
- `GET /api/analytics/:gym/predictions` - Get ML predictions for gym

### Response Formats

#### Facility Metadata
```json
{
  "name": "CUC Fitness Center Lower",
  "description": "Two floors dedicated to cardio and weight equipment",
  "maxOccupancy": 94,
  "hours": {
    "monday": {"open": "06:30", "close": "23:00"},
    "tuesday": {"open": "06:30", "close": "23:00"}
  }
}
```

#### Occupancy Data
```json
{
  "gym": "cohonFC",
  "time": "2024-01-15T14:30:00Z",
  "occupancy": 45
}
```

## 🧪 Testing

### Backend Tests
```bash
cd server
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Linting
```bash
# Backend
cd server
npm run lint

# Frontend
cd frontend
npm run lint
```

## 📁 Project Structure

```
open-gym/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── data/           # Static data and configurations
│   │   ├── styles/         # CSS and styling
│   │   └── utils/          # Utility functions
│   └── package.json
├── server/                  # Node.js backend server
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # Database models and schemas
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Business logic layer
│   │   ├── jobs/           # Background job definitions
│   │   └── utils/          # Utility functions
│   ├── docs/               # API and architecture documentation
│   ├── data/               # Sample data and CSV files
│   ├── forecast/           # Python ML prediction scripts
│   └── package.json
└── README.md
```

## 🔧 Configuration

### Environment Variables

#### Server (.env)
- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `SESSION_SECRET` - Session encryption secret
- `NODE_ENV` - Environment (development/production)

### Frontend Configuration
The frontend automatically detects the backend URL based on the environment. For production deployments, update the API base URL in `src/utils/constants.js`.

## 🤝 Contributing

We welcome contributions to OpenGym! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes** following the coding standards
4. **Write tests** for new functionality
5. **Run the test suite**: `npm test`
6. **Commit your changes**: `git commit -m "Add your feature"`
7. **Push to your fork**: `git push origin feature/your-feature-name`
8. **Create a Pull Request**

### Coding Standards

- **TypeScript**: Use TypeScript for all new backend code
- **ESLint**: Follow the existing ESLint configuration
- **Prettier**: Format code using Prettier
- **Comments**: Add JSDoc comments for functions and classes
- **Testing**: Write unit tests for new features

## 📊 Data Flow

1. **Data Collection**: Background jobs collect occupancy data from the tripwire in the gym
2. **Data Processing**: Raw data is processed and stored in MongoDB
3. **API Layer**: Express server provides RESTful API endpoints
4. **Frontend Display**: React application fetches and displays data
5. **ML Predictions**: Python scripts generate occupancy predictions
6. **Real-time Updates**: WebSocket connections provide live updates

## 🔒 Security

- **Authentication**: Google OAuth for secure user authentication
- **HMAC Validation**: Request validation using HMAC signatures
- **Session Management**: Secure session handling with MongoDB store
- **CORS**: Configured CORS policies for cross-origin requests
- **Input Validation**: Server-side validation for all API inputs


## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Ensure MongoDB is running
   - Check MONGO_URI in .env file
   - Verify network connectivity

2. **Frontend Not Loading**
   - Check if backend server is running
   - Verify API endpoints are accessible
   - Check browser console for errors

3. **Authentication Issues**
   - Verify Google OAuth credentials
   - Check session configuration
   - Ensure HTTPS in production

4. **Build Failures**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify all environment variables


## 🙏 Acknowledgments

- Carnegie Mellon University
- CMU Building Technology Group (BTG)
- All contributors and maintainers

---

**Made with ❤️ by the CMU BTG Team**
