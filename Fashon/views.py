from xml.etree.ElementInclude import include
from django.shortcuts import render, redirect, HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import *
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login as auth_login, logout

# Create your views here.
def allCustomerView(request):
    customers = Customer.objects.all()
    print(customers)
    return render(request, 'fashion/myCustomers.html')



@login_required
def customerCheck(request):
    user = Customer.objects.filter(userPhone = list(request.GET.keys())[0]).first()
    if user is not None:
        return HttpResponse(user.id)
    else:
        return HttpResponse('fail')

@login_required
@csrf_exempt
def detailsEdit(request, id):   
    if request.method == "GET": 
        usr = Customer.objects.filter(id = id).first()
        top_details = list(TopDetail.objects.filter(user = usr).values())[0]
        bottom_details = list(BottomDetail.objects.filter(user = usr).values())[0]
        data = {'user':usr, 'top':top_details, 'bottom':bottom_details}
        return render(request, 'fashion/customerDetailsEdit.html', data)
    if request.method == "POST":
        data = request.POST
        for item in eval(list(data.keys())[0]).values():
            if 'user' in list(item.keys())[0]:
                user = Customer.objects.filter(id= id)
                user.update(userName = list(item.values())[0], userDeliveryDate= list(item.values())[2], userPhone= list(item.values())[1], userAdvance= list(item.values())[3])

            elif 'top' in list(item.keys())[0]:
                userTop = TopDetail.objects.filter(user__id = id)
                userTop.update(chest1 = list(item.values())[0], chest2= list(item.values())[1], shoulder= list(item.values())[2], topheapRound= list(item.values())[3], 
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

            elif 'bottom' in list(item.keys())[0]:
                userBottom = BottomDetail.objects.filter(user__id = id)
                userBottom.update(bottomWaist = list(item.values())[0], bottomHeapRound = list(item.values())[1],

                # FOR SALWAR
                bottomSalwarMori = list(item.values())[2], bottomSalwarLength = list(item.values())[3], 

                # FOR PANT 
                bottomPantMori = list(item.values())[4], bottomPantLength = list(item.values())[5], 

                # FOR PLAZO
                bottomPlazoMori = list(item.values())[6], bottomPlazoLength = list(item.values())[7], 

                # FOR PLAZO
                bottomChaniyaMori = list(item.values())[8], bottomChaniyaLength = list(item.values())[9])
        
        return HttpResponse('success')


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
        # button = eval(list(data.keys())[0]).pop('button')
        # print(button,"+++++++++++++++++")
        cnt = 0
        for item in eval(list(data.keys())[0]).values():
            if cnt == 0:
                phone = item['userPhone']
                checkUser = Customer.objects.filter(userPhone = phone)
                if checkUser.exists():
                    return HttpResponse("exists")
                cnt+=1
            if 'user' in list(item.keys())[0]:
                usrPhone = list(item.values())[2]
                user = Customer.objects.create(userName = list(item.values())[0], userDeliveryDate= list(item.values())[1], userPhone= list(item.values())[2], userAdvance= list(item.values())[3])
                user.save()
            
            elif 'top' in list(item.keys())[0]:
                userTop = TopDetail.objects.create(user = user,chest1 = list(item.values())[0], chest2= list(item.values())[1], shoulder= list(item.values())[2], topheapRound= list(item.values())[3], 
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
                userBottom = BottomDetail.objects.create(user =user, bottomWaist = list(item.values())[0], bottomHeapRound = list(item.values())[1],

                # FOR SALWAR
                bottomSalwarMori = list(item.values())[2], bottomSalwarLength = list(item.values())[3], 

                # FOR PANT 
                bottomPantMori = list(item.values())[4], bottomPantLength = list(item.values())[5], 

                # FOR PLAZO
                bottomPlazoMori = list(item.values())[6], bottomPlazoLength = list(item.values())[7], 

                # FOR PLAZO
                bottomChaniyaMori = list(item.values())[8], bottomChaniyaLength = list(item.values())[9])

                userBottom.save() 

        # if (eval(list(data.keys())[0])['button']) == 'print':
        #     return HttpResponse(user.id)
        return HttpResponse(user.id)
    return render(request,'fashion/create_order.html')

@login_required
def customerDetails(request, id):
    usr = Customer.objects.filter(id = id).first()
    top_details = list(TopDetail.objects.filter(user = usr).values())[0]
    bottom_details = list(BottomDetail.objects.filter(user = usr).values())[0]
    data = {'user':usr, 'top':top_details, 'bottom':bottom_details}
    return render(request, 'fashion/customerDetails.html',data)

@login_required
def deleteCustomer(request):
    id = list(request.GET.keys())[0]
    customer = Customer.objects.get(id = id)
    customer.delete()
    return HttpResponse('success')


@login_required
def customerType(request):
    return render(request,'fashion/customer_type.html')

def test(request):
    return render(request, "fashion/test.html")