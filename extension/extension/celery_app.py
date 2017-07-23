from __future__ import absolute_import

import logging
import os

from django.conf import settings
from dotenv import load_dotenv

from celery import Celery
from celery.signals import task_failure

logger = logging.getLogger('celery')

base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
env_file = os.path.join(base_dir, '.env')
load_dotenv(env_file)

app = Celery('youtubesubs')

app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)


@task_failure.connect
def celery_failed(sender=None, exception=None, einfo=None, **kwargs):
    if not settings.DEBUG:
        logger.error(
            'Celery task {}: {}'.format(str(sender), exception),
            exc_info=einfo,
        )
