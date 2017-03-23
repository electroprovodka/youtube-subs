import os

from django.conf import settings

from whoosh.index import exists_in, open_dir, create_in
from whoosh.qparser import MultifieldParser, OrGroup
from whoosh.writing import AsyncWriter

from .index_schemas import YoutubeSubtitlesSchema, search_fields


def open_index():
    if not os.path.exists(settings.INDEX_DIR):
        os.mkdir(settings.INDEX_DIR)

    if exists_in(settings.INDEX_DIR):
        return open_dir(settings.INDEX_DIR, schema=YoutubeSubtitlesSchema)
    return create_in(settings.INDEX_DIR, YoutubeSubtitlesSchema)


def add_document(video_id, title, description, text):
    # TODO: check
    index = open_index()
    writer = AsyncWriter(index)
    writer.add_document(text=text, title=title, id=video_id, description=description)
    writer.commit()


def search_index(query_string, page):
    index = open_index()
    with index.searcher() as searcher:
        query = MultifieldParser(search_fields, index.schema, group=OrGroup).parse(query_string)
        results = searcher.search_page(query, pagenum=page)
        return results.total, results.pagecount, [hit['id'] for hit in results]
