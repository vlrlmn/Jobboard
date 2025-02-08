from ..models import CompanyVacancy
from django.forms import ModelForm, TextInput

class CompanyVacancyForm(ModelForm):
	class Meta:
		model = CompanyVacancy
		fields = '__all__'  # Automatically include all fields from the model