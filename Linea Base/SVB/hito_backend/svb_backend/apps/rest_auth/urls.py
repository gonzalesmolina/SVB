from django.urls import path

from apps.rest_auth.views import (
    login, logout, registration, UserProfileListView, UserProfileDetailView
)


urlpatterns = [
    path('login/', login, name='login'),
    path('register/', registration, name='registration'),
    path('logout/', logout, name='logout'),
    path('userprofiles/', UserProfileListView().as_view(),
         name='userprofiles-list'),
    path('userprofiles/<int:pk>', UserProfileDetailView().as_view(),
         name='userprofiles-detail')
]
