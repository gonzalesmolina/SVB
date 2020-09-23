from django.contrib.auth import get_user_model
from django.db.models import Sum, Q
from rest_framework.generics import ListAPIView
from rest_framework.response import Response

from apps.common.utils import DefaultPagination
from apps.orders.models import Payment
from apps.orders.serializers import PaymentSerializer


User = get_user_model()


class SalesListView(ListAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    pagination_class = DefaultPagination

    def list(self, request, *args, **kwargs):
        params = self.request.query_params or None
        qs = self.get_queryset()
        if params is not None:
            user_id = params.get('user', None)
            begin = params.get('begin', None)
            end = params.get('end', None)
            product = params.get('product', None)
            if user_id:
                user_qs = User.objects.filter(id=user_id)
                if user_qs.exists():
                    user = user_qs[0]
                    qs = qs.filter(user=user)
            if begin is not None and end is None:
                qs = qs.filter(Q(created_at__date__gte=begin))
            if end is not None and begin is None:
                qs = qs.filter(Q(created_at__lte=end))
            if end is not None and begin is not None:
                qs = qs.filter(Q(created_at__range=[begin, end]))
            if product:
                qs = qs.filter(Q(order__items__item__name__icontains=product))
        total_sales = qs.aggregate(Sum('amount')).get('amount__sum')
        serializer = PaymentSerializer(qs, many=True)
        report = {
            'total': total_sales or 0.0,
            'sales': self.paginate_queryset(serializer.data),
            'count': len(serializer.data)
        }

        return Response(report)
