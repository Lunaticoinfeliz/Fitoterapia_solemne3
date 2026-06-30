# Fitoterapia — Portal Web y Panel de Administración (Full Stack)

Este proyecto es una plataforma web interactiva y autoadministrable dedicada a la difusión y aprendizaje de la **Fitoterapia** (el uso de plantas medicinales para el bienestar en el hogar). Cuenta con una landing page pública premium con filtros reactivos, un catálogo de plantas independiente y un panel de administración robusto respaldado por una API REST en Django para la gestión en tiempo real.

---

## 🚀 Características Principales

### 🌿 Vista Pública (Landing Page)
* **Página de Inicio Completa**: Diseño moderno, responsivo y semántico con un enfoque visual de alta calidad y animaciones fluidas.
* **Secciones Clave**:
  * **Hero**: Banner principal con llamada a la acción clara e imágenes de alta definición.
  * **Guía de Huerto Terapéutico**: Pasos interactivos y consejos sobre cómo iniciar un huerto medicinal en casa.
  * **Alternancia por Pestañas (Evita Sobrecarga)**: Panel interactivo (Tabs) de temática natural para alternar suavemente entre **Catálogo de Plantas** y **Próximos Eventos**. Responde automáticamente a los anclajes de la barra de navegación (`#plantas` y `#eventos`).
  * **Sección de Cómo Empezar**: Llamada a la acción complementaria para incentivar el aprendizaje.
  * **Pie de Página (Footer)**: Sección informativa con enlaces semánticos y redes sociales.

### 📖 Catálogo Independiente de Plantas (`/plantas`)
* **Buscador Reactivo**: Barra de búsqueda integrada conectada a la API que permite buscar plantas por su nombre común o científico en tiempo real a medida que se escribe.
* **Filtros por Categoría**: Lista horizontal de categorías dinámicas obtenidas desde la base de datos para filtrar el catálogo al instante.
* **Visualización Detallada**: Cada tarjeta de planta presenta de manera limpia la fotografía, beneficios principales y posología recomendada.
* **Resiliencia**: Si el servidor backend está fuera de línea, el buscador y el filtro de categorías continúan funcionando localmente en base a un respaldo local preestablecido.

### 🛡️ Panel de Administración (`/admin/panel`)
* **Acceso Protegido**: Pantalla de inicio de sesión segura (`/admin/login`) mediante credenciales con redirección automatizada.
* **Dashboard de Estadísticas**:
  * Indicadores dinámicos que muestran el total de plantas registradas, cantidad de categorías únicas ingresadas y el número total de participantes previstos para eventos.
* **Gestión de Plantas (CRUD Completo)**:
  * Permite añadir, editar y eliminar plantas del catálogo.
  * Campos gestionados: Nombre común, Nombre científico, Familia, Categoría (menú desplegable dinámico), URL de imagen, Parte utilizada, Beneficios/Usos, Posología/Dosificación, Efectos adversos e Interacciones.
* **Gestión de Eventos (CRUD Completo)**:
  * Permite crear, modificar y eliminar talleres o actividades.
  * Campos gestionados: Título, Fecha, Horario, Ubicación, Participantes máximos, URL de la imagen y Descripción.
* **Persistencia Real (API Django)**: Todo el panel administrativo y la landing page pública leen y escriben a través de peticiones HTTP reales a los endpoints de la API en Django.
* **Botón de Restauración**: Función para restablecer completamente la base de datos a sus datos de semilla iniciales (25 monografías y 2 eventos predefinidos) mediante una petición `POST` al endpoint de restauración de la API.

---

## 🛠️ Stack Tecnológico

### Frontend (React + Vite)
* **Core**: React 19.x (JSX) y Vite 6.x.
* **Enrutamiento**: React Router v7.x para navegación fluida de SPA.
* **Estilos**: SASS/SCSS (arquitectura estructurada con variables globales, mixins, animaciones y responsive layouts).
* **Iconos**: Lucide React para iconografía moderna.

### Backend (Django REST Framework)
* **Core**: Django 5.1.x y Django REST Framework 3.15.x.
* **Filtros**: Django Filter 24.x para búsquedas y filtros en los endpoints.
* **CORS**: Django CORS Headers 4.x para permitir conexiones seguras desde el frontend en React.
* **Base de Datos**: SQLite3 (local) con semillas de 25 plantas y categorías configuradas a través de Django Fixtures.

