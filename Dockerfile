FROM python:3.12.10-slim-bookworm AS base
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app
COPY . /app/
RUN apt-get update && apt-get install -y \
    gettext \
    libmagic1 \
    git
    
RUN pip install -r requirements.txt --upgrade pip
RUN pip install uv==0.6.14

# Copy Node.js from official Node.js image
FROM node:20.14-bookworm-slim AS node_source

FROM base
COPY --from=node_source /usr/local /usr/local

# Install js dependency
RUN npm i
# Setup flyonui
# https://flyonui.com/framework-integrations/django/
RUN cp /app/node_modules/flyonui/flyonui.js /app/src/static/plugins/flyonui-2.0.1/flyonui.js