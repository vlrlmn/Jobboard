# Use Python slim image as the base image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Install system dependencies and Poetry
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    curl \
    && apt-get clean \
    && curl -sSL https://install.python-poetry.org | python3 - \
    && ln -s /root/.local/bin/poetry /usr/local/bin/poetry \
    && pip install django-cors-headers

# Copy only the pyproject.toml and poetry.lock to install dependencies first
COPY pyproject.toml poetry.lock /app/

# Install Python dependencies using Poetry (including Django)
RUN poetry install --no-root --only main

# Copy the rest of the application files
COPY . /app/

# Collect static files for Django
RUN poetry run python manage.py collectstatic --noinput

# Expose the port Django runs on
EXPOSE 8000

# Set the default command to run the Django development server
CMD ["poetry", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]
