# Generated by Django 3.0.7 on 2020-07-22 21:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rest_auth', '0002_remove_userprofile_billing_address'),
    ]

    operations = [
        migrations.AlterField(
            model_name='address',
            name='user',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to='rest_auth.UserProfile'),
        ),
    ]