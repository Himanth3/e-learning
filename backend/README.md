# PyCoder Backend

Django REST Framework backend for PyCoder e-learning platform.

## Quick Start

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create `.env` file:
```env
SECRET_KEY=your-secret-key-here
DEBUG=True
DB_NAME=pycoder_db
DB_USER=root
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=3306
```

3. Create MySQL database:
```sql
CREATE DATABASE pycoder_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

4. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

5. Start server:
```bash
python manage.py runserver
```

## API Endpoints

- `POST /api/register/` - User registration
- `POST /api/login/` - User login
- `GET /api/user/` - Get current user (authenticated)
- `POST /api/token/refresh/` - Refresh JWT token

## Database

The project uses MySQL. Make sure MySQL is running and the database is created before running migrations.

## Admin Panel

Access Django admin at `http://localhost:8000/admin/` after creating a superuser:
```bash
python manage.py createsuperuser
```

