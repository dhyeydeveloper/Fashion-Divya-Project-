from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import *
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login as auth_login, logout
from django.db.models import Q
from datetime import date, datetime
from datetime import datetime as dt

# Create your views here.
@login_required
def pendingDeliveryHtml(request):
    return render(request, 'fashion/pendingDelivery.html')

@csrf_exempt
@login_required
def deliveryCreate(request):
    id= request.POST.get('id')
    user_id = OrderCreate.objects.filter(id= id).values_list('user', flat=True)[0]
    user = Customer.objects.get(id = user_id)
    deliveryOrderObj = PendingDelivery.objects.create(user= user, deliverDate= user.userDeliveryDate)
    deliveryOrderObj.save()
    return JsonResponse('success', safe=False)

@login_required
def deliveryOrder(request):
    dateQuery = request.GET.get('date')
    if dateQuery is not None and dateQuery != "":
        allDates = [date['deliverDate'] for date in PendingDelivery.objects.order_by('deliverDate').values('deliverDate').distinct()]
        allOrders = PendingDelivery.objects.filter(deliverDate = dateQuery).values()
        fetchOrder = {}
        for dates in allDates:
            fdDate = dates.strftime("%d-%m-%Y")
            for orders in allOrders:
                if  fdDate == orders['deliverDate'].strftime("%d-%m-%Y"):
                    if  fdDate in fetchOrder:
                        tempOrder = fetchOrder[fdDate]
                        user = Customer.objects.filter(id=orders['user_id']).values()
                        orders.pop('user_id')
                        orders['user'] = user[0] 
                        tempOrder.append(orders)
                    else:
                        user = Customer.objects.filter(id=orders['user_id']).values()
                        orders.pop('user_id')
                        orders['user'] = user[0] 
                        fetchOrder[fdDate] = [orders]
        return JsonResponse(fetchOrder, safe=False)

    query = request.GET.get('value')
    if query is not None and query != "":
        allDates = [date['deliverDate'] for date in PendingDelivery.objects.order_by('deliverDate').values('deliverDate').distinct()]
        allOrders = PendingDelivery.objects.filter(Q(user__userName__icontains=query) | Q(user__userPhone__icontains= query)).values()
        fetchOrder = {}
        for dates in allDates:
            fdDate = dates.strftime("%d-%m-%Y")
            for orders in allOrders:
                if  fdDate == orders['deliverDate'].strftime("%d-%m-%Y"):
                    if  fdDate in fetchOrder:
                        tempOrder = fetchOrder[fdDate]
                        user = Customer.objects.filter(id=orders['user_id']).values()
                        orders.pop('user_id')
                        orders['user'] = user[0] 
                        tempOrder.append(orders)
                    else:
                        user = Customer.objects.filter(id=orders['user_id']).values()
                        orders.pop('user_id')
                        orders['user'] = user[0] 
                        fetchOrder[fdDate] = [orders]
        return JsonResponse(fetchOrder, safe=False)

    allDates = [date['deliverDate'] for date in PendingDelivery.objects.order_by('deliverDate').values('deliverDate').distinct()]
    allOrders = PendingDelivery.objects.all().values()
    fetchOrder = {}
    for dates in allDates:
        fdDate = dates.strftime("%d-%m-%Y")
        for orders in allOrders:
            if  fdDate == orders['deliverDate'].strftime("%d-%m-%Y"):
                if  fdDate in fetchOrder:
                    tempOrder = fetchOrder[fdDate]
                    user = Customer.objects.filter(id=orders['user_id']).values()
                    orders.pop('user_id')
                    orders['user'] = user[0] 
                    tempOrder.append(orders)
                else:
                    user = Customer.objects.filter(id=orders['user_id']).values()
                    orders.pop('user_id')
                    orders['user'] = user[0] 
                    fetchOrder[fdDate] = [orders]

    return JsonResponse(fetchOrder, safe=False)

@login_required
def deleteDeliveryOrderView(request):
    item = PendingDelivery.objects.get(id=request.GET.get('id'))
    item.delete()
    allDates = [date['deliverDate'] for date in PendingDelivery.objects.order_by('deliverDate').values('deliverDate').distinct()]
    allOrders = PendingDelivery.objects.all().values()
    fetchOrder = {}
    for dates in allDates:
        fdDate = dates.strftime("%d-%m-%Y")
        for orders in allOrders:
            if  fdDate == orders['deliverDate'].strftime("%d-%m-%Y"):
                if  fdDate in fetchOrder:
                    tempOrder = fetchOrder[fdDate]
                    user = Customer.objects.filter(id=orders['user_id']).values()
                    orders.pop('user_id')
                    orders['user'] = user[0] 
                    tempOrder.append(orders)
                else:
                    user = Customer.objects.filter(id=orders['user_id']).values()
                    orders.pop('user_id')
                    orders['user'] = user[0] 
                    fetchOrder[fdDate] = [orders]
                    
    return JsonResponse(fetchOrder, safe=False)


