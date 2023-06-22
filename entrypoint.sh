#!/bin/bash

set -e -u

[[ $USERID ]] && usermod --uid "${USERID}" www-data

exec "$@"
