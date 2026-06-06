# Fitoterapia — Portal Web y Panel de Administración

Este proyecto es una plataforma web interactiva y autoadministrable dedicada a la difusión y aprendizaje de la **Fitoterapia** (el uso de plantas medicinales para el bienestar en el hogar). Cuenta con una landing page pública premium y un panel de administración robusto para la gestión en tiempo real del catálogo de plantas y eventos.

---

## 🚀 Características Principales

### 🌿 Vista Pública (Landing Page)
* **Página de Inicio Completa**: Diseño moderno, responsivo y semántico con un enfoque visual de alta calidad.
* **Secciones Clave**:
  * **Hero**: Banner principal con llamada a la acción clara e imágenes de alta definición.
  * **Guía de Huerto Terapéutico**: Pasos interactivos y consejos sobre cómo iniciar un huerto medicinal en casa.
  * **Catálogo de Plantas**: Muestra una selección de plantas con sus beneficios y usos prácticos. Incorpora un sistema de expansión ("Ver más / Ver menos") que limita la vista inicial para mejorar el rendimiento y la estética.
  * **Próximos Eventos**: Espacio dinámico para visualizar talleres, cursos y charlas comunitarias, con límite de visualización inicial y colapso dinámico.
  * **Pie de Página (Footer)**: Sección informativa con enlaces semánticos y redes.

### 🛡️ Panel de Administración (`/admin/panel`)
* **Acceso Protegido**: Pantalla de inicio de sesión segura (`/admin/login`) mediante comprobación de credenciales con redirección automatizada.
* **Dashboard de Estadísticas**:
  * Indicadores dinámicos que muestran el total de plantas activas, cantidad de categorías únicas y número total de participantes registrados para eventos.
* **Gestión de Plantas (CRUD Completo)**:
  * Permite añadir, editar y eliminar plantas del catálogo.
  * Campos obligatorios: Nombre, Categoría (menú desplegable), URL de imagen, Beneficios y Usos.
* **Gestión de Eventos (CRUD Completo)**:
  * Permite crear, modificar y eliminar talleres o actividades.
  * Campos obligatorios: Título, Fecha, Horario, Ubicación, Participantes máximos, URL de imagen y Descripción.
* **Persistencia en Tiempo Real**: Conexión bidireccional directa entre la base de datos simulada y el portal público utilizando `LocalStorage` (`adminPlants` y `adminEvents`).
* **Botón de Restauración**: Función para restablecer los catálogos a sus datos por defecto definidos en el código, facilitando las pruebas.

---

## 🛠️ Stack Tecnológico

* **Core**: React 19.x (JSX) y Vite 6.x.
* **Enrutamiento**: React Router v7.x para navegación fluida de SPA.
* **Estilos**: SASS/SCSS (arquitectura estructurada con variables, mixins, animaciones interactivas y responsive layouts).
* **Iconos**: Lucide React para iconografía moderna.
* **Base de Datos**: Simulación mediante persistencia en `LocalStorage` con fallback a archivos estáticos estructurados.

---

## 📂 Estructura del Proyecto (Atomic Design)

El proyecto sigue una metodología de **Diseño Atómico** para facilitar la reutilización y el mantenimiento del código:

```text
src/
├── assets/             # Imágenes y recursos estáticos
├── components/
│   ├── atoms/          # Botón, EncabezadoSeccion, ImagenConRespaldo
│   ├── molecules/      # TarjetaPlanta, TarjetaEvento, ItemPasoHuerto, TarjetaBeneficio
│   ├── organisms/      # SeccionHero, SeccionGuiaHuerto, SeccionPlantas, SeccionEventos, PiePagina
│   └── BarraNavegacion/ # Barra de navegación principal
├── datos/              # Datos semilla (plantas.js, eventos.js, beneficiosHuerto.js, pasosHuerto.js)
├── pages/
│   ├── IniciarSesionAdmin/ # Interfaz y lógica de inicio de sesión de administrador
│   ├── PanelAdmin/         # Lógica, estadísticas y tablas CRUD del panel de control
│   └── PaginaInicio/       # Homepage pública que reúne los organismos
├── styles/             # Variables globales de SCSS, mixins y estilos de layout
├── App.jsx             # Enrutamiento de la aplicación
├── main.jsx            # Punto de entrada de la aplicación
└── index.css           # Estilos base y resets globales
```

---

## 💻 Instalación y Uso Local

### Requisitos Previos
* **Node.js** v18.0.0 o superior
* **npm** v9.0.0 o superior

### Paso 1: Clonar e Instalar Dependencias
Instala los paquetes necesarios definidos en el `package.json`:
```bash
npm install
```

### Paso 2: Servidor de Desarrollo
Inicia el entorno local de desarrollo con Vite:
```bash
npm run dev
```
Abre en tu navegador la URL dev (por defecto: `http://localhost:5173`).

### Paso 3: Empaquetar para Producción
Para compilar y verificar el bundle de producción optimizado:
```bash
npm run build
npm run preview
```

---

## 🔑 Credenciales de Acceso Administrador

Para probar las funcionalidades de administración, utiliza las siguientes credenciales en el apartado de inicio de sesión (`/admin/login`):
* **Usuario**: `prueba`
* **Contraseña**: `12345678` *(o las definidas en el almacenamiento local)*
