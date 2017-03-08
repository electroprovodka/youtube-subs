from django.conf import settings

from rest_framework_jwt.authentication import BaseJSONWebTokenAuthentication
from rest_framework_jwt.settings import api_settings


class JWTAuth(BaseJSONWebTokenAuthentication):
    def get_jwt_value(self, request):
        return request.COOKIES.get(settings.JWT_COOKIE_KEY)


def get_new_json_token(user):
    jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
    jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

    payload = jwt_payload_handler(user)
    token = jwt_encode_handler(payload)

    return token


def refresh_jwt(func):
    def inner(request, *args, **kwargs):

        response = func(request, *args, **kwargs)
        # TODO: check for anon user
        user = request.user

        token = get_new_json_token(user)
        response.set_cookie(settings.JWT_COOKIE_KEY, token)
        return response
    return inner
