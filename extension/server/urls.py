from django.conf.urls import url

from .views import check_id, post_data


urlpatterns = [
    url(r'^check_id/', check_id),
    url(r'^post/$', post_data)
]