from xml.etree.ElementInclude import include
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
        user = authenticate(username=data['username'], password=data['password'])
        if user is not None:
            auth_login(request, user)
            return HttpResponse('success')
        else:
            return HttpResponse('failure')
    return render(request, 'fashion/login.html')

@login_required
@csrf_exempt
def createOrder(request):
    if request.method == "POST":
        data = request.POST
        for item in eval(list(data.keys())[0]).values():
            if 'user' in list(item.keys())[0]:
                usrPhone = list(item.values())[2]
                user = Customer.objects.create(userName = list(item.values())[0], userDeliveryDate= list(item.values())[1], userPhone= list(item.values())[2], userAdvance= list(item.values())[3])
                user.save()
            
            elif 'top' in list(item.keys())[0]:
                usr = Customer.objects.filter(userPhone = usrPhone).order_by('userDeliveryDate').first()
                userTop = TopDetail.objects.create(user = usr,chest1 = list(item.values())[0], chest2= list(item.values())[1], shoulder= list(item.values())[2], topheapRound= list(item.values())[3], 
                # KURTI DATA
                topKurtiArmHole = list(item.values())[4], topKurtiWaist = list(item.values())[5],
                topKurtiLength = list(item.values())[6], topKurtiSleeveL = list(item.values())[7], 
                topKurtiSleeveR = list(item.values())[8], topKurtiNeckF = list(item.values())[9], 
                topKurtiNeckB = list(item.values())[10], 

                # GOWN DATA
                topGownArmHole = list(item.values())[11], topGownWaist = list(item.values())[12],
                topGownLength = list(item.values())[13], topGownSleeveL = list(item.values())[14], 
                topGownSleeveR = list(item.values())[15], topGownNeckF = list(item.values())[16], 
                topGownNeckB = list(item.values())[17], 

                # BLOUSE DATA
                topBlouseArmHole = list(item.values())[18], topBlouseWaist = list(item.values())[19],
                topBlouseLength = list(item.values())[20], topBlouseSleeveL = list(item.values())[21], 
                topBlouseSleeveR = list(item.values())[22], topBlouseNeckF = list(item.values())[23], 
                topBlouseNeckB = list(item.values())[24], 
                )
                userTop.save()
                
            elif 'bottom' in list(item.keys())[0]:
                userBottom = BottomDetail.objects.create(user = usr, bottomWaist = list(item.values())[0], bottomHeapRound = list(item.values())[1],

                # FOR SALWAR
                bottomSalwarMori = list(item.values())[2], bottomSalwarLength = list(item.values())[3], 

                # FOR PANT 
                bottomPantMori = list(item.values())[4], bottomPantLength = list(item.values())[5], 

                # FOR PLAZO
                bottomPlazoMori = list(item.values())[6], bottomPlazoLength = list(item.values())[7], 

                # FOR PLAZO
                bottomChaniyaMori = list(item.values())[8], bottomChaniyaLength = list(item.values())[9])

                userBottom.save() 


    return render(request,'fashion/create_order.html')

@login_required
def customerType(request):
    return render(request,'fashion/customer_type.html')

def test(request):
    return render(request, "fashion/test.html")