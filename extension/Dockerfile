FROM python:3.6

# set working directory to /app/
WORKDIR /app/

# add requirements.txt to the image
ADD requirements.txt requirements.txt

# install python dependencies
RUN pip install -r requirements.txt

COPY . .

# create unprivileged user
RUN adduser --disabled-password --gecos '' myuser
