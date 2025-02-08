from django.http import JsonResponse
from ..models import User
from django.shortcuts import get_object_or_404

def get_user_by_id(request, user_id):
    user = get_object_or_404(User, pk=user_id)
    user_data = {
        'id': user.userId,
        'name': user.name,
        'second_name': user.second_name,
        'email': user.email,
        'phone_number': user.phone_number
    }
    return JsonResponse(user_data)