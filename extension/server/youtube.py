from django.conf import settings
from itertools import izip

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from .models import Video

def _get_youtube_service():
    return build(settings.YOUTUBE_API_SERVICE_NAME, settings.YOUTUBE_API_VERSION,
                 developerKey=settings.GOOGLE_API_DEVELOPER_KEY)


def get_videos_info(ids):
    youtube = _get_youtube_service()

    try:
        # TODO: Catch errors
        # TODO: what if video was deleted
        videos_data = youtube.videos().list(
            id=','.join(ids),
            part='snippet'
        ).execute()
    except HttpError:
        # TODO: return error response
        return []

    videos = []
    previews_info = Video.objects.filter(youtube_id__in=ids).values_list('preview_created', 'preview_url')
    for item, preview in izip(videos_data['items'], previews_info):
        # TODO: catch errors
        video = {}
        # TODO: work with category
        # TODO: create serializer
        snippet = item['snippet']
        video['id'] = item['id']
        video['channelInfo'] = {'name': snippet['channelTitle'], 'id': snippet['channelId']}
        video['description'] = snippet['description']
        video['title'] = snippet['title']
        video['tags'] = snippet['tags']
        video['publishDate'] = snippet['publishedAt']
        # TODO: determine what size should I use
        video['thumbnail'] = snippet['thumbnails']['medium']
        video['preview'] = dict(zip(['exist', 'url'], preview))
        videos.append(video)

    return videos
