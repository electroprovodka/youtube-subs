import logging

from django.conf import settings

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from .models import Video


logger = logging.getLogger()


def _get_youtube_service():
    """
    Creates youtube service
    :return: YouTube service object
    """
    return build(settings.YOUTUBE_API_SERVICE_NAME, settings.YOUTUBE_API_VERSION,
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
        'channel_info': {'name': video['channelTitle'], 'id': video['channelId']},
        'description': video['description'],
        'title': video['title'],
        'tags': video['tags'],
        'publish_date': video['publishedAt'],
        'thumbnail': video['thumbnails']['medium']
    }


def get_videos_info(ids):
    """
    Fetches videos data
    :param ids: ids of videos to fetch data
    :return: list: videos data
    """
    youtube = _get_youtube_service()
    try:
        videos_data = youtube.videos().list(
            id=','.join(ids),
            part='snippet'
        ).execute()
    except HttpError as e:
        logger.warning('Error: '+str(e))
        # TODO: return error response
        return []

    videos = []
    previews_info = Video.objects.filter(youtube_id__in=ids).values_list('preview_created', 'preview_url')
    for item_data, preview_info in zip(videos_data['items'], previews_info):
        # TODO: catch errors
        video = extract_video_data(item_data)
        video['preview'] = {
            'exists': preview_info[0],
            'url': preview_info[1]
        }
        videos.append(video)
    return videos
