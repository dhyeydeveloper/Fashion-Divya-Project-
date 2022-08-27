"""FashonDivyaWeb URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
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
from django.urls import path, re_path
from Fashon.views import *

urlpatterns = [
# ALL ONLY PATH API
    path('admin/', admin.site.urls),
    path(r'test/', test, name="test"),
    path(r'', home, name="index"),
    path(r'type/', customerType, name="customerTypeUrl"),

# ALL REPATH API's
    re_path(r'login/', login, name='loginUrl'),
    re_path(r'logout/', logoutView, name= "logoutUrl"),
    re_path(r'home/', home, name="home"),
    re_path(r'create/', createOrder, name="createUrl"),
    re_path(r'details/(?P<id>\d{1,10})/$', customerDetails, name="customDetail"),
    re_path(r'check/', customerCheck, name="checkUrl"),
]
