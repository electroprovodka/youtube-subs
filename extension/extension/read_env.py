import os

from django.conf import settings


def read_env():
    env_file = os.path.join(settings.BASE_DIR, '.env')
    if os.path.exists(env_file):
        with open(env_file, 'rb') as env:
            for line in env:
                line = line.strip()
                if not line or line.startswith('#'):
                    continue
                name, value = line.split('=', 1)
                if name and value:
                    os.environ.setdefault(name, value.strip())