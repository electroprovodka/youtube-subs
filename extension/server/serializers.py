from __future__ import unicode_literals
from rest_framework import serializers


class TokenSerializer(serializers.Serializer):
    access_token = serializers.CharField(allow_blank=False, trim_whitespace=True)


class SubsSerializer(serializers.Serializer):
    video_id = serializers.CharField(allow_blank=False, allow_null=False, trim_whitespace=True)
    text = serializers.CharField(required=True)
    description = serializers.CharField(required=True)
    title = serializers.CharField(required=True)
