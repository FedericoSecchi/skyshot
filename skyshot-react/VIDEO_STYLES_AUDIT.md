# 📹 Auditoría de Estilos del Video Hero

## Elemento HTML
```jsx
<video 
  ref={videoRef}
  muted
  autoPlay
  playsInline
  loop
  preload="auto"
  crossOrigin="anonymous"
  className="hero__video"
>
  <source src={assetPath('video/sequence-01.mp4')} type="video/mp4" />
</video>
```

---

## 🎨 ESTILOS CSS APLICADOS (index.css)

### Clase: `.hero__video`
**Ubicación:** `src/index.css` líneas 207-214

```css
.hero__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  will-change: auto;
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

**Efectos activos:**
- ✅ **Dimensiones:** `width: 100%`, `height: 100%` (ocupa todo el contenedor)
- ✅ **Ajuste:** `object-fit: cover` (cubre el área sin distorsión)
- ✅ **Optimización:** `will-change: auto` (hint para el navegador)
- ✅ **Aceleración GPU:** `transform: translateZ(0)` (fuerza composición en GPU)
- ✅ **Rendering:** `backface-visibility: hidden` (previene flickering)

**Estado inicial:** ✅ **Siempre activo** (no depende de clases)

---

## 🎬 ESTILOS INLINE APLICADOS (App.jsx)

### Estado Inicial (antes de `video-ready`)

**Ubicación:** `src/App.jsx` líneas 87-106

**Cuando `prefers-reduced-motion` está activo:**
```javascript
video.style.opacity = '1'
video.style.transition = 'none'
```
- ✅ **Opacidad:** `1` (completamente visible)
- ✅ **Transición:** `none` (sin animaciones)

**Cuando `prefers-reduced-motion` NO está activo:**
- ⚠️ **Estado inicial:** No se aplican estilos inline inicialmente
- ⚠️ El video comienza con los estilos CSS base (`.hero__video`)

### Estado con `video-ready` (después de 3000ms)

**Ubicación:** `src/App.jsx` líneas 102-105

```javascript
video.style.transition = 'opacity 1.5s ease'
video.style.opacity = '1'
```

**Efectos aplicados:**
- ✅ **Transición:** `opacity 1.5s ease` (fade-in suave de 1.5 segundos)
- ✅ **Opacidad:** `1` (completamente visible)

**Timing:**
- Se aplica después de 3000ms (cuando el loader termina su fade-out)
- El video hace fade-in desde `opacity: 0` (estado inicial implícito) a `opacity: 1`

---

## 🔄 ESTILOS CONDICIONALES (CSS)

### Clase: `.video-element` (NO aplicada actualmente)
**Ubicación:** `src/index.css` líneas 217-226

```css
.video-element {
  opacity: 0;
  filter: blur(20px);
  transition: opacity 1.5s ease, filter 1.5s ease;
}

body.video-ready .video-element {
  opacity: 1;
  filter: blur(0);
}
```

**⚠️ NOTA:** Esta clase NO está siendo usada en el video actual. El video usa `.hero__video`, no `.video-element`.

---

## 🎯 ESTILOS PARA `prefers-reduced-motion`

**Ubicación:** `src/index.css` líneas 228-240

```css
@media (prefers-reduced-motion: reduce) {
  .video-element {
    transition: none;
    filter: none;
    opacity: 1;
  }
  
  .hero__video {
    opacity: 1 !important;
    filter: none !important;
    transition: none !important;
  }
}
```

**Efectos cuando está activo:**
- ✅ **Opacidad:** `1 !important` (forzada a visible)
- ✅ **Filtro:** `none !important` (sin blur)
- ✅ **Transición:** `none !important` (sin animaciones)

---

## 📊 RESUMEN DE ESTILOS POR ESTADO

### Estado Inicial (antes de `video-ready`)

| Propiedad | Valor | Origen |
|-----------|-------|--------|
| `width` | `100%` | CSS (`.hero__video`) |
| `height` | `100%` | CSS (`.hero__video`) |
| `object-fit` | `cover` | CSS (`.hero__video`) |
| `will-change` | `auto` | CSS (`.hero__video`) |
| `transform` | `translateZ(0)` | CSS (`.hero__video`) |
| `backface-visibility` | `hidden` | CSS (`.hero__video`) |
| `opacity` | `1` (si reduced-motion) o `0` (implícito) | Inline (App.jsx) o CSS |
| `transition` | `none` (si reduced-motion) o `none` (inicial) | Inline (App.jsx) o CSS |
| `filter` | `none` | CSS (por defecto) |

### Estado Final (con `video-ready`)

| Propiedad | Valor | Origen |
|-----------|-------|--------|
| `width` | `100%` | CSS (`.hero__video`) |
| `height` | `100%` | CSS (`.hero__video`) |
| `object-fit` | `cover` | CSS (`.hero__video`) |
| `will-change` | `auto` | CSS (`.hero__video`) |
| `transform` | `translateZ(0)` | CSS (`.hero__video`) |
| `backface-visibility` | `hidden` | CSS (`.hero__video`) |
| `opacity` | `1` | Inline (App.jsx línea 104) |
| `transition` | `opacity 1.5s ease` | Inline (App.jsx línea 103) |
| `filter` | `none` | CSS (por defecto) |

---

## 🔍 EFECTOS VISUALES ACTIVOS

### ✅ Efectos SIEMPRE activos:
1. **Cobertura completa:** `width: 100%`, `height: 100%`, `object-fit: cover`
2. **Optimización GPU:** `transform: translateZ(0)`, `backface-visibility: hidden`
3. **Hint de rendimiento:** `will-change: auto`

### 🎬 Efectos en TRANSICIÓN (cuando se activa `video-ready`):
1. **Fade-in:** `opacity: 0 → 1` con transición de `1.5s ease`
2. **Timing:** Se aplica después de 3000ms (cuando el loader desaparece)

### 🚫 Efectos NO aplicados actualmente:
- ❌ **Blur:** No se aplica `filter: blur()` al video (solo al loader)
- ❌ **Escalado:** No hay transformaciones de escala
- ❌ **Rotación:** No hay rotaciones
- ❌ **Clase `.video-element`:** No se usa (solo existe en CSS pero no se aplica)

---

## ⚠️ OBSERVACIONES IMPORTANTES

1. **El video NO tiene blur inicial:** A diferencia del loader, el video no tiene `filter: blur()` aplicado inicialmente. Solo hace fade-in de opacidad.

2. **Estado inicial implícito:** El video comienza con `opacity: 0` implícitamente (no definido en CSS), y luego se hace visible con el fade-in inline.

3. **Clase `.video-element` no usada:** Existe en CSS pero el video usa `.hero__video`. Si se quiere usar blur en el video, habría que cambiar la clase o aplicar los estilos de `.video-element` a `.hero__video`.

4. **Timing de transición:** El fade-in del video (1.5s) comienza después de que el loader termina su fade-out (3s), creando una transición escalonada.

---

## 🛠️ RECOMENDACIONES

Si se quiere agregar blur inicial al video (como en `.video-element`):

1. **Opción 1:** Cambiar `className="hero__video"` a `className="hero__video video-element"`
2. **Opción 2:** Agregar estilos de blur a `.hero__video` directamente
3. **Opción 3:** Aplicar estilos inline iniciales con `filter: blur(20px)` y `opacity: 0`

