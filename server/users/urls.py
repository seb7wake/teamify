from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    # path('', views.UserView.index, name='index'),
    # path('<int:user_id>/edit', views.UserView.edit, name='edit'),
    # path('add/', views.UserView.add, name='vote'),
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)