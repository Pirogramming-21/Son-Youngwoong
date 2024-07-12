from django.urls import path
from .views import *

app_name = 'reviews'

urlpatterns = [
    path('', reiview_list, name='review_list'),
]