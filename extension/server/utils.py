from __future__ import unicode_literals
from functools import wraps

from .responses import OkResponse, BadRequestResponse, NotFoundResponse


def handle_response(error_mapping={}, response_class=OkResponse):
    """
    Decorator that provide a cleaner way to handle errors.
    Wrapped view should return response dict
    :param error_mapping: dict with keys - ErrorClasses - and values - response codes
    :param response_class: class of successful response
    :return:
    """
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
