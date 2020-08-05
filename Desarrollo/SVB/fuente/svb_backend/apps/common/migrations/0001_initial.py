# Generated by Django 3.0.7 on 2020-07-15 03:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Ubigeo',
            fields=[
                ('code', models.CharField(help_text='Código de ubigeo', max_length=6,
                                          primary_key=True, serialize=False, verbose_name='Code')),
                ('department', models.CharField(help_text='Departamento',
                                                max_length=30, verbose_name='Department')),
                ('province', models.CharField(
                    max_length=30, verbose_name='Province')),
                ('district', models.CharField(help_text='Distrito',
                                              max_length=30, verbose_name='District')),
            ],
            options={
                'ordering': ('department', 'province', 'district'),
            },
        ),
    ]
