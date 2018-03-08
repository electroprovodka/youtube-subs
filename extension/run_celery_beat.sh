#!/usr/bin/env bash

# wait for PSQL server to start
sleep 30

rm /tmp/celery-beat.pid
# Start scheduler
celery -A extension.celery_app beat -l info -S django --pidfile=/tmp/celery-beat.pid

