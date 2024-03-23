from django.shortcuts import render
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status
import json
from django.http import JsonResponse
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *

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
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    user = authenticate(username=username , password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh' : str(refresh),
            'access' : str(refresh.access_token)
        } , status=status.HTTP_200_OK)
    else:
        return Response({'error':'invalid credential'} , status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def get_quiz(request):
    quizzes = Quiz.objects.all()
    serializer = QuizSerializer(quizzes , many=True)
    return Response(serializer.data , status = status.HTTP_200_OK)

