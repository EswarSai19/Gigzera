# Generated by Django 5.1.6 on 2025-02-25 07:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db_schemas', '0011_alter_tasks_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='myadmin',
            name='password',
            field=models.CharField(blank=True, max_length=128),
        ),
        migrations.AlterField(
            model_name='myadmin',
            name='phone',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
    ]
