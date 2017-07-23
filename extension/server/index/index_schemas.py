from whoosh import fields
from whoosh.analysis import analyzers


__all__ = ['YoutubeSubtitlesSchema']


class YoutubeSubtitlesSchema(fields.SchemaClass):
    text = fields.TEXT(analyzer=analyzers.StemmingAnalyzer())
    # TODO: field boost
    # TODO: add ngram analyzer over title and description
    title = fields.TEXT(field_boost=2.5)
    description = fields.TEXT(analyzer=analyzers.StemmingAnalyzer(), field_boost=2.0)

    id = fields.ID(stored=True, unique=True, field_boost=3.0)
