import requests
from django.conf import settings

API_KEY = '895284fb2d2c50a520ea537456963d9c' # Replace with your actual API key
# utils/weather.py



# OpenWeather API URL and API key from settings
BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'

def get_weather_by_city(city_name):
    """Fetch weather by city name."""
    url = f"{BASE_URL}?q={city_name}&appid={settings.OPENWEATHER_API_KEY}&units=metric"
    return fetch_weather_data(url)

def get_weather_by_coords(lat, lon):
    """Fetch weather by coordinates (latitude, longitude)."""
    url = f"{BASE_URL}?lat={lat}&lon={lon}&appid={settings.OPENWEATHER_API_KEY}&units=metric"
    return fetch_weather_data(url)

def fetch_weather_data(url):
    """Helper function to fetch data and handle errors."""
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an error for bad status codes
        data = response.json()
        
        if data["cod"] == 200:
            return {
                "city": data["name"],
                "temperature": data["main"]["temp"],
                "description": data["weather"][0]["description"],
                "humidity": data["main"]["humidity"],
                "wind_speed": data["wind"]["speed"],
                "icon": f"http://openweathermap.org/img/wn/{data['weather'][0]['icon']}.png"
            }
        else:
            return {"error": "City not found"}
    except requests.exceptions.RequestException as e:
        return {"error": f"Failed to retrieve data: {e}"}

