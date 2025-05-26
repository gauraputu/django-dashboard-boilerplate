# default recipe
default:
    just --list

# Run database
[private]
@database:
    docker compose up -d

# Run development server
@dev:
    just database
    just update
    uv run python -m manage runserver 0.0.0.0:8000

# Install and/or update all dependencies defined in pyproject.toml
@update:
    uv sync --all-extras --all-groups --upgrade