---

## 📂 Estructura del Proyecto

El proyecto sigue una estructura limpia que separa la interfaz de usuario en React del servidor de servicios en Django:

```text
Fitoterapia_solemne3/
├── fitoterapia_backend/    # Proyecto del Backend (Django)
│   ├── config/             # Configuración de Django (settings.py, urls.py, wsgi.py)
│   ├── fitoterapia/        # App del Backend (modelos, vistas, serializadores, migraciones)
│   ├── fixtures_ejemplo.json # Archivo de semilla con 25 monografías y 2 eventos
│   └── manage.py           # Script de gestión de Django
├── src/                    # Código Fuente del Frontend (React)
│   ├── assets/             # Imágenes y recursos estáticos
│   ├── components/
│   │   ├── atoms/          # Botón, EncabezadoSeccion, ImagenConRespaldo
│   │   ├── molecules/      # Tarjetas y elementos de listas
│   │   ├── organisms/      # Organismos complejos (Hero, Guía, Pestañas, Footer)
│   │   └── BarraNavegacion/ # Barra de navegación principal
│   ├── datos/              # Datos semilla estáticos de respaldo
│   ├── pages/
│   │   ├── IniciarSesionAdmin/ # Login de administración
│   │   ├── PanelAdmin/         # Dashboard y CRUD del Panel de Control
│   │   ├── CatalogoPlantas.jsx # Página del catálogo completo de plantas
│   │   └── PaginaInicio.jsx    # Landing page pública con tabs
│   ├── styles/             # Variables globales de SCSS, mixins y layouts
│   ├── App.jsx             # Enrutamiento de la aplicación (React Router)
│   └── main.jsx            # Punto de entrada de la aplicación
├── index.html              # Plantilla HTML base del frontend
├── vite.config.js          # Configuración de Vite
└── package.json            # Dependencias del frontend
```

---

## 💻 Instalación y Uso Local

### 1. Iniciar el Backend (Django)

#### Requisitos Previos
* **Python** 3.11 o 3.12
* **pip** instalado

#### Pasos de Configuración:
1. Navega a la carpeta del backend:
   ```bash
   cd fitoterapia_backend
   ```
2. Crea y activa un entorno virtual (venv):
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # Linux/Mac
   python -m venv venv
   source venv/bin/activate
   ```
3. Instala las dependencias necesarias:
   ```bash
   pip install django==5.1.4 djangorestframework==3.15.2 django-filter==24.3 django-cors-headers==4.6.0
   ```
4. Ejecuta las migraciones de base de datos:
   ```bash
   python manage.py makemigrations fitoterapia
   python manage.py migrate
   ```
5. Carga las 25 monografías de plantas y datos de prueba:
   ```bash
   python manage.py loaddata fixtures_ejemplo.json
   ```
6. Crea el superusuario para acceder a Django Admin:
   ```bash
   python manage.py createsuperuser
   ```
7. Levanta el servidor de desarrollo del backend:
   ```bash
   python manage.py runserver
   ```
El backend estará disponible en `http://localhost:8000`.

---

### 2. Iniciar el Frontend (React)

#### Requisitos Previos
* **Node.js** v18.0.0 o superior
* **npm** v9.0.0 o superior

#### Pasos de Configuración:
1. Abre una nueva terminal en la raíz del proyecto (`Fitoterapia_solemne3/`) e instala las dependencias:
   ```bash
   npm install
   ```
2. Inicia el servidor de desarrollo de Vite:
   ```bash
   npm run dev
   ```
Abre en tu navegador la URL: `http://localhost:5173`.

#### Compilar para Producción:
Para generar el empaquetado optimizado del frontend:
```bash
npm run build
npm run preview
```

---

## 🔑 Credenciales de Acceso

### Panel de Administración Frontend (`/admin/login`):
* **Usuario**: `prueba`
* **Contraseña**: `12345678`

### Django Admin Backend (`http://localhost:8000/admin/`):
* **Usuario**: `admin` *(o el nombre que definiste en createsuperuser)*
* **Contraseña**: `12345678` *(o la definida en la creación)*
