from rest_framework import serializers
from .models import Availability, Appointment
from accounts.serializers import DoctorSerializer, PatientSerializer
from accounts.models import Doctor


class AvailabilitySerializer(serializers.ModelSerializer):
    doctor = DoctorSerializer(read_only=True)

    class Meta:
        model = Availability
        fields = ['id', 'doctor', 'day_of_week', 'start_time', 'end_time']


class AppointmentSerializer(serializers.ModelSerializer):
    doctor = DoctorSerializer(read_only=True)
    patient = PatientSerializer(read_only=True)
    doctor_id = serializers.PrimaryKeyRelatedField(
        queryset=Doctor.objects.all(),
        source='doctor',
        write_only=True,
        required=True
    )

    class Meta:
        model = Appointment
        fields = ['id', 'doctor', 'doctor_id', 'patient', 'date', 'time', 'status', 'notes', 'created_at']
        read_only_fields = ['patient', 'created_at']

    def validate(self, attrs):
        doctor = attrs.get('doctor')
        date = attrs.get('date')
        time = attrs.get('time')

        if doctor and date and time:
            from datetime import datetime
            appointment_datetime = datetime.combine(date, time)
            day_name = appointment_datetime.strftime('%A').lower()

            day_mapping = {
                'monday': 'monday',
                'tuesday': 'tuesday',
                'wednesday': 'wednesday',
                'thursday': 'thursday',
                'friday': 'friday',
                'saturday': 'saturday',
                'sunday': 'sunday',
            }
            day_of_week = day_mapping.get(day_name)

            availability = Availability.objects.filter(
                doctor=doctor,
                day_of_week=day_of_week,
                start_time__lte=time,
                end_time__gte=time
            ).exists()

            if not availability:
                raise serializers.ValidationError("Doctor is not available at this time")

            existing = Appointment.objects.filter(
                doctor=doctor,
                date=date,
                time=time,
                status__in=['pending', 'confirmed']
            ).exclude(id=self.instance.id if self.instance else None).exists()

            if existing:
                raise serializers.ValidationError("This time slot is already booked")

        return attrs

