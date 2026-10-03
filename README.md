# Felipe Uribe — Portafolio

Portafolio en Svelte 5 y SvelteKit, con salida estática, español e inglés y el concepto visual aprobado **núcleo tipográfico**.

```sh
npm install
npm run dev
```

Vite muestra la URL local y el puerto disponible. Español en `/`, inglés en `/en/`; `/es/` redirige a la versión española. Para desplegar:

```sh
npm run check
npm run build
```

Publicar el directorio `build/` en un servidor de archivos estáticos que sirva `index.html` dentro de cada directorio. No necesita un servidor Node en producción. Configurar una redirección permanente del antiguo `/es` a `/` en el proveedor de alojamiento. El dominio canónico, los idiomas alternos y el sitemap usan `https://wfelipe.com/`.

## Contenido

- `src/lib/content.js`: proyectos, tecnologías y trayectoria.
- `src/lib/Portfolio.svelte`: contenido bilingüe, secciones y metadatos.
- `src/lib/Hero.svelte`: navegación, titular, controles y proyectos destacados.
- `src/lib/nucleus.js`: partículas calculadas en canvas y letras extraídas del titular real.
- `src/app.css`: sistema visual y adaptación entre 320 y 1600 píxeles.
- `static/projects/`: capturas reales procedentes del portafolio publicado.

Los cargos de dirección y arquitectura se presentan como el siguiente paso profesional, no como cargos ya ocupados. La biografía, los proyectos, las tecnologías, la trayectoria y `hi@wfelipe.com` proceden del sitio existente.

## Movimiento y accesibilidad

Una transición inicial hace viajar partículas y fragmentos tipográficos desde las letras al núcleo. El texto semántico permanece en el documento y recupera su apariencia completa al concluir. La transición puede repetirse; con `prefers-reduced-motion` el núcleo queda estático. El canvas limita su resolución y cantidad de partículas en móvil, y pausa el dibujo fuera del viewport o con la pestaña oculta.

Los proyectos usan elementos `details` nativos, accesibles con teclado y sin JavaScript. Los enlaces a las capturas completas y videos abren otra pestaña. El contenido se prerenderiza; no depende de la animación para estar disponible.

## Comprobación en navegador

Requiere Chromium instalado. Con el servidor local activo:

```sh
PREVIEW_URL=http://localhost:5173 npm run verify
```

`CHROMIUM_PATH` permite cambiar la ruta de Chromium (predeterminada `/usr/bin/chromium`). La comprobación cubre idiomas, tamaños de 320–1600 píxeles, menú móvil, proyectos por teclado, contactos, contenido sin JavaScript y la disolución/restauración real del titular. Guarda las capturas en `.impeccable/review/`.
