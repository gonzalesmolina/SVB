from django.urls import path
from apps.reports.views import SalesListView

urlpatterns = [
    path('sales', SalesListView.as_view(), name='sales-report'),
]
