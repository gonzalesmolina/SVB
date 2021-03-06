# Generated by Django 3.0.7 on 2020-08-12 18:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='payment',
            name='operation_number',
            field=models.CharField(blank=True, max_length=32, null=True),
        ),
        migrations.AlterField(
            model_name='payment',
            name='payment_method',
            field=models.PositiveSmallIntegerField(choices=[(0, 'Efectivo'), (
                1, 'Tarjeta de débito'), (2, 'Tarjeta de crédito'), (3, 'App YAPE')], default=0),
        ),
    ]
