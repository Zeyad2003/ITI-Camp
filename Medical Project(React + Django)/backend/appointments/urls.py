from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AvailabilityViewSet, AppointmentViewSet

router = DefaultRouter()
router.register(r'availabilities', AvailabilityViewSet, basename='availability')
router.register(r'appointments', AppointmentViewSet, basename='appointment')

urlpatterns = [
    path('', include(router.urls)),
]

