from tkinter import CASCADE
from django.db import models

# Create your models here.
class Customer(models.Model):
    userName = models.CharField(max_length=225)
    userDeliveryDate = models.DateField()
    userPhone = models.BigIntegerField()
    userAdvance = models.IntegerField(null= True)

    def __int__(self):
        return self.userPhone
    
    def __str__(self):
        return self.userName

priority_choices = (("high","High"),("medium","Medium"),("low","Low"))
class OrderCreate(models.Model):
    user = models.ForeignKey(Customer, on_delete=models.CASCADE)
    orderDate = models.DateField()
    priority = models.CharField(max_length=20, choices=priority_choices)

    @property
    def username(self):
        return self.user.userName

class TopDetail(models.Model):
    user = models.ForeignKey(Customer, on_delete=models.CASCADE)
    chest1 = models.IntegerField()
    chest2 = models.IntegerField()
    shoulder = models.IntegerField()
    topheapRound = models.IntegerField()

    # ONLY KURTI
    topKurtiArmHole = models.IntegerField()
    topKurtiWaist = models.IntegerField()
    topKurtiLength =  models.IntegerField()
    topKurtiSleeveL = models.IntegerField() 
    topKurtiSleeveR = models.IntegerField()
    topKurtiNeckF =  models.IntegerField()
    topKurtiNeckB =  models.IntegerField()

    # ONLY GOWN
    topGownArmHole = models.IntegerField()
    topGownWaist = models.IntegerField()
    topGownLength =  models.IntegerField()
    topGownSleeveL = models.IntegerField() 
    topGownSleeveR = models.IntegerField()
    topGownNeckF =  models.IntegerField()
    topGownNeckB =  models.IntegerField()

    # ONLY BLOUSE
    topBlouseArmHole = models.IntegerField()
    topBlouseWaist = models.IntegerField()
    topBlouseLength =  models.IntegerField()
    topBlouseSleeveL = models.IntegerField() 
    topBlouseSleeveR = models.IntegerField()
    topBlouseNeckF =  models.IntegerField()
    topBlouseNeckB =  models.IntegerField()

    def __str__(self):
        return self.user.userName


class BottomDetail(models.Model):

    user = models.ForeignKey(Customer, on_delete=models.CASCADE)
    bottomWaist = models.IntegerField()
    bottomHeapRound = models.IntegerField()

    # ONLY SALWAR
    bottomSalwarMori = models.IntegerField()
    bottomSalwarLength = models.IntegerField()

    # ONLY PANT
    bottomPantMori = models.IntegerField()
    bottomPantLength = models.IntegerField()

    # ONLY PLAZO
    bottomPlazoMori = models.IntegerField()
    bottomPlazoLength = models.IntegerField()

    # ONLY PLAZO
    bottomChaniyaMori = models.IntegerField()
    bottomChaniyaLength = models.IntegerField()

    def __str__(self):
        return self.user.userName

