# 🐍 PyCoder - Full-Stack E-Learning Platform

A modern full-stack e-learning platform for Python programming built with Django REST Framework and React.

## 🎯 Tech Stack

### Backend
- **Django 4.2** - Web framework
- **Django REST Framework** - API development
- **Simple JWT** - JWT authentication
- **MySQL** - Database
- **CORS Headers** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Axios** - HTTP client
- **React Router** - Routing

## 📁 Project Structure

```
pycoder/
├── backend/
│   ├── pycoder_backend/
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── accounts/
│   │   ├── __init__.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── admin.py
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── contexts/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── utils/
│   │   │   └── axiosClient.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 16+
- MySQL 5.7+ or 8.0+
- pip (Python package manager)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Create virtual environment:**
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Create MySQL database:**
```sql
CREATE DATABASE pycoder_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

5. **Create `.env` file in backend directory:**
```env
SECRET_KEY=your-secret-key-here-change-in-production
DEBUG=True
DB_NAME=pycoder_db
DB_USER=root
DB_PASSWORD=your-mysql-password
DB_HOST=localhost
DB_PORT=3306
```

6. **Run migrations:**
```bash
python manage.py makemigrations
python manage.py migrate
```

7. **Create superuser (optional):**
```bash
python manage.py createsuperuser
```

8. **Start Django server:**
```bash
python manage.py runserver
```

Backend will run on `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🔐 API Endpoints

### Authentication

- **POST** `/api/register/` - Register new user
  ```json
  {
    "email": "user@example.com",
    "username": "johndoe",
    "password": "securepassword123",
    "password2": "securepassword123",
    "first_name": "John",
    "last_name": "Doe"
  }
  ```

- **POST** `/api/login/` - Login user
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword123"
  }
  ```

- **GET** `/api/user/` - Get logged-in user (requires authentication)

- **POST** `/api/token/refresh/` - Refresh access token
  ```json
  {
    "refresh": "refresh_token_here"
  }
  ```

## 🔑 JWT Authentication Flow

1. **Registration/Login:**
   - User registers or logs in via `/api/register/` or `/api/login/`
   - Backend validates credentials
   - Backend returns JWT tokens (access + refresh) and user data
   - Frontend stores tokens in localStorage

2. **Authenticated Requests:**
   - Frontend includes `Authorization: Bearer <access_token>` header
   - Backend validates token and returns protected data

3. **Token Refresh:**
   - When access token expires (60 minutes), frontend automatically refreshes using refresh token
   - Refresh token is valid for 7 days
   - If refresh fails, user is logged out

4. **Logout:**
   - Frontend removes tokens from localStorage
   - User is redirected to login page

## 🎨 Features

### Authentication
- ✅ User registration with email/username
- ✅ Secure login with JWT tokens
- ✅ Protected routes
- ✅ Automatic token refresh
- ✅ Password validation

### UI/UX
- ✅ Modern dark/light theme toggle
- ✅ Responsive design
- ✅ Smooth transitions
- ✅ Elegant UI (Udemy + GitHub Dark inspired)
- ✅ Theme persistence in localStorage

### Dashboard
- ✅ Welcome message with user name
- ✅ Course cards grid
- ✅ Course categories and levels
- ✅ Learning statistics

## 🛠️ Development

### Backend Commands

```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run server
python manage.py runserver

# Run tests
python manage.py test
```

### Frontend Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Environment Variables

### Backend (.env)
- `SECRET_KEY` - Django secret key
- `DEBUG` - Debug mode (True/False)
- `DB_NAME` - MySQL database name
- `DB_USER` - MySQL username
- `DB_PASSWORD` - MySQL password
- `DB_HOST` - MySQL host
- `DB_PORT` - MySQL port

## 🔒 Security Features

- Password hashing with Django's default PBKDF2
- JWT token-based authentication
- CORS configuration for frontend
- Protected API endpoints
- Token refresh mechanism
- Secure password validation

## 🎯 Next Steps

- [ ] Add course enrollment functionality
- [ ] Implement video player
- [ ] Add progress tracking
- [ ] Create admin dashboard
- [ ] Add payment integration
- [ ] Implement search functionality
- [ ] Add user profiles
- [ ] Create certificate generation

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ for Python learners

---

**Happy Coding! 🐍✨**

