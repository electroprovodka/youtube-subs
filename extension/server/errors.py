class ApiError(BaseException):
    error_type = 'APIError'
    message = 'Api error'

    def __init__(self, message, *args, **kwargs):
        super(ApiError, self).__init__(*args, **kwargs)
        self.message = message


class NotFoundError(ApiError):
    error_type = 'NotFoundError'
    message = 'Resource not found'


class AuthenticationFailedError(ApiError):
    error_type = 'AuthenticationFailed'
    message = 'Authentication failed'


class InvalidRequestError(ApiError):
    error_type = 'InvalidRequest'
    message = 'Request data is invalid'
