from __future__ import unicode_literals

from django.conf import settings

from rest_framework.decorators import api_view

from .index import search_index, add_document, process_data
from .models import Video
from .responses import OkResponse, BadRequestResponse
from .youtube import get_videos_info


@api_view(['GET'])
def search(request):
    qs = request.GET.get(settings.SEARCH_VAR)
    page = int(request.GET.get(settings.PAGE_VAR) or 1)
    if qs:
        total_length, total_pages, ids = search_index(qs, page)
        videos_data = get_videos_info(ids)
        return OkResponse({'data': {'videos': videos_data, 'total_length': total_length, 'total_pages': total_pages}})
    return BadRequestResponse()


@api_view(['GET'])
def check_id(request):
    # TODO: enhance logic
    video_id = request.GET.get('id')
    exist = True
    if video_id:
        # TODO: add video somewhere to avoid race condition
        exist = Video.objects.filter(youtube_id=video_id).exists()
    return OkResponse({'exist': exist})


@api_view(['POST'])
def post_data(request):
    data = request.data
    video_id = data['videoId']
    if not Video.objects.filter(youtube_id=video_id).exists():
        data = process_data(data)

        add_document(video_id, **data)
        Video.objects.create(youtube_id=video_id)
    return OkResponse({'created': True})
