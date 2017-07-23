#!/usr/bin/env bash

# wait for PSQL server to start
sleep 30

export WORKDIR="$PWD"
export PY_PATH="$(dirname "$(which python)")"
supervisord -c supervisor.conf -n