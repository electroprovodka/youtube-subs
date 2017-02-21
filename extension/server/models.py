from __future__ import unicode_literals

from django.db import models


class Video(models.Model):
    # TODO: check the real video id size
    # TODO: add index
    youtube_id = models.CharField(max_length=11, unique=True)
    created = models.DateTimeField(auto_now_add=True)
