# OpenGym API Documentation

This document provides detailed information about the OpenGym REST API endpoints, request/response formats, and authentication requirements.

## Base URL

```
http://localhost:5000/api
```

For production deployments, replace `localhost:5000` with your actual server URL.

## Authentication

OpenGym uses Google OAuth 2.0 for authentication. Some endpoints require authentication while others are publicly accessible.

### Authentication Flow

1. **Login**: `POST /api/auth/google`
2. **Check Status**: `GET /api/auth/status`
3. **Logout**: `POST /api/auth/logout`

### Authentication Headers

For authenticated requests, include the session cookie automatically handled by the browser.

## Error Handling

All API endpoints return consistent error responses:

```json
{
  "error": true,
  "message": "Error description",
  "code": "ERROR_CODE",
  "timestamp": "2024-01-15T14:30:00Z"
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Endpoints

### Health Check

#### GET /api/health

Check if the API server is running.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T14:30:00Z",
  "version": "1.0.0"
}
```

---

### Metadata Endpoints

#### GET /api/metadata

Get metadata for all fitness facilities.

**Response:**
```json
[
  {
    "id": "cohonFC",
    "name": "CUC Fitness Center Lower",
    "description": "Two floors dedicated to cardio and weight equipment in the Cohon University Center.",
    "maxOccupancy": 94,
    "address": "5000 Forbes Ave, Pittsburgh, PA 15213",
    "hours": {
      "sunday": {"open": "10:00", "close": "21:00"},
      "monday": {"open": "06:30", "close": "23:00"},
      "tuesday": {"open": "06:30", "close": "23:00"},
      "wednesday": {"open": "06:30", "close": "23:00"},
      "thursday": {"open": "06:30", "close": "23:00"},
      "friday": {"open": "06:30", "close": "23:00"},
      "saturday": {"open": "10:00", "close": "21:00"}
    },
    "amenities": ["Cardio Equipment", "Weight Training", "Free Weights"],
    "status": "established",
    "images": [
      "/images/uc.jpg",
      "/images/uc2.jpg",
      "/images/uc3.jpg"
    ]
  }
]
```

#### GET /api/metadata/:gym

Get metadata for a specific fitness facility.

**Parameters:**
- `gym` (string) - Facility ID (e.g., "cohonFC", "tepperFC")

**Response:**
```json
{
  "id": "cohonFC",
  "name": "CUC Fitness Center Lower",
  "description": "Two floors dedicated to cardio and weight equipment in the Cohon University Center.",
  "maxOccupancy": 94,
  "address": "5000 Forbes Ave, Pittsburgh, PA 15213",
  "hours": {
    "sunday": {"open": "10:00", "close": "21:00"},
    "monday": {"open": "06:30", "close": "23:00"},
    "tuesday": {"open": "06:30", "close": "23:00"},
    "wednesday": {"open": "06:30", "close": "23:00"},
    "thursday": {"open": "06:30", "close": "23:00"},
    "friday": {"open": "06:30", "close": "23:00"},
    "saturday": {"open": "10:00", "close": "21:00"}
  },
  "amenities": ["Cardio Equipment", "Weight Training", "Free Weights"],
  "status": "established",
  "images": [
    "/images/uc.jpg",
    "/images/uc2.jpg",
    "/images/uc3.jpg"
  ]
}
```

---

### Occupancy Endpoints

#### GET /api/occupancy

Get current occupancy for all facilities.

**Response:**
```json
[
  {
    "gym": "cohonFC",
    "occupancy": 45,
    "maxOccupancy": 94,
    "percentage": 47.87,
    "timestamp": "2024-01-15T14:30:00Z",
    "status": "moderate"
  },
  {
    "gym": "tepperFC",
    "occupancy": 12,
    "maxOccupancy": 70,
    "percentage": 17.14,
    "status": "low"
  }
]
```

#### GET /api/occupancy/:gym

Get current occupancy for a specific facility.

**Parameters:**
- `gym` (string) - Facility ID

**Response:**
```json
{
  "gym": "cohonFC",
  "occupancy": 45,
  "maxOccupancy": 94,
  "percentage": 47.87,
  "timestamp": "2024-01-15T14:30:00Z",
  "status": "moderate"
}
```

#### GET /api/occupancy/:gym/:timestamp

Get occupancy for a specific facility at a specific time.

**Parameters:**
- `gym` (string) - Facility ID
- `timestamp` (string) - ISO 8601 timestamp or Unix timestamp

**Response:**
```json
{
  "gym": "cohonFC",
  "occupancy": 32,
  "timestamp": "2024-01-15T10:00:00Z"
}
```

#### GET /api/:gym

Get historical occupancy data for a specific facility.

**Parameters:**
- `gym` (string) - Facility ID

**Query Parameters:**
- `startDate` (string, optional) - Start date (ISO 8601)
- `endDate` (string, optional) - End date (ISO 8601)
- `limit` (number, optional) - Maximum number of records (default: 100)
- `interval` (string, optional) - Data interval ("hour", "day", "week")

