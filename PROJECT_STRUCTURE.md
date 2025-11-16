# 📁 PyCoder Project Structure

Complete folder structure of the PyCoder full-stack application.

```
pycoder/
├── backend/                          # Django Backend
│   ├── pycoder_backend/              # Main Django project
│   │   ├── __init__.py
│   │   ├── settings.py              # Django settings (DB, REST, JWT, CORS)
│   │   ├── urls.py                  # Main URL configuration
│   │   ├── wsgi.py                  # WSGI config
│   │   └── asgi.py                  # ASGI config
│   ├── accounts/                     # Accounts app
│   │   ├── __init__.py
│   │   ├── models.py                # Custom User model
│   │   ├── serializers.py           # DRF serializers (Register, Login, User)
│   │   ├── views.py                 # API views (register, login, user)
│   │   ├── urls.py                  # Account URLs
│   │   ├── admin.py                 # Django admin config
│   │   └── migrations/              # Database migrations
│   │       └── __init__.py
│   ├── manage.py                    # Django management script
│   ├── requirements.txt             # Python dependencies
│   ├── requirements-alternative.txt # Alternative (pymysql)
│   ├── .env.example                 # Environment variables template
│   ├── .gitignore                   # Git ignore rules
│   └── README.md                    # Backend README
│
├── frontend/                         # React Frontend
│   ├── src/
│   │   ├── components/              # React components
│   │   │   ├── Navbar.jsx           # Navigation bar with theme toggle
│   │   │   └── ProtectedRoute.jsx   # Route protection component
│   │   ├── contexts/                # React contexts
│   │   │   ├── AuthContext.jsx      # Authentication context
│   │   │   └── ThemeContext.jsx     # Dark/Light theme context
│   │   ├── pages/                   # Page components
│   │   │   ├── Login.jsx            # Login page
│   │   │   ├── Signup.jsx           # Registration page
│   │   │   └── Dashboard.jsx       # Dashboard page
│   │   ├── utils/                   # Utility functions
│   │   │   └── axiosClient.js       # Axios instance with JWT interceptor
│   │   ├── App.jsx                  # Main App component
│   │   ├── main.jsx                 # React entry point
│   │   └── index.css                # Global styles + Tailwind
│   ├── index.html                   # HTML template
│   ├── package.json                 # Node dependencies
│   ├── vite.config.js               # Vite configuration
│   ├── tailwind.config.js           # TailwindCSS configuration
│   ├── postcss.config.js            # PostCSS configuration
│   ├── .gitignore                   # Git ignore rules
│   └── README.md                    # Frontend README
│
├── README.md                         # Main project README
├── SETUP.md                          # Detailed setup instructions
├── QUICK_START.md                    # Quick start guide
├── JWT_FLOW.md                       # JWT authentication flow explanation
├── PROJECT_STRUCTURE.md              # This file
└── .gitignore                        # Root git ignore
```

## Key Files Explained

### Backend

**`backend/pycoder_backend/settings.py`**
- Django settings
- MySQL database configuration
- Django REST Framework setup
- Simple JWT configuration
- CORS headers configuration

**`backend/accounts/models.py`**
- Custom User model extending AbstractUser
- Email as username field

**`backend/accounts/serializers.py`**
- `RegisterSerializer`: User registration with password validation
- `LoginSerializer`: User authentication
- `UserSerializer`: User data serialization

**`backend/accounts/views.py`**
- `register_view`: POST `/api/register/`
- `login_view`: POST `/api/login/`
- `user_view`: GET `/api/user/` (authenticated)

**`backend/accounts/urls.py`**
- API endpoint routing

### Frontend

**`frontend/src/App.jsx`**
- Main app component
- Router setup
- Context providers

**`frontend/src/contexts/AuthContext.jsx`**
- Authentication state management
- Login, signup, logout functions
- User data management

**`frontend/src/contexts/ThemeContext.jsx`**
- Dark/Light theme management
- localStorage persistence

**`frontend/src/utils/axiosClient.js`**
- Axios instance with base URL
- Request interceptor: Adds JWT token
- Response interceptor: Handles token refresh

**`frontend/src/components/ProtectedRoute.jsx`**
- Route protection wrapper
- Redirects to login if not authenticated

**`frontend/src/pages/Login.jsx`**
- Login form
- Error handling
- Redirect to dashboard on success

**`frontend/src/pages/Signup.jsx`**
- Registration form
- Password confirmation
- Error handling

**`frontend/src/pages/Dashboard.jsx`**
- Protected dashboard page
- Course cards display
- User welcome message

## API Endpoints

```
POST   /api/register/          - User registration
POST   /api/login/             - User login
GET    /api/user/              - Get current user (authenticated)
POST   /api/token/refresh/     - Refresh access token
```

## Environment Variables

**Backend `.env`:**
```
SECRET_KEY=your-secret-key
DEBUG=True
DB_NAME=pycoder_db
DB_USER=root
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=3306
```

## Dependencies

### Backend
- Django 4.2.7
- djangorestframework 3.14.0
- djangorestframework-simplejwt 5.3.0
- django-cors-headers 4.3.1
- mysqlclient 2.2.0
- python-dotenv 1.0.0

### Frontend
- react 18.2.0
- react-dom 18.2.0
- react-router-dom 6.20.0
- axios 1.6.2
- vite 5.0.8
- tailwindcss 3.3.6

## Features Implemented

✅ User registration with email/username
✅ Secure login with JWT tokens
✅ Protected routes
✅ Automatic token refresh
✅ Dark/Light theme toggle
✅ Responsive design
✅ Modern UI (Udemy + GitHub Dark inspired)
✅ Theme persistence
✅ Password validation
✅ CORS configuration
✅ MySQL database integration

---

This structure provides a solid foundation for a full-stack e-learning platform!

