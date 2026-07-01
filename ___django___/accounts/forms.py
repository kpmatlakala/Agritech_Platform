# accounts/forms.py
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class CustomSignupForm(UserCreationForm):
    email = forms.EmailField(required=True)
    full_name = forms.CharField(max_length=100)
    phone = forms.CharField(max_length=20)
    farm_type = forms.ChoiceField(choices=[
        ('crops', 'Crop Farming'),
        ('livestock', 'Livestock Farming'),
        ('mixed', 'Mixed Farming'),
        ('organic', 'Organic Farming'),
        ('other', 'Other')
    ])
    farm_size = forms.IntegerField(min_value=1)

    class Meta:
        model = User
        fields = ['username', 'full_name', 'email', 'phone', 'farm_type', 'farm_size', 'password1', 'password2']