**Example:**
```
GET /api/cohonFC?startDate=2024-01-01&endDate=2024-01-07&interval=hour
```

**Response:**
```json
[
  {
    "gym": "cohonFC",
    "time": "2024-01-15T14:00:00Z",
    "occupancy": 45
  },
  {
    "gym": "cohonFC",
    "time": "2024-01-15T15:00:00Z",
    "occupancy": 52
  }
]
```

#### POST /api/:gym

Submit new occupancy data for a facility.

**Authentication:** Required

**Parameters:**
- `gym` (string) - Facility ID

**Request Body:**
```json
{
  "occupancy": 45,
  "timestamp": "2024-01-15T14:30:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Occupancy data recorded successfully",
  "data": {
    "gym": "cohonFC",
    "occupancy": 45,
    "timestamp": "2024-01-15T14:30:00Z"
  }
}
```

---

### Analytics Endpoints

#### GET /api/analytics/:gym

Get analytics data for a specific facility.

**Parameters:**
- `gym` (string) - Facility ID

**Query Parameters:**
- `period` (string, optional) - Analysis period ("day", "week", "month") - default: "week"
- `metric` (string, optional) - Specific metric ("average", "peak", "trends") - default: "all"

**Response:**
```json
{
  "gym": "cohonFC",
  "period": "week",
  "analytics": {
    "averageOccupancy": 42.5,
    "peakOccupancy": {
      "value": 89,
      "time": "2024-01-15T18:30:00Z"
    },
    "lowOccupancy": {
      "value": 5,
      "time": "2024-01-15T06:00:00Z"
    },
    "hourlyAverages": [
      {"hour": 6, "average": 8.2},
      {"hour": 7, "average": 15.7},
      {"hour": 8, "average": 25.3},
      {"hour": 9, "average": 35.1},
      {"hour": 10, "average": 42.8},
      {"hour": 11, "average": 48.2},
      {"hour": 12, "average": 55.7},
      {"hour": 13, "average": 62.1},
      {"hour": 14, "average": 58.9},
      {"hour": 15, "average": 67.3},
      {"hour": 16, "average": 72.5},
      {"hour": 17, "average": 78.2},
      {"hour": 18, "average": 85.1},
      {"hour": 19, "average": 76.8},
      {"hour": 20, "average": 68.4},
      {"hour": 21, "average": 52.3},
      {"hour": 22, "average": 35.7}
    ],
    "weeklyTrends": {
      "monday": 65.2,
      "tuesday": 58.7,
      "wednesday": 62.1,
      "thursday": 59.8,
      "friday": 71.3,
      "saturday": 45.2,
      "sunday": 38.9
    },
    "busyHours": [
      {"start": "17:00", "end": "19:00", "averageOccupancy": 81.7},
      {"start": "12:00", "end": "14:00", "averageOccupancy": 58.9}
    ]
  }
}
```

#### GET /api/analytics/:gym/predictions

Get ML-powered occupancy predictions for a specific facility.

**Parameters:**
- `gym` (string) - Facility ID

**Query Parameters:**
- `hours` (number, optional) - Number of hours to predict (default: 24, max: 168)
- `interval` (string, optional) - Prediction interval ("hour", "30min") - default: "hour"

**Response:**
```json
{
  "gym": "cohonFC",
  "predictions": [
    {
      "timestamp": "2024-01-15T15:00:00Z",
      "predictedOccupancy": 52,
      "confidence": 0.85,
      "status": "moderate"
    },
    {
      "timestamp": "2024-01-15T16:00:00Z",
      "predictedOccupancy": 67,
      "confidence": 0.82,
      "status": "busy"
    }
  ],
  "modelInfo": {
    "version": "1.2.0",
    "accuracy": 0.87,
    "lastTrained": "2024-01-10T08:00:00Z"
  }
}
```

---

### Authentication Endpoints

#### POST /api/auth/google

Authenticate user with Google OAuth.

**Request Body:**
```json
{
  "credential": "google_oauth_credential_token"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "email": "user@andrew.cmu.edu",
    "name": "John Doe",
    "picture": "https://example.com/avatar.jpg"
  },
  "session": {
    "expires": "2024-01-16T14:30:00Z"
  }
}
```

#### GET /api/auth/status

Check current authentication status.

**Response (Authenticated):**
```json
{
  "authenticated": true,
  "user": {
    "id": "user_id",
    "email": "user@andrew.cmu.edu",
    "name": "John Doe",
    "picture": "https://example.com/avatar.jpg"
  }
}
```

**Response (Not Authenticated):**
```json
{
  "authenticated": false
}
```

#### POST /api/auth/logout

Logout current user.

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### Log Record Endpoints

#### GET /api/logs/:gym

Get log records for a specific facility (admin only).

**Authentication:** Required (Admin)

**Parameters:**
- `gym` (string) - Facility ID

