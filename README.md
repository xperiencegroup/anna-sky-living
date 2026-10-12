# Anna Sky Living — Contexto técnico para desarrolladores y asistentes de IA

## 1. Resumen del proyecto

**Anna Sky Living** es un sitio promocional inmobiliario tipo _one-page_, con navegación por anclas, contenido visual, animaciones, fichas de tipologías, vista interactiva de niveles, avances de obra, enlaces comerciales y formularios de captura de leads.

- Entrada principal: `/`.
- La aplicación es una SPA de React montada en `#root`.
- Las secciones visibles se componen en `src/pages/home/home.jsx`.
- Los formularios envían datos a Supabase.
- La instrumentación de eventos usa un helper `track` basado en `window.gtag` para Google Analytics 4.
- Microsoft Clarity está incluido en `index.html`.
- Parte del material multimedia se obtiene mediante rutas `/foto/*` y `/video/*`, redirigidas por proxy de Vite **durante desarrollo y producción**.

## 2. Stack y versiones declaradas

Según el `package.json` compartido:

| Tecnología                                  | Versión     | Uso                                                           |
| ------------------------------------------- | ----------- | ------------------------------------------------------------- |
| React / React DOM                           | 19.2.8      | Interfaz y componentes                                        |
| Vite                                        | 8.2.0       | Desarrollo y build                                            |
| Tailwind CSS y `@tailwindcss/vite`          | 4.3.3       | Estilos utility-first                                         |
| Motion                                      | 13.1.0      | Transiciones, reveal, animaciones de UI                       |
| Embla Carousel / React                      | 8.6.0       | Carruseles                                                    |
| Embla Auto Scroll / Autoplay                | 8.6.0       | Desplazamiento automático                                     |
| Lenis                                       | 1.3.26      | Scroll suavizado                                              |
| Zustand                                     | 5.0.14      | Estado global                                                 |
| React Hook Form                             | 7.87.0      | Formularios y validaciones                                    |
| `@supabase/supabase-js`                     | 2.117.3     | Acceso al backend                                             |
| `react-router`                              | 8.3.0       | Imports de enrutador y query params en fragmentos compartidos |
| `react-router-dom`                          | 7.18.2      | Dependencia también declarada; confirmar necesidad real       |
| `@fontsource-variable/inter`                | 5.3.0       | Fuente Inter                                                  |
| React Compiler con `@rolldown/plugin-babel` | configurado | Optimización/compilación de React                             |

**Scripts npm:**

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

`vite.config.js` usa `react()`, `babel({ presets: [reactCompilerPreset()] })` y `tailwindcss()`.

## 3. Estructura del repositorio

Diagrama funcional condensado, sin enumerar cada icono ni activo binario:

```text
project/
├── index.html                    # Entry HTML, GA4, Clarity, favicons
├── vite.config.js                # Plugins React/Tailwind y proxy multimedia dev
├── package.json
├── public/                       # Favicons, manifests, algunos videos
└── src/
    ├── main.jsx                  # Carga CSS, configura Lenis, monta Router
    ├── router.jsx                # BrowserRouter; ruta / -> Home
    ├── index.css                 # CSS global (contenido no recibido)
    ├── styles/fonts.css          # Font faces (contenido no recibido)
    ├── analytics/
    │   ├── track.js
    │   └── track.constants.js
    ├── assets/
    │   ├── fonts/
    │   ├── icons/                 # Por menú, amenidades, modelos, social, etc.
    │   ├── images/
    │   └── logos/
    ├── components/
    │   ├── animations/reveal.jsx
    │   ├── embla-carousel/
    │   │   ├── carousel.jsx
    │   │   ├── GalleryCarousel.jsx
    │   │   ├── auto-gallery-carousel.jsx
    │   │   └── EmblaCarouselSelectedSnapDisplay.jsx
    │   ├── nav-indicator/nav-indicator.jsx
    │   ├── PopupModelo.jsx
    │   └── whatsapp-button.jsx
    ├── data/
    │   ├── modelos.js
    │   ├── social.js
    │   └── vista-360/niveles.js
    ├── hooks/
    │   ├── useElbowPath.js
    │   └── useIsXl.js
    ├── lib/supabase.js
    ├── store/
    │   ├── usePopupStore.jsx
    │   └── useUIStore.jsx
    └── pages/home/
        ├── home.jsx
        └── components/
            ├── navbar.jsx
            ├── hero.jsx
            ├── grupo-trecasa.jsx
            ├── permisos-de-obra.jsx
            ├── amenidades.jsx
            ├── tipologias.jsx
            ├── vista-360.jsx
            ├── avance-obra.jsx
            ├── video-banner.jsx
            ├── conoce-el-proyecto.jsx
            ├── visitanos.jsx
            ├── contacto.jsx
            ├── footer.jsx
            ├── vista-360/VistasNivel.jsx
            └── popup/
                ├── formulario/
                │   ├── ingresa-popup.jsx
                │   └── brochure-comercial.jsx
                └── modelos/
                    ├── modelo-modal.jsx
                    ├── modelo-tipo-a.jsx ... modelo-tipo-f.jsx
                    └── modelo-lock-off.jsx
```

## 4. Arranque, routing y composición

`src/main.jsx`:

1. Importa `src/index.css` y `src/styles/fonts.css`.
2. Inicializa **Lenis** con `duration: 0.8`, `smoothWheel: true`.
3. Crea un bucle `requestAnimationFrame` que ejecuta `lenis.raf(time)`.
4. Renderiza `<Router />` dentro de `<StrictMode />`.

`src/router.jsx` usa `BrowserRouter`, `Routes`, `Route`, con `/` -> `Home`. No se proporcionaron rutas adicionales.

El componente `Home` organiza, en este orden:

```jsx
<main className="flex flex-col">
  <WhatsappButton />
  <Hero />
  <GrupoTrecasa />
  <PermisosDeObra />
  <Amenidades />
  <Tipologias />
  <Vista360 />
  <VideoBanner />
  <AvanceObra />
  <ConoceElProyecto />
  <Visitanos />
  <Contacto />
  <Footer />
  {modeloData && <ModeloModal id={modeloId} {...modeloData} />}
  {activePopup === "register" && <IngresaPopup isOpen />}
  {activePopup === "brochure-comercial" && <BrochureComercialPopup isOpen />}
</main>
```

El fragmento mostrado de `Home` no incluye un `<Navbar />` explícito; **Navbar se encuentra en el componente Hero**.

### Anclas de navegación

Se usan enlaces `href="#..."` hacia IDs de sección; entre ellos `#hero`, `#nosotros`, `#conoce-proyecto`, `#amenidades`, `#modelos`, `#avance-de-obra`, `#contacto` y `#showroom`. Verificar que los IDs estén declarados en los componentes correspondientes al agregar enlaces.

### Fichas por URL

`Tipologias` usa `useSearchParams()` para abrir una ficha:

```jsx
setSearchParams({ modelo: modelo.id });
```

`Home` lee `searchParams.get('modelo')`, busca el valor en `MODELOS` y monta `ModeloModal`. Para cerrar, se elimina el parámetro `modelo`. Esto permite conservar el modelo seleccionado en la URL sin crear una ruta nueva.

IDs de modelo: `tipo-a`, `tipo-b`, `tipo-c`, `tipo-d`, `tipo-e`, `tipo-f`, `lock-off`.

## 5. Estado global y estado local

### `src/store/usePopupStore.jsx`

Store Zustand mostrado:

```js
const isDev = import.meta.env.DEV;

export const usePopupStore = create((set) => ({
  activePopup: isDev ? null : "register",
  openPopup: (id) => set({ activePopup: id }),
  closePopup: () => set({ activePopup: null }),
}));
```

- En desarrollo no aparece de inicio el popup de registro.
- En producción inicia con `activePopup: 'register'`.
- El popup de brochure se abre con `openPopup('brochure-comercial')`.
- `Home` decide qué popup montar según `activePopup`.
- **No duplicar** este estado con otro store sin necesidad.

### `src/store/useUIStore.jsx`

Store para amenidades: `selectedAmenidad` y `setSelectedAmenidad(amenidad)`. El código disponible no confirma todos los consumidores del store.

### Estado local

- `Vista360`: `selected`, `autoplay`, `openLevel`.
- `VistasNivel`: `activa` (índice del medio elegido).
- `AvanceObra`: `currentSlide`, `hoveredIndex`.
- `Carousel`: instancia Embla, pausa de autoscroll y snap seleccionado.
- Formularios: React Hook Form y estados de envío.

## 6. Componentes y responsabilidades

| Área              | Componente / archivo                          | Responsabilidad principal                                     |
| ----------------- | --------------------------------------------- | ------------------------------------------------------------- |
| Navegación        | `navbar.jsx`                                  | Links por anclas, menú responsive con Motion y redes sociales |
| Hero              | `hero.jsx`                                    | Presentación inicial y CTA hacia showroom                     |
| Institucional     | `grupo-trecasa.jsx`, `permisos-de-obra.jsx`   | Información del grupo y permisos                              |
| Amenidades        | `amenidades.jsx`                              | Tarjetas/carrusel de amenidades; reutiliza `Carousel`         |
| Tipologías        | `tipologias.jsx`                              | Grid de modelos y apertura por query param                    |
| Modelo            | `popup/modelos/modelo-modal.jsx`              | Modal reutilizable, imágenes y listas de características      |
| Vista 360         | `vista-360.jsx`                               | Torre SVG con niveles clicables y selección animada           |
| Vista del nivel   | `vista-360/VistasNivel.jsx`                   | Galería propia de imágenes/videos y botón de regreso          |
| Avances           | `avance-obra.jsx`                             | Timeline y carrusel de fotos/videos de obra                   |
| Proyecto          | `conoce-el-proyecto.jsx`                      | Descripción y CTA al popup de brochure                        |
| Showroom          | `visitanos.jsx`                               | WhatsApp, llamada, email, mapa y ubicación                    |
| Contacto          | `contacto.jsx`                                | Formulario principal hacia Supabase                           |
| Formularios popup | `ingresa-popup.jsx`, `brochure-comercial.jsx` | Captura de datos y estados de envío                           |
| Footer            | `footer.jsx`                                  | Navegación, redes y crédito                                   |
| CTA fijo          | `whatsapp-button.jsx`                         | Link flotante hacia WhatsApp                                  |
| Animación         | `components/animations/reveal.jsx`            | Wrapper de animación de aparición basado en Motion            |

### `Carousel` / Embla

`src/components/embla-carousel/carousel.jsx` es genérico y se utiliza al menos en Amenidades y Avance de obra. En el código mostrado:

- Props: `slides`, `variant`, `isAnySelected`, `autoScrollOptions`, `emblaOptions`, `onSlideChange`.
- Se usa `useEmblaCarousel` con `{ loop: true, align: 'start', startIndex: 0, duration: 30 }`.
- Plugin `AutoScroll` configurado con `speed: 1`, `startDelay: 1000`, `stopOnInteraction: true`, `stopOnMouseEnter: false` (sobrescribible).
- `ResizeObserver` detecta cambios de tamaños de slides y ejecuta `emblaApi.reInit()`.
- Los clicks sobre slides llaman a `handleSlideClick(index)` y a `emblaApi.scrollTo(index)`.
- Las flechas llaman `scrollPrev` / `scrollNext` y detienen autoscroll.
- El cambio de snap se informa al padre por `onSlideChange(selectedSnap)`.
- `onMouseLeave` puede reanudar autoscroll si `isAnySelected` no lo bloquea.

**Tracking reutilizable:** durante la conversación se propuso pasar una prop `tracking={TRACK.amenidades.carousel}` o `tracking={TRACK.avanceObra.carousel}` y registrar clics manuales en los handlers. **Verificar si este cambio ya está aplicado al archivo real**; en la versión inicialmente suministrada aún no figuraba `tracking` entre las props.

**Advertencia:** no contar el autoscroll como interacción humana; no enviar un evento GA4 en cada cambio automático de `selectedSnap`.

### Vista 360

`vista-360.jsx` dibuja la torre mediante SVG (`IMG_W=631`, `IMG_H=810`) y rectángulos (`rect`) clicables por piso. Hay animación de barrido automático (`Motion`) y un trazado de conexión hacia el contenido usando `useElbowPath` en pantallas XL.

La torre representa niveles de 9 a 28, omitiendo el 13 en el algoritmo mostrado. Al seleccionar un nivel: detiene autoplay, fija selección, abre la ficha `VistasNivel`. Al volver: cierra ficha y reanuda autoplay. `nivelesInfo` determina las imágenes y, cuando aplica, video.

