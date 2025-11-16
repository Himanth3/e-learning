from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CourseViewSet, pdf_list_view, quiz_list_view,
    quiz_detail_view, quiz_submit_view, quiz_attempts_view
)

router = DefaultRouter()
router.register(r'courses', CourseViewSet, basename='course')

urlpatterns = [
    path('', include(router.urls)),
    path('pdfs/', pdf_list_view, name='pdf-list'),
    path('quizzes/', quiz_list_view, name='quiz-list'),
    path('quizzes/<int:pk>/', quiz_detail_view, name='quiz-detail'),
    path('quizzes/<int:pk>/submit/', quiz_submit_view, name='quiz-submit'),
    path('quiz-attempts/', quiz_attempts_view, name='quiz-attempts'),
]

