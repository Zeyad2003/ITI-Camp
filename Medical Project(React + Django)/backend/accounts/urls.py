from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    RegisterViewSet, UserViewSet, DoctorViewSet,
    PatientViewSet, SpecialtyViewSet
)

router = DefaultRouter()
router.register(r'register', RegisterViewSet, basename='register')
router.register(r'users', UserViewSet, basename='user')
router.register(r'doctors', DoctorViewSet, basename='doctor')
router.register(r'patients', PatientViewSet, basename='patient')
router.register(r'specialties', SpecialtyViewSet, basename='specialty')

urlpatterns = [
    path('', include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

