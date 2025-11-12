from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Doctor, Patient, Specialty


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['username', 'email', 'role', 'is_approved', 'is_staff']
    list_filter = ['role', 'is_approved', 'is_staff']
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Custom Fields', {'fields': ('role', 'is_approved')}),
    )


@admin.register(Specialty)
class SpecialtyAdmin(admin.ModelAdmin):
    list_display = ['name', 'description']


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ['user', 'specialty', 'phone']


@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ['user', 'phone', 'date_of_birth']

