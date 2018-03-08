from django.conf.urls import url

from rest_framework.routers import SimpleRouter

from .views import VideoViewSet


router = SimpleRouter()
router.register('video', VideoViewSet)


urlpatterns = router.urls
