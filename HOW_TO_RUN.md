# 🚀 How to Run PyCoder with Courses, PDFs & Quiz

Complete step-by-step guide to run the full-stack PyCoder application.

## 📋 Prerequisites Check

Make sure you have:
- ✅ Python 3.8+ installed
- ✅ Node.js 16+ installed
- ✅ MySQL running
- ✅ Virtual environment activated (for backend)

## 🔧 Step 1: Backend Setup

### 1.1 Navigate to Backend
```bash
cd backend
```

### 1.2 Activate Virtual Environment
```bash
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### 1.3 Install Dependencies (if not done)
```bash
pip install -r requirements.txt
```

### 1.4 Create/Update Database
```bash
# Create migrations for courses app
python manage.py makemigrations courses

# Apply all migrations
python manage.py migrate
```

### 1.5 Load Initial Data
```bash
# This creates sample courses, PDFs, and quiz
python manage.py load_initial_data
```

You should see:
```
Loading initial data...
Created course: Python Basics
Created course: OOPs with Python
...
Initial data loaded successfully!
```

### 1.6 Create Superuser (Optional)
```bash
python manage.py createsuperuser
```
Follow prompts to create admin account.

### 1.7 Start Django Server
```bash
python manage.py runserver
```

✅ **Backend running at:** `http://localhost:8000`

Keep this terminal open!

---

## 🎨 Step 2: Frontend Setup

### 2.1 Open NEW Terminal

Open a **new terminal window** (keep backend running).

### 2.2 Navigate to Frontend
```bash
cd frontend
```

### 2.3 Install Dependencies (if not done)
```bash
npm install
```

### 2.4 Start Frontend Server
```bash
npm run dev
```

✅ **Frontend running at:** `http://localhost:5173`

---

## ✅ Step 3: Verify Everything Works

### 3.1 Test Backend API
Open browser: `http://localhost:8000/api/courses/`

You should see JSON with courses data.

### 3.2 Test Frontend
Open browser: `http://localhost:5173`

You should see:
- Login page (if not logged in)
- Dashboard with courses (if logged in)

### 3.3 Test Features
1. **Login/Signup**: Create account or login
2. **Dashboard**: Should show courses
3. **Courses Page**: Click "View All" or navigate to `/courses`
4. **Course Details**: Click any course to see PDFs and quizzes
5. **PDFs Page**: Navigate to `/pdfs` to see all PDFs
6. **Quiz**: Click a quiz to take it

---

## 🎯 Quick Start Commands

### Backend (Terminal 1)
```bash
cd backend
venv\Scripts\activate          # Windows
# source venv/bin/activate     # Linux/Mac
python manage.py migrate
python manage.py load_initial_data
python manage.py runserver
```

### Frontend (Terminal 2)
```bash
cd frontend
npm install                    # First time only
npm run dev
```

---

## 🔍 Troubleshooting

### ❌ "No module named 'courses'"
**Solution:**
```bash
cd backend
python manage.py makemigrations courses
python manage.py migrate
```

### ❌ "ModuleNotFoundError: No module named 'pymysql'"
**Solution:**
```bash
pip install pymysql
```

### ❌ "Table 'courses_course' doesn't exist"
**Solution:**
```bash
python manage.py migrate
```

### ❌ "No courses showing"
**Solution:**
```bash
python manage.py load_initial_data
```

### ❌ "PDFs not loading"
**Check:**
1. PDFs exist in `pdfs/` folder
2. File paths in admin match actual filenames
3. Check browser console for 404 errors

### ❌ "Port already in use"
**Backend:**
```bash
python manage.py runserver 8001
```

**Frontend:**
```bash
npm run dev -- --port 3000
```

### ❌ "Cannot connect to backend"
**Check:**
1. Backend is running on port 8000
2. Check `frontend/src/utils/axiosClient.js` baseURL
3. Check CORS settings in `backend/pycoder_backend/settings.py`

---

## 📱 Access Points

### Frontend Pages
- **Login**: `http://localhost:5173/login`
- **Signup**: `http://localhost:5173/signup`
- **Dashboard**: `http://localhost:5173/dashboard`
- **Courses**: `http://localhost:5173/courses`
- **PDFs**: `http://localhost:5173/pdfs`
- **Quiz**: `http://localhost:5173/quiz/{id}`

### Backend API
- **API Root**: `http://localhost:8000/api/`
- **Courses**: `http://localhost:8000/api/courses/`
- **PDFs**: `http://localhost:8000/api/pdfs/`
- **Quizzes**: `http://localhost:8000/api/quizzes/`
- **Admin**: `http://localhost:8000/admin/`

---

## 🎓 First Time User Flow

1. **Sign Up**: Create account at `/signup`
2. **Dashboard**: See available courses
3. **Browse Courses**: Click "View All" or go to `/courses`
4. **View Course**: Click any course to see details
5. **Download PDFs**: Click "Download PDF" on course page
6. **Take Quiz**: Click "Take Quiz" button
7. **View Results**: See score and review answers

---

## 🔄 Daily Development Workflow

### Starting Development
1. **Terminal 1**: Start backend
   ```bash
   cd backend
   venv\Scripts\activate
   python manage.py runserver
   ```

2. **Terminal 2**: Start frontend
   ```bash
   cd frontend
   npm run dev
   ```

### Stopping Servers
- Press `CTRL + C` in each terminal

### Making Changes
- **Backend**: Restart Django server after model changes
- **Frontend**: Auto-reloads on file changes (Vite)

---

## 📊 Database Management

### View Data in Admin
1. Go to `http://localhost:8000/admin/`
2. Login with superuser credentials
3. Browse:
   - Courses → View/Edit courses
   - PDFs → View/Edit PDFs
   - Quizzes → View/Edit quizzes
   - Questions → View/Edit questions
   - Quiz Attempts → View user quiz results

### Reset Database (if needed)
```bash
# Delete database and recreate
python manage.py flush
python manage.py migrate
python manage.py load_initial_data
python manage.py createsuperuser
```

---

## 🎉 Success Indicators

You'll know everything is working when:

✅ Backend terminal shows: `Starting development server at http://127.0.0.1:8000/`  
✅ Frontend terminal shows: `Local: http://localhost:5173/`  
✅ Browser shows login/dashboard page  
✅ Courses appear on dashboard  
✅ Can navigate to courses, PDFs, and quiz pages  
✅ Can take quiz and see results  

---

## 🆘 Need Help?

1. Check `TROUBLESHOOTING.md` for common issues
2. Check `COURSES_SETUP.md` for courses-specific setup
3. Check browser console (F12) for frontend errors
4. Check Django terminal for backend errors

---

**Happy Coding! 🐍✨**

