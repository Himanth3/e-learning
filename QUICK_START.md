# ⚡ Quick Start Guide

Get PyCoder up and running in 5 minutes!

## Prerequisites Check

```bash
python --version  # Should be 3.8+
node --version    # Should be 16+
npm --version     # Should be 6+
```

## Backend (Terminal 1)

```bash
# 1. Navigate to backend
cd backend

# 2. Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# 3. Install dependencies
pip install -r requirements.txt

# 4. Create .env file
# Copy the content below to backend/.env
# SECRET_KEY=django-insecure-dev-key-12345
# DEBUG=True
# DB_NAME=pycoder_db
# DB_USER=root
# DB_PASSWORD=your_password
# DB_HOST=localhost
# DB_PORT=3306

# 5. Create database (MySQL)
# Run in MySQL: CREATE DATABASE pycoder_db;

# 6. Run migrations
python manage.py makemigrations courses
python manage.py migrate

# 7. Load initial data (courses, PDFs, quiz)
python manage.py load_initial_data

# 8. Start server
python manage.py runserver
```

✅ Backend running at `http://localhost:8000`

## Frontend (Terminal 2)

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

✅ Frontend running at `http://localhost:5173`

## Test It!

1. Open `http://localhost:5173`
2. Click "Sign Up"
3. Create an account
4. You'll be redirected to Dashboard! 🎉
5. Browse courses, download PDFs, and take quizzes!

## Troubleshooting

**MySQL connection error?**
- Use SQLite instead: Uncomment SQLite config in `backend/pycoder_backend/settings.py`

**Port already in use?**
- Backend: `python manage.py runserver 8001`
- Frontend: `npm run dev -- --port 3000`

**Module not found?**
- Activate virtual environment
- Reinstall: `pip install -r requirements.txt`

---

For detailed setup, see [SETUP.md](./SETUP.md)

