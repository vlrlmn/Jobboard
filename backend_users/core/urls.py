from django.urls import path, include
from django.conf import settings
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.conf.urls.static import static
from users_app.user_handlers.user_register import register as user_register_view
from users_app.user_handlers.user_profile import profile as user_profile_view
from users_app.user_handlers.user_auth import test_authentication as test_auth_view
from users_app.forms import UserLoginForm
from . import views
from users_app.user_handlers.get_user import get_user_by_id
from users_app.user_handlers.user_auth import login_user
from users_app.user_handlers.user_logout import logout_user

from users_app.user_handlers.user_register import delete_user
from users_app.user_handlers.user_apply import (
    apply_vacancy,
    get_applications_by_vacancy,
    cancel_application,
    create_user_resume,
    get_user_resume
)

urlpatterns = [
    # Admin routes
    path('admin/', admin.site.urls),

    # API Routes
    path('api/user/register', user_register_view, name='api_register'),
    path('api/user/profile', user_profile_view, name='api_profile'),
    path('api/user/<int:user_id>', get_user_by_id, name='api_get_user'),
    path('api/user/<int:userId>/resume/get', get_user_resume, name='api_get_user_resume'),
    path('api/user/<int:userId>/resume/create', create_user_resume, name='api_create_user_resume'),
    path('api/vacancy/<int:vacancyId>/apply', apply_vacancy, name='api_apply_vacancy'),
    path('api/vacancy/<int:vacancyId>/apply/list', get_applications_by_vacancy, name='api_get_applications'),
    path('api/vacancy/<int:vacancyId>/apply/<int:applyId>/cancel', cancel_application, name='api_cancel_application'),
    path('api/test-auth', test_auth_view, name='api_test_auth'),
    path('api/user/<int:user_id>/delete', delete_user, name='delete_user'),
    path('api/user/login', login_user, name='login_user'),
    path('api/user/logout', logout_user, name='logout_user'),
    
    # Web routes
    path('register/', user_register_view, name='register'),
    path('profile/', user_profile_view, name='profile'),
    path('login/', auth_views.LoginView.as_view(
        template_name='login.html',
        authentication_form=UserLoginForm
    ), name='login'),
    path('logout/', auth_views.LogoutView.as_view(template_name='logout.html'), name='logout'),
    path('user/<int:user_id>/', get_user_by_id, name='get_user_by_id'),
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
