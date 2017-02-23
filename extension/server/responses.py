from rest_framework import status
from rest_framework.response import Response


class OkResponse(Response):
    def __init__(self, data=None, template_name=None, headers=None,
                 exception=False, content_type=None):
        super(OkResponse, self).__init__(
            data=data, status=status.HTTP_200_OK, template_name=template_name,
            headers=headers, exception=exception, content_type=content_type)


class NotFoundResponse(Response):
    def __init__(self, data=None, template_name=None, headers=None,
                 exception=False, content_type=None):
        super(NotFoundResponse, self).__init__(
            data=data, status=status.HTTP_404_NOT_FOUND, template_name=template_name,
            headers=headers, exception=exception, content_type=content_type)


class BadRequestResponse(Response):
    def __init__(self, data=None, template_name=None, headers=None,
                 exception=False, content_type=None):
        super(BadRequestResponse, self).__init__(
            data=data, status=status.HTTP_400_BAD_REQUEST, template_name=template_name,
            headers=headers, exception=exception, content_type=content_type)