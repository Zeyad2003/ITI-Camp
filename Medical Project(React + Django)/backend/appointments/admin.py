from django.contrib import admin
from .models import Availability, Appointment


@admin.register(Availability)
class AvailabilityAdmin(admin.ModelAdmin):
    list_display = ['doctor', 'day_of_week', 'start_time', 'end_time']


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ['doctor', 'patient', 'date', 'time', 'status']
    list_filter = ['status', 'date']

