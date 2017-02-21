from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Video


@api_view(['GET'])
def check_id(request):
    video_id = request.GET.get('id')
    exist = True
    if video_id:
        # TODO: add video somewhere to avoid race condition
        exist = Video.objects.filter(youtube_id=id).exists()
    return Response({'exist': exist}, status=status.HTTP_200_OK)


@api_view(['POST'])
def post_data(request):
    print(request.data['subs'][:100])
    return Response({'message': 'Posted'}, status=status.HTTP_200_OK)
