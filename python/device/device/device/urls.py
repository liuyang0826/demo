from . import views
from django.urls import re_path

urlpatterns = [
    re_path(r'^user_view/$', views.UserView.as_view()),
]
