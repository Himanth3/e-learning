"""
Management command to load initial courses, PDFs, and quiz data
Run: python manage.py load_initial_data
"""
from django.core.management.base import BaseCommand
from courses.models import Course, PDF, Quiz, Question, Choice


class Command(BaseCommand):
    help = 'Load initial courses, PDFs, and quiz data'

    def handle(self, *args, **options):
        self.stdout.write('Loading initial data...')

        # Create Courses
        courses_data = [
            {
                'title': 'Python Basics',
                'description': 'Learn the fundamentals of Python programming including variables, loops, conditions, and functions. Perfect for beginners.',
                'slug': 'python-basics',
                'level': 'beginner',
                'duration': '4 weeks',
                'icon': '🐍',
                'image': 'python-basic.png',
            },
            {
                'title': 'OOPs with Python',
                'description': 'Understand classes, objects, inheritance, polymorphism, and more object-oriented programming concepts!',
                'slug': 'oops-with-python',
                'level': 'intermediate',
                'duration': '4 weeks',
                'icon': '🧱',
                'image': 'python-oops.png',
            },
            {
                'title': 'Flask Web Development',
                'description': 'Build lightweight web applications using Flask framework — fast and beginner-friendly.',
                'slug': 'flask-web-development',
                'level': 'intermediate',
                'duration': '5 weeks',
                'icon': '⚡',
                'image': 'flask.png',
            },
            {
                'title': 'Django Framework',
                'description': 'Master full-stack development with Django\'s powerful ecosystem and build robust web applications.',
                'slug': 'django-framework',
                'level': 'intermediate',
                'duration': '6 weeks',
                'icon': '🌐',
                'image': 'Django.png',
            },
            {
                'title': 'DSA with Python',
                'description': 'Crack coding interviews by mastering Data Structures & Algorithms in Python.',
                'slug': 'dsa-with-python',
                'level': 'advanced',
                'duration': '8 weeks',
                'icon': '📊',
                'image': 'DSA.png',
            },
        ]

        for course_data in courses_data:
            course, created = Course.objects.get_or_create(
                slug=course_data['slug'],
                defaults=course_data
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created course: {course.title}'))
            else:
                self.stdout.write(f'Course already exists: {course.title}')

        # Create PDFs
        pdfs_data = [
            {
                'title': 'Python Cheat Codes',
                'description': 'Quick reference guide for Python syntax and common operations',
                'filename': '🐍 Python Cheat Codes.pdf',
                'file_path': '🐍 Python Cheat Codes.pdf',
                'course': Course.objects.filter(slug='python-basics').first(),
            },
            {
                'title': 'Python Notes',
                'description': 'Comprehensive notes covering Python fundamentals',
                'filename': '🐍 Python Notes.pdf',
                'file_path': '🐍 Python Notes.pdf',
                'course': Course.objects.filter(slug='python-basics').first(),
            },
            {
                'title': 'DSA with Python CheatSheet',
                'description': 'Data Structures and Algorithms quick reference',
                'filename': 'DSA_with_Python_CheatSheet.pdf',
                'file_path': 'DSA_with_Python_CheatSheet.pdf',
                'course': Course.objects.filter(slug='dsa-with-python').first(),
            },
            {
                'title': 'Python DSA',
                'description': 'Complete guide to Data Structures in Python',
                'filename': 'Python Dsa.pdf',
                'file_path': 'Python Dsa.pdf',
                'course': Course.objects.filter(slug='dsa-with-python').first(),
            },
            {
                'title': 'Python Array Questions',
                'description': 'Practice questions on Python arrays',
                'filename': 'python_Array_Questions.pdf',
                'file_path': 'python_Array_Questions.pdf',
                'course': Course.objects.filter(slug='python-basics').first(),
            },
            {
                'title': 'Python Conditional Questions',
                'description': 'Practice questions on conditionals and control flow',
                'filename': 'python_conditional_questions.pdf',
                'file_path': 'python_conditional_questions.pdf',
                'course': Course.objects.filter(slug='python-basics').first(),
            },
            {
                'title': 'Python Function Questions',
                'description': 'Practice questions on Python functions',
                'filename': 'python_function_question.pdf',
                'file_path': 'python_function_question.pdf',
                'course': Course.objects.filter(slug='python-basics').first(),
            },
            {
                'title': 'Python Loop Questions',
                'description': 'Practice questions on loops in Python',
                'filename': 'python_Loop_Questions.pdf',
                'file_path': 'python_Loop_Questions.pdf',
                'course': Course.objects.filter(slug='python-basics').first(),
            },
        ]

        for pdf_data in pdfs_data:
            pdf, created = PDF.objects.get_or_create(
                filename=pdf_data['filename'],
                defaults=pdf_data
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created PDF: {pdf.title}'))
            else:
                self.stdout.write(f'PDF already exists: {pdf.title}')

        # Create Quiz for Python Basics
        python_basics_course = Course.objects.filter(slug='python-basics').first()
        if python_basics_course:
            quiz, created = Quiz.objects.get_or_create(
                title='Python Basics Quiz',
                defaults={
                    'description': 'Test your knowledge in Python Basics, Conditionals, Control Flow, Functions & Arrays',
                    'course': python_basics_course,
                    'time_limit': 30,
                    'passing_score': 70,
                }
            )

            if created:
                self.stdout.write(self.style.SUCCESS(f'Created quiz: {quiz.title}'))

                # Add questions
                questions_data = [
                    {
                        'question_text': 'What is the output of: print(2 * 3 + 1)?',
                        'order': 0,
                        'choices': [
                            {'choice_text': '7', 'is_correct': True, 'order': 0},
                            {'choice_text': '8', 'is_correct': False, 'order': 1},
                            {'choice_text': '9', 'is_correct': False, 'order': 2},
                        ]
                    },
                    {
                        'question_text': 'Which keyword is used for a conditional branch?',
                        'order': 1,
                        'choices': [
                            {'choice_text': 'switch', 'is_correct': False, 'order': 0},
                            {'choice_text': 'if', 'is_correct': True, 'order': 1},
                            {'choice_text': 'define', 'is_correct': False, 'order': 2},
                        ]
                    },
                    {
                        'question_text': 'What does the range(5) function return?',
                        'order': 2,
                        'choices': [
                            {'choice_text': '[1, 2, 3, 4, 5]', 'is_correct': False, 'order': 0},
                            {'choice_text': '[0, 1, 2, 3, 4]', 'is_correct': True, 'order': 1},
                            {'choice_text': '[0, 1, 2, 3, 4, 5]', 'is_correct': False, 'order': 2},
                        ]
                    },
                    {
                        'question_text': 'What is the correct way to define a function in Python?',
                        'order': 3,
                        'choices': [
                            {'choice_text': 'function myFunc():', 'is_correct': False, 'order': 0},
                            {'choice_text': 'def myFunc():', 'is_correct': True, 'order': 1},
                            {'choice_text': 'create myFunc():', 'is_correct': False, 'order': 2},
                        ]
                    },
                    {
                        'question_text': 'Which of these creates a list in Python?',
                        'order': 4,
                        'choices': [
                            {'choice_text': 'arr = (1, 2, 3)', 'is_correct': False, 'order': 0},
                            {'choice_text': 'arr = [1, 2, 3]', 'is_correct': True, 'order': 1},
                            {'choice_text': 'arr = {1, 2, 3}', 'is_correct': False, 'order': 2},
                        ]
                    },
                ]

                for q_data in questions_data:
                    choices = q_data.pop('choices')
                    question = Question.objects.create(quiz=quiz, **q_data)
                    for c_data in choices:
                        Choice.objects.create(question=question, **c_data)
                    self.stdout.write(f'  Added question: {question.question_text[:50]}...')

        self.stdout.write(self.style.SUCCESS('\nInitial data loaded successfully!'))

