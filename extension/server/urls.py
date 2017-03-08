from django.conf.urls import url

from .views import check_id, post_data, search, exchange_oauth2_token


urlpatterns = [
    url(r'^check_id/', check_id),
    url(r'^post/$', post_data),
    url(r'^search/$', search),
    url(r'social/(?P<backend>[^/]+)/$', exchange_oauth2_token)
    ]