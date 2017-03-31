from __future__ import unicode_literals

from django.db import models
from django.utils.encoding import python_2_unicode_compatible


@python_2_unicode_compatible
class Video(models.Model):
    # TODO: check the real video id size
    # TODO: add index
    youtube_id = models.CharField(max_length=11, unique=True)
    created = models.DateTimeField(auto_now_add=True)
    preview_url = models.CharField(max_length=200, default=None, null=True)
    # TODO: enchance speed
    preview_created = models.BooleanField(default=False)

    def __str__(self):
        return 'Video {}'.format(self.youtube_id)
