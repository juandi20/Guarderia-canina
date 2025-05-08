from django.contrib import admin
from .models import Cliente, Empleado, Mascota, Reserva, CheckIn, CheckOut

admin.site.register(Cliente)
admin.site.register(Mascota)
admin.site.register(Reserva)
admin.site.register(CheckIn)
admin.site.register(CheckOut)

@admin.register(Empleado)
class EmpleadoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "correo_electronico", "celular")
    search_fields = ("nombre", "correo_electronico")
