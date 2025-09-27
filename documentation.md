# OpenGym - Carnegie Mellon University Gym Occupancy Tracking System

## Overview

OpenGym is a comprehensive MERN (MongoDB, Express.js, React, Node.js) stack web application designed to track and display real-time occupancy levels of Carnegie Mellon University fitness facilities. The system provides students with live occupancy data to help them make informed decisions about when to visit the gym, reducing crowding and improving the overall fitness experience.

## Project Structure

The project is organized into two main directories:
- `frontend/` - React-based client application
- `server/` - Node.js/Express backend API and data processing services

## System Architecture

### Backend Architecture (Node.js/Express/TypeScript)

#### Core Components

**1. Server Entry Point (`server/src/server.ts`)**
- Main server class that orchestrates application startup
- Handles database connection via Mongoose
- Configures Express middleware, CORS, and session management
- Initializes background cron jobs for data processing
- Sets up API routes and error handling

**2. Configuration Management (`server/src/config/index.ts`)**
- Environment-based configuration system
- Supports production and development environments
- Manages database URLs, OAuth credentials, HMAC secrets, and CORS policies
- Configures MongoDB session storage with appropriate security settings

**3. Database Layer**

**Database Interface (`server/src/models/database.ts`)**
- Abstraction layer for all database operations
- Provides methods for inserting and retrieving occupancy records, log records, and gym hours
- Supports multiple occupancy collections (Current, Aggregate, Forecast)
- Implements date range filtering and gym-specific queries

**Data Models:**

*Occupancy Records (`server/src/models/types/schema/occupancy-schema.ts`)*
```typescript
{
  gym: GymName;        // Facility identifier
  time: Date;          // Timestamp of measurement
  occupancy: number;   // Current occupancy count
}
```

*Log Records (`server/src/models/types/schema/log-schema.ts`)*
```typescript
{
  gym: GymName;        // Facility identifier
  time: Date;          // Timestamp of log entry
  entries: number;     // Number of people entering
  exits: number;       // Number of people exiting
  notes: string;       // Optional notes
}
```

**4. API Routes and Controllers**

**Route Structure (`server/src/routes/routes.ts`)**
- `/occupancy-record` - Current occupancy data endpoints
- `/log-record` - Entry/exit log data endpoints
- `/metadata-record` - Facility metadata endpoints
- `/analytics` - Analytics and statistics endpoints

**Controllers:**
- **Occupancy Controller** (`server/src/controllers/occupancy-record/occupancy-record.ts`)
  - Handles retrieval of current and historical occupancy data
  - Supports gym-specific and all-gym queries
  - Provides occupancy record creation functionality

**5. Data Processing Jobs**

**Log Scan Job (`server/src/jobs/log-scan.ts`)**
- Runs every 5 minutes via cron scheduler
- Processes entry/exit logs to calculate current occupancy
- Implements intelligent exit adjustment algorithm for busy evening hours
- Features:
  - Time-based scheduling (6:30 AM - 11:59 PM)
  - Evening adjustment factor for high-traffic periods
  - Negative occupancy detection and logging
  - Automatic data aggregation across all facilities

**Algorithm Details:**
- Calculates occupancy as: `entries - exits`
- Applies exit weight factor (currently 1.0) during busy evening hours
- Busy threshold: >2000 total entries+exits
- Evening hours: after 8:00 PM

**6. Security and Authentication**

**HMAC Authentication (`server/src/middleware/hmac/hmac-controller.ts`)**
- Validates incoming requests using HMAC signatures
- Ensures data integrity and authenticity
- Protects against tampering and unauthorized access
- Used for secure data ingestion from external sensors/systems

**7. Utilities and Constants (`server/src/utils/constants.ts`)**
- Defines gym identifiers: `["tepperFC", "fairfax", "cohonFC", "wiegand"]`
- MongoDB collection enums (Current, Aggregate, Forecast)
- HTTP status codes and date formatting constants
- Type-safe gym name definitions

### Frontend Architecture (React/JavaScript)

