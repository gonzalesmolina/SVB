from django.contrib.auth import get_user_model
from django.db import transaction
from rest_framework import serializers

from apps.common.models import Ubigeo
from apps.rest_auth.models import UserProfile, Address


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=False)

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'password',
            'email'
        )
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.save()
        return instance


class AddressSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        queryset=UserProfile.objects.all(),
        required=False,
        write_only=True
    )
    ubigeo = serializers.PrimaryKeyRelatedField(
        queryset=Ubigeo.objects.all(),
        required=False,
        allow_null=True
    )

    class Meta:
        model = Address
        fields = (
            'id',
            'user',
            'address_type',
            'street_address',
            'apartment_address',
            'ubigeo',
            'zip',
            'default'
        )


class UserProfileSerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True)
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        write_only=True
    )

    class Meta:
        model = UserProfile
        fields = (
            'user',
            'document_type',
            'document_number',
            'first_name',
            'last_name',
            'birthdate',
            'mobile_phone_number',
            'home_phone_number',
            'work_phone_number',
            'nationality',
            'addresses'
        )

    def create(self, validated_data):
        with transaction.atomic():
            addresses = validated_data.pop('addresses', None)
            profile = UserProfile.objects.create(**validated_data)
            if addresses:
                for address in addresses:
                    Address.objects.create(user=profile, **address)
        return profile

    def update(self, instance, validated_data):
        addresses_data = validated_data.pop('addresses', None)
        instance.document_type = validated_data.get(
            'document_type', instance.document_type)
        instance.document_number = validated_data.get(
            'document_number', instance.document_number)
        instance.first_name = validated_data.get(
            'first_name', instance.first_name)
        instance.last_name = validated_data.get(
            'last_name', instance.last_name)
        instance.birthdate = validated_data.get(
            'birthdate', instance.birthdate)
        instance.mobile_phone_number = validated_data.get(
            'mobile_phone_number', instance.mobile_phone_number)
        instance.home_phone_number = validated_data.get(
            'home_phone_number', instance.home_phone_number)
        instance.work_phone_number = validated_data.get(
            'work_phone_number', instance.work_phone_number)
        instance.nationality = validated_data.get(
            'nationality', instance.nationality)
        instance.save()

        if addresses_data:
            for address_data in addresses_data:
                try:
                    address = Address.objects.get(
                        employee=instance,
                        address_type=address_data.get('address_type')
                    )
                except Address.DoesNotExist:
                    address = Address()
                address.address_type = address_data.get(
                    'address_type', address.address_type)
                address.street_address = address_data.get(
                    'street_address', address.street_address)
                address.apartment_address = address_data.get(
                    'apartment_address', address.apartment_address)
                address.ubigeo = address_data.get('ubigeo', address.ubigeo)
                address.zip = address_data.get('zip', address.zip)
                address.default = address_data.get('default', address.default)
                address.user_id = instance.pk
                address.save()
        return instance
