# Generated by Django 4.2.6 on 2024-03-31 02:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0002_option_correctoption'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userresponsequiz',
            name='selected_option',
        ),
    ]