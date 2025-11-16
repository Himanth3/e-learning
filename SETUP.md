# 🚀 PyCoder Setup Guide

Complete step-by-step setup instructions for PyCoder full-stack application.

## Prerequisites Installation

### 1. Install Python
- Download from [python.org](https://www.python.org/downloads/)
- Version 3.8 or higher required
- Check installation: `python --version`

### 2. Install Node.js
- Download from [nodejs.org](https://nodejs.org/)
- Version 16 or higher required
- Check installation: `node --version` and `npm --version`

### 3. Install MySQL
- Download from [mysql.com](https://dev.mysql.com/downloads/mysql/)
- Or use XAMPP/WAMP which includes MySQL
- Start MySQL service

## Backend Setup

### Step 1: Navigate to Backend
```bash
cd backend
```

### Step 2: Create Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Python Dependencies
```bash
pip install -r requirements.txt
```

**Note:** If `mysqlclient` installation fails on Windows:
- Install MySQL Connector/C from MySQL website
- Or use: `pip install mysqlclient --only-binary :all:`
- Alternative: Use `pymysql` (modify settings.py to use pymysql)

### Step 4: Create MySQL Database
Open MySQL command line or MySQL Workbench and run:
```sql
CREATE DATABASE pycoder_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Step 5: Configure Environment Variables
Create `.env` file in `backend/` directory:
```env
SECRET_KEY=django-insecure-change-this-in-production-12345
DEBUG=True
DB_NAME=pycoder_db
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_PORT=3306
```

Replace `your_mysql_password` with your actual MySQL root password.

### Step 6: Run Database Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### Step 7: Create Admin User (Optional)
```bash
python manage.py createsuperuser
```
Follow prompts to create admin account.

### Step 8: Start Django Server
```bash
python manage.py runserver
```

Backend is now running at `http://localhost:8000`

## Frontend Setup

### Step 1: Navigate to Frontend
Open a new terminal and:
```bash
cd frontend
```

### Step 2: Install Node Dependencies
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run dev
```

Frontend is now running at `http://localhost:5173`

## Verify Installation

1. **Backend API Test:**
   - Open browser: `http://localhost:8000/api/register/`
   - Should see API response (error is OK, means API is working)

2. **Frontend Test:**
   - Open browser: `http://localhost:5173`
   - Should see login page

3. **Test Registration:**
   - Go to Sign Up page
   - Fill in form and submit
   - Should redirect to dashboard

## Troubleshooting

### MySQL Connection Error
- Ensure MySQL service is running
- Check database credentials in `.env`
- Verify database exists: `SHOW DATABASES;`

### Port Already in Use
- Backend: Change port in `manage.py runserver 8001`
- Frontend: Change in `vite.config.js` or use `npm run dev -- --port 3000`

### CORS Errors
- Ensure backend CORS settings include frontend URL
- Check `CORS_ALLOWED_ORIGINS` in `settings.py`

### Module Not Found
- Ensure virtual environment is activated
- Reinstall dependencies: `pip install -r requirements.txt`

### JWT Token Issues
- Clear browser localStorage
- Check token expiration settings in `settings.py`

## Production Deployment

### Backend
1. Set `DEBUG=False` in `.env`
2. Generate new `SECRET_KEY`
3. Configure proper database credentials
4. Set up static files: `python manage.py collectstatic`
5. Use production WSGI server (Gunicorn, uWSGI)

### Frontend
1. Build: `npm run build`
2. Serve `dist/` folder with Nginx or similar
3. Configure API base URL for production

## Support

For issues or questions, check:
- Django docs: https://docs.djangoproject.com/
- React docs: https://react.dev/
- DRF docs: https://www.django-rest-framework.org/

