from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer

User = get_user_model()


def get_tokens_for_user(user):
    """Generate JWT tokens for user"""
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    """User Registration API"""
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        try:
            user = serializer.save()
            tokens = get_tokens_for_user(user)
            return Response({
                'user': UserSerializer(user).data,
                'tokens': tokens,
                'message': 'Registration successful'
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({
                'error': str(e),
                'message': 'Registration failed'
            }, status=status.HTTP_400_BAD_REQUEST)
    
    # Format validation errors for better frontend display
    errors = {}
    for field, error_list in serializer.errors.items():
        if isinstance(error_list, list):
            errors[field] = error_list[0] if error_list else 'Invalid value'
        else:
            errors[field] = str(error_list)
    
    return Response({
        'errors': errors,
        'message': 'Validation failed'
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """User Login API"""
    serializer = LoginSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        user = serializer.validated_data['user']
        tokens = get_tokens_for_user(user)
        return Response({
            'user': UserSerializer(user).data,
            'tokens': tokens,
            'message': 'Login successful'
        }, status=status.HTTP_200_OK)
    
    # Format validation errors for better frontend display
    errors = {}
    for field, error_list in serializer.errors.items():
        if isinstance(error_list, list):
            errors[field] = error_list[0] if error_list else 'Invalid value'
        else:
            errors[field] = str(error_list)
    
    return Response({
        'errors': errors,
        'message': 'Login failed'
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_view(request):
    """Get logged-in user details"""
    serializer = UserSerializer(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)

