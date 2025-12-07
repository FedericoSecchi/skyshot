# Lottie Animations

## Iconos de Servicios

Todos los íconos de la sección de servicios usan animaciones Lottie. Actualmente hay **placeholders básicos** que permiten que el build funcione.

### Archivos de animación:

- `uav-technology-animation.json` - Para el ícono de Drone (ya tiene animación real)
- `camera-animation.json` - Para el ícono de Camera Ops (placeholder)
- `photo-animation.json` - Para el ícono de Photo Packs (placeholder)
- `brush-animation.json` - Para el ícono de Branding & Motion (placeholder)

### Para usar animaciones reales de Lottie:

1. Descarga animaciones desde [LottieFiles](https://lottiefiles.com):
   - **Drone:** [UAV Technology Animation](https://lottiefiles.com/free-animation/uav-technology-gNnNTrONQ0) ✅ (ya implementada)
   - **Camera:** Busca por "camera", "aperture", "photography"
   - **Photo:** Busca por "photo", "picture", "gallery"
   - **Brush:** Busca por "brush", "paint", "design", "branding"

2. Descarga los archivos JSON

3. Reemplaza los archivos correspondientes en esta carpeta

Los componentes ya están configurados para usar estos archivos automáticamente:
- `ServiceIconDrone.jsx`
- `ServiceIconCamera.jsx`
- `ServiceIconPhoto.jsx`
- `ServiceIconBrush.jsx`

### Nota

Los placeholders actuales son animaciones mínimas funcionales. Reemplázalos con animaciones reales de LottieFiles para obtener mejores resultados visuales.

