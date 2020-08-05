from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.common.utils import DefaultPagination
from apps.orders.models import (
    Order,
    OrderItem,
    Payment
)
from apps.orders.serializers import (
    OrderSerializer,
    PaymentSerializer
)
from apps.products.models import Product
from apps.rest_auth.models import Address, UserProfile
from apps.rest_auth.serializers import AddressSerializer


class OrderListView(ListAPIView):
    queryset = Order.objects.all().order_by('-created_at')
    serializer_class = OrderSerializer
    pagination_class = DefaultPagination


class OrderApiView(APIView):
    def get(self, request, *args, **kwargs):
        order = get_object_or_404(Order, user=request.user, ordered=False)
        profile = get_object_or_404(UserProfile, user=request.user)
        addresses = Address.objects.filter(user=profile)
        serializer = OrderSerializer(order)
        ad_serializer = AddressSerializer(addresses, many=True)
        payload = {
            'order': serializer.data,
            'addresses': ad_serializer.data
        }
        return Response(payload)

    def post(self, request, *args, **kwargs):
        address_id = self.request.data.get('address')
        profile = get_object_or_404(UserProfile, user=request.user)
        addresses = profile.addresses.all()
        addresses.update(default=False)
        address = addresses.get(id=address_id)
        address.default = True
        address.save()
        serializer = AddressSerializer(addresses, many=True)
        return Response(serializer.data)


class PaymentApiView(APIView):
    def get(self, request, *args, **kwargs):
        order = get_object_or_404(Order, user=request.user, ordered=False)
        serializer = PaymentSerializer(order.payment)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        order = get_object_or_404(Order, user=request.user, ordered=False)
        data = request.data
        payment = Payment()
        payment.user = request.user
        payment.payment_method = data.get('payment_method')
        payment.amount = order.get_total()
        payment.save()

        order_items = order.items.all()
        order_items.update(ordered=True)
        for item in order_items:
            item.save()
        order.ordered = True
        order.payment = payment
        order.save()

        serializer = PaymentSerializer(payment)
        return Response(serializer.data)


@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def add_to_cart(request, pk):
    item = get_object_or_404(Product, pk=pk)
    order_item, created = OrderItem.objects.get_or_create(
        item=item,
        user=request.user,
        ordered=False
    )
    order_qs = Order.objects.filter(user=request.user, ordered=False)
    if order_qs.exists():
        order = order_qs[0]
        if order.items.filter(item__pk=item.pk).exists():
            order_item.quantity += 1
            order_item.save()
        else:
            order.items.add(order_item)
    else:
        order = Order.objects.create(user=request.user)
        order.items.add(order_item)
    serializer = OrderSerializer(order)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def remove_from_cart(request, pk):
    item = get_object_or_404(Product, pk=pk)
    order_qs = Order.objects.filter(user=request.user, ordered=False)
    if order_qs.exists():
        order = order_qs[0]
        if order.items.filter(item__pk=item.pk).exists():
            order_item = OrderItem.objects.filter(
                item=item,
                user=request.user,
                ordered=False
            )[0]
            order.items.remove(order_item)
            order_item.delete()
    serializer = OrderSerializer(order)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def remove_single_item_from_cart(request, pk):
    item = get_object_or_404(Product, pk=pk)
    order_qs = Order.objects.filter(user=request.user, ordered=False)
    if order_qs.exists():
        order = order_qs[0]
        if order.items.filter(item__pk=item.pk).exists():
            order_item = OrderItem.objects.filter(
                item=item,
                user=request.user,
                ordered=False
            )[0]
            if order_item.quantity > 1:
                order_item.quantity -= 1
                order_item.save()
            else:
                order.items.remove(order_item)
    serializer = OrderSerializer(order)
    return Response(serializer.data)
