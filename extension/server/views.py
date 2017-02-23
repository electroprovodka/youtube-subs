from __future__ import unicode_literals
from lxml import etree
import os
import re
from whoosh.index import exists_in, create_in, open_dir
from whoosh.qparser import QueryParser, MultifieldParser, OrGroup
from whoosh.writing import AsyncWriter

from django.conf import settings

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Video
from .index_schemas import YoutubeSubtitlesSchema


def open_index():
    if not os.path.exists(settings.INDEX_DIR):
        os.mkdir(settings.INDEX_DIR)

    if exists_in(settings.INDEX_DIR):
        return open_dir(settings.INDEX_DIR, schema=YoutubeSubtitlesSchema)
    return create_in(settings.INDEX_DIR, YoutubeSubtitlesSchema)


def add_document(video_id, title, description, text):
    # TODO: check
    # TODO: move index folder name
    # TODO: Lock Error
    index = open_index()
    writer = AsyncWriter(index)
    writer.add_document(text=text, title=title, id=video_id, description=description)
    writer.commit()


def search_index(query_string):
    index = open_index()
    with index.searcher() as searcher:
        query = MultifieldParser(['text', 'description', 'title', 'id'],
                                 index.schema, group=OrGroup).parse(query_string)
        results = searcher.search(query)
        # TODO: find better way
        return [hit.fields() for hit in results]


@api_view(['GET'])
def search(request):
    qs = request.GET.get('q')
    if qs:
        results = search_index(qs)
        # TODO: get data from youtube API
        return Response({'results': results}, status=status.HTTP_200_OK)
    return Response({}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def check_id(request):
    video_id = request.GET.get('id')
    exist = True
    if video_id:
        # TODO: add video somewhere to avoid race condition
        exist = Video.objects.filter(youtube_id=video_id).exists()
    return Response({'exist': exist}, status=status.HTTP_200_OK)


def extract_data(data):
    data_keys = ['subs', 'title', 'description']
    values = [data[item].encode('utf-8') for item in data_keys]
    return values


def clean_index_data(text):
    return re.sub(r'\s+', ' ', text).strip()


@api_view(['POST'])
def post_data(request):
    # TODO: check if should use .get()
    data = request.data
    video_id = data['videoId']
    if Video.objects.filter(youtube_id=video_id).exists():
        return Response({'message': 'Posted'}, status=status.HTTP_200_OK)
    xml, title, description = extract_data(data)
    text = etree.fromstring(xml).xpath('string()')

    text = clean_index_data(text)
    title = clean_index_data(title)
    description = clean_index_data(description)

    add_document(video_id, title, description, text)
    Video.objects.create(youtube_id=video_id)
    return Response({'message': 'Posted'}, status=status.HTTP_200_OK)
