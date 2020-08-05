from django.urls import path

from apps.orders.views import (
    OrderListView,
    OrderApiView,
    PaymentApiView,
    add_to_cart,
    remove_from_cart,
    remove_single_item_from_cart
)


urlpatterns = [
    path('', OrderListView.as_view(), name='orders-list'),
    path('checkout', OrderApiView.as_view(), name='order-checkout'),
    path('add_to_cart/<int:pk>', add_to_cart, name='add-to-cart'),
    path('remove_from_cart/<int:pk>', remove_from_cart,
         name='remove-from-cart'),
    path('remove_item_from_cart/<int:pk>', remove_single_item_from_cart,
         name='remove-single-item-from-cart'),
    path('payment', PaymentApiView.as_view(), name='payment-checkout')
]
