from django.contrib import admin
from django.urls import path
from usuarios.views import LoginUnificadoView, RegistroClienteView 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', LoginUnificadoView.as_view(), name='login_unificado'),
    path('api/registro-cliente/', RegistroClienteView.as_view(), name='registro-cliente'),
]
