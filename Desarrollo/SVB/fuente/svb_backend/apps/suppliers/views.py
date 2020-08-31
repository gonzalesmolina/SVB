from django_filters import rest_framework as filters
from rest_framework import filters as drfilters
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView
)
from rest_framework.permissions import AllowAny

from apps.common.utils import DefaultPagination
from apps.suppliers.models import Supplier
from apps.suppliers.serializers import SupplierSerializer, SupplierListSerializer


class SupplierListView(ListCreateAPIView):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
    filter_backends = (filters.DjangoFilterBackend, drfilters.SearchFilter)
    filter_fields = ('is_active',)
    search_fields = ('name', 'ruc', 'address')
    permission_classes = [AllowAny]
    pagination_class = DefaultPagination

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return self.serializer_class
        return SupplierListSerializer


class SupplierDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
    permission_classes = [AllowAny]
