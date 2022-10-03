from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import MeView
from .viewsets import *

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', MeView.as_view(), name='me'),
]

router = DefaultRouter()
router.register(r'contacts', ContactViewSet)
urlpatterns += router.urls
router.register(r'players', PlayersViewSet)
urlpatterns += router.urls
router.register(r'team', TeamViewSet)
urlpatterns += router.urls
router.register(r'match', MatchViewSet )
urlpatterns += router.urls 
router.register(r'performance', PerformanceViewSet)
urlpatterns += router.urls
router.register(r'video', VideoViewSet)
urlpatterns += router.urls
router.register(r'videok', VideoKViewSet)
urlpatterns += router.urls



