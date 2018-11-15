"""src URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from django.conf.urls import url, include
from rest_framework import routers
from api import views
from rest_framework.urlpatterns import format_suffix_patterns

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'teams', views.TeamViewSet)
router.register(r'tournaments', views.TournamentViewSet)
router.register(r'round', views.RoundViewSet)
router.register(r'memberpoints', views.MemberPointViewSet)
router.register(r'judgepoints', views.JudgePointViewSet)
router.register(r'club', views.ClubViewSet)
router.register(r'judge', views.JudgeViewSet)
router.register(r'member', views.MemberViewSet)
router.register(r'matchup', views.MatchUpViewSet)
# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api-token-auth/',views.CustomAuthToken.as_view())
    url(r'^teamlist/', views.TeamList.as_view()),

#urlpatterns = [
#    path('admin/', admin.site.urls),
#]
