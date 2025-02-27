FROM python:3.12.8-slim-bookworm
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app
COPY . /app/
RUN apt-get update && apt-get install -y gettext libmagic1 git
RUN pip install -r requirements.txt --upgrade pip
