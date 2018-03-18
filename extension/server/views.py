from __future__ import unicode_literals

from rest_framework.decorators import detail_route
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from rest_framework import mixins, status

from .index import search_index
from .models import Video
from .serializers import SearchSerializer, VideoSerializer
from .youtube import get_videos_info


class VideoViewSet(mixins.ListModelMixin, mixins.CreateModelMixin, GenericViewSet):
    queryset = Video.objects.all()
    lookup_field = 'youtube_id'
    serializer_class = SearchSerializer

    def get_serializer_class(self):
        if self.action == 'create':
            return VideoSerializer
        return self.serializer_class

    def list(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        query, page = serializer.validated_data['search'], serializer.validated_data['page']
        ids, total_results, total_pages = search_index(query, page)
        videos_data = get_videos_info(ids)

        return Response({
            'videos': videos_data,
            'total': total_results,
            'pages': total_pages
        })

    @detail_route(methods=['GET'], url_path='')
    def check(self, request, youtube_id, *args, **kwargs):
        """
        Check if video already synchronized
        """
        return Response({'exist': Video.objects.filter(youtube_id=youtube_id).exists()})

    def create(self, request, *args, **kwargs):
        """
        Submit video for creation
        """
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_200_OK)
        video = serializer.save()
        return Response(status=status.HTTP_201_CREATED)




