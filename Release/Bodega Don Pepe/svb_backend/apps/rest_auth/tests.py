from django.contrib.auth.models import User
from django.test import TestCase

from apps.common.models import Ubigeo, Person

from .models import UserProfile, Address


class RestAuthTests(TestCase):

    @classmethod
    def setUpTestData(cls):
        # Create User
        mock_user = User.objects.create_user(
            username='mockuser', password='abc123'
        )
        mock_user.save()

        # Create Ubigeo
        mock_ubigeo = Ubigeo.objects.create(
            code='150732',
            department='Lima',
            province='Lima',
            district='Surco',
        )

    def test_ubigeo_content(self):
        ubigeo = Ubigeo.objects.get(code='150732')
        code = ubigeo.code
        department = ubigeo.department
        province = ubigeo.province
        district = ubigeo.district

        self.assertEqual(code, '150732')
        self.assertEqual(department, 'Lima')
        self.assertEqual(province, 'Lima')
        self.assertEqual(district, 'Surco')

    def test_user_content(self):
        user = User.objects.get(id=1)
        username = user.username
        self.assertEqual(username, user.__str__())
