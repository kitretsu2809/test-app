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
        fields = ['id', 'question_text', 'question_type','options']

class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Quiz
        fields = ['id', 'quiz_name', 'quiz_topic', 'questions']

class UserResponseQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserResponseQuiz
        fields = '__all__'

    def validate(self, data):
        """
        Validate user response based on the question type.
        """
        question = data['question']
        question_type = question.question_type
        selected_option = data.get('selected_option')
        user_response = data.get('user_response')
        integer_response = data.get('integer_response')

        # Ensure only one response field is provided based on the question type
        if question_type == 'integer_type':
            if selected_option is not None or user_response is not None:
                raise serializers.ValidationError("Only integer_response should be provided for integer type question.")
            if integer_response is None:
                raise serializers.ValidationError("Integer_response is required for integer type question.")
        else:  # Single correct or multiple correct
            if integer_response is not None:
                raise serializers.ValidationError("Integer_response should not be provided for single/multiple correct type question.")
            if selected_option is None:
                raise serializers.ValidationError("Selected_option is required for single/multiple correct type question.")

        return data