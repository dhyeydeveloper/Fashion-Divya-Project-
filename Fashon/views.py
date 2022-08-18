from django.shortcuts import render, redirect, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import *
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login

# Create your views here.
@login_required
def home(request):
    return render(request, 'fashion/index.html')

@csrf_exempt
def login(request):
    if request.method == "POST":
        data = request.POST
        user = authenticate(username=data['username'], password=data['password'])
        if user is not None:
            auth_login(request, user)
            return HttpResponse('success')
        else:
            return HttpResponse('failure')
            
    return render(request, 'fashion/login.html')

def about(request):
    pass 