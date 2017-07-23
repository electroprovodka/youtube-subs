from django.conf.urls import url

from .views import VideoViews, search, create_previews


urlpatterns = [
    url(r'^video/$', VideoViews.as_view(), name='add_video'),
    url(r'^search/$', search, name='search'),
    url(r'^previews/$', create_previews )
]
