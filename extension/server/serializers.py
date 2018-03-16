from __future__ import unicode_literals
from rest_framework import serializers

from .models import Video
from .index import add_document, process_data


class VideoSerializer(serializers.ModelSerializer):
    text = serializers.CharField()
    title = serializers.CharField()
    description = serializers.CharField()

    class Meta:
        model = Video
        fields = ('youtube_id', 'text', 'description', 'title')

    def validate_youtube_id(self, value):
        if Video.objects.filter(youtube_id=value).exists():
            raise serializers.ValidationError('Video already exists')
        return value

    def validate(self, attrs):
        attrs.update(process_data(attrs))
        return attrs

    def create(self, validated_data):
        data = validated_data.copy()
        youtube_id = data.pop('youtube_id')
        add_document(youtube_id, **data)
        return Video.objects.create(youtube_id=youtube_id)


class SearchSerializer(serializers.Serializer):
    search = serializers.CharField()
    page = serializers.IntegerField(required=False, default=1)
