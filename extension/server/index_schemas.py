from whoosh import fields
from whoosh.analysis import analyzers


class YoutubeSubtitlesSchema(fields.SchemaClass):
    text = fields.TEXT(analyzer=analyzers.StemmingAnalyzer())
    # TODO: field boost
    id = fields.ID(stored=True, unique=True, field_boost=2.0)

