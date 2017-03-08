from __future__ import unicode_literals

from django.db import models
# from django.contrib.auth import User

# from oauth2client.django_orm import FlowField, CredentialsField


class Video(models.Model):
    # TODO: check the real video id size
    # TODO: add index
    youtube_id = models.CharField(max_length=11, unique=True)
    created = models.DateTimeField(auto_now_add=True)


# class FlowModel(models.Model):
#     id = models.ForeignKey(User, primary_key=True)
#     flow = FlowField()
#
#
# class CredentialsModel(models.Model):
#     id = models.ForeignKey(User, primary_key=True)
#     credentials = CredentialsField()