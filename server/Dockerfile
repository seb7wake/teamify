FROM python:3.9.1-alpine
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
WORKDIR /server
COPY requirements.txt ./
COPY manage.py ./
RUN apk add --no-cache postgresql-libs && \
  apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
  python3 -m pip install -r requirements.txt && \
  apk --purge del .build-deps
COPY . ./
EXPOSE 80