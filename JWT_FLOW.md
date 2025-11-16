# 🔑 JWT Authentication Flow Explained

This document explains how JWT (JSON Web Token) authentication works in PyCoder.

## Overview

JWT authentication uses two tokens:
- **Access Token**: Short-lived (60 minutes), used for API requests
- **Refresh Token**: Long-lived (7 days), used to get new access tokens

## Flow Diagram

```
┌─────────┐         ┌──────────┐         ┌─────────┐
│ Frontend│         │ Backend  │         │ Database│
└────┬────┘         └────┬─────┘         └────┬────┘
     │                   │                     │
     │  1. POST /api/register/                │
     │──────────────────>│                     │
     │  {email, password}│                     │
     │                   │  2. Create User     │
     │                   │───────────────────>│
     │                   │<───────────────────│
     │                   │                     │
     │  3. Generate JWT  │                     │
     │                   │                     │
     │  4. Return tokens │                     │
     │<──────────────────│                     │
     │ {access, refresh} │                     │
     │                   │                     │
     │  5. Store in      │                     │
     │  localStorage     │                     │
     │                   │                     │
     │  6. GET /api/user/│                     │
     │  Header: Bearer   │                     │
     │  {access_token}   │                     │
     │──────────────────>│                     │
     │                   │  7. Validate token │
     │                   │───────────────────>│
     │                   │<───────────────────│
     │                   │                     │
     │  8. Return user   │                     │
     │<──────────────────│                     │
     │  {user data}      │                     │
     │                   │                     │
     │  9. Token expired │                     │
     │  (401 error)       │                     │
     │<──────────────────│                     │
     │                   │                     │
     │ 10. POST /api/    │                     │
     │     token/refresh/ │                     │
     │  {refresh_token}  │                     │
     │──────────────────>│                     │
     │                   │ 11. Validate refresh│
     │                   │───────────────────>│
     │                   │<───────────────────│
     │                   │                     │
     │ 12. New access    │                     │
     │     token          │                     │
     │<──────────────────│                     │
     │ {new_access}      │                     │
     │                   │                     │
     │ 13. Retry original│                     │
     │     request        │                     │
     │──────────────────>│                     │
```

## Step-by-Step Process

### 1. User Registration/Login

**Frontend:**
```javascript
// User submits registration/login form
const response = await axiosClient.post('/api/register/', {
  email: 'user@example.com',
  password: 'password123'
})

// Response contains:
{
  user: { id, email, username, ... },
  tokens: {
    access: 'eyJ0eXAiOiJKV1QiLCJhbGc...',
    refresh: 'eyJ0eXAiOiJKV1QiLCJhbGc...'
  }
}
```

**Backend:**
- Validates user data
- Creates/authenticates user
- Generates JWT tokens using `RefreshToken.for_user(user)`
- Returns user data + tokens

**Frontend Storage:**
```javascript
localStorage.setItem('access_token', tokens.access)
localStorage.setItem('refresh_token', tokens.refresh)
```

### 2. Making Authenticated Requests

**Frontend Axios Interceptor:**
```javascript
// Automatically adds token to every request
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

**Request:**
```
GET /api/user/
Headers:
  Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

**Backend:**
- Extracts token from `Authorization` header
- Validates token signature and expiration
- Retrieves user from token payload
- Returns user data

### 3. Token Refresh (Automatic)

When access token expires (60 minutes):

**Frontend Axios Interceptor:**
```javascript
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired, refresh it
      const refreshToken = localStorage.getItem('refresh_token')
      const response = await axios.post('/api/token/refresh/', {
        refresh: refreshToken
      })
      
      // Store new access token
      localStorage.setItem('access_token', response.data.access)
      
      // Retry original request
      originalRequest.headers.Authorization = `Bearer ${response.data.access}`
      return axiosClient(originalRequest)
    }
  }
)
```

**Backend:**
- Validates refresh token
- Generates new access token
- Returns new access token

### 4. Logout

**Frontend:**
```javascript
const logout = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  // Redirect to login
}
```

## Token Structure

### Access Token Payload
```json
{
  "token_type": "access",
  "exp": 1234567890,  // Expiration timestamp
  "user_id": 1,
  "jti": "token-id"
}
```

### Refresh Token Payload
```json
{
  "token_type": "refresh",
  "exp": 1234567890,  // Expiration timestamp (7 days)
  "user_id": 1,
  "jti": "token-id"
}
```

## Security Features

1. **Token Expiration**: Access tokens expire after 60 minutes
2. **Refresh Rotation**: New refresh token issued on each refresh
3. **Token Blacklisting**: Old refresh tokens are blacklisted
4. **HTTPS Recommended**: Tokens should be transmitted over HTTPS in production
5. **Secure Storage**: Tokens stored in localStorage (consider httpOnly cookies for production)

## API Endpoints

### Registration
```
POST /api/register/
Body: { email, username, password, password2, first_name, last_name }
Response: { user, tokens: { access, refresh } }
```

### Login
```
POST /api/login/
Body: { email, password }
Response: { user, tokens: { access, refresh } }
```

### Get Current User
```
GET /api/user/
Headers: { Authorization: Bearer <access_token> }
Response: { id, email, username, first_name, last_name, date_joined }
```

### Refresh Token
```
POST /api/token/refresh/
Body: { refresh: <refresh_token> }
Response: { access: <new_access_token> }
```

## Error Handling

### 401 Unauthorized
- Access token expired or invalid
- Frontend automatically attempts refresh
- If refresh fails, user is logged out

### 400 Bad Request
- Invalid credentials
- Validation errors
- Display error message to user

## Best Practices

1. **Never expose tokens in URLs**
2. **Use HTTPS in production**
3. **Implement token rotation**
4. **Handle token expiration gracefully**
5. **Clear tokens on logout**
6. **Validate tokens on backend**
7. **Set appropriate token lifetimes**

## Testing JWT Flow

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:8000/api/register/ \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","username":"testuser","password":"testpass123","password2":"testpass123"}'
```

**Login:**
```bash
curl -X POST http://localhost:8000/api/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123"}'
```

**Get User (with token):**
```bash
curl -X GET http://localhost:8000/api/user/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Refresh Token:**
```bash
curl -X POST http://localhost:8000/api/token/refresh/ \
  -H "Content-Type: application/json" \
  -d '{"refresh":"YOUR_REFRESH_TOKEN"}'
```

---

This JWT implementation provides secure, stateless authentication for the PyCoder platform.