@csrf_exempt
@login_required
def pendingOrderCreate(request):
    id= request.POST.get('id')  
    user = Customer.objects.get(id= id)
    today = datetime.today()
    givenDate = dt.strptime(str(user.userDeliveryDate), "%Y-%m-%d")
    delta =  (givenDate - today).days
    if delta >= 0:
        if delta < 20:
            priority = "High"
        elif delta < 40:
            priority = "Medium"
        else:
            priority = "Low"

        makeOrder = OrderCreate.objects.create(user= user, orderDate= user.userDeliveryDate, priority = priority)
        makeOrder.save()
        return JsonResponse('success', safe=False)
    else:
        return JsonResponse('fail', safe=False)


@login_required
def allCustomerView(request):
    query = request.GET.get('value')
    if query is None:
        customers = Customer.objects.all()
        customerCount = len(customers)
        return render(request, 'fashion/myCustomers.html',{'customers':customers,'customerCount':customerCount})
    else:
        customers = list(Customer.objects.filter(Q(userName__icontains=query) | Q(userPhone__icontains= query)).values())
        return JsonResponse(customers,safe=False)

@login_required
def pendingOrder(request):
    dateQuery = request.GET.get('date')
    if dateQuery is not None and dateQuery != "":
        allDates = [date['orderDate'] for date in OrderCreate.objects.order_by('orderDate').values('orderDate').distinct()]
        allOrders = OrderCreate.objects.filter(orderDate = dateQuery).values()
        fetchOrder = {}
        for dates in allDates:
            fdDate = dates.strftime("%d-%m-%Y")
            for orders in allOrders:
                if  fdDate == orders['orderDate'].strftime("%d-%m-%Y"):
                    if  fdDate in fetchOrder:
                        tempOrder = fetchOrder[fdDate]
                        user = Customer.objects.filter(id=orders['user_id']).values()
                        orders.pop('user_id')
                        orders['user'] = user[0] 
                        tempOrder.append(orders)
                    else:
                        user = Customer.objects.filter(id=orders['user_id']).values()
                        orders.pop('user_id')
                        orders['user'] = user[0] 
                        fetchOrder[fdDate] = [orders]
        return JsonResponse(fetchOrder, safe=False)

    query = request.GET.get('value')
    if query is not None and query != "":
        allDates = [date['orderDate'] for date in OrderCreate.objects.order_by('orderDate').values('orderDate').distinct()]
        allOrders = OrderCreate.objects.filter(Q(user__userName__icontains=query) | Q(user__userPhone__icontains= query) | Q(priority__icontains= query)).values()
        fetchOrder = {}
        for dates in allDates:
            fdDate = dates.strftime("%d-%m-%Y")
            for orders in allOrders:
                if  fdDate == orders['orderDate'].strftime("%d-%m-%Y"):
                    if  fdDate in fetchOrder:
                        tempOrder = fetchOrder[fdDate]
                        user = Customer.objects.filter(id=orders['user_id']).values()
                        orders.pop('user_id')
                        orders['user'] = user[0] 
                        tempOrder.append(orders)
                    else:
                        user = Customer.objects.filter(id=orders['user_id']).values()
                        orders.pop('user_id')
                        orders['user'] = user[0] 
                        fetchOrder[fdDate] = [orders]
        return JsonResponse(fetchOrder, safe=False)

    import datetime as db
    tod = dt.today()
    # Less than equal to 20 days To High
    date20ago = db.timedelta(days = 20)
    a = tod + date20ago
    date_20 = a.date()
    OrderCreate.objects.filter(orderDate__lte = date_20).update(priority = 'High')

    # Less than equal to 40 days To Medium
    date40ago = db.timedelta(days = 40)
    a = tod + date40ago
    date_40 = a.date()
    OrderCreate.objects.filter(orderDate__lte = date_40).exclude(orderDate__lte = date_20).update(priority = 'Medium')

    # Greater than 40 days To Low
    OrderCreate.objects.exclude(orderDate__lte = date_40).update(priority = 'Low')

    allDates = [date['orderDate'] for date in OrderCreate.objects.order_by('orderDate').values('orderDate').distinct()]
    allOrders = OrderCreate.objects.all().values()
    fetchOrder = {}
    for dates in allDates:
        fdDate = dates.strftime("%d-%m-%Y")
        for orders in allOrders:
            if  fdDate == orders['orderDate'].strftime("%d-%m-%Y"):
                if  fdDate in fetchOrder:
                    tempOrder = fetchOrder[fdDate]
                    user = Customer.objects.filter(id=orders['user_id']).values()
                    orders.pop('user_id')
                    orders['user'] = user[0] 
                    tempOrder.append(orders)
                else:
                    user = Customer.objects.filter(id=orders['user_id']).values()
                    orders.pop('user_id')
                    orders['user'] = user[0] 
                    fetchOrder[fdDate] = [orders]
                    
    return JsonResponse(fetchOrder, safe=False)

