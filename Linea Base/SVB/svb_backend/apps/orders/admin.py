from django.contrib import admin

from apps.orders.models import Coupon, Order, OrderItem, Payment, Refund


admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Coupon)
admin.site.register(Payment)
admin.site.register(Refund)
