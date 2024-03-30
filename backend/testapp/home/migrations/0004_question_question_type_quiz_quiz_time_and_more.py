# Generated by Django 4.2.6 on 2024-03-30 18:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0003_userresponsequiz_delete_registerquiz'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='question_type',
            field=models.CharField(choices=[('single_correct', 'Single Correct'), ('multiple_correct', 'Multiple Correct'), ('integer_type', 'Integer Type')], default='single_correct', max_length=20),
        ),
        migrations.AddField(
            model_name='quiz',
            name='quiz_time',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='userresponsequiz',
            name='integer_response',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='userresponsequiz',
            name='user_response',
            field=models.CharField(default='', max_length=100),
        ),
    ]
