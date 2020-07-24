# Generated by Django 3.0.7 on 2020-07-24 21:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rest_auth', '0003_auto_20200722_1654'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='deleted_at',
        ),
        migrations.AlterField(
            model_name='address',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='addresses', to='rest_auth.UserProfile'),
        ),
    ]
