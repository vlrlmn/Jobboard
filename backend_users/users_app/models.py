from django.db import models
from django.core.validators import RegexValidator
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.conf import settings

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        return self.create_user(email, password, **extra_fields)

    def get_by_natural_key(self, email):
        return self.get(email=email)

class User(AbstractBaseUser, PermissionsMixin):
    userId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20, blank=False)
    second_name = models.CharField(max_length=35, blank=False)
    email = models.EmailField(unique=True, blank=False)
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone_number = models.CharField(validators=[phone_regex], max_length=17)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    objects = CustomUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'second_name', 'phone_number']

    def __str__(self):
        return f'{self.second_name} {self.name}'

class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile', null=True)
    profile_picture = models.ImageField(blank=True)
    resume = models.FileField(blank=True)
    about_me = models.TextField(max_length=500, help_text="Tell future employer more about yourself", blank=True)

class UserResume(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, default='')
    name = models.CharField(max_length=100, default='')
    experience = models.IntegerField(default=0)
    description = models.TextField(default='No description provided')
    skills = models.TextField(default='')
    is_with_degree = models.BooleanField(default=False)



class UserVacancyApply(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    resume = models.ForeignKey(UserResume, on_delete=models.CASCADE)
    vacancy_id = models.IntegerField()
    company_id = models.IntegerField()
    message = models.TextField()
    status = models.IntegerField(default = 0)


def __str__(self):
    return f'{self.name} Resume of {self.user.second_name}'
