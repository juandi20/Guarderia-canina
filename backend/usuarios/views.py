from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password
from .models import Cliente

class LoginClienteView(APIView):
    def post(self, request):
        correo = request.data.get('correo_electronico')
        contrasena = request.data.get('contrasena')

        try:
            cliente = Cliente.objects.get(correo_electronico=correo)
            if check_password(contrasena, cliente.contrasena_hash):
                return Response({
                    "id": cliente.id,
                    "nombre": cliente.nombre,
                    "correo_electronico": cliente.correo_electronico,
                    "direccion": cliente.direccion,
                    "ciudad": cliente.ciudad
                }, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Contraseña incorrecta"}, status=status.HTTP_401_UNAUTHORIZED)
        except Cliente.DoesNotExist:
            return Response({"error": "Cliente no encontrado"}, status=status.HTTP_404_NOT_FOUND)

class RegistroClienteView(APIView):
    def post(self, request):
        serializer = ClienteRegistroSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'mensaje': 'Cliente registrado correctamente'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)