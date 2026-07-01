
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from crop_monitoring.models import Crop, SensorData
from datetime import datetime, timedelta
import random

class Command(BaseCommand):
    help = 'Generates dummy data for testing'

    def handle(self, *args, **kwargs):
        # Use the first superuser
        user = User.objects.filter(is_superuser=True).first()
        if not user:
            self.stdout.write(self.style.ERROR('No superuser found. Please create one first.'))
            return

        # Create sample crops
        crop_types = ['Corn', 'Wheat', 'Soybeans', 'Rice', 'Cotton']
        for i in range(5):
            crop = Crop.objects.create(
                name=f'Test Crop {i+1}',
                farmer=user,
                location=f'Field {i+1}',
                planting_date=datetime.now().date() - timedelta(days=random.randint(1, 60)),
                crop_type=random.choice(crop_types),
                area=random.uniform(1.0, 10.0)
            )

            # Generate sensor data for each crop
            for j in range(10):
                SensorData.objects.create(
                    crop=crop,
                    temperature=random.uniform(20.0, 30.0),
                    humidity=random.uniform(40.0, 80.0),
                    soil_moisture=random.uniform(30.0, 70.0),
                    timestamp=datetime.now() - timedelta(hours=j)
                )

        self.stdout.write(self.style.SUCCESS('Successfully generated dummy data'))
