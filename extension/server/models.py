from __future__ import unicode_literals

from django.db import models


class Video(models.Model):
    youtube_id = models.CharField(max_length=11, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    preview_url = models.CharField(max_length=200, default=None, null=True)
    has_preview = models.BooleanField(default=False)

    def __str__(self):
        return 'Video {}'.format(self.youtube_id)
