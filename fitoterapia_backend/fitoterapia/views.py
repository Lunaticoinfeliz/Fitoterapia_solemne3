from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import models
from django.db.models import Sum
from .models import Categoria, Planta, Evento
from .serializers import CategoriaSerializer, PlantaSerializer, EventoSerializer

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class PlantaViewSet(viewsets.ModelViewSet):
    queryset = Planta.objects.all()
    serializer_class = PlantaSerializer

    def get_queryset(self):
        queryset = Planta.objects.all()
        
        # Filtro: solo activas (para la landing)
        solo_activas = self.request.query_params.get('solo_activas', None)
        if solo_activas == 'true':
            queryset = queryset.filter(activa=True)
            
        # Filtro: por categoría
        categoria = self.request.query_params.get('categoria', None)
        if categoria:
            queryset = queryset.filter(categoria_id=categoria)
            
        # Filtro: búsqueda
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                models.Q(nombre_comun__icontains=search) | 
                models.Q(nombre_cientifico__icontains=search)
            )
            
        return queryset

    @action(detail=False, methods=['get'])
    def resumen(self, request):
        total_plantas = Planta.objects.count()
        total_categorias = Categoria.objects.count()
        total_eventos = Evento.objects.count()
        
        # Opcional: total participantes en eventos activos o en general
        total_participantes = Evento.objects.aggregate(total=Sum('participantes_max'))['total'] or 0
        
        return Response({
            'total_plantas': total_plantas,
            'total_categorias': total_categorias,
            'total_eventos': total_eventos,
            'total_participantes': total_participantes
        })

    @action(detail=False, methods=['post'])
    def restablecer(self, request):
        from django.core.management import call_command
        try:
            Planta.objects.all().delete()
            Categoria.objects.all().delete()
            Evento.objects.all().delete()
            call_command('loaddata', 'fixtures_ejemplo.json')
            return Response({'status': 'datos restablecidos correctamente'})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class EventoViewSet(viewsets.ModelViewSet):
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer

    def get_queryset(self):
        queryset = Evento.objects.all()
        
        # Filtro: solo activos
        activo = self.request.query_params.get('activo', None)
        if activo == 'true':
            queryset = queryset.filter(activo=True)
            
        return queryset

