from django.utils.safestring import mark_safe
import json
from django.shortcuts import render
from crop_monitoring.models import Crop, SensorData


def crop_monitoring_dashboard(request):
    crops = Crop.objects.all()
    latest_crop = crops.first()

    if latest_crop:
        recent_data = SensorData.objects.filter(crop=latest_crop).order_by("-timestamp")[:10][::-1]

        labels = [data.timestamp.strftime("%H:%M") for data in recent_data]
        moisture = [data.soil_moisture for data in recent_data]
        temp = [data.temperature for data in recent_data]
        humidity = [data.humidity for data in recent_data]

        chart_configs = [
            {
                "canvasId": "moistureChart",
                "type": "line",
                "data": {
                    "labels": labels,
                    "datasets": [{
                        "label": "Soil Moisture",
                        "data": moisture,
                        "fill": True,
                        "borderColor": "rgba(33,150,243,1)",
                        "backgroundColor": "rgba(33,150,243,0.1)",
                        "tension": 0.4
                    }]
                },
                "options": {
                    "responsive": True,
                    "plugins": {"legend": {"display": True}},
                    "scales": {
                        "x": {"title": {"display": True, "text": "Time"}},
                        "y": {"title": {"display": True, "text": "Moisture (%)"}, "min": 0, "max": 100}
                    }
                }
            },
            {
                "canvasId": "tempChart",
                "type": "line",
                "data": {
                    "labels": labels,
                    "datasets": [{
                        "label": "Temperature (°C)",
                        "data": temp,
                        "fill": False,
                        "borderColor": "rgba(255,87,34,1)",
                        "backgroundColor": "rgba(255,87,34,0.1)",
                        "tension": 0.4
                    }]
                }
            },
            {
                "canvasId": "humidityChart",
                "type": "line",
                "data": {
                    "labels": labels,
                    "datasets": [{
                        "label": "Humidity (%)",
                        "data": humidity,
                        "fill": False,
                        "borderColor": "rgba(76,175,80,1)",
                        "backgroundColor": "rgba(76,175,80,0.1)",
                        "tension": 0.4
                    }]
                }
            }
        ]
    else:
        chart_configs = []

    # Serialize the chart config to safe JSON
    chart_json = mark_safe(json.dumps(chart_configs))

    return render(
        request,
        "crop_monitoring/crop_dashboard.html",
        {
            "crops": crops,
            "chart_configs": chart_configs,  # Python object (if needed)
            "chart_configs_json": chart_json,  # JSON for JS
        }
    )
