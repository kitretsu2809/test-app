from django.db import models
from django.contrib.auth.models import User

class Quiz(models.Model):
    quiz_name = models.CharField(max_length=100)
    quiz_topic = models.CharField(max_length=100)
    quiz_time = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.quiz_name

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    question_text = models.CharField(max_length=200)
    QUESTION_TYPE_CHOICES = [
        ('single_correct', 'Single Correct'),
        ('multiple_correct', 'Multiple Correct'),
        ('integer_type', 'Integer Type'),
    ]
    question_type = models.CharField(max_length=20, choices=QUESTION_TYPE_CHOICES , default='single_correct')

    def __str__(self):
        return self.question_text

class Option(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='options')
    option_text = models.CharField(max_length=100)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.option_text

class UserResponseQuiz(models.Model):
    user = models.ForeignKey(User , on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz , on_delete=models.CASCADE)
    question = models.ForeignKey(Question , on_delete=models.CASCADE)
    selected_option = models.ForeignKey(Option , on_delete=models.CASCADE)
    user_response = models.CharField(max_length=100 , default='')  # For single and multiple correct answers
    integer_response = models.IntegerField()  # For integer type answers

    def __str__(self):
        return f"{self.user.username}'s response to {self.quiz.quiz_name}: {self.question.question_text}"