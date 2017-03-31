#!/usr/bin/env bash

export WORKDIR="$PWD"
export PY_PATH="$(dirname "$(which python)")"
supervisord -c supervisor.conf -n