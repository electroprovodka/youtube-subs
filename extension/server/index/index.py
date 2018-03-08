import os

from django.conf import settings

from whoosh.index import exists_in, open_dir, create_in
from whoosh.qparser import MultifieldParser, OrGroup
from whoosh.writing import AsyncWriter

from .index_schemas import YoutubeSubtitlesSchema


def open_index():
    """
    Opens index or creates it
    :return: index instance
    """
    if not os.path.exists(settings.INDEX_DIR):
        os.makedirs(settings.INDEX_DIR)

    if exists_in(settings.INDEX_DIR):
        return open_dir(settings.INDEX_DIR, schema=YoutubeSubtitlesSchema)
    return create_in(settings.INDEX_DIR, YoutubeSubtitlesSchema)


def add_document(video_id, title, description, text):
    """
    Adds single document to index
    """
    #TODO: check
    index = open_index()
    writer = AsyncWriter(index)
    writer.add_document(text=text, title=title, id=video_id, description=description)
    writer.commit()


def search_index(query_string, page):
    """
    Search index based on the query
    :param query_string: query
    :param page: requested page
    :return: tuple: results total, results on page, ids of videos on page
    """
    index = open_index()
    with index.searcher() as searcher:
        query = MultifieldParser(settings.INDEX_SEARCH_FIELDS, index.schema, group=OrGroup).parse(query_string)
        results = searcher.search_page(query, pagenum=page)
        return [hit['id'] for hit in results], results.total, results.pagecount
