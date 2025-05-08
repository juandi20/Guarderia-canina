from .serializers import ClienteSerializer
from .serializers import ClienteSerializer
from .models import Empleado, Cliente
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password


class LoginUnificadoView(APIView):
    def post(self, request):
        correo = request.data.get('correo_electronico')
        contrasena = request.data.get('contrasena')

        # Intentar autenticación como Cliente
        try:
            cliente = Cliente.objects.get(correo_electronico=correo)
            print(f"Cliente encontrado: {cliente}")  # Depuración
            if check_password(contrasena, cliente.contrasena_hash):
                return Response({
                    "id": cliente.id,
                    "rol": "cliente",
                    "nombre": cliente.nombre,
                    "correo_electronico": cliente.correo_electronico,
                    "direccion": cliente.direccion,
                    "ciudad": cliente.ciudad
                }, status=status.HTTP_200_OK)
            else:
                print("Contraseña incorrecta para Cliente")  # Depuración
        except Cliente.DoesNotExist:
            print(f"Cliente no encontrado con correo: {correo}")  # Depuración

        # Intentar autenticación como Empleado
        try:
            empleado = Empleado.objects.get(correo_electronico=correo)
            print(f"Empleado encontrado: {empleado}")  # Depuración
            if check_password(contrasena, empleado.contrasena_hash):
                return Response({
                    "id": empleado.id,
                    "rol": "empleado",
                    "nombre": empleado.nombre,
                    "correo_electronico": empleado.correo_electronico,
                    "celular": empleado.celular
                }, status=status.HTTP_200_OK)
            else:
                print("Contraseña incorrecta para Empleado")  # Depuración
        except Empleado.DoesNotExist:
            print(f"Empleado no encontrado con correo: {correo}")  # Depuración

        # Si no se encuentra en ninguno
        return Response({"error": "Correo o contraseña incorrecta"}, status=status.HTTP_401_UNAUTHORIZED)




class RegistroClienteView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ClienteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)