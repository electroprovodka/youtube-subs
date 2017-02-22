from rest_framework import serializers


class SearchResultsSerializer(serializers.Serializer):
    id = serializers.CharField(max_length=11)