from rest_framework import serializers
from .models import Cliente
from django.contrib.auth.hashers import make_password

class ClienteSerializer(serializers.ModelSerializer):
    confirmar_contrasena = serializers.CharField(write_only=True)

    class Meta:
        model = Cliente
        fields = [
            'nombre', 'documento', 'ciudad', 'direccion',
            'celular', 'correo_electronico', 'contrasena_hash', 'confirmar_contrasena'
        ]

    def validate(self, data):
        if data['contrasena_hash'] != data['confirmar_contrasena']:
            raise serializers.ValidationError("Las contraseñas no coinciden.")
        return data

    def create(self, validated_data):
        # Eliminar confirmar_contrasena porque no se guarda en el modelo
        validated_data.pop('confirmar_contrasena')
        validated_data['contrasena_hash'] = make_password(validated_data['contrasena_hash'])
        return super().create(validated_data)
