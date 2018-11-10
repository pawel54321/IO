FROM jenkins:latest
User root
RUN apt-get update
RUN apt-get install -y python-pip
