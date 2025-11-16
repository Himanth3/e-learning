from django.contrib import admin
from .models import Course, PDF, Quiz, Question, Choice, QuizAttempt


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'level', 'duration', 'is_active', 'created_at')
    list_filter = ('level', 'is_active', 'created_at')
    search_fields = ('title', 'description')
    prepopulated_fields = {'slug': ('title',)}


@admin.register(PDF)
class PDFAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'filename', 'is_active', 'created_at')
    list_filter = ('course', 'is_active', 'created_at')
    search_fields = ('title', 'filename')


class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 2


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('question_text', 'quiz', 'order')
    list_filter = ('quiz',)
    inlines = [ChoiceInline]


@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'time_limit', 'passing_score', 'is_active', 'created_at')
    list_filter = ('course', 'is_active', 'created_at')
    search_fields = ('title', 'description')


@admin.register(QuizAttempt)
class QuizAttemptAdmin(admin.ModelAdmin):
    list_display = ('user', 'quiz', 'score', 'total_questions', 'completed_at')
    list_filter = ('quiz', 'completed_at')
    readonly_fields = ('completed_at',)

