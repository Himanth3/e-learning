from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import Course, PDF, Quiz, Question, Choice, QuizAttempt
from .serializers import (
    CourseListSerializer, CourseDetailSerializer,
    PDFSerializer, QuizListSerializer, QuizDetailSerializer,
    QuizAttemptSerializer, QuizSubmissionSerializer
)


class CourseViewSet(ReadOnlyModelViewSet):
    """Course ViewSet"""
    queryset = Course.objects.filter(is_active=True)
    permission_classes = [AllowAny]
    lookup_field = 'slug'
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return CourseDetailSerializer
        return CourseListSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def pdf_list_view(request):
    """Get all PDFs"""
    course_id = request.query_params.get('course', None)
    queryset = PDF.objects.filter(is_active=True)
    
    if course_id:
        queryset = queryset.filter(course_id=course_id)
    
    serializer = PDFSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def quiz_list_view(request):
    """Get all quizzes"""
    course_id = request.query_params.get('course', None)
    queryset = Quiz.objects.filter(is_active=True)
    
    if course_id:
        queryset = queryset.filter(course_id=course_id)
    
    serializer = QuizListSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def quiz_detail_view(request, pk):
    """Get quiz details with questions (without correct answers)"""
    quiz = get_object_or_404(Quiz, pk=pk, is_active=True)
    serializer = QuizDetailSerializer(quiz)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def quiz_submit_view(request, pk):
    """Submit quiz and calculate score"""
    try:
        # Get quiz from URL parameter
        quiz = get_object_or_404(Quiz, pk=pk, is_active=True)
        
        # Validate request data
        quiz_id = request.data.get('quiz_id')
        answers = request.data.get('answers', {})
        
        # Verify quiz_id matches URL parameter
        if quiz_id and int(quiz_id) != int(pk):
            return Response({
                'error': 'Quiz ID mismatch'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if not isinstance(answers, dict):
            return Response({
                'error': 'Answers must be a dictionary'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        questions = quiz.questions.all()
        correct_count = 0
        total_questions = questions.count()
        
        if total_questions == 0:
            return Response({
                'error': 'Quiz has no questions'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Calculate score
        for question in questions:
            # Try both string and integer keys
            user_choice_id = answers.get(str(question.id)) or answers.get(question.id)
            if user_choice_id:
                # Convert to integer if needed
                user_choice_id = int(user_choice_id)
                choice = Choice.objects.filter(id=user_choice_id, question=question).first()
                if choice and choice.is_correct:
                    correct_count += 1
        
        score = int((correct_count / total_questions * 100)) if total_questions > 0 else 0
        
        # Save attempt
        attempt = QuizAttempt.objects.create(
            user=request.user,
            quiz=quiz,
            score=score,
            total_questions=total_questions
        )
        
        # Return results with correct answers
        results = []
        for question in questions:
            correct_choice = question.choices.filter(is_correct=True).first()
            # Try both string and integer keys
            user_choice_id = answers.get(str(question.id)) or answers.get(question.id)
            user_choice = None
            if user_choice_id:
                user_choice_id = int(user_choice_id)
                user_choice = Choice.objects.filter(id=user_choice_id, question=question).first()
            
            results.append({
                'question_id': question.id,
                'question_text': question.question_text,
                'user_answer': user_choice.choice_text if user_choice else None,
                'correct_answer': correct_choice.choice_text if correct_choice else None,
                'is_correct': user_choice.is_correct if (user_choice and hasattr(user_choice, 'is_correct')) else False
            })
        
        return Response({
            'attempt_id': attempt.id,
            'score': score,
            'total_questions': total_questions,
            'correct_count': correct_count,
            'passed': score >= quiz.passing_score,
            'results': results
        }, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({
            'error': str(e),
            'message': 'Failed to process quiz submission'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def quiz_attempts_view(request):
    """Get user's quiz attempts"""
    attempts = QuizAttempt.objects.filter(user=request.user).order_by('-completed_at')
    serializer = QuizAttemptSerializer(attempts, many=True)
    return Response(serializer.data)

