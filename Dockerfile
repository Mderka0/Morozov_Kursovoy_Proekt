FROM python:3.12
# from node:alpine3.20

WORKDIR /app

RUN pip install poetry

COPY ./backend ./backend

WORKDIR backend 
RUN poetry install

CMD poetry run python main.py


