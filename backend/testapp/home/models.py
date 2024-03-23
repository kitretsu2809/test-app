from django.db import models

class Quiz(models.Model):
    quiz_name = models.CharField(max_length=100)
    quiz_topic = models.CharField(max_length=100)

    def __str__(self):
        return self.quiz_name

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    question_text = models.CharField(max_length=200)

    def __str__(self):
        return self.question_text

class Option(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='options')
    option_text = models.CharField(max_length=100)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.option_text