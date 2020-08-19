from rest_framework import serializers

from apps.orders.models import Order, OrderItem, Payment
from apps.products.serializers import ProductSerializer


class OrderItemSerializer(serializers.ModelSerializer):
    item = ProductSerializer()

    class Meta:
        model = OrderItem
        fields = (
            'id',
            'user',
            'item',
            'ordered',
            'quantity',
            'created_at',
            'modified_at'
        )


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = '__all__'


class PaymentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Payment
        fields = '__all__'
