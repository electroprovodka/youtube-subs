import logging

from celery import shared_task, group

from .models import Video
from .previews import Previewer

logger = logging.getLogger(__name__)


@shared_task(queue='manual', name='server.tasks.create_preview')
def create_preview(youtube_id):
    try:
        url = Previewer.create(youtube_id)
        logger.debug('Url for video {}: {}'.format(youtube_id, url))
        return url
    except Exception as e:
        logger.error('Error while creating preview: {}'.format(e))


@shared_task(ignore_results=True, queue='manual', name='server.tasks.store_preview_url')
def store_preview_url(url, video_id):
    if url is None:
        return
    Video.objects.filter(id=video_id, has_preview=False).update(preview_url=url, has_preview=True)


@shared_task(ignore_results=True, queue='periodic', name='server.tasks.create_previews')
def create_previews():
    """
    Task that is triggered periodically. Get all videos that do not have previews and create previews for them
    """
    # TODO: prevent simultaneous execution of this task
    videos = Video.objects.filter(has_preview=False)
    gr = group(
        (create_preview.s(video.youtube_id) | store_preview_url.s(video.id)) for video in videos
    )
    gr.apply_async()


