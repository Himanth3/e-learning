# 🔧 Troubleshooting Guide

Common issues and solutions for PyCoder.

## Signup/Registration Issues

### 400 Bad Request Error

**Problem:** Getting 400 error when trying to sign up.

**Solutions:**

1. **Check Password Requirements:**
   - Password must be at least 8 characters
   - Password should not be too common (like "password123")
   - Password should not be entirely numeric
   - Password should not be too similar to username/email

2. **Check Email/Username:**
   - Email must be unique (not already registered)
   - Username must be unique
   - Email must be in valid format (e.g., user@example.com)

3. **Check All Required Fields:**
   - Email: Required
   - Username: Required
   - Password: Required (min 8 characters)
   - Confirm Password: Required (must match password)

4. **View Detailed Errors:**
   - Check browser console (F12) for detailed error messages
   - Check Django terminal for backend error logs
   - Error messages should now display in the signup form

### Common Password Validation Errors

- **"This password is too short"** → Use at least 8 characters
- **"This password is too common"** → Use a more unique password
- **"This password is entirely numeric"** → Include letters
- **"The password is too similar to the username"** → Make password different from username

### Email Already Exists

**Error:** "User with this Email already exists"

**Solution:** Use a different email or login with existing account.

### Username Already Exists

**Error:** "A user with that username already exists"

**Solution:** Choose a different username.

## Login Issues

### Invalid Credentials

**Problem:** "Invalid email or password" error

**Solutions:**
1. Check email is correct
2. Check password is correct
3. Make sure you registered first
4. Check if account is active

### 400 Bad Request on Login

**Problem:** Getting 400 error on login

**Solutions:**
1. Make sure both email and password fields are filled
2. Check email format is correct
3. Check browser console for detailed errors

## Database Issues

### MySQL Connection Error

**Error:** `django.db.utils.OperationalError: (2003, "Can't connect to MySQL server")`

**Solutions:**
1. Make sure MySQL service is running
2. Check `.env` file has correct database credentials
3. Verify database exists: `CREATE DATABASE pycoder_db;`
4. Check MySQL port (default: 3306)

### Migration Errors

**Error:** `django.db.utils.ProgrammingError` or migration issues

**Solutions:**
```bash
# Delete migrations (except __init__.py)
# Then recreate:
python manage.py makemigrations
python manage.py migrate
```

## Frontend Issues

### Cannot Connect to Backend

**Problem:** Frontend can't reach backend API

**Solutions:**
1. Make sure backend is running on `http://localhost:8000`
2. Check `axiosClient.js` baseURL is correct
3. Check CORS settings in `settings.py`
4. Check browser console for CORS errors

### Port Already in Use

**Backend:**
```bash
python manage.py runserver 8001
```
Then update `frontend/src/utils/axiosClient.js` to use port 8001.

**Frontend:**
```bash
npm run dev -- --port 3000
```

## Token Issues

### Token Expired

**Problem:** Getting 401 Unauthorized errors

**Solution:** Token refresh should happen automatically. If it doesn't:
1. Clear localStorage: `localStorage.clear()`
2. Login again
3. Check token refresh endpoint is working

### Token Not Being Sent

**Problem:** Requests fail with authentication errors

**Solutions:**
1. Check `axiosClient.js` interceptor is working
2. Check token is in localStorage: `localStorage.getItem('access_token')`
3. Check Authorization header is being sent

## General Debugging

### Check Backend Logs

Look at Django terminal for detailed error messages:
```
Bad Request: /api/register/
[16/Nov/2025 20:50:08] "POST /api/register/ HTTP/1.1" 400 41
```

### Check Frontend Console

Open browser DevTools (F12) → Console tab to see:
- Network requests
- Error messages
- API responses

### Test API Directly

Use curl or Postman to test endpoints:

```bash
# Test registration
curl -X POST http://localhost:8000/api/register/ \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","username":"testuser","password":"testpass123","password2":"testpass123"}'
```

### Enable Debug Mode

In `backend/pycoder_backend/settings.py`:
```python
DEBUG = True  # Shows detailed error pages
```

## Still Having Issues?

1. **Check all prerequisites are installed:**
   - Python 3.8+
   - Node.js 16+
   - MySQL running

2. **Verify environment setup:**
   - Virtual environment activated
   - `.env` file exists with correct values
   - Dependencies installed (`pip install -r requirements.txt`)

3. **Check file structure:**
   - All files are in correct locations
   - No missing files

4. **Restart servers:**
   - Stop both servers (CTRL+C)
   - Start backend first
   - Then start frontend

5. **Clear browser cache:**
   - Hard refresh: CTRL+SHIFT+R
   - Clear localStorage
   - Try incognito mode

---

For more help, check the main README.md or SETUP.md files.

