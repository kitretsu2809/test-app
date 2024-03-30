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
        print(username)
        password = data.get('password')
        print(password)

        user = authenticate(username=username, password=password)
        print(user)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            print(refresh)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': str(user)
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
    authorization_header = request.META.get('HTTP_AUTHORIZATION')
    token = authorization_header.split()[0]
    payload = AccessToken(token).payload
    userid = payload['user_id']

    data = json.loads(request.body)
    print(data)
    quiz_id = data.get('quiz_id')
    quiz_id = int(quiz_id)
    question_id = data.get('question_id')
    question_id = int(question_id)
    selected_option_id = data.get('selected_option_id')
    integer_response = data.get('givenint')

    # Ensure all required fields are present
    if not (quiz_id and question_id):
        return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(id=userid)
        quiz = Quiz.objects.get(id=quiz_id)
        question = Question.objects.get(id=question_id)

        if question.question_type == 'integer_type':
            # Validate integer response
            if integer_response is None:
                return Response({'error': 'Integer response is required for integer type question'},status=status.HTTP_400_BAD_REQUEST)
            integer_response=int(integer_response)
            user_response = UserResponseQuiz.objects.create(
                user=user,
                quiz=quiz,
                question=question,
                integer_response=integer_response
            )
        else:
            # For single correct or multiple correct type questions
            if selected_option_id is None:
                return Response({'error': 'Selected option is required for single/multiple correct type question'},
                                status=status.HTTP_400_BAD_REQUEST)
            selected_option_id = int(selected_option_id)
            selected_option = Option.objects.get(id=selected_option_id)
            # Save user response for single/multiple correct type question
            user_response = UserResponseQuiz.objects.create(
                user=user,
                quiz=quiz,
                question=question,
                selected_option=selected_option
            )

        # Serialize and return response
        serializer = UserResponseQuizSerializer(user_response)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

api_view(['GET'])
def your_quiz(request):
    try:
        authorization_header = request.META.get('HTTP_AUTHORIZATION')
        token = authorization_header.split()[0]
        payload = AccessToken(token).payload
        userid = payload['user_id']
        print(userid)
        user = User.objects.get(id=userid)
        quizes = UserResponseQuiz.objects.filter(user=user)
        print(quizes)
        serializer = UserResponseQuizSerializer(quizes , many=True)
        return JsonResponse(serializer.data ,safe=False , status=status.HTTP_200_OK)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)