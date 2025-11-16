from rest_framework import serializers
from .models import Course, PDF, Quiz, Question, Choice, QuizAttempt


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ('id', 'choice_text', 'order')
        # Don't include is_correct in list view for security


class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)
    
    class Meta:
        model = Question
        fields = ('id', 'question_text', 'order', 'choices')


class QuizListSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source='course.title', read_only=True)
    question_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Quiz
        fields = ('id', 'title', 'description', 'course', 'course_title', 'time_limit', 'passing_score', 'question_count', 'created_at')
    
    def get_question_count(self, obj):
        return obj.questions.count()


class QuizDetailSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    course_title = serializers.CharField(source='course.title', read_only=True)
    
    class Meta:
        model = Quiz
        fields = ('id', 'title', 'description', 'course', 'course_title', 'time_limit', 'passing_score', 'questions', 'created_at')


class PDFSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source='course.title', read_only=True)
    
    class Meta:
        model = PDF
        fields = ('id', 'title', 'description', 'filename', 'file_path', 'course', 'course_title', 'created_at')


class CourseListSerializer(serializers.ModelSerializer):
    pdf_count = serializers.SerializerMethodField()
    quiz_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Course
        fields = ('id', 'title', 'description', 'slug', 'level', 'duration', 'icon', 'image', 'pdf_count', 'quiz_count', 'created_at')
    
    def get_pdf_count(self, obj):
        return obj.pdfs.filter(is_active=True).count()
    
    def get_quiz_count(self, obj):
        return obj.quizzes.filter(is_active=True).count()


class CourseDetailSerializer(serializers.ModelSerializer):
    pdfs = PDFSerializer(many=True, read_only=True)
    quizzes = QuizListSerializer(many=True, read_only=True)
    
    class Meta:
        model = Course
        fields = ('id', 'title', 'description', 'slug', 'level', 'duration', 'icon', 'image', 'pdfs', 'quizzes', 'created_at')


class QuizAttemptSerializer(serializers.ModelSerializer):
    quiz_title = serializers.CharField(source='quiz.title', read_only=True)
    user_email = serializers.CharField(source='user.email', read_only=True)
    
    class Meta:
        model = QuizAttempt
        fields = ('id', 'user', 'user_email', 'quiz', 'quiz_title', 'score', 'total_questions', 'completed_at')
        read_only_fields = ('user', 'score', 'total_questions', 'completed_at')


class QuizSubmissionSerializer(serializers.Serializer):
    """Serializer for quiz submission"""
    quiz_id = serializers.IntegerField()
    answers = serializers.DictField(
        child=serializers.IntegerField(),
        help_text="Dictionary of question_id: choice_id"
    )

