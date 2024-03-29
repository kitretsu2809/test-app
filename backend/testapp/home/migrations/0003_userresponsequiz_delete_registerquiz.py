# Generated by Django 4.2.6 on 2024-03-27 20:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('home', '0002_registerquiz'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserResponseQuiz',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='home.question')),
                ('quiz', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='home.quiz')),
                ('selected_option', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='home.option')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.DeleteModel(
            name='RegisterQuiz',
        ),
    ]
