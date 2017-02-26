"""
WSGI config for extension project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.10/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application


def read_env():
    # TODO: use dot_env
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    env_file = os.path.join(base_dir, '.env')
    if os.path.exists(env_file):
        with open(env_file, 'rb') as env:
            for line in env:
                name, value = line.split('=', 1)
                if name and value:
                    os.environ.setdefault(name, value)


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "extension.settings")

read_env()
application = get_wsgi_application()
