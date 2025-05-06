from django.contrib import admin
from django.urls import path
from usuarios.views import LoginClienteView, RegistroClienteView # Asegúrate de tener esta vista en usuarios/views.py

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login-cliente/', LoginClienteView.as_view(), name='login_cliente'),
    path('registro-cliente/', RegistroClienteView.as_view(), name='registro-cliente'),
]
