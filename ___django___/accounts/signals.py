from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import UserProfile

# @receiver(post_save, sender=User)
# def create_or_save_user_profile(sender, instance, created, **kwargs):
#     if created:
#         # Create profile only if user is newly created
#         UserProfile.objects.create(user=instance)
#     else:
#         # Save profile only if it exists
#         try:
#             instance.userprofile.save()
#         except UserProfile.DoesNotExist:
#             # Optional: Create a profile for users missing one (e.g., superuser)
#             UserProfile.objects.create(user=instance)
