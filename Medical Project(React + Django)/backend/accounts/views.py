from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .models import Doctor, Patient, Specialty
from .serializers import (
    UserSerializer, DoctorSerializer, PatientSerializer,
    RegisterSerializer, SpecialtySerializer
)
from .permissions import IsAdmin, IsDoctor, IsPatient

User = get_user_model()


class RegisterViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def create(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': UserSerializer(user).data,
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == 'me':
            return [IsAuthenticated()]
        return [IsAdmin()]

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        user = self.get_object()
        user.is_approved = True
        user.save()
        return Response({'status': 'approved'})

    @action(detail=True, methods=['post'])
    def block(self, request, pk=None):
        user = self.get_object()
        user.is_approved = False
        user.save()
        return Response({'status': 'blocked'})


class SpecialtyViewSet(viewsets.ModelViewSet):
    queryset = Specialty.objects.all()
    serializer_class = SpecialtySerializer
    permission_classes = [IsAdmin]


class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'admin':
            return Doctor.objects.all()
        elif self.request.user.role == 'doctor':
            return Doctor.objects.filter(user=self.request.user)
        return Doctor.objects.filter(user__is_approved=True)

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [IsAuthenticated()]
        elif self.action in ['update', 'partial_update']:
            from .permissions import IsAdminOrDoctor
            return [IsAdminOrDoctor()]
        elif self.action == 'me':
            return [IsAuthenticated()]
        return [IsAdmin()]

    @action(detail=False, methods=['get'])
    def me(self, request):
        doctor = Doctor.objects.get(user=request.user)
        serializer = self.get_serializer(doctor)
        return Response(serializer.data)


class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'admin':
            return Patient.objects.all()
        elif self.request.user.role == 'patient':
            return Patient.objects.filter(user=self.request.user)
        return Patient.objects.all()

    def get_permissions(self):
        if self.action in ['list']:
            return [IsAdmin()]
        elif self.action in ['retrieve', 'update', 'partial_update']:
            from .permissions import IsOwnerOrAdmin
            return [IsOwnerOrAdmin()]
        elif self.action == 'me':
            return [IsAuthenticated()]
        return [IsAdmin()]

    @action(detail=False, methods=['get'])
    def me(self, request):
        patient = Patient.objects.get(user=request.user)
        serializer = self.get_serializer(patient)
        return Response(serializer.data)

