#!/bin/sh

echo "Compile tailwindcss for production"
python manage.py tailwind build

echo "Get all static files"
python manage.py collectstatic --noinput

echo "Apply database migrations"
python manage.py migrate
