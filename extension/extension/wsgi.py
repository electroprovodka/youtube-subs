"""
WSGI config for extension project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.10/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

from read_env import read_env

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "extension.settings")

path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env')
read_env(path)
application = get_wsgi_application()