#### Core Components

**1. Application Structure (`frontend/src/App.jsx`)**
- React Router setup with two main routes:
  - `/` - Home page displaying all facilities
  - `/facility/:id` - Individual facility detail page
- Wrapped in AuthProvider for authentication context
- Global Footer component

**2. Facility Data Management**

**Facilities Configuration (`frontend/src/data/facilities.js`)**
Defines metadata for all CMU fitness facilities:

- **CUC Fitness Center Lower** (`cohonFC`)
  - Max Occupancy: 94
  - Hours: 6:30 AM - 11:00 PM (weekdays), 10:00 AM - 9:00 PM (weekends)
  - Status: Established

- **CUC Fitness Center Upper** (`cohon2FC`)
  - Max Occupancy: 150
  - Status: Coming Soon

- **Tepper Fitness Center** (`tepperFC`)
  - Max Occupancy: 70
  - Hours: 8:00 AM - 8:00 PM (weekdays only)
  - Status: Coming Soon

- **Wiegand Gym** (`wiegand`)
  - Max Occupancy: 300
  - Hours: 8:00 AM - 11:00 PM (weekdays), 9:00 AM - 11:00 PM (weekends)
  - Status: Coming Soon

- **Highmark Gym** (`highmark`)
  - Max Occupancy: 1000
  - Hours: 7:00 AM - 7:00 PM (daily)
  - Status: Coming Soon

**3. Component Architecture**

**Facility Components:**
- `FacilityCard` - Main facility display component with context provider
- `FacilityCardDisplay` - Visual representation of facility
- `FacilityCardInfo` - Facility information and occupancy details
- `LiveDot` - Real-time status indicator
- `OccMeter` - Occupancy meter visualization

**Authentication Components:**
- `AuthButton` - Main authentication interface
- `GoogleLoginButton` - Google OAuth integration
- `LoginPopup` - Modal login interface

**Detail Page Components:**
- `FacilityDetailCards` - Detailed facility information cards
- `FacilityDetailImage` - Facility image gallery
- `FacilityDetailInfo` - Comprehensive facility details
- `BarChart` - Occupancy data visualization

**4. Context Management**

**AuthContext** (`frontend/src/context/AuthContext.jsx`)
- Manages user authentication state
- Handles Google OAuth integration
- Provides authentication status across components

**FacilityContext** (`frontend/src/context/FacilityContext.jsx`)
- Manages facility-specific data and state
- Provides facility information to child components

**5. Data Hooks and Utilities**

**Custom Hooks:**
- `useDarkMode` - Theme management
- `useFacilityMetadata` - Facility metadata retrieval
- `useFacilityOccupancy` - Real-time occupancy data

### Technology Stack

**Backend Dependencies:**
- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM
- **TypeScript** - Type safety and development experience
- **Winston** - Logging framework
- **node-cron** - Job scheduling
- **express-session** - Session management
- **connect-mongo** - MongoDB session store
- **google-auth-library** - Google OAuth integration
- **cors** - Cross-origin resource sharing
- **fast-csv** - CSV data processing

**Frontend Dependencies:**
- **React 18** - UI framework
- **React Router DOM** - Client-side routing
- **Material-UI (MUI)** - Component library
- **Chart.js & react-chartjs-2** - Data visualization
- **Tailwind CSS** - Utility-first CSS framework
- **React OAuth Google** - Google authentication
- **Lucide React** - Icon library

## Data Flow and Processing

### 1. Data Ingestion
- External sensors/systems send entry/exit data via HMAC-authenticated requests
- Log records are stored in MongoDB with timestamps and gym identifiers
- Data includes entry counts, exit counts, and optional notes

### 2. Occupancy Calculation
- Cron job runs every 5 minutes during operational hours (6:30 AM - 11:59 PM)
- Aggregates daily entry/exit logs for each facility
- Calculates current occupancy: `total_entries - total_exits`
- Applies intelligent adjustments during busy evening periods
- Stores calculated occupancy in current collection