`VistasNivel` crea un arreglo unificado de medios: si hay video, usa el video como primer elemento con `poster` y luego imágenes desde el segundo elemento (`nivel.imagenes.slice(1)`); si no hay video, usa todas las imágenes. Las flechas circulan por índices y las miniaturas permiten selección directa. **No confundir el recorrido automático de la torre con clics sobre niveles.**

## 7. Modelos y contenido (`src/data/modelos.js`)

`MODELOS` es un objeto indexado por ID (`'tipo-a'`, etc.). En los fragmentos visibles cada ficha puede contener:

```js
{
  titulo: 'Tipo A / 81.77 M2',
  subtitulo: '...',           // opcional
  imageRender: '/foto/...',
  imageRenderVertical: '/foto/...', // opcional
  imageFrame: '/foto/...',
  carouselImages: ['/foto/...', '/foto/...'],
  descripcion: [{ id, label, icon }],
  comoSeEntrega: [{ id, label, icon }], // opcional
  departamento2: [{ id, label, icon }], // para lock-off
}
```

El `ModeloModal` recibe los datos como props desde `Home`; no debe tener lógica fija para un modelo concreto. `Tipologias` renderiza seis tarjetas ordinarias y una tarjeta especial Lock Off.

## 8. Formularios y Supabase

### Cliente Supabase

`src/lib/supabase.js`:

```js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

Variables requeridas (nombres, **no** valores):

```dotenv
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Las variables `VITE_` son visibles en el bundle del navegador: usar únicamente clave pública/anon y configurar **RLS/políticas** apropiadas en Supabase. Nunca colocar service-role keys u otros secretos en frontend.

### Flujos de formularios

Los tres formularios conocidos hacen `supabase.from('annasky_living_cx_form').insert(payload)`:

| Formulario    | Archivo                  | `origin` del payload | Comportamiento observado                           |
| ------------- | ------------------------ | -------------------- | -------------------------------------------------- |
| Contacto      | `contacto.jsx`           | `contacto`           | Muestra alerta de éxito/error; resetea al éxito    |
| Brochure      | `brochure-comercial.jsx` | `brochure`           | Registra contacto; resetea al éxito                |
| Popup inicial | `ingresa-popup.jsx`      | `popup-inicial`      | Registra contacto, resetea y cierra popup al éxito |

Campos usados según el formulario: `name`, `mail`, `phone`, `message`, `consent`, `origin`. La validación se implementa con React Hook Form (`required`, patrones de nombre/email/teléfono, consentimiento en brochure). Los mensajes de validación y la expresión de teléfono no son totalmente congruentes: los textos mencionan 10 dígitos, mientras el regex compartido permite de 8 a 15. Revisar antes de cambiarlo.

## 9. Analítica y etiquetado

### Implementación compartida

`index.html` carga Google tag (`gtag.js`) y lo configura con el ID de medición **`G-8G97DV2YEG`**. También integra **Microsoft Clarity** mediante su script. Los IDs de medición son identificadores de configuración, no credenciales secretas.

`src/analytics/track.js`:

```js
const isDev = import.meta.env.DEV;

export const track = (event, params = {}) => {
  if (typeof window === "undefined") return;
  if (isDev) console.log(`[track] ${event}`);
  if (typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }
};
```

`src/analytics/track.constants.js` centraliza convenciones con el prefijo `anna:`. Los grupos existentes o trabajados en la conversación abarcan: `header`, `hero`, `nosotros`, `amenidades`, `modelos`, `vista360`, `avanceObra`, `conoceProyecto`, `visitanos`, `contacto`, `footer`, popup inicial, brochure y WhatsApp flotante. **Corroborar el archivo real**, dado que varias entradas se propusieron de forma incremental.

Ejemplos del patrón previo:

```js
`${PROJECT}:modelos:${id}:ver:click``${PROJECT}:vista360:nivel:${id}:click``${PROJECT}:avance-obra:carousel:next:click`;
```

### Validación

