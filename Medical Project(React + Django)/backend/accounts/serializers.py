from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User, Doctor, Patient, Specialty


class SpecialtySerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialty
        fields = ['id', 'name', 'description', 'is_approved']
        read_only_fields = ['id', 'is_approved']


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
    specialty_name = serializers.CharField(write_only=True, required=False, allow_blank=False)
    specialty_description = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = Doctor
        fields = [
            'id',
            'user',
            'specialty',
            'specialty_id',
            'specialty_name',
            'specialty_description',
            'bio',
            'phone',
            'address',
        ]

    def _extract_specialty(self, validated_data):
        specialty = validated_data.pop('specialty', None)
        specialty_name = (validated_data.pop('specialty_name', '') or '').strip()
        specialty_description = (validated_data.pop('specialty_description', '') or '').strip()
        if specialty:
            return specialty
        if specialty_name:
            request = self.context.get('request')
            is_admin = getattr(request.user, 'role', '') == 'admin' if request else False
            defaults = {'description': specialty_description, 'is_approved': is_admin}
            specialty, created = Specialty.objects.get_or_create(name=specialty_name, defaults=defaults)
            updates = []
            if specialty_description and specialty.description != specialty_description:
                specialty.description = specialty_description
                updates.append('description')
            if is_admin and not specialty.is_approved:
                specialty.is_approved = True
                updates.append('is_approved')
            if updates:
                specialty.save(update_fields=updates)
            return specialty
        return None

    def create(self, validated_data):
        specialty = self._extract_specialty(validated_data)
        if specialty is not None:
            validated_data['specialty'] = specialty
        return super().create(validated_data)

    def update(self, instance, validated_data):
        specialty = self._extract_specialty(validated_data)
        if specialty is not None:
            validated_data['specialty'] = specialty
        return super().update(instance, validated_data)


class PatientSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Patient
        fields = ['id', 'user', 'phone', 'address', 'date_of_birth']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=['doctor', 'patient'])
    specialty_id = serializers.PrimaryKeyRelatedField(
        queryset=Specialty.objects.filter(is_approved=True),
        write_only=True,
        required=False,
        allow_null=True
    )
    specialty_name = serializers.CharField(write_only=True, required=False, allow_blank=False)
    specialty_description = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
            'password2',
            'first_name',
            'last_name',
            'role',
            'specialty_id',
            'specialty_name',
            'specialty_description',
        ]

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Passwords don't match"})
        role = attrs.get('role')
        specialty_id = self.initial_data.get('specialty_id')
        specialty_name = (self.initial_data.get('specialty_name') or '').strip()
        if role == 'doctor' and not specialty_id and not specialty_name:
            raise serializers.ValidationError({"specialty": "Please select a specialty or request a new one."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        password = validated_data.pop('password')
        role = validated_data.pop('role')
        specialty = validated_data.pop('specialty_id', None)
        specialty_name = (validated_data.pop('specialty_name', '') or '').strip()
        specialty_description = (validated_data.pop('specialty_description', '') or '').strip()

        user = User.objects.create_user(**validated_data, role=role)
        user.set_password(password)
        user.save()

        if role == 'doctor':
            resolved_specialty = specialty
            if not resolved_specialty and specialty_name:
                defaults = {
                    'description': specialty_description,
                    'is_approved': False,
                }
                resolved_specialty, created = Specialty.objects.get_or_create(name=specialty_name, defaults=defaults)
                if not created and specialty_description and resolved_specialty.description != specialty_description:
                    resolved_specialty.description = specialty_description
                    resolved_specialty.save(update_fields=['description'])
            Doctor.objects.create(user=user, specialty=resolved_specialty)
        elif role == 'patient':
            Patient.objects.create(user=user)

        return user

