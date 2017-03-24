from __future__ import unicode_literals

from django.conf import settings

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from social_django.utils import psa

from .auth_helper import get_new_json_token, refresh_jwt
from .errors import AuthenticationFailedError, InvalidRequestError
from .index import search_index, add_document, process_data
from .models import Video
from .serializers import SubsSerializer, TokenSerializer
from .utils import handle_response, get_user_from_backend

from .youtube import get_videos_info


@api_view(['GET'])
# @permission_classes([AllowAny])
@refresh_jwt
@handle_response(error_mapping={
    InvalidRequestError: 400
})
def search(request):
    qs = request.GET.get(settings.SEARCH_VAR)
    page = int(request.GET.get(settings.PAGE_VAR) or 1)
    if qs:
        total_length, total_pages, ids = search_index(qs, page)
        videos_data = get_videos_info(ids)
        return {'videos': videos_data, 'total_length': total_length, 'total_pages': total_pages}
    raise InvalidRequestError(message='Missing query')


@api_view(['GET'])
# @permission_classes([AllowAny])
@handle_response()
def check_id(request):
    # TODO: enhance logic
    video_id = request.GET.get('id')
    exist = True
    if video_id:
        # TODO: add video somewhere to avoid race condition
        exist = Video.objects.filter(youtube_id=video_id).exists()
    return {'exist': exist}


@api_view(['POST'])
# @permission_classes([AllowAny])
@handle_response(error_mapping={
    InvalidRequestError: 400
})
def post_data(request):
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


@api_view(['POST'])
# @permission_classes([AllowAny])
@psa()
# TODO: change error codes
@handle_response(error_mapping={
    AuthenticationFailedError: 401,
    InvalidRequestError: 400
})
def exchange_oauth2_token(request, backend):
    token_data = TokenSerializer(data=request.data)
    if token_data.is_valid():
        user = get_user_from_backend(request.backend, token_data.validated_data['access_token'])
        if user:
            if user.is_active:
                return {'token': get_new_json_token(user)}
            else:
                raise AuthenticationFailedError(message='User is inactive')
        else:
            raise AuthenticationFailedError(message='Bad user. I do not know what to place here')
    else:
        raise InvalidRequestError()


# @api_view(['POST'])
# @permission_classes([AllowAny])
# def exchange_token

