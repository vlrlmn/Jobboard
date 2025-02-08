from django import forms
from django.contrib.auth.hashers import make_password
from .models import User
from django.contrib.auth.forms import AuthenticationForm
from django import forms
from .models import User, UserProfile

class UserRegisterForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta: 
        model = User
        fields = ['name', 'second_name', 'email', 'password', 'phone_number']

    def save(self, commit=True):
        user = super(UserRegisterForm, self).save(commit=False)
        user.password = make_password(self.cleaned_data['password'])
        if commit:
            user.save()
        return user

class UserLoginForm(AuthenticationForm):
    class Meta:
        model = User
        fields = ['email', 'password']

class UserUpdateForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['name', 'second_name', 'email', 'phone_number']

class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ['profile_picture', 'resume', 'about_me']