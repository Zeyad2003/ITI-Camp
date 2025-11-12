from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User, Doctor, Patient, Specialty


class SpecialtySerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialty
        fields = ['id', 'name', 'description']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'is_approved']
        read_only_fields = ['is_approved']


class DoctorSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    specialty = SpecialtySerializer(read_only=True)
    specialty_id = serializers.PrimaryKeyRelatedField(
        queryset=Specialty.objects.all(),
        source='specialty',
        write_only=True,
        required=False
    )

    class Meta:
        model = Doctor
        fields = ['id', 'user', 'specialty', 'specialty_id', 'bio', 'phone', 'address']


class PatientSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Patient
        fields = ['id', 'user', 'phone', 'address', 'date_of_birth']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=['doctor', 'patient'])

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2', 'first_name', 'last_name', 'role']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Passwords don't match"})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        password = validated_data.pop('password')
        role = validated_data.pop('role')
        user = User.objects.create_user(**validated_data, role=role)
        user.set_password(password)
        user.save()

        if role == 'doctor':
            Doctor.objects.create(user=user)
        elif role == 'patient':
            Patient.objects.create(user=user)

        return user

