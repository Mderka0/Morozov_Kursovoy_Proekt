FROM python:3.12
# from node:alpine3.20

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

WORKDIR /app

RUN pip install poetry

COPY ./backend ./backend

WORKDIR backend 
RUN poetry install
WORKDIR ..
COPY ./frontend ./frontend
WORKDIR frontend

# FROM node
# RUN npm install


CMD npm start --host 0.0.0.0 & poetry run python ../backend/main.py 
