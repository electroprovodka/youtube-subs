class ApiError(BaseException):
    error_type = 'APIError'
    message = 'Api error'

    def __init__(self, message=None, *args, **kwargs):
        super(ApiError, self).__init__(*args, **kwargs)
        if message:
            self.message = message


class NotFoundError(ApiError):
    error_type = 'NotFoundError'
    message = 'Resource not found'


class InvalidRequestError(ApiError):
    error_type = 'InvalidRequest'
    message = 'Request data is invalid'
