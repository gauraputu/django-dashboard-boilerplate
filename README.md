# Django Dashboard Boilerplate
Use this project to bootstrap a django app

## Prerequisite
- Docker
- [UV](https://docs.astral.sh/uv/getting-started/installation/)

## Development
Note: 
Run all the below command on the same directory with `docker-compose.yaml`


1. Spin up database with the following if it's not already exist

    ```
    docker compose up -d
    ```

2. Run developement server with the following command
    ```
    uv run python -m manage runserver 0.0.0.0:8000
    ```

3. On the first time running, run migrations with
    ```
    uv run python -m manage migrate
    ```

4. Then create a superuser with
    ```
    uv run python -m manage createsuperuser
    ```
