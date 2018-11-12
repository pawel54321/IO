# Dockerfile
FROM python:3.7

WORKDIR /tmp/app

COPY requirements.txt requirements.txt

RUN virtualenv /tmp/venv && \
    . /tmp/venv/bin/activate && \
    pip install -r requirements.txt
