from django.contrib import admin

from app1.models import Company
from app1.models import CompanyVacancy

# Register your models here.
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'created_at')
    readonly_fields = ('id')  # Makes 'id' visible and read-only in the detail view

admin.site.register(Company)
admin.site.register(CompanyVacancy)

