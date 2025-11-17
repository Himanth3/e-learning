from pathlib import Path
from datetime import timedelta
import os
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-change-this')

DEBUG = True   # Change to False later

ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
    "e-learning-1-0jh5.onrender.com",   # Render backend
    os.environ.get("RENDER_EXTERNAL_HOSTNAME"),
]


# -------------------------------
# INSTALLED APPS
# -------------------------------
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # third-party
    "rest_framework",
    "rest_framework_simplejwt",
    "corsheaders",

    # local apps
    "accounts",
    "courses",
]


# -------------------------------
# MIDDLEWARE
# -------------------------------
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",

    "corsheaders.middleware.CorsMiddleware",  # IMPORTANT
    "django.middleware.common.CommonMiddleware",

    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "pycoder_backend.urls"


# -------------------------------
# DATABASE
# -------------------------------
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": os.getenv("DB_NAME"),
        "USER": os.getenv("DB_USER"),
        "PASSWORD": os.getenv("DB_PASSWORD"),
        "HOST": os.getenv("DB_HOST"),
        "PORT": os.getenv("DB_PORT", "3306"),
    }
}


# -------------------------------
# AUTH SETTINGS
# -------------------------------
AUTH_USER_MODEL = "accounts.User"

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny",
    ],
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
}


# -------------------------------
# CORS SETTINGS (FIXED)
# -------------------------------
CORS_ALLOWED_ORIGINS = [
    "https://e-learning-gamma-hazel.vercel.app",   # Your frontend 🔥
    "http://localhost:5173",
]

CSRF_TRUSTED_ORIGINS = [
    "https://e-learning-gamma-hazel.vercel.app",
]

CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOW_CREDENTIALS = True


# -------------------------------
# STATIC FILES
# -------------------------------
STATIC_URL = "static/"
