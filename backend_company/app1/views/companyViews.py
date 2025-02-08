# Connect models and templates 

from django.shortcuts import redirect, render
from django.contrib.auth.hashers import check_password

from app1.models import Company
from app1.forms.companyForm import CompanyForm
from django.http import JsonResponse

import json

def get_company_data(request, company_id):
    try:
        company = Company.objects.get(id=company_id)
        data = {
            'id': company.id,
            'name': company.name,
            'llcNumber': company.llc_number,
        }
        return JsonResponse(data, status=200)
    except Company.DoesNotExist:
        return JsonResponse({'error': 'Company not found'}, status=404)

def auth(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)  # Парсим JSON данные из тела запроса
            print("JSON data:", data)
        except json.JSONDecodeError:
            data = request.POST  # Если это не JSON, используем request.POST
            print("Form data:", data)

    email = data.get('email')
    password = data.get('password')
    company = Company.objects.filter(email=email).first()

    if company and check_password(password, company.password):
        return JsonResponse({'id': company.id}, status=200)
    else:
        return JsonResponse({'error': 'Invalid credentials'}, status=400)

def register(request):
    # Обработка POST-запроса
    if request.method == 'POST':
        # Попробуем сначала получить JSON данные из тела запроса
        try:
            data = json.loads(request.body)  # Парсим JSON данные из тела запроса
            print("JSON data:", data)
        except json.JSONDecodeError:
            data = request.POST  # Если это не JSON, используем request.POST
            print("Form data:", data)
        
        form = CompanyForm(data)  # Передаем данные в форму
        
        # Проверка, существует ли компания с таким email
        email = data.get('email')
        if Company.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email already in use'}, status=400)
        
        # Если форма валидна
        if form.is_valid():
            company = form.save(commit=False)
            company.set_password(form.cleaned_data['password'])  # Хешируем пароль
            company.save()
            return JsonResponse({'id': company.id}, status=200)
        else:
            return JsonResponse({'status': 'error', 'errors': form.errors}, status=400)
    
    # Обработка GET-запроса, если нужно вернуть пустую форму
    form = CompanyForm()
    form_data = {field.name: field.value() for field in form}  # Пример структуры формы
    return JsonResponse({'form': form_data})
