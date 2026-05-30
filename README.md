# Fitoterapia — Solemne 2

Interfaz frontend del proyecto VCM **Fitoterapia**: huerto terapéutico y plantas medicinales.

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

```bash
npm install
```

## Ejecución en desarrollo

```bash
npm run dev
```

Abre la URL que muestra Vite (por defecto `http://localhost:5173`).

## Build de producción

```bash
npm run build
npm run preview
```

## Stack

- React (JSX)
- React Router
- SASS/SCSS (variables, mixins, partials)
- Vite

## Estructura (diseño atómico)

```
src/
  components/
    atoms/        # Boton, EncabezadoSeccion, ImagenConRespaldo
    molecules/    # TarjetaBeneficio, TarjetaPlanta, TarjetaEvento, ItemPasoHuerto
    organisms/    # SeccionHero, SeccionGuiaHuerto, SeccionPlantas, SeccionEventos, SeccionComoEmpezar, PiePagina
    BarraNavegacion/
  pages/          # PaginaInicio (landing)
  datos/          # plantas.js, eventos.js, beneficiosHuerto.js, pasosHuerto.js
  styles/         # Variables, mixins y layout global SCSS
```

## Rama `landing`

El landing se desarrolla en la rama `landing` para integrar vía pull request hacia `main`.
