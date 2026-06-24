from django.contrib import admin
from .models import Categoria, Planta, Evento

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'descripcion')
    search_fields = ('nombre',)

@admin.register(Planta)
class PlantaAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre_comun', 'nombre_cientifico', 'categoria', 'activa')
    list_filter = ('categoria', 'activa')
    search_fields = ('nombre_comun', 'nombre_cientifico', 'familia')

@admin.register(Evento)
class EventoAdmin(admin.ModelAdmin):
    list_display = ('id', 'titulo', 'fecha', 'horario', 'ubicacion', 'activo')
    list_filter = ('activo',)
    search_fields = ('titulo', 'ubicacion')

