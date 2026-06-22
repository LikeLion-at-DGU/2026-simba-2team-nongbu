from django.contrib import admin
from django.urls import path
from app.views import (
    onboarding,
    onboarding_start,
    space_room,
    space_upload,
    memory_main,
    mypage_main,
    mypage_change_password,
    mypage_change_nickname,
    mypage_logout,
    mypage_delete_account,
    memory_list,
    memory_constellation,
    )
from django.urls import include

from spaces.views import home_main
from accounts.views import mypage_main




urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home_main, name='home_main'),
    path('onboarding/',onboarding, name='onboarding'),
    path('onboarding/start/', onboarding_start, name='onboarding_start'),
    path('mypage/', mypage_main, name='mypage_main'),
    path('space/', include('spaces.urls')),
    path('account/', include('accounts.urls')),
    path('memory/', include('memories.urls')),
    path('memory/constellation/', memory_constellation, name='memory_constellation'),
    path('space/upload/', space_upload, name='space_upload'),
    path('mypage/password/', mypage_change_password, name='mypage_change_password'),
    path('mypage/nickname/', mypage_change_nickname, name='mypage_change_nickname'),
]