@login_required
def deleteOrderView(request):
    item = OrderCreate.objects.get(id=request.GET.get('id'))
    item.delete()
    allDates = [date['orderDate'] for date in OrderCreate.objects.order_by('orderDate').values('orderDate').distinct()]
    allOrders = OrderCreate.objects.all().values()
    fetchOrder = {}
    for dates in allDates:
        fdDate = dates.strftime("%d-%m-%Y")
        for orders in allOrders:
            if  fdDate == orders['orderDate'].strftime("%d-%m-%Y"):
                if  fdDate in fetchOrder:
                    tempOrder = fetchOrder[fdDate]
                    user = Customer.objects.filter(id=orders['user_id']).values()
                    orders.pop('user_id')
                    orders['user'] = user[0] 
                    tempOrder.append(orders)
                else:
                    user = Customer.objects.filter(id=orders['user_id']).values()
                    orders.pop('user_id')
                    orders['user'] = user[0] 
                    fetchOrder[fdDate] = [orders]
                    
    return JsonResponse(fetchOrder, safe=False)


@login_required
def pendingOrderHtml(request):
    return render(request, 'fashion/pendingOrder.html')


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
        button = eval(list(data.keys())[0])['button']
        for item in eval(list(data.keys())[0]).values():
            if type(item) != str:
                if 'user' in list(item.keys())[0]:
                    user = Customer.objects.filter(id= id)
                    user.update(userName = list(item.values())[0], userDeliveryDate= list(item.values())[2], userPhone= list(item.values())[1], userAdvance= list(item.values())[3])

                    if button == "print":
                        today = datetime.today()
                        # convert string to date object
                        givenDate = dt.strptime(list(item.values())[2], "%Y-%m-%d")
                        delta =  (givenDate - today).days
                        if delta >= 0:
                            if delta < 20:
                                priority = "High"
                            elif delta < 40:
                                priority = "Medium"
                            else:
                                priority = "Low"

                            makeOrder = OrderCreate.objects.create(user= user.first(), orderDate= list(item.values())[2], priority = priority)
                            makeOrder.save()

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
        cnt = 0
        button = eval(list(data.keys())[0])['button']
        for item in eval(list(data.keys())[0]).values():
            if cnt == 0:
                phone = item['userPhone']
                checkUser = Customer.objects.filter(userPhone = phone)
                if checkUser.exists():
                    return HttpResponse("exists")
                cnt+=1
            
            if type(item) != str:
                if 'user' in list(item.keys())[0]:
                    user = Customer.objects.create(userName = list(item.values())[0], userDeliveryDate= list(item.values())[1], userPhone= list(item.values())[2], userAdvance= list(item.values())[3])
                    user.save()

                    if button == "print":
                        today = datetime.today()
                        # convert string to date object
                        givenDate = dt.strptime(list(item.values())[1], "%Y-%m-%d")
                        delta =  (givenDate - today).days
                        if delta >= 0:
                            if delta < 20:
                                priority = "High"
                            elif delta < 40:
                                priority = "Medium"
                            else:
                                priority = "Low"

                            makeOrder = OrderCreate.objects.create(user= user, orderDate= list(item.values())[1], priority = priority)
                            makeOrder.save()
                
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
    customers = list(Customer.objects.all().values())
    return JsonResponse(customers,safe=False)


@login_required
def customerType(request):
    return render(request,'fashion/customer_type.html')

def test(request):
    return render(request, "fashion/test.html")