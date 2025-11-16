# 📁 Assets Setup Guide

This guide explains how assets (images and PDFs) are organized in PyCoder.

## 📂 Folder Structure

```
frontend/
├── public/
│   ├── images/          # Course images
│   │   ├── Django.png
│   │   ├── DSA.png
│   │   ├── flask.png
│   │   ├── python-basic.png
│   │   └── python-oops.png
│   └── pdfs/            # PDF study materials
│       ├── 🐍 Python Cheat Codes.pdf
│       ├── 🐍 Python Notes.pdf
│       ├── DSA_with_Python_CheatSheet.pdf
│       └── ...
```

## 🖼️ Images

### Location
- **Source**: `static/images/` (root directory)
- **Destination**: `frontend/public/images/` (served by Vite)

### Usage in Code
```jsx
<img src={`/images/${course.image}`} alt={course.title} />
```

### Adding New Images
1. Add image file to `static/images/`
2. Copy to `frontend/public/images/`
3. Update course in Django admin with image filename

## 📄 PDFs

### Location
- **Source**: `pdfs/` (root directory)
- **Destination**: `frontend/public/pdfs/` (served by Vite)

### Usage in Code
```jsx
<a href={`/pdfs/${pdf.filename}`} download>Download PDF</a>
```

### Adding New PDFs
1. Add PDF file to `pdfs/` folder
2. Copy to `frontend/public/pdfs/`
3. Add PDF record in Django admin

## 🔄 Copying Assets

### Manual Copy (Windows PowerShell)
```powershell
# Copy images
Copy-Item -Path "static/images/*" -Destination "frontend/public/images/" -Force

# Copy PDFs
Copy-Item -Path "pdfs/*" -Destination "frontend/public/pdfs/" -Force
```

### Manual Copy (Linux/Mac)
```bash
# Copy images
cp static/images/* frontend/public/images/

# Copy PDFs
cp pdfs/* frontend/public/pdfs/
```

## ✅ Verification

After copying, verify files exist:
- `frontend/public/images/` should have all course images
- `frontend/public/pdfs/` should have all PDF files

## 🚀 Serving Assets

Vite automatically serves files from `public/` folder:
- `/images/filename.png` → `public/images/filename.png`
- `/pdfs/filename.pdf` → `public/pdfs/filename.pdf`

No additional configuration needed!

## 📝 Notes

- Images and PDFs in `public/` are included in production build
- Files are served directly (not processed by Vite)
- Use relative paths starting with `/` (e.g., `/images/...`)

