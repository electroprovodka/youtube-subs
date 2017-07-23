import os

from django.conf import settings

# Broker settings
BROKER_URL = settings.CELERY_BROKER_URL

# RabbitMQ management api
broker_api = os.environ.get('CELERY_BROKER_API')

# Enable debug logging
logging = 'INFO'