**Query Parameters:**
- `startDate` (string, optional) - Start date (ISO 8601)
- `endDate` (string, optional) - End date (ISO 8601)
- `limit` (number, optional) - Maximum number of records (default: 100)
- `type` (string, optional) - Log type filter ("entry", "exit", "error")

**Response:**
```json
[
  {
    "id": "log_id",
    "gym": "cohonFC",
    "type": "entry",
    "timestamp": "2024-01-15T14:30:00Z",
    "data": {
      "sensorId": "sensor_001",
      "confidence": 0.95
    }
  }
]
```

---

## Rate Limiting

The API implements rate limiting to ensure fair usage:

- **Public endpoints**: 100 requests per minute per IP
- **Authenticated endpoints**: 500 requests per minute per user
- **Data submission endpoints**: 60 requests per minute per user

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642248600
```

## Data Formats

### Timestamps

All timestamps use ISO 8601 format in UTC:
```
2024-01-15T14:30:00Z
```

### Occupancy Status

Occupancy status is calculated based on percentage of maximum capacity:
- `low`: 0-30%
- `moderate`: 31-70%
- `busy`: 71-90%
- `very_busy`: 91-100%

### Facility IDs

Current facility identifiers:
- `cohonFC` - CUC Fitness Center Lower
- `cohon2FC` - CUC Fitness Center Upper
- `tepperFC` - Tepper Fitness Center
- `wiegand` - Wiegand Gym
- `highmark` - Highmark Gym

## WebSocket API

For real-time updates, OpenGym provides WebSocket connections:

### Connection
```javascript
const ws = new WebSocket('ws://localhost:5000/ws');
```

### Events

#### Subscribe to Facility Updates
```json
{
  "type": "subscribe",
  "gym": "cohonFC"
}
```

#### Occupancy Update Event
```json
{
  "type": "occupancy_update",
  "gym": "cohonFC",
  "occupancy": 45,
  "timestamp": "2024-01-15T14:30:00Z"
}
```

#### Unsubscribe
```json
{
  "type": "unsubscribe",
  "gym": "cohonFC"
}
```

## SDK Examples

### JavaScript/Node.js

```javascript
const OpenGymAPI = {
  baseURL: 'http://localhost:5000/api',
  
  async getCurrentOccupancy(gym) {
    const response = await fetch(`${this.baseURL}/occupancy/${gym}`);
    return response.json();
  },
  
  async getHistoricalData(gym, startDate, endDate) {
    const params = new URLSearchParams({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    });
    const response = await fetch(`${this.baseURL}/${gym}?${params}`);
    return response.json();
  },
  
  async getPredictions(gym, hours = 24) {
    const response = await fetch(`${this.baseURL}/analytics/${gym}/predictions?hours=${hours}`);
    return response.json();
  }
};

// Usage
const occupancy = await OpenGymAPI.getCurrentOccupancy('cohonFC');
console.log(`Current occupancy: ${occupancy.occupancy}/${occupancy.maxOccupancy}`);
```

### Python

```python
import requests
from datetime import datetime, timedelta

class OpenGymAPI:
    def __init__(self, base_url='http://localhost:5000/api'):
        self.base_url = base_url
    
    def get_current_occupancy(self, gym):
        response = requests.get(f'{self.base_url}/occupancy/{gym}')
        return response.json()
    
    def get_historical_data(self, gym, start_date, end_date):
        params = {
            'startDate': start_date.isoformat(),
            'endDate': end_date.isoformat()
        }
        response = requests.get(f'{self.base_url}/{gym}', params=params)
        return response.json()
    
    def get_predictions(self, gym, hours=24):
        params = {'hours': hours}
        response = requests.get(f'{self.base_url}/analytics/{gym}/predictions', params=params)
        return response.json()

# Usage
api = OpenGymAPI()
occupancy = api.get_current_occupancy('cohonFC')
print(f"Current occupancy: {occupancy['occupancy']}/{occupancy['maxOccupancy']}")
```

## Error Codes

| Code | Description |
|------|-------------|
| `INVALID_GYM_ID` | The specified gym ID is not valid |
| `INVALID_TIMESTAMP` | The timestamp format is incorrect |
| `AUTHENTICATION_REQUIRED` | Authentication is required for this endpoint |
| `INSUFFICIENT_PERMISSIONS` | User lacks required permissions |
| `RATE_LIMIT_EXCEEDED` | Too many requests in time window |
| `VALIDATION_ERROR` | Request data validation failed |
| `DATABASE_ERROR` | Internal database error |
| `PREDICTION_UNAVAILABLE` | ML predictions are temporarily unavailable |

## Changelog

### v1.0.0 (Current)
- Initial API release
- Basic occupancy tracking
- Google OAuth authentication
- Historical data endpoints
- ML prediction endpoints
- WebSocket real-time updates

---

For more information, visit the [OpenGym GitHub repository](https://github.com/cmubtg/open-gym) or contact the development team.
