from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *

class UserSerializer:
    class Meta:
        model = User
        fields = ['username','email']

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['id', 'option_text']

class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'question_text', 'options']

class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Quiz
        fields = ['id', 'quiz_name', 'quiz_topic', 'questions']

class UserResponseQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserResponseQuiz
        fields = '__all__'