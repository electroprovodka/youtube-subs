from __future__ import unicode_literals

from functools import wraps

from requests.exceptions import HTTPError

from .responses import OkResponse, BadRequestResponse, NotFoundResponse
from .errors import AuthenticationFailedError


def handle_response(error_mapping={}, response_class=OkResponse):
    def wrapper(f):
        @wraps(f)
        def inner(*args, **kwargs):
            try:
                result = f(*args, **kwargs)
            except BaseException as e:
                klass = type(e)
                response_code = error_mapping.get(klass)
                if response_code:
                    if response_code == 404:
                        return NotFoundResponse({
                            'error': 'Resource not found',
                            'detail': e.message
                        })
                    else:
                        return BadRequestResponse({
                            'error': e.error_type,
                            'detail': e.message
                        })
                else:
                    raise e
            return response_class({'data': result})
        return inner
    return wrapper


def get_user_from_backend(backend, access_token):
    try:
        return backend.do_auth(access_token)
    except HTTPError as e:
        raise AuthenticationFailedError(message=str(e))



