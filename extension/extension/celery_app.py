from __future__ import absolute_import

import logging
import os

from django.conf import settings

from celery import Celery
from celery.signals import task_failure

logger = logging.getLogger('celery')


def read_env():
    # TODO: use dot_env
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    env_file = os.path.join(base_dir, '.env')
    if os.path.exists(env_file):
        with open(env_file, 'rb') as env:
            for line in env:
                name, value = line.split('=', 1)
                if name and value:
                    os.environ.setdefault(name, value.strip())
read_env()

app = Celery('youtubesubs')

# Using a string here means the worker will not have to
# pickle the object when using Windows.
app.config_from_object('django.conf:settings',namespace='CELERY')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)


@task_failure.connect
def celery_failed(sender=None, exception=None, einfo=None, **kwargs):
    if not settings.DEBUG:
        logger.error(
            'Celery task {}: {}'.format(str(sender), exception),
            exc_info=einfo,
        )
