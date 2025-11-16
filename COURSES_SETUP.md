# 📚 Courses, PDFs, and Quiz Setup Guide

This guide explains how to set up courses, PDFs, and quizzes in PyCoder.

## 🚀 Quick Setup

### 1. Run Migrations

First, create the database tables:

```bash
cd backend
python manage.py makemigrations courses
python manage.py migrate
```

### 2. Load Initial Data

Load sample courses, PDFs, and quizzes:

```bash
python manage.py load_initial_data
```

This will create:
- 5 sample courses (Python Basics, OOPs, Flask, Django, DSA)
- 8 PDF files linked to courses
- 1 sample quiz with 5 questions for Python Basics

### 3. Access Django Admin

Create a superuser to manage courses:

```bash
python manage.py createsuperuser
```

Then visit `http://localhost:8000/admin/` to:
- Add/edit courses
- Upload PDFs
- Create quizzes and questions

## 📁 PDF Files Setup

### Option 1: Use Existing PDFs

Your PDFs are already in the `pdfs/` directory. The management command will link them automatically.

### Option 2: Serve PDFs via Django

1. **Update settings.py** to serve static files:

```python
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    BASE_DIR.parent / 'static',  # Point to your static folder
]
```

2. **Update urls.py** (for development):

```python
from django.conf import settings
from django.conf.urls.static import static

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
```

3. **Copy PDFs to static folder**:

```bash
# Create static/pdfs directory
mkdir -p static/pdfs
# Copy your PDFs
cp pdfs/*.pdf static/pdfs/
```

### Option 3: Serve PDFs via Frontend

If PDFs are in the frontend `public` folder, they'll be accessible at `/static/pdfs/filename.pdf`

## 🎯 Creating Courses via Admin

1. Go to `http://localhost:8000/admin/courses/course/add/`
2. Fill in:
   - **Title**: Course name
   - **Description**: Course description
   - **Slug**: URL-friendly name (auto-generated from title)
   - **Level**: Beginner/Intermediate/Advanced
   - **Duration**: e.g., "4 weeks"
   - **Icon**: Emoji (🐍, 📚, etc.)
   - **Image**: Image filename (optional)
3. Save

## 📄 Adding PDFs via Admin

1. Go to `http://localhost:8000/admin/courses/pdf/add/`
2. Fill in:
   - **Title**: PDF name
   - **Description**: Brief description
   - **Filename**: Exact filename (e.g., "Python Notes.pdf")
   - **File Path**: Path relative to static/pdfs/ (e.g., "Python Notes.pdf")
   - **Course**: Link to a course (optional)
3. Save

## 📝 Creating Quizzes via Admin

### Step 1: Create Quiz

1. Go to `http://localhost:8000/admin/courses/quiz/add/`
2. Fill in:
   - **Title**: Quiz name
   - **Description**: Quiz description
   - **Course**: Link to course (optional)
   - **Time Limit**: Minutes (e.g., 30)
   - **Passing Score**: Percentage (e.g., 70)
3. Save

### Step 2: Add Questions

1. Go to `http://localhost:8000/admin/courses/question/add/`
2. Fill in:
   - **Quiz**: Select the quiz
   - **Question Text**: Your question
   - **Order**: Question number (0, 1, 2, ...)
3. Save

### Step 3: Add Choices

1. Go to `http://localhost:8000/admin/courses/choice/add/`
2. Fill in:
   - **Question**: Select the question
   - **Choice Text**: Answer option
   - **Is Correct**: Check if this is the correct answer
   - **Order**: Option order (0, 1, 2, ...)
3. Save
4. Repeat for all choices

## 🔌 API Endpoints

### Courses
- `GET /api/courses/` - List all courses
- `GET /api/courses/{slug}/` - Get course details with PDFs and quizzes

### PDFs
- `GET /api/pdfs/` - List all PDFs
- `GET /api/pdfs/?course={id}` - Filter PDFs by course

### Quizzes
- `GET /api/quizzes/` - List all quizzes
- `GET /api/quizzes/{id}/` - Get quiz with questions (no correct answers)
- `POST /api/quizzes/{id}/submit/` - Submit quiz and get results
- `GET /api/quiz-attempts/` - Get user's quiz attempts (authenticated)

## 📋 Example API Usage

### Get All Courses
```bash
curl http://localhost:8000/api/courses/
```

### Get Course Details
```bash
curl http://localhost:8000/api/courses/python-basics/
```

### Get Quiz
```bash
curl http://localhost:8000/api/quizzes/1/
```

### Submit Quiz
```bash
curl -X POST http://localhost:8000/api/quizzes/1/submit/ \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "quiz_id": 1,
    "answers": {
      "1": 1,
      "2": 5,
      "3": 7
    }
  }'
```

## 🎨 Frontend Pages

- `/courses` - Browse all courses
- `/courses/{slug}` - Course details with PDFs and quizzes
- `/pdfs` - Browse all PDFs
- `/quiz/{id}` - Take a quiz

## 🔧 Troubleshooting

### PDFs Not Loading

1. Check PDF file paths in admin match actual files
2. Verify static files are being served
3. Check browser console for 404 errors
4. Ensure PDFs are in `static/pdfs/` or `public/static/pdfs/`

### Quiz Not Showing Questions

1. Verify quiz has questions in admin
2. Check each question has at least 2 choices
3. Ensure at least one choice is marked as correct

### Courses Not Appearing

1. Check `is_active=True` in admin
2. Verify migrations ran successfully
3. Check Django admin for course status

## 📝 Next Steps

- Add more courses via admin
- Upload more PDFs
- Create quizzes for each course
- Customize course content
- Add video links (future feature)
- Add progress tracking (future feature)

---

For more help, check the main README.md or Django admin documentation.

