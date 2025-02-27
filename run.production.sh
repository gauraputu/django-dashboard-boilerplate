#!/bin/sh

echo "Get all static files"
python manage.py collectstatic --noinput

echo "Apply database migrations"
python manage.py migrate

echo "Load Fixtures"
python manage.py loaddata \
    src/fixtures/role.json
