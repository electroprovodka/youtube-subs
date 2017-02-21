from rest_framework import serializers


class VideoIdSerializer(serializers.Serializer):
    exist = serializers.BooleanField()