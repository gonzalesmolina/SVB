from rest_framework import serializers

from apps.products.models import Category, Product


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = (
            'id',
            'name',
            'description',
            'slug',
            'is_active',
            'created_at',
            'modified_at',
        )


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = (
            'id',
            'name',
            'slug',
            'description',
            'image',
            'price',
            'discount',
            'is_active',
            'category',
            'created_at',
            'modified_at'
        )
