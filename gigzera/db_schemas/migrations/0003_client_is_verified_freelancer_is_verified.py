# Generated by Django 5.1.6 on 2025-02-18 18:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db_schemas', '0002_client_is_active_freelancer_is_active'),
    ]

    operations = [
        migrations.AddField(
            model_name='client',
            name='is_verified',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='freelancer',
            name='is_verified',
            field=models.BooleanField(default=False),
        ),
    ]