### 3. Data Serving
- REST API endpoints provide real-time and historical occupancy data
- Frontend components fetch data via custom hooks
- Real-time updates through periodic polling
- Data visualization through charts and occupancy meters

### 4. User Interface
- Home page displays all facilities with current occupancy levels
- Color-coded occupancy indicators (low/moderate/busy/very busy)
- Detailed facility pages with historical data and analytics
- Responsive design for mobile and desktop access

## Security Features

### 1. HMAC Authentication
- Validates data integrity using cryptographic signatures
- Prevents tampering and unauthorized data submission
- Configurable secret keys and expiration times

### 2. Session Management
- Secure session storage in MongoDB
- HTTP-only cookies with appropriate security flags
- Environment-specific security configurations

### 3. CORS Configuration
- Restricted cross-origin access
- Environment-specific allowed origins
- Credential support for authenticated requests

### 4. Input Validation
- Type-safe data models with Mongoose schemas
- Request validation middleware
- Error handling and logging

## API Endpoints

### Occupancy Data
- `GET /api/occupancy-record` - All current occupancy data
- `GET /api/occupancy-record/:gym` - Gym-specific occupancy data
- `POST /api/occupancy-record/:gym` - Submit new occupancy data (authenticated)

### Log Data
- `GET /api/log-record` - All log records
- `GET /api/log-record/:gym` - Gym-specific log records

### Metadata
- `GET /api/metadata-record` - All facility metadata
- `GET /api/metadata-record/:gym` - Specific facility metadata

### Analytics
- `GET /api/analytics` - Analytics and statistics data

## Deployment and Configuration

### Environment Variables
**Server (.env):**
```
PORT=5000
MONGO_URI_DEV=mongodb://localhost:27017/opengym-dev
MONGO_URI_PROD=mongodb://production-uri
FRONTEND_URL_DEV=http://localhost:3000
FRONTEND_URL_PROD=https://production-frontend-url
GOOGLE_OAUTH_CLIENT_ID=your-google-client-id
HMAC_SECRET=your-hmac-secret
ENCRYPTION_KEY=your-encryption-key
MONGODB_SESSION_SECRET=your-session-secret
IS_PRODUCTION=false
DEBUG_MODE=true
```

### Development Setup(SEE READ ME File)
1. Install dependencies: `npm install` in both frontend and server directories
2. Configure environment variables(TO be shared offline)
3. Start MongoDB instance
4. Run server: `npm run dev` in server directory
5. Run frontend: `npm run dev` in frontend directory

### Production Deployment
1. Build frontend: `npm run build`
2. Build server: `npm run build`
3. Start production server: `npm start`
4. Configure reverse proxy (nginx) for static file serving
5. Set up SSL certificates and security headers

## Current Status and Limitations

### Implemented Features
- Real-time occupancy tracking for CUC Fitness Center Lower
- Historical data storage and retrieval
- Web interface with facility information
- HMAC-authenticated data ingestion
- Automated occupancy calculation
- Google OAuth authentication framework

### Features Not Yet Implemented
- **Predictive Analytics**: ML-based occupancy forecasting
- **Real-time WebSocket Updates**: Live data streaming to frontend
- **Advanced Analytics Dashboard**: Detailed usage patterns and insights
- **Multi-facility Support**: Full implementation for all CMU gyms
- **Push Notifications**: Alerts for optimal gym times
- **Mobile Application**: Native mobile app development(Distant stretch goal)


### Known Issues
- Some API endpoints referenced in documentation are not fully implemented
- Predictive features mentioned in API docs are placeholders
- Limited error handling in frontend components
- No testing coverage for many critical paths

## Future Development Roadmap

### Phase 1: Dashboard and Details
- Implement admin dashboard page
- Add a details page with more info and analytics for each gym

### Phase 2: ML model implementation & Gym expansion
- Add predictive occupancy modeling
- Expand to all CMU fitness facilities

### Phase 3: Doccumentation, secutiry and testing
- Add doccumentation for newly implemented features as well as write comprehensive tests

