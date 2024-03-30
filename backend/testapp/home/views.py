from django.shortcuts import render
from .serializers import *
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view , permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status , generics
import json
from django.http import JsonResponse
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken,AccessToken
from .models import *
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication



@api_view(['POST'])
def create_user(request):
    # Parse JSON data from request body
    data = json.loads(request.body)
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Validate required fields
    if not username or not email or not password:
        return JsonResponse({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Create user object without saving to database
        user = User(username=username, email=email)
        # Set and hash the password
        user.set_password(password)
        # Save the user object
        user.save()

        serializer = UserSerializer(user)
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        user = authenticate(username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return JsonResponse({
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            }, status=status.HTTP_200_OK)
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['GET'])
def get_quiz(request):
    quizzes = Quiz.objects.all()
    serializer = QuizSerializer(quizzes , many=True)
    return Response(serializer.data , status = status.HTTP_200_OK)

class QuizQuestionsAPIView(generics.ListAPIView):
    serializer_class = QuestionSerializer

    def get_queryset(self):
        quiz_id = self.kwargs['quiz_id']
        return Question.objects.filter(quiz_id=quiz_id)

@api_view(['POST'])
def submit_response(request):
    data = json.loads(request.body)
    token = data.get('token')
    accesstoken = AccessToken(token)
    payload = accesstoken.payload
    print(payload)
    user_id = payload['user_id']
    quiz_id = data.get('quiz_id')
    question_id = data.get('question_id')
    selected_option_id = data.get('selected_option_id')
    print(token , question_id , quiz_id , selected_option_id)
    quiz_id = int(quiz_id)
    question_id = int(question_id)
    selected_option_id = int(selected_option_id)
    user_id = int(user_id)

        # Save user response to the database
    try:
        user_response = UserResponseQuiz(
            user=User.objects.get(id=user_id),
            quiz=Quiz.objects.get(id=quiz_id),
            question=Question.objects.get(id=question_id),
            selected_option=Option.objects.get(id=selected_option_id)
        )
        user_response.save()

        serializer = UserResponseQuizSerializer(user_response)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)},status=status.HTTP_400_BAD_REQUEST)
    

    return Response('Responses submitted successfully!', status=status.HTTP_200_OK)

api_view(['GET'])
def your_quiz(request):
    try:
        authorization_header = request.META.get('HTTP_AUTHORIZATION')
        token = authorization_header.split()
        payload = AccessToken(token).payload
        userid = payload['user_id']
        user = User.objects.get(id=userid)
        quizes = UserResponseQuiz.objects.filter(user=user)
        serializer = UserResponseQuizSerializer(quizes , many=True)
        return Response(serializer.data , status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)