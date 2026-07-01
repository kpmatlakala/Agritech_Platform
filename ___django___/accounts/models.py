# accounts/models.py
from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    farm_type = models.CharField(max_length=50)
    farm_size = models.PositiveIntegerField()
    is_crop_monitoring_enabled = models.BooleanField(default=False)
    is_livestock_enabled = models.BooleanField(default=False)
    is_marketplace_enabled = models.BooleanField(default=False)

    def __str__(self):
        return f"Profile of {self.user.username}"

