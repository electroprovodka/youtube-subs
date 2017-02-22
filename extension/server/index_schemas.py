from whoosh import fields
from whoosh.analysis import analyzers


class YoutubeSubtitlesSchema(fields.SchemaClass):
    text = fields.TEXT(analyzer=analyzers.StemmingAnalyzer())
    # TODO: field boost
    title = fields.TEXT(stored=True, field_boost=2.0)
    id = fields.ID(stored=True, unique=True, field_boost=3.0)

