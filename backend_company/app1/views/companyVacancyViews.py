from django.shortcuts import redirect, render
from django.contrib.auth.hashers import check_password
from django.forms.models import model_to_dict

from app1.models import CompanyVacancy
from app1.models import Company
from django.db.models import Q
from django.shortcuts import get_object_or_404
from app1.forms.companyVacancyForm import CompanyVacancyForm
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.http import require_http_methods
import json

from app1.models.companyVacancyModel import StatusEnum

#search for a particular company in database by company_id and return data
#if this company's vacancy by vacancy_id
@require_http_methods(["GET"])
def get_company_vacancy_data(request, company_id, vacancy_id):
	try:
		companyVacancy = CompanyVacancy.objects.get(vacancy_id=vacancy_id)
		data = model_to_dict(companyVacancy)
		return JsonResponse({'status': 'success', 'data': data}, status=200)
	except CompanyVacancy.DoesNotExist:
		return JsonResponse({'error': 'CompanyVacancy not found'}, status=404)

@require_http_methods(["GET", "POST"])
def registerVacancy(request, company_id):
	if request.method == 'POST':
		try:
			data = json.loads(request.body)
			company = get_object_or_404(Company, id=company_id)
			# Include only the company ID in the data for the form
			data['company_id'] = company.id  # Pass only the ID, not the instance
			data.setdefault('hired_user_id', None)  # None будет сохраняться как NULL
			data.setdefault('status', StatusEnum.active.value)
			# data.setdefault('work_format', WorkFormatEnum.offline.value)
			data.setdefault('skills', "")
			print("JSON data:", data)
		except json.JSONDecodeError:
			data = request.POST  # If it's not JSON, use POST data directly
			print("Form data:", data)
				
		form = CompanyVacancyForm(data)  # Передаем данные в форму
		if form.is_valid():
			vacancy = form.save(commit=False)
			vacancy.company_id = company
			vacancy.save()
			return JsonResponse({'vacancy_id': vacancy.vacancy_id}, status=200)
		else:
			return JsonResponse({'status': 'error', 'errors': form.errors}, status=400)

	# Обработка GET-запроса, если нужно вернуть пустую форму
	form = CompanyVacancyForm()
	form_data = {field.name: field.value() for field in form}  # Пример структуры формы
	return JsonResponse({'form': form_data})

@require_http_methods(["PATCH"])
def cancel_vacancy(request, company_id, vacancy_id):
    try:
        # Query the vacancy directly using company_id and vacancy_id for efficiency
        vacancy = CompanyVacancy.objects.get(pk=vacancy_id, company_id=company_id)
        
        if vacancy.status == 0:
            vacancy.status = 2  # Set to canceled
            vacancy.save()  # Commit the change
            return JsonResponse({'status': 'success', 'message': 'Vacancy canceled successfully.'}, status=201)
        else:
            return JsonResponse({'status': 'error', 'message': 'Vacancy is not active.'}, status=400)
    except CompanyVacancy.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'No vacancy found with the provided ID for this company.'}, status=404)

@require_http_methods(["PATCH"])
def hire(request, company_id, vacancy_id, hired_user_id):
	try:
		vacancy = CompanyVacancy.objects.get(pk=vacancy_id, company_id=company_id)
				
		if vacancy.status == 0 and vacancy.hired_user_id == 0:
			vacancy.status = 1
			vacancy.hired_user_id = hired_user_id
			vacancy.save()  # Commit the change
			return JsonResponse({'status': 'success', 'message': 'User has been hired for vacancy successfully.'}, status=201)
		else:
			return JsonResponse({'status': 'error', 'message': 'Vacancy is not active.'}, status=400)
	except CompanyVacancy.DoesNotExist:
		return JsonResponse({'status': 'error', 'message': 'No vacancy found with the provided ID for this company.'}, status=404)

@require_http_methods(["GET"])
def filter_vacancies(request):
      # Получаем параметры из запроса
    company_id = request.GET.get('company_id')
    print("company_id:", company_id)
    search = request.GET.get('s', '')
    sal_min = request.GET.get('sal_min')
    sal_max = request.GET.get('sal_max')
    loc = request.GET.getlist('loc', [])
    emp = request.GET.getlist('emp', [])
    wf = request.GET.getlist('wf', [])
    is_degree = request.GET.get('is_degree')
    status = request.GET.get('st')  # статус вакансии

    # Проверка валидности параметров
    try:
        if company_id != None:
            company_id = int(company_id)
        if sal_min:
            sal_min = float(sal_min)
        if sal_max:
            sal_max = float(sal_max)
        if is_degree is not None:
            is_degree = int(is_degree)
            if is_degree not in (0, 1):
                raise ValueError("Invalid is_degree")
        if status is not None:
            status = int(status)
            if status not in (0, 1, 2):
                raise ValueError("Invalid status")
        
        # Проверка массивов loc, emp, wf
        if loc:
            loc = [int(i) for i in loc]
        if emp:
            emp = [int(i) for i in emp]
        if wf:
            wf = [int(i) for i in wf]
    except ValueError:
        return JsonResponse({'error': 'Invalid query parameter'}, status=400)

    # Получаем все вакансии всех компаний
    if company_id == None:
        vacancies = CompanyVacancy.objects.all()
    else:
        vacancies = CompanyVacancy.objects.filter(company_id=company_id)

    # Применение фильтров
    if search:
        vacancies = vacancies.filter(name__icontains=search)
    if sal_min:
        vacancies = vacancies.filter(salary__gte=sal_min)
    if sal_max:
        vacancies = vacancies.filter(salary__lte=sal_max)
    if loc:
        vacancies = vacancies.filter(location__in=loc)
    if emp:
        vacancies = vacancies.filter(employment__in=emp)
    if wf:
        vacancies = vacancies.filter(work_format__in=wf)
    if is_degree is not None:
        vacancies = vacancies.filter(is_degree_required=is_degree)
    if status is not None:
        vacancies = vacancies.filter(status=status)
    else:
        vacancies = vacancies.filter(status=0)  # По умолчанию "active"

    # Если вакансий нет, вернуть null
    if not vacancies.exists():
        return JsonResponse({'vacancies': None}, status=200)

    # Формируем ответ
    result = [
        {
            'id': vacancy.vacancy_id,
            'name': vacancy.name,
            'salary': str(vacancy.salary),
            'companyName': vacancy.company_id.name,
            'companyId': vacancy.company_id.id,
            'locationId': vacancy.location,
            'workFormat': vacancy.work_format,
            'emplyment': vacancy.employment
        }
        for vacancy in vacancies
    ]

    return JsonResponse({'vacancies': result}, status=200)