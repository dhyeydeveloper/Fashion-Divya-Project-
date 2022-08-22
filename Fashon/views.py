from django.shortcuts import render, redirect, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import *
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login as auth_login, logout

# Create your views here.
@login_required
def home(request):
    return render(request, 'fashion/index.html')

@login_required
def logoutView(request):
    logout(request)
    return HttpResponse('success')

@csrf_exempt
def login(request):
    if request.method == "POST":
        data = request.POST
        print(data)
        user = authenticate(username=data['username'], password=data['password'])
        if user is not None:
            auth_login(request, user)
            return HttpResponse('success')
        else:
            return HttpResponse('failure')
    return render(request, 'fashion/login.html')

@login_required
def createOrder(request):
    return render(request,'fashion/create_order.html')

@login_required
def customerType(request):
    return render(request,'fashion/customer_type.html')

def test(request):
    return render(request, "fashion/test.html")