from __future__ import absolute_import

import logging
import os

from django.conf import settings

from celery import Celery
from celery.signals import task_failure

from .read_env import read_env

logger = logging.getLogger('celery')

path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env')
read_env(path)

app = Celery('youtubesubs')

# Using a string here means the worker will not have to
# pickle the object when using Windows.
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)


@task_failure.connect
def celery_failed(sender=None, exception=None, einfo=None, **kwargs):
    if not settings.DEBUG:
        logger.error(
            'Celery task {}: {}'.format(str(sender), exception),
            exc_info=einfo,
        )
