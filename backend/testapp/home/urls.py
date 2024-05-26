from django.urls import path
from . import views

urlpatterns = [
    path('test-websocket/', views.test_websocket, name='test_websocket'),
    path('signup/' , views.create_user , name='signup'),
    path('login/' , views.login , name='login'),
    path('getquizzes/' , views.get_quiz , name='quiz'),
    path('api/quizzes/<int:quiz_id>/questions/', views.QuizQuestionsAPIView.as_view(), name='quiz-questions'),
    path('api/submit_response/', views.submit_response, name='submit-response'),
    path('api/yourquizes/' , views.your_quiz , name='activequiz'),
    path('api/yourquizes/<int:quizid>/' , views.getresult , name='result'),
    path('api/addquiz/' , views.addquiz , name='addquiz'),
    path('api/checkquiz/' , views.havetocheck , name='checkquiz'),
    path('api/checkquiz/<int:quizid>/' , views.getchecked , name='getcheck'),
    path('api/getcheck/<str:username>/<int:questionid>/' , views.gotchecked , name='gotchecked')
]