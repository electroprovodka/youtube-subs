from __future__ import unicode_literals

from django.conf import settings

from rest_framework.decorators import api_view
from rest_framework.views import APIView

from .errors import InvalidRequestError
from .index import search_index, add_document, process_data
from .models import Video
from .serializers import SubsSerializer
from .utils import handle_response
from .youtube import get_videos_info


@api_view(['GET'])
@handle_response(error_mapping={
    InvalidRequestError: 400
})
def search(request):
    """
    View that handles search
    """
    qs = request.GET.get(settings.SEARCH_VAR)
    page = int(request.GET.get(settings.PAGE_VAR) or 1)
    if qs:
        total_length, total_pages, ids = search_index(qs, page)
        videos_data = get_videos_info(ids)
        return {'videos': videos_data, 'total_length': total_length, 'total_pages': total_pages}
    raise InvalidRequestError(message='Missing query')


@api_view(['GET'])
def create_previews(request):
    from .tasks import create_previews
    create_previews.apply_async()


class VideoViews(APIView):
    @handle_response()
    def get(self, request, format=None):
        """
        View that allow to check if video is already indexed
        """
        # TODO: enhance logic
        video_id = request.GET.get('id')
        exist = True
        if video_id:
            exist = Video.objects.filter(youtube_id=video_id).exists()
        return {'exist': exist}

    @handle_response(error_mapping={
        InvalidRequestError: 400
    })
    def post(self, request, format=None):
        """
        View that allow to add video to index
        """
        subs_data = SubsSerializer(data=request.data)
        if subs_data.is_valid():
            data = subs_data.validated_data
            video_id = data['video_id']
            if not Video.objects.filter(youtube_id=video_id).exists():
                data = process_data(data)

                add_document(video_id, **data)
                Video.objects.create(youtube_id=video_id)
            return {'created': True}
        raise InvalidRequestError(message='Data is invalid')
