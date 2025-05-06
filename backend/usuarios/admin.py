from django.contrib import admin
from .models import Cliente, Empleado, Mascota, Reserva, CheckIn, CheckOut

admin.site.register(Cliente)
admin.site.register(Empleado)
admin.site.register(Mascota)
admin.site.register(Reserva)
admin.site.register(CheckIn)
admin.site.register(CheckOut)
