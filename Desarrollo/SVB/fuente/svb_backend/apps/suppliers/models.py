from django.db import models
from django.utils.translation import gettext_lazy as _
from apps.common.models import TimeStampedModel


class Supplier(TimeStampedModel):

    ruc = models.CharField(
        _('RUC'),
        max_length=11,
        unique=True
    )
    name = models.CharField(
        _('Razón Social'),
        max_length=128
    )
    office_phone_number = models.CharField(
        _('Teléfono de oficina'),
        max_length=15,
        blank=True,
        null=True
    )
    mobile_phone_number = models.CharField(
        _('Celular'),
        max_length=15,
        blank=True,
        null=True
    )
    address = models.CharField(
        _('Dirección'),
        max_length=15,
        blank=True,
        null=True
    )
    category = models.CharField(
        _('Categoría'),
        max_length=128,
        blank=True,
        null=True
    )
    is_active = models.BooleanField(
        _('Activo'),
        default=True
    )

    class Meta:
        ordering = ('name',)
        verbose_name = ('Proveedor')
        verbose_name_plural = ('Proveedores')

    def __str__(self):
        return self.name
