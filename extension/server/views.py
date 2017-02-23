from __future__ import unicode_literals
from lxml import etree
import re

from django.conf import settings

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Video
from .index import search_index, add_document
from .input_processing import process_data
from .responses import OkResponse, BadRequestResponse


@api_view(['GET'])
def search(request):
    qs = request.GET.get(settings.SEARCH_VAR)
    if qs:
        results = search_index(qs)
        # TODO: get data from youtube API
        return OkResponse({'results': results})
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