- Verificar que el script `gtag.js` se cargue y que `window.gtag` esté definido.
- Usar GA4 DebugView y Tiempo real para validar eventos reales.
- Revisar configuración de consentimiento/cookies aplicable antes de desplegar cambios de medición.

## 10. Lenis, Motion y comportamiento de modales

### Lenis

`main.jsx` crea una instancia **imperativa** `new Lenis(...)`, no `ReactLenis` en el código mostrado. Por tanto, **no asumir que `useLenis()` funcionará**: requiere el contexto de la integración React correspondiente.

Para permitir scroll dentro de modales, se incorporó `data-lenis-prevent` a contenedores de popup, combinado con `overflow-y-auto` y altura limitada al viewport (`fixed inset-0`, `max-h-svh` o `h-dvh`). Esto indica a Lenis que no intercepte el scroll del modal.

La implementación actual bloquea `document.body.style.overflow = 'hidden'` en varios popups. **Revisar** el bloqueo de la página al tener varios popups y la restauración de estilos; si fuera necesario, exponer un control centralizado para pausar/reanudar la instancia global Lenis. Guardar y restaurar el valor anterior de overflow en vez de forzarlo a cadena vacía si otros componentes alteran ese estilo.

### Motion y `Reveal`

Se usa `motion/react`, `AnimatePresence`, variantes de entrada y un wrapper compartido `<Reveal>` con configuraciones como `delay`, `y` y `amount` en el código de página. Mantener la secuencia de animación usada en tarjetas/textos: primero `0`, segundo `0.1`, siguientes `0.18`, `0.26` y así sucesivamente (+0.08).

**Importante:** antes de alterar estilos de tarjetas Embla que cambian tamaño en hover, comprobar si el `transform: scale()` superpone slides sin respetar el gap: una transformación visual no cambia el espacio del layout. Hay antecedentes de ese problema en el carrusel de amenidades.

## 11. Medios y servidor de desarrollo

El Vite proxy compartido reescribe:

```js
'/video' -> 'https://xperience.realestate/trecasa/anna/onepager/video'
'/foto'  -> 'https://xperience.realestate/trecasa/anna/onepager/foto'
```

De forma conceptual, una petición de desarrollo a `/foto/modelos/...` se redirige al servidor multimedia remoto. **Esta configuración en `server.proxy` solo opera en el servidor de desarrollo de Vite.** Es obligatorio comprobar cómo resuelve `/foto` y `/video` el hosting de producción (proxy de servidor, CDN o reescrituras equivalentes). El `public/` compartido no contiene todas esas imágenes/videos.

Activos en `src/assets` se importan desde módulos; activos remotos son cadenas de ruta absoluta `/foto/...` o `/video/...`. Evitar moverlos sin actualizar referencias.

## 12. Estilos y diseño

Tailwind 4 se integra por `@tailwindcss/vite`; el proyecto importa `src/index.css` y `src/styles/fonts.css`.

Se observan clases de proyecto como `font-bangla`, `font-monserrat`, `header-1`, `header-2`, `header-3`, `header-model`, `paragraph`, `paragraph-icon`, `button-text`, `bg-azul`, `bg-azul-intenso`, `bg-naranja`, `text-blanco`, `border-amarillo` y media queries arbitrarias (`min-[820px]`, `max-[440px]`). **Sus definiciones CSS exactas no se facilitaron** y deben revisarse antes de sustituirlas.

La fuente Bangla MN está bajo `src/assets/fonts/Bangla MN.ttf` y no debe distribuirse por separado fuera de las licencias aplicables.

La UI utiliza layouts responsive intensivos, transiciones y `h-svh`, `h-dvh`, `min-h-*`. Probar la experiencia móvil, el scroll dentro de modales y las diferencias entre breakpoints.

## 13. Contactos, botones y enlaces externos

`src/data/social.js` centraliza Facebook, Instagram, WhatsApp, teléfono, email y dirección/mapa. El componente `WhatsappButton` fija un CTA a WhatsApp en la esquina inferior derecha. `Visitanos`, `Navbar` y `Footer` reutilizan estos datos. **Modificar URLs/contactos en `data/social.js`**, no en cada componente, cuando sea posible.

Los enlaces externos normalmente usan `target="_blank"` y `rel="noopener noreferrer"`; los enlaces de teléfono/email usan `tel:` / `mailto:`.
