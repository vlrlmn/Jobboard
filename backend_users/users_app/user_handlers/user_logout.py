from django.contrib.auth import logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required

@csrf_exempt
@login_required

def logout_user(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'message': 'You have been logout'}, status=200)
    return JsonResponse ({'error': 'Invalid request method'}, status=400)