from django.urls import path

from apps.suppliers.views import (
    SupplierDetailView,
    SupplierListView
)


urlpatterns = [
    path('suppliers', SupplierListView.as_view(), name='suppliers-list'),
    path('suppliers/<int:pk>', SupplierDetailView.as_view(),
         name='suppliers-detail')
]
