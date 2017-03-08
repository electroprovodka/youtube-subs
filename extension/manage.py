#!/usr/bin/env python
import os
import sys


def read_env():
    # TODO: use dot_env
    base_dir = os.path.dirname(os.path.abspath(__file__))
    env_file = os.path.join(base_dir, '.env')
    if os.path.exists(env_file):
        with open(env_file, 'rb') as env:
            for line in env:
                name, value = line.split('=', 1)
                if name and value:
                    os.environ.setdefault(name, value.strip())


if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "extension.settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError:
        # The above import may fail for some other reason. Ensure that the
        # issue is really that Django is missing to avoid masking other
        # exceptions on Python 2.
        try:
            import django
        except ImportError:
            raise ImportError(
                "Couldn't import Django. Are you sure it's installed and "
                "available on your PYTHONPATH environment variable? Did you "
                "forget to activate a virtual environment?"
            )
        raise
    read_env()
    execute_from_command_line(sys.argv)
