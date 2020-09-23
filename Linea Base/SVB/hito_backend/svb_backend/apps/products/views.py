from django_filters import rest_framework as filters
from rest_framework import filters as drfilters
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView
)
from rest_framework.permissions import AllowAny

from apps.common.utils import DefaultPagination
from apps.products.models import Category, Product
from apps.products.serializers import CategorySerializer, ProductSerializer, ProductListSerializer


class CategoryListView(ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = (filters.DjangoFilterBackend, drfilters.SearchFilter)
    filter_fields = ('is_active',)
    search_fields = ('name', 'description')
    permission_classes = [AllowAny]
    pagination_class = DefaultPagination


class CategoryDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]


class ProductListView(ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = (filters.DjangoFilterBackend, drfilters.SearchFilter)
    filter_fields = ('category', 'is_active')
    search_fields = ('name', 'category__name', 'description')
    permission_classes = [AllowAny]
    pagination_class = DefaultPagination

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return self.serializer_class
        return ProductListSerializer


class ProductDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
