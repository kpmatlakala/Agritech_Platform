
from django.db import models
from django.contrib.auth.models import User

class Crop(models.Model):
    name = models.CharField(max_length=100)
    farmer = models.ForeignKey(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=200)
    planting_date = models.DateField()
    crop_type = models.CharField(max_length=50)
    area = models.FloatField(help_text="Area in hectares")

    def __str__(self):
        return f"{self.name} - {self.farmer.username}"

class SensorData(models.Model):
    crop = models.ForeignKey(Crop, on_delete=models.CASCADE)
    temperature = models.FloatField()
    humidity = models.FloatField()
    soil_moisture = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']
