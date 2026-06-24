from django.db import models

class Categoria(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre

class Planta(models.Model):
    nombre_cientifico = models.CharField(max_length=200)
    nombre_comun = models.CharField(max_length=200)
    familia = models.CharField(max_length=100)
    categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True, related_name='plantas')
    imagen_url = models.CharField(max_length=500)
    parte_utilizada = models.TextField()
    propiedades_usos = models.TextField()
    posologia = models.TextField()
    efectos_adversos = models.TextField(blank=True, null=True)
    interacciones = models.TextField(blank=True, null=True)
    activa = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.nombre_comun} ({self.nombre_cientifico})"

class Evento(models.Model):
    titulo = models.CharField(max_length=200)
    fecha = models.CharField(max_length=100)  # We use CharField because in the frontend, they use strings like "15 de junio de 2026" or "20 de Mayo, 2026". 
    horario = models.CharField(max_length=100)  # In frontend they have "10:00 - 13:00" or "10:00 AM - 12:00 PM". Let's use CharField to match exactly.
    ubicacion = models.CharField(max_length=200)
    participantes_max = models.IntegerField(default=0)  # In frontend "participantes" or "participantes_max"
    imagen_url = models.CharField(max_length=500)
    descripcion = models.TextField()
    activo = models.BooleanField(default=True)

    def __str__(self):
        return self.titulo

