# use base python image with python 2.7
FROM python:2.7

RUN pip install gunicorn

# add requirements.txt to the image
ADD requirements.txt /app/requirements.txt

# set working directory to /app/
WORKDIR /app/

# install python dependencies
RUN pip install -r requirements.txt

COPY . /app/
# create unprivileged user
RUN adduser --disabled-password --gecos '' myuser
RUN chmod +x /app/run_server.sh
CMD ["/app/run_server.sh"]