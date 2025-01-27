# image_api/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('generate-image/', views.generate_image, name='generate-image'),
]
