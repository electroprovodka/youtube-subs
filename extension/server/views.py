from __future__ import unicode_literals
from lxml import etree
import os
import re
from whoosh.index import exists_in, create_in, open_dir
from whoosh.qparser import QueryParser

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


def add_document(video_id, title, text):
    # TODO: check
    # TODO: move index folder name
    index = open_index()
    writer = index.writer()
    writer.add_document(text=text, title=title, id=video_id)
    writer.commit()


def search_index(query_string):
    index = open_index()
    with index.searcher() as searcher:
        query = QueryParser("text", index.schema).parse(query_string)
        results = searcher.search(query)
        # TODO: find better way
        return [hit['id'] for hit in results]


@api_view(['GET'])
def search(request):
    qs = request.GET.get('q')
    if qs:
        results = search_index(qs)
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


@api_view(['POST'])
def post_data(request):
    # TODO: check if should use .get()
    data = request.data
    video_id = data['videoId']
    if Video.objects.filter(youtube_id=video_id).exists():
        return Response({'message': 'Posted'}, status=status.HTTP_200_OK)
    xml, title = data['subs'].encode('utf-8'), data['title'].encode('utf-8')
    text = etree.fromstring(xml).xpath('string()')
    text = re.sub(r'\s+', ' ', text).strip()
    title = re.sub(r'\s+', ' ', title).strip()
    add_document(video_id, title, text)
    Video.objects.create(youtube_id=video_id)
    return Response({'message': 'Posted'}, status=status.HTTP_200_OK)
