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
    total_amount = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = (
            'id',
            'items',
            'number',
            'ordered',
            'received',
            'refund_requested',
            'refund_granted',
            'user',
            'payment',
            'coupon',
            'created_at',
            'modified_at',
            'total_amount'
        )

    def get_total_amount(self, obj):
        return obj.get_total()


class PaymentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Payment
        fields = (
            'id',
            'payment_method',
            'amount',
            'operation_number',
            'user',
            'created_at',
            'modified_at'
        )
