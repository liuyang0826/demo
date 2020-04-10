from rest_framework.views import APIView
from .models import User
from rest_framework.response import Response

# Create your views here.
class UserView(APIView):
    def get(self, request):
        try:
            user = User.objects.get(name='系统管理员')
            return Response({
                'name': user.name,
                'role': user.role
            })
        except:
            return Response({})
