from django.contrib import admin
from django.urls import path
from usuarios.views import LoginClienteView, RegistroClienteView 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login-cliente/', LoginClienteView.as_view(), name='login_cliente'),
    path('api/registro-cliente/', RegistroClienteView.as_view(), name='registro-cliente'),
]
