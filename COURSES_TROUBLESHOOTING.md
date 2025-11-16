# 🔧 Courses Page Troubleshooting

If the courses page is not working, follow these steps:

## ✅ Quick Checks

### 1. Backend Running?
```bash
# Check if Django server is running
# Should see: "Starting development server at http://127.0.0.1:8000/"
```

### 2. Test API Directly
Open in browser: `http://localhost:8000/api/courses/`

**Expected Response:**
```json
{
  "count": 5,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "Python Basics",
      "description": "...",
      "slug": "python-basics",
      ...
    }
  ]
}
```

**If you see:**
- `404 Not Found` → Routes not configured correctly
- `500 Internal Server Error` → Check Django terminal
- Empty array `[]` → No courses in database

### 3. Load Initial Data
```bash
cd backend
python manage.py load_initial_data
```

### 4. Check Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for errors
4. Check Network tab for API calls

## 🐛 Common Issues

### Issue: Blank Page / No Courses

**Solution:**
```bash
# 1. Make sure migrations are applied
cd backend
python manage.py migrate

# 2. Load initial data
python manage.py load_initial_data

# 3. Restart Django server
python manage.py runserver
```

### Issue: "Cannot connect to backend"

**Check:**
- Backend is running on port 8000
- No firewall blocking
- Check `frontend/src/utils/axiosClient.js` baseURL is correct

**Solution:**
```bash
# Restart backend
cd backend
python manage.py runserver
```

### Issue: "404 Not Found"

**Check:**
- `backend/pycoder_backend/urls.py` includes courses URLs
- `backend/courses/urls.py` is correct

**Solution:**
```python
# In backend/pycoder_backend/urls.py
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('accounts.urls')),
    path('api/', include('courses.urls')),  # Make sure this is here
]
```

### Issue: CORS Error

**Check:**
- `backend/pycoder_backend/settings.py` has CORS configured

**Solution:**
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000",
]
```

### Issue: Empty Results Array

**Solution:**
```bash
# Load initial data
python manage.py load_initial_data

# Or create courses via admin
python manage.py createsuperuser
# Then go to http://localhost:8000/admin/
```

## 🔍 Debug Steps

### Step 1: Check API Response
```bash
# Test in browser or curl
curl http://localhost:8000/api/courses/
```

### Step 2: Check Browser Console
- Open DevTools (F12)
- Console tab → Look for errors
- Network tab → Check API request/response

### Step 3: Check Django Terminal
- Look for error messages
- Check for 404, 500, or other errors

### Step 4: Verify Database
```bash
# Check if courses exist
python manage.py shell
>>> from courses.models import Course
>>> Course.objects.count()
# Should be > 0
```

## ✅ Expected Behavior

### Working Courses Page Should:
1. Show loading spinner initially
2. Display course cards with images
3. Show course title, description, level
4. Show PDF and quiz counts
5. Be clickable to view course details

### If You See:
- **Loading spinner forever** → API not responding
- **Error message** → Check error details
- **Empty page** → No courses in database
- **Blank dark page** → JavaScript error (check console)

## 🚀 Quick Fix

Run these commands in order:

```bash
# Terminal 1 - Backend
cd backend
venv\Scripts\activate
python manage.py migrate
python manage.py load_initial_data
python manage.py runserver

# Terminal 2 - Frontend (new terminal)
cd frontend
npm run dev
```

Then:
1. Open `http://localhost:5173`
2. Login/Signup
3. Navigate to `/courses`
4. Should see courses!

## 📞 Still Not Working?

1. Check browser console (F12) for exact error
2. Check Django terminal for backend errors
3. Verify API works: `http://localhost:8000/api/courses/`
4. Make sure both servers are running
5. Clear browser cache and reload

---

**Most common fix:** Run `python manage.py load_initial_data` in backend! 🎯

