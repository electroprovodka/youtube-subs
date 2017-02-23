from whoosh import fields
from whoosh.analysis import analyzers


class YoutubeSubtitlesSchema(fields.SchemaClass):
    text = fields.TEXT(analyzer=analyzers.StemmingAnalyzer())
    # TODO: field boost
    # TODO: add ngram analyzer over title and description
    title = fields.TEXT(stored=True, field_boost=2.5)
    description = fields.TEXT(analyzer=analyzers.StemmingAnalyzer(), field_boost=2.0)

    id = fields.ID(stored=True, unique=True, field_boost=3.0)

    @property
    def search_fields(self):
        return ['text', 'title', 'description', 'id']
