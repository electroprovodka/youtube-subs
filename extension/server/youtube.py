import logging

from django.conf import settings

from rest_framework.exceptions import APIException

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from .models import Video


logger = logging.getLogger()


YouTubeService = build(settings.YOUTUBE_API_SERVICE_NAME, settings.YOUTUBE_API_VERSION,
                       developerKey=settings.GOOGLE_API_DEVELOPER_KEY)


def extract_video_data(data):
    """
    Extract video data from youtube response
    :param data: youtube response
    :return: dict: video data
    """
    video = data['snippet']
    return {
        'id': data['id'],
        'channel_name': video['channelTitle'],
        'channel_id': video['channelId'],
        'description': video['description'],
        'title': video['title'],
        'tags': video['tags'],
        'published_at': video['publishedAt'],
        'thumbnail': video['thumbnails']['medium']
    }


def get_videos_info(ids):
    """
    Fetches videos data
    :param ids: ids of videos to fetch data
    :return: list: videos data
    """
    try:
        videos_data = YouTubeService.videos().list(
            id=','.join(ids),
            part='snippet'
        ).execute()
    except HttpError as e:
        logger.error('Youtube fetch error: {}'.format(e), extra={'ids': ids})
        raise APIException('Can not fetch videos data')

    videos = []
    previews_info = Video.objects.filter(youtube_id__in=ids).values_list('has_preview', 'preview_url')
    for item_data, (has_preview, url) in zip(videos_data['items'], previews_info):
        video = extract_video_data(item_data)
        video.update({
            'preview_exists': has_preview,
            'preview_url': url
        })
        videos.append(video)
    return videos
