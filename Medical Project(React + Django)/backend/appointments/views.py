from django.db import IntegrityError
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.core.mail import send_mail
from django.conf import settings
from .models import Availability, Appointment
from .serializers import AvailabilitySerializer, AppointmentSerializer
from rest_framework.exceptions import ValidationError
from accounts.permissions import IsAdmin, IsDoctor, IsPatient
from accounts.models import Doctor, Patient


class AvailabilityViewSet(viewsets.ModelViewSet):
    serializer_class = AvailabilitySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'admin':
            return Availability.objects.all()
        elif self.request.user.role == 'doctor':
            doctor = Doctor.objects.get(user=self.request.user)
            return Availability.objects.filter(doctor=doctor)
        doctor_id = self.request.query_params.get('doctor_id')
        if doctor_id:
            return Availability.objects.filter(doctor_id=doctor_id)
        return Availability.objects.none()

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [IsAuthenticated()]
        from accounts.permissions import IsAdminOrDoctor
        return [IsAdminOrDoctor()]

    def perform_create(self, serializer):
        if self.request.user.role == 'doctor':
            doctor = Doctor.objects.get(user=self.request.user)
            serializer.save(doctor=doctor)
        else:
            serializer.save()


class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Appointment.objects.all()
        elif user.role == 'doctor':
            doctor = Doctor.objects.get(user=user)
            return Appointment.objects.filter(doctor=doctor)
        elif user.role == 'patient':
            patient = Patient.objects.get(user=user)
            return Appointment.objects.filter(patient=patient)
        return Appointment.objects.none()

    def get_permissions(self):
        if self.action == 'create':
            return [IsPatient()]
        elif self.action in ['update', 'partial_update']:
            from accounts.permissions import IsAdminOrDoctorOrPatient
            return [IsAdminOrDoctorOrPatient()]
        return [IsAuthenticated()]

    def perform_create(self, serializer):
        patient = Patient.objects.get(user=self.request.user)
        try:
            appointment = serializer.save(patient=patient)
        except IntegrityError:
            raise ValidationError({'detail': 'This time slot is already booked. Please choose another one.'})
        self.send_booking_email(appointment)

    def send_booking_email(self, appointment):
        subject = 'Appointment Booking Confirmation'
        message = f"""
        Your appointment has been booked:
        
        Doctor: {appointment.doctor}
        Date: {appointment.date}
        Time: {appointment.time}
        Status: {appointment.status}
        
        Thank you for using our service.
        """
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL or 'noreply@medical.com',
            [appointment.patient.user.email],
            fail_silently=True,
        )

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        appointment = self.get_object()
        if request.user.role not in ['admin', 'doctor']:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        appointment.status = 'confirmed'
        appointment.save()
        return Response({'status': 'confirmed'})

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        appointment = self.get_object()
        if request.user.role not in ['admin', 'doctor']:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        appointment.status = 'cancelled'
        appointment.save()
        return Response({'status': 'cancelled'})

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        appointment = self.get_object()
        if request.user.role == 'patient' and appointment.patient.user != request.user:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        appointment.status = 'cancelled'
        appointment.save()
        return Response({'status': 'cancelled'})

