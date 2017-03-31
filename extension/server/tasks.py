import logging
import time
import traceback

from celery import shared_task

from .models import Video
from .previews import create_preview

logger = logging.getLogger('celery')


@shared_task(ignore_result=True, queue='periodic', name='server.tasks.test')
def test():
    time.sleep(3)
    logger.info('Task')


@shared_task(ignore_results=True, queue='periodic', routing_key='periodic.server.tasks.create_previews')
def create_previews():
    # TODO: handle errors
    # TODO: prevent simultaneous execution of this task
    videos = Video.objects.filter(preview_created=False)
    for video in videos:
        try:
            url = create_preview(video.youtube_id)
        except Exception as e:
            logger.error('Error while creating preview: {}'.format(e))
            logger.error(traceback.format_exc())

        video.preview_url = url
        video.preview_created = True
        video.save()
        logger.debug('Url for video {}: {}'.format(video.youtube_id, url))


