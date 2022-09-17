from Fashon.models import *
from django.contrib import admin


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('userName', 'userDeliveryDate', 'userPhone', 'userAdvance')


admin.site.register(TopDetail)

admin.site.register(BottomDetail)

admin.site.register(OrderCreate)

admin.site.register(PendingDelivery)
