from django.urls import path
from . import views

urlpatterns = [
    path('signup/' , views.create_user , name='signup'),
    path('login/' , views.login , name='login'),
    path('getquizzes/' , views.get_quiz , name='quiz')
]