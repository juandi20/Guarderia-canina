from django.db import models

# -----------------------
# Modelo Cliente
# -----------------------
class Cliente(models.Model):
    nombre = models.CharField(max_length=55)
    documento = models.BigIntegerField()
    ciudad = models.CharField(max_length=50)
    direccion = models.CharField(max_length=50)
    celular = models.CharField(max_length=20)
    correo_electronico = models.EmailField(unique=True)
    contrasena_hash = models.CharField(max_length=255)  # Contraseña en hash

    def __str__(self):
        return self.nombre

# -----------------------
# Modelo Empleado
# -----------------------
class Empleado(models.Model):
    nombre = models.CharField(max_length=50)
    documento = models.BigIntegerField()
    celular = models.CharField(max_length=20)
    correo_electronico = models.EmailField(unique=True)
    contrasena_hash = models.CharField(max_length=255)  # Contraseña en hash

    def __str__(self):
        return self.nombre

# -----------------------
# Modelo Mascota
# -----------------------
class Mascota(models.Model):
    nombre = models.CharField(max_length=40)
    raza = models.CharField(max_length=30)
    edad = models.IntegerField()
    genero = models.CharField(max_length=20)
    peso = models.IntegerField()
    esterilizacion = models.BooleanField()
    reactivo = models.BooleanField()
    vacunas = models.BooleanField()
    alergias = models.CharField(max_length=55)
    tipo_alergias = models.CharField(max_length=55, null=True, blank=True)
    tipo_medicamento = models.CharField(max_length=55)
    tipo_alimentos = models.CharField(max_length=55)
    veces_alimento = models.IntegerField()
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='mascotas')

    def __str__(self):
        return f"{self.nombre} ({self.raza})"

# -----------------------
# Modelo Reserva
# -----------------------
class Reserva(models.Model):
    fecha_entrada = models.DateTimeField()
    fecha_salida = models.DateTimeField()
    hora = models.TimeField()
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='reservas')
    empleado = models.ForeignKey(Empleado, on_delete=models.SET_NULL, null=True, blank=True, related_name='reservas')
    mascota = models.ForeignKey(Mascota, on_delete=models.CASCADE, related_name='reservas')
    planes = models.CharField(
        max_length=20,
        choices=[
            ('0-5 kg', '0-5 kg'),
            ('5-15 kg', '5-15 kg'),
            ('15-25 kg', '15-25 kg'),
            ('25-35 kg', '25-35 kg'),
            ('Mas de 35 kg', 'Mas de 35 kg')
        ]
    )

    def __str__(self):
        return f"Reserva de {self.mascota.nombre} del {self.fecha_entrada.date()} al {self.fecha_salida.date()}"

# -----------------------
# Modelo Check-In
# -----------------------
class CheckIn(models.Model):
    fecha = models.DateTimeField()
    documento = models.BigIntegerField()
    reserva = models.ForeignKey(Reserva, on_delete=models.CASCADE, related_name='checkins')
    empleado = models.ForeignKey(Empleado, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"Check-in {self.documento} - {self.fecha}"

# -----------------------
# Modelo Check-Out
# -----------------------
class CheckOut(models.Model):
    fecha = models.DateTimeField()
    documento = models.BigIntegerField()
    reserva = models.ForeignKey(Reserva, on_delete=models.CASCADE, related_name='checkouts')
    check_in = models.ForeignKey(CheckIn, on_delete=models.CASCADE)
    empleado = models.ForeignKey(Empleado, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"Check-out {self.documento} - {self.fecha}"
