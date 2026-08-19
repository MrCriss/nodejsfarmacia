# Farmacias Bonita - Aplicación React con Patrón MVC

Esta aplicación web para Farmacias Bonita ha sido refactorizada siguiendo el patrón de arquitectura Modelo-Vista-Controlador (MVC) para una mejor organización y mantenibilidad del código.

## Arquitectura MVC

### Modelo (Model)
- **Ubicación**: `src/models/`
- **Responsabilidad**: Gestiona los datos de la aplicación.
- **Archivos**:
  - `data.js`: Contiene los datos estáticos de productos y servicios.

### Vista (View)
- **Ubicación**: `src/components/`
- **Responsabilidad**: Maneja la presentación y la interfaz de usuario.
- **Archivos**:
  - `HomePage.jsx`: Página de inicio
  - `ProductosPage.jsx`: Catálogo de productos
  - `ServiciosPage.jsx`: Servicios ofrecidos
  - `SobreNosotrosPage.jsx`: Información de la empresa
  - `ContactoPage.jsx`: Formulario de contacto
  - `Nav.jsx`: Barra de navegación
  - `Footer.jsx`: Pie de página
  - `WhatsAppFloating.jsx`: Botón flotante de WhatsApp

### Controlador (Controller)
- **Ubicación**: `src/hooks/`
- **Responsabilidad**: Maneja la lógica de negocio, estado y eventos.
- **Archivos**:
  - `useProductos.js`: Hook personalizado para manejar la lógica de filtrado y búsqueda de productos.

## Tecnologías Utilizadas

- **React 19**: Biblioteca para la construcción de interfaces de usuario
- **React Router DOM**: Para el enrutamiento de páginas
- **Tailwind CSS**: Framework de estilos CSS
- **Material Symbols**: Iconos de Google
- **Vite**: Herramienta de construcción y desarrollo

## Instalación y Ejecución

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Ejecutar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Abrir [http://localhost:5173](http://localhost:5173) en el navegador.

## Estructura del Proyecto

```
src/
├── components/          # Vistas (Views)
│   ├── HomePage.jsx
│   ├── ProductosPage.jsx
│   ├── ServiciosPage.jsx
│   ├── SobreNosotrosPage.jsx
│   ├── ContactoPage.jsx
│   ├── Nav.jsx
│   ├── Footer.jsx
│   └── WhatsAppFloating.jsx
├── hooks/               # Controladores (Controllers)
│   └── useProductos.js
├── models/              # Modelos (Models)
│   └── data.js
├── App.jsx              # Componente principal
├── main.jsx             # Punto de entrada
└── index.css            # Estilos globales
```

## Características

- Diseño responsivo con Tailwind CSS
- Navegación SPA con React Router
- Filtrado y búsqueda de productos
- Interfaz moderna con Material Design
- Optimizado para rendimiento con Vite
