#!/bin/sh

# wait for PSQL server to start
sleep 20

# migrate db, so we have the latest db schema
python manage.py migrate
# start development server on public ip interface, on port 8000

#gunicorn extension.wsgi:application -w 5 -b :8000
python manage.py runserver 0.0.0.0:8000 # --noreload
