from django.urls import path
from .views import *

app_name = 'memories'

urlpatterns = [
    path('', memory_main, name='memory_main'), 
    path('calendar/', memory_calendar, name='memory_calendar'),
    path('gallery/', memory_gallery, name='memory_gallery'),
]

