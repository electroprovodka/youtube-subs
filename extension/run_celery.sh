#!/usr/bin/env bash

# wait for PSQL server to start
sleep 30

rm /tmp/celery-worker.pid

celery -A extension.celery_app worker -E -c 2 -Ofair -l info -Q manual,periodic --pidfile=/tmp/celery-worker.pid --logfile=/tmp/%n.log
