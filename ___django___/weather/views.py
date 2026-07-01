from django.shortcuts import render
from utils.weather import get_weather_by_city

def weather_dashboard(request):
    city = request.GET.get('city', 'Nairobi')
    weather = get_weather_by_city(city)
    return render(request, "weather/weather_dashboard.html", {"weather": weather, "city": city})