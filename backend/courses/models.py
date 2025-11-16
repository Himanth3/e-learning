from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Course(models.Model):
    """Course Model"""
    LEVEL_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    slug = models.SlugField(unique=True)
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, default='beginner')
    duration = models.CharField(max_length=50, help_text="e.g., '4 weeks', '6 weeks'")
    icon = models.CharField(max_length=10, default='📚', help_text="Emoji icon")
    image = models.CharField(max_length=200, blank=True, help_text="Image filename")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title


class PDF(models.Model):
    """PDF Resource Model"""
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    filename = models.CharField(max_length=255, unique=True)
    file_path = models.CharField(max_length=500, help_text="Path relative to static/pdfs/")
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, blank=True, related_name='pdfs')
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title


class Quiz(models.Model):
    """Quiz Model"""
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, blank=True, related_name='quizzes')
    time_limit = models.IntegerField(default=30, help_text="Time limit in minutes")
    passing_score = models.IntegerField(default=70, help_text="Passing score percentage")
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title


class Question(models.Model):
    """Quiz Question Model"""
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    question_text = models.TextField()
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', 'id']
    
    def __str__(self):
        return f"{self.quiz.title} - Q{self.order + 1}"


class Choice(models.Model):
    """Question Choice Model"""
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='choices')
    choice_text = models.CharField(max_length=500)
    is_correct = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order', 'id']
    
    def __str__(self):
        return f"{self.question} - {self.choice_text}"


class QuizAttempt(models.Model):
    """User Quiz Attempt Model"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='quiz_attempts')
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='attempts')
    score = models.IntegerField(default=0)
    total_questions = models.IntegerField(default=0)
    completed_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-completed_at']
    
    def __str__(self):
        return f"{self.user.email} - {self.quiz.title} - {self.score}%"

