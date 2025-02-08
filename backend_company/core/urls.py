"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from app1.views import companyVacancyViews, companyViews
from app1.views.companyVacancyViews import registerVacancy

urlpatterns = [
    path('admin', admin.site.urls),
	path('company/auth', companyViews.auth, name='company_login'), #указать метод запроса GET/POST/DELETE etc
    path('company/register', companyViews.register, name='company_register'),
    path('company/<int:company_id>', companyViews.get_company_data, name='company_id'),
	
    # path('company/auth/', views.auth, name='company_login'), #указать метод запроса GET/POST/DELETE etc
    path('company/<int:company_id>/vacancy', companyVacancyViews.registerVacancy, name='company_vacancy_register'),
    path('company/<int:company_id>/vacancy/<int:vacancy_id>/view', companyVacancyViews.get_company_vacancy_data, name='vacancy_id'),
    path('company/<int:company_id>/vacancy/<int:vacancy_id>/cancel', companyVacancyViews.cancel_vacancy, name='cancel_vacancy'),
    path('company/<int:company_id>/vacancy/<int:vacancy_id>/hire/<int:hired_user_id>', companyVacancyViews.hire, name='hire'),
    # path('company/<int:company_id>/vacancy_filter', companyVacancyViews.filter_vacancies_in_company, name='filter_vacancies_in_company'),
	# global search for vacancies
    path('company/vacancy_filter', companyVacancyViews.filter_vacancies, name='filter_vacancies'), 
]


    