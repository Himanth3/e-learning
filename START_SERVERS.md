# 🚀 How to Start Both Servers

Step-by-step guide to start the backend and frontend servers.

## Method 1: Two Separate Terminals (Recommended)

### Terminal 1 - Backend (Django)

1. **Open a terminal/command prompt**

2. **Navigate to backend directory:**
```bash
cd backend
```

3. **Activate virtual environment:**
```bash
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

4. **Start Django server:**
```bash
python manage.py runserver
```

✅ Backend will start at: `http://localhost:8000`

You should see:
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

---

### Terminal 2 - Frontend (React)

1. **Open a NEW terminal/command prompt**

2. **Navigate to frontend directory:**
```bash
cd frontend
```

3. **Start Vite dev server:**
```bash
npm run dev
```

✅ Frontend will start at: `http://localhost:5173`

You should see:
```
  VITE v5.0.8  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## Method 2: Using a Single Terminal (Background Process)

### Windows PowerShell

**Terminal 1:**
```powershell
cd backend
venv\Scripts\activate
Start-Process python -ArgumentList "manage.py runserver" -NoNewWindow
cd ..\frontend
npm run dev
```

### Linux/Mac

**Terminal 1:**
```bash
cd backend
source venv/bin/activate
python manage.py runserver &
cd ../frontend
npm run dev
```

---

## Method 3: Using npm scripts (Frontend only)

You can add a script to run both, but it's easier to use two terminals.

---

## Verification Checklist

### ✅ Backend Running
- [ ] Terminal shows: `Starting development server at http://127.0.0.1:8000/`
- [ ] Visit `http://localhost:8000/api/register/` - should see API response
- [ ] No error messages in terminal

### ✅ Frontend Running
- [ ] Terminal shows: `Local: http://localhost:5173/`
- [ ] Visit `http://localhost:5173` - should see login page
- [ ] No error messages in terminal

### ✅ Both Working Together
- [ ] Frontend can register users (check backend terminal for requests)
- [ ] Frontend can login users
- [ ] Dashboard loads after login

---

## Troubleshooting

### Backend Issues

**Port 8000 already in use:**
```bash
python manage.py runserver 8001
```
Then update frontend `axiosClient.js` to use port 8001.

**Module not found:**
```bash
# Make sure virtual environment is activated
pip install -r requirements.txt
```

**Database connection error:**
- Check `.env` file exists in `backend/` directory
- Verify MySQL is running
- Check database credentials

### Frontend Issues

**Port 5173 already in use:**
```bash
npm run dev -- --port 3000
```

**Module not found:**
```bash
npm install
```

**Cannot connect to backend:**
- Verify backend is running on port 8000
- Check `axiosClient.js` baseURL is `http://localhost:8000`
- Check CORS settings in `backend/pycoder_backend/settings.py`

---

## Quick Commands Reference

### Backend
```bash
cd backend
venv\Scripts\activate          # Windows
source venv/bin/activate       # Linux/Mac
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm run dev
```

### Stop Servers
- Press `CTRL + C` in each terminal to stop the servers

---

## Expected Output

### Backend Terminal:
```
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
Django version 4.2.7, using settings 'pycoder_backend.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

### Frontend Terminal:
```
  VITE v5.0.8  ready in 523 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

---

## Next Steps After Starting

1. **Open browser:** `http://localhost:5173`
2. **Click "Sign Up"** to create an account
3. **Fill in the form** and submit
4. **You'll be redirected to Dashboard** 🎉

Both servers must be running simultaneously for the app to work!

