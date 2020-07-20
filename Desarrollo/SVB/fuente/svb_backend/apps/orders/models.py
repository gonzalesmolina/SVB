from django.contrib.auth import get_user_model
from django.db import models

from apps.common.models import TimeStampedModel
from apps.products.models import Product


User = get_user_model()


class OrderItem(TimeStampedModel):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    item = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )
    ordered = models.BooleanField(
        default=False
    )
    quantity = models.PositiveSmallIntegerField(
        default=1
    )

    def __str__(self):
        return '{} de {}'.format(self.quantity, self.item.name)

    def get_total_item_price(self):
        return self.quantity * self.item.price

    def get_total_item_discount(self):
        return self.quantity * self.item.discount

    def get_final_price(self):
        return self.get_total_item_price() - self.get_total_item_discount()


class Order(TimeStampedModel):
    number = models.CharField(
        max_length=12,
        blank=True,
        null=True
    )
    items = models.ManyToManyField(
        OrderItem
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    ordered = models.BooleanField(
        default=False
    )
    received = models.BooleanField(
        default=False
    )
    refund_requested = models.BooleanField(
        default=False
    )
    refund_granted = models.BooleanField(
        default=False
    )
    payment = models.ForeignKey(
        'Payment',
        on_delete=models.SET_NULL,
        blank=True,
        null=True
    )
    coupon = models.ForeignKey(
        'Coupon',
        on_delete=models.SET_NULL,
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = 'Órden de compra'
        verbose_name_plural = 'Órdenes de compra'

    def __str__(self):
        return self.user.username if self.number is None else self.number

    def save(self, *args, **kwargs):
        if self.id is not None:
            self.number = 'O-{}'.format(str(self.id).zfill(10))
        super(Order, self).save(*args, **kwargs)

    def get_total(self):
        total = 0
        for order_item in self.items.all():
            total += order_item.get_final_price()
        if self.coupon:
            total -= self.coupon.amount
        return total


class Payment(TimeStampedModel):
    CASH = 0
    DEBIT_CARD = 1
    CREDIT_CARD = 2
    PAYMENT_METHOD_CHOICES = (
        (CASH, 'Efectivo'),
        (DEBIT_CARD, 'Tarjeta de débito'),
        (CREDIT_CARD, 'Tarjeta de crédito')
    )

    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        blank=True,
        null=True
    )
    payment_method = models.PositiveSmallIntegerField(
        choices=PAYMENT_METHOD_CHOICES,
        default=CASH
    )
    amount = models.FloatField()

    class Meta:
        verbose_name = 'Pago'
        verbose_name_plural = 'Pagos'

    def __str__(self):
        return self.user.username


class Coupon(TimeStampedModel):
    code = models.CharField(
        max_length=16
    )
    is_active = models.BooleanField(
        default=True
    )
    amount = models.FloatField()

    class Meta:
        verbose_name = 'Cupón'
        verbose_name_plural = 'Cupones'

    def __str__(self):
        return self.code


class Refund(models.Model):
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE
    )
    reason = models.TextField()
    accepted = models.BooleanField(
        default=False
    )
    email = models.EmailField()

    class Meta:
        verbose_name = 'Devolución'
        verbose_name_plural = 'Devoluciones'

    def __str__(self):
        return self.order.number
