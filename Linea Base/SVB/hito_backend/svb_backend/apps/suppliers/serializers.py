from rest_framework import serializers

from apps.suppliers.models import Supplier


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = (
            'id',
            'ruc',
            'name',
            'office_phone_number',
            'mobile_phone_number',
            'address',
            'category',
            'is_active',
            'created_at',
            'modified_at'
        )


class SupplierListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Supplier
        fields = (
            'id',
            'ruc',
            'name',
            'office_phone_number',
            'mobile_phone_number',
            'address',
            'category',
            'is_active'
        )
