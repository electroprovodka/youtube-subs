from django.conf import settings

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError


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
    for item in videos_data['items']:
        # TODO: catch errors
        video = {}
        # TODO: work with category
        snippet = item['snippet']
        video['id'] = item['id']
        video['channelInfo'] = {'name': snippet['channelTitle'], 'id': snippet['channelId']}
        video['description'] = snippet['description']
        video['title'] = snippet['title']
        video['tags'] = snippet['tags']
        video['publishDate'] = snippet['publishedAt']
        # TODO: determine what size should I use
        video['thumbnail'] = snippet['thumbnails']['medium']
        videos.append(video)

    return videos
