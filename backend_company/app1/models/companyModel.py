from django.db import models
from django.contrib.auth.hashers import make_password

# Create your models here. Related to databases. 
# In other worlds, model is a table

# migration = writing changes of the model

class Company(models.Model) :
	name = models.CharField(max_length=30, blank=False)
	password = models.CharField(max_length=128, blank=False, default='')
	email = models.EmailField(unique=True, default='', blank=False)
	llc_number = models.CharField(max_length=55, unique=True, default='', blank=False)
	id = models.AutoField(primary_key=True)
	
	def set_password(self, raw_password):
		self.password = make_password(raw_password)
	
	def __str__(self):
		return self.name