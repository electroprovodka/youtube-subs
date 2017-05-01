from django.conf.urls import url

from .views import VideoViews, search


urlpatterns = [
    url(r'^video/$', VideoViews.as_view(), name='add_video'),
    url(r'^search/$', search, name='search'),
]
