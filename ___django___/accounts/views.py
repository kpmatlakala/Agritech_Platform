# accounts/views.py
from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required

from .forms import CustomSignupForm
from .models import UserProfile  # if needed
from utils.weather import get_weather_by_city


def homepage(request):
    return render(request, "homepage.html")


# Signup view
def signup(request):
    if request.method == "POST":
        form = CustomSignupForm(request.POST)
        if form.is_valid():
            # Save the user instance
            user = form.save(commit=False)
            user.email = form.cleaned_data["email"]
            user.save()

            # Create the user profile
            UserProfile.objects.create(
                user=user,
                full_name=form.cleaned_data["full_name"],
                phone=form.cleaned_data["phone"],
                farm_type=form.cleaned_data["farm_type"],
                farm_size=form.cleaned_data["farm_size"],
            )

            # Authenticate and log in the user
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password1"]
            user = authenticate(username=username, password=password)
            if user:
                login(request, user)
                messages.success(
                    request, "Registration successful! You are now logged in."
                )
                return redirect(
                    "account_dashboard"
                )  # Redirect to the dashboard or desired page
            else:
                messages.error(request, "Login failed. Please try again.")
                return redirect("signin")
    else:
        form = CustomSignupForm()

    return render(request, "accounts/signup.html", {"form": form})


# Signin view
def signin(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            messages.success(request, f"Welcome back, {user.username}!")
            return redirect("account_dashboard")
        else:
            messages.error(request, "Invalid username or password.")
    else:
        form = AuthenticationForm()

    return render(request, "accounts/signin.html", {"form": form})


# Signout view
def custom_logout(request):
    logout(request)
    messages.success(request, "You have been logged out successfully.")
    return redirect("homepage") # Redirect to the homepage or change to login page


# Account Dashboard
@login_required
def account_dashboard(request):
    profile = request.user.userprofile
    city = "Nairobi"  # or get from user profile/settings
    weather = get_weather_by_city(city)
    return render(request, "accounts/account_dashboard.html", {
        "profile": profile,
        "weather": weather,
        "city": city,
    })
