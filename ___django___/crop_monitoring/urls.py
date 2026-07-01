# crop_monitoring/urls.py
from django.urls import path
from crop_monitoring import views

urlpatterns = [
    path('monitoring', views.crop_monitoring_dashboard, name='crop_dashboard'),

    # Other URLs
]
