---
name: Felipe Uribe — Núcleo tipográfico
description: Diseño de interfaces que se convierte en sistemas.
colors:
  surface: '#e3ecfa'
  ink: '#153792'
  violet: '#6030de'
  rule: '#9cafe9'
typography:
  display:
    fontFamily: 'Anton, sans-serif'
    fontSize: 'clamp(130px, 12.4vw, 191px)'
    fontWeight: 400
    lineHeight: 0.89
    letterSpacing: '-0.025em'
  headline:
    fontFamily: 'Manrope, sans-serif'
    fontSize: 'clamp(36px, 4.2vw, 64px)'
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: '-0.04em'
  title:
    fontFamily: 'DM Mono, monospace'
    fontSize: '24px'
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: '-0.02em'
  body:
    fontFamily: 'Manrope, sans-serif'
    fontSize: '18px'
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: 'DM Mono, monospace'
    fontSize: '12px'
    fontWeight: 400
    letterSpacing: '0.14em'
  action:
    fontFamily: 'DM Mono, monospace'
    fontSize: '17px'
    fontWeight: 400
    letterSpacing: '0.05em'
rounded:
  control: '5px'
spacing:
  gutter: 'clamp(24px, 3.52vw, 64px)'
  compact: '12px'
  inline: '24px'
  column: '80px'
  section: '110px'
components:
  button-primary:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.surface}'
    typography: '{typography.action}'
    rounded: '{rounded.control}'
    padding: '0 28px'
    height: '59px'
  button-secondary:
    textColor: '{colors.violet}'
    typography: '{typography.action}'
    rounded: '{rounded.control}'
    padding: '0 28px'
    height: '59px'
  button-hover:
    backgroundColor: '{colors.violet}'
    textColor: '{colors.surface}'
  project-row:
    textColor: '{colors.ink}'
    typography: '{typography.title}'
    padding: '27px 0'
  tag:
    textColor: '{colors.ink}'
    padding: '0 0 3px'
  featured-link:
    textColor: '{colors.ink}'
    padding: '6px 40px'
  navigation:
    textColor: '{colors.ink}'
    typography: '{typography.label}'
  motion-replay:
    textColor: '{colors.violet}'
    padding: '4px 0 4px 28px'
---

# Design System: Felipe Uribe — Núcleo tipográfico

## Overview

**Creative North Star: "Núcleo tipográfico"**

El núcleo tipográfico expresa la conexión entre diseño de interfaces y construcción de productos web. Una superficie glaciar, texto azul y acentos violetas sostienen una voz técnica y directa; la escala del titular aporta energía sin convertir la evidencia del trabajo en decoración.

El sistema combina titulares condensados, lectura en Manrope y navegación monoespaciada. Las reglas finas organizan el contenido, los proyectos conservan sus capturas reales y el movimiento transforma letras del titular en geometría calculada. La información permanece disponible en español e inglés, con una presentación estática para quienes prefieren menos movimiento.

**Key Characteristics:**

- Superficie clara continua y contraste azul.
- Tres voces tipográficas con funciones distintas.
- Reglas finas, filas expandibles y evidencia real.
- Movimiento calculado que conserva el texto y admite repetición.

La dirección procede de la elección directa del usuario de la composición aprobada; no tiene semilla de sorteo asociada.

## Colors

La paleta tiene una base glaciar y una tinta azul profunda, con violeta para interacción y geometría dinámica. Los valores normativos están en el frontmatter.

### Primary

- **Azul de sistema — ink:** texto, marca, acción principal y cierre de contacto invertido.

### Secondary

- **Violeta activo — violet:** contornos de acciones secundarias, hover, foco y control de repetición.

### Neutral

- **Glaciar — surface:** fondo continuo y texto invertido sobre azul.
- **Regla lavanda — rule:** separadores de navegación, filas, etiquetas y bordes de captura.

**The Accent Rule.** El violeta señala interacción y variación del núcleo; el azul conserva la voz principal del contenido.

El canvas deriva sus siete tonos de la paleta: dos de tinta, dos grises azulados entre tinta y regla y tres del acento (`src/lib/theme.js`). Diferencian las cintas del núcleo y las partes de las interfaces de la historia; son materiales de esa visualización, no una escala de estados para el resto del sitio. El bloque invertido de contacto usa un tono lavanda más claro para hover y foco.

## Typography

**Display Font:** Anton (sans-serif), local, peso regular.
**Body Font:** Manrope (sans-serif), local, pesos 400, 600 y 700.
**Label/Mono Font:** DM Mono (monospace), local, pesos 400 y 500.

Anton aporta altura y compresión; Manrope sostiene lectura y explicación; DM Mono identifica acciones, tecnología y navegación. La escala responde al ancho en lugar de seguir una razón tipográfica única.

### Hierarchy

- **Display:** titular expresivo; usa la escala del frontmatter con compresión horizontal (0.76) y dos líneas. En móvil cambia a `clamp(76px, 22.8vw, 145px)`, interlínea (0.96) y compresión (0.78). En pantallas desde (1800px) el titular llega a (220px). El cierre de contacto usa Anton en una escala menor, sin compresión.
- **Headline:** títulos de secciones en Manrope; en móvil (36px) con interlínea (1.13).
- **Title:** nombres de proyectos en DM Mono; las filas pasan a (18px) en móvil. Las notas del proyecto usan Manrope semibold (30px) y bajan a (26px).
- **Body:** introducciones y explicaciones; en móvil (16px). La biografía usa interlínea (1.8) y longitud máxima (65ch).
- **Label:** navegación y metadatos; mayúsculas y tracking para navegación, sin imponer mayúsculas a tecnologías o nombres propios.
- **Action:** acciones del titular; ajustan su tamaño con el viewport y llegan a (12px) en móvil. El texto de apoyo del titular usa DM Mono, con una escala independiente.

**The Three Voices Rule.** Anton expresa, Manrope explica y DM Mono orienta. Conserva esa separación de funciones.

## Layout

Un margen lateral fluido organiza toda la página. El contenido usa reglas horizontales y columnas abiertas: introducciones y trayectoria en dos columnas, proyectos abiertos con notas a la izquierda y evidencia a la derecha, biografía con fotografía lateral. El cierre invierte color y conserva el eje del margen.

El espaciado base de sección aparece en el frontmatter; se reduce a (80px) bajo (1000px) y a (64px) bajo (700px). Las separaciones entre columnas pasan de (80px) a (40px); los proyectos tienen separaciones específicas (70px / 35px / 30px). No hay un ancho máximo global de contenedor.

Bajo (700px), la navegación se abre desde un botón, los destacados y las secciones se apilan, el núcleo ocupa un campo debajo de las acciones y la biografía prioriza texto antes de fotografía. El hero usa ajustes adicionales bajo (360px) para conservar espacio entre texto y visualización. Entre (1151px) y (1799px) la cabecera, el hero y sus controles escalan proporcionalmente al viewport.

## Elevation & Depth

La página es plana por defecto. Las reglas y la inversión de color separan contenido; el núcleo crea profundidad separando en el espacio sus capas de partículas. La única sombra de interfaz corresponde al menú móvil abierto: una sombra azul tenue (`0 12px 28px #15379214`) que separa la navegación superpuesta del contenido.

**The Flat Evidence Rule.** El contenido se organiza mediante espacio y reglas, sin elevar cada proyecto a una tarjeta con sombra.

## Shapes

Acciones y capturas comparten una curvatura pequeña definida por el token de control. Las filas y divisores tienen esquinas rectas y bordes finos (1px). Un punto circular marca el idioma activo; las flechas son trazos SVG, y el indicador de expansión se construye con dos líneas. El núcleo es una pila de cinco planos (diseño, retícula, componentes, lógica y datos) vista en tres cuartos desde arriba, cruzada por tres hilos de acento; su silueta depende de la geometría calculada, no de una silueta raster.

## Components

### Buttons

Acciones compactas y claras: azul sólido para la principal y contorno violeta para la secundaria. Comparten curvatura y tipografía de acción del frontmatter. Ambas cambian a violeta con texto glaciar al hover; el foco usa contorno violeta (2px) separado (6px). El alto baja a (52px) en móvil; entre los anchos de escritorio indicados en Layout escala proporcionalmente.

### Navigation

Marca en Manrope bold y enlaces monoespaciados en mayúsculas. Una regla ocupa el espacio entre marca y enlaces. El selector de idioma tiene separador vertical y punto bajo la opción actual. En móvil, un botón con `aria-expanded` abre un panel del mismo fondo, con borde fino y sombra tenue. El hover usa el acento; el foco sigue la regla global.

### Tags

Metadatos monoespaciados con regla inferior, sin relleno ni cápsula. Se distribuyen en una lista flexible y envuelven por contenido. Son información, no filtros interactivos.

### Project rows

Filas expandibles con `details` y `summary`, separadores horizontales, nombre, tecnología e indicador de expansión. El hover colorea la fila con violeta. El contenido abierto combina notas, etiquetas, enlaces subrayados y una captura real de esquinas suaves; el signo cambia de más a menos. En móvil las notas preceden la captura.

### Featured links

Tres enlaces abiertos separados por reglas verticales en escritorio y horizontales en móvil. Nombre monoespaciado, flecha SVG y descripción breve; el hover cambia el nombre a violeta. Abren el proyecto correspondiente además de desplazar hacia él.

### Motion replay and typographic nucleus

La repetición es un botón subrayado, separado por una regla vertical y acompañado de un SVG de repetición. Durante la historia cambia a saltar con una flecha; se desactiva cuando se solicita movimiento reducido, con etiqueta que comunica el estado.

El canvas decorativo se genera después de cargar las fuentes. En la primera visita de cada sesión reproduce «Del diseño al sistema» (64s en todas las pantallas, con un ritmo medido para un lector medio: como mucho 13 caracteres por segundo y 2s de pausa con cada interfaz completa). Su guion completo, con textos, tiempos e interfaces, está en `GUION.md`, que se actualiza en el mismo cambio que la animación. Se lee de izquierda a derecha y las interfaces y el núcleo giran siempre en el mismo sentido. Una frase dice qué se cuenta. Luego cada etapa real de la trayectoria (2009, 2014, 2018, 2019, 2022) tiene su capítulo: un contador de año en Anton que gira como un odómetro, el aporte destacado en Manrope semibold, la empresa debajo en Manrope de menor tamaño y sus herramientas en DM Mono. Las partículas salen de las cifras del año y construyen a la derecha, módulo a módulo, la interfaz de esa etapa, que se sostiene para leerla. Una línea de tiempo con una marca por año acompaña todo el recorrido. Entre etapas la interfaz se descompone desde su lado izquierdo y vuelve al año siguiente mientras el contador avanza; de ese año sale la interfaz siguiente. Al final, la última interfaz se tiende entera sobre la capa de diseño del núcleo, el contador llega a «HOY», la pila se despliega en sus cinco capas y el núcleo escribe el titular. Un clic, una tecla, el foco o «Saltar animación» llevan al estado final; «Ver evolución» la repite. Al terminar, la pila respira: se pliega sobre el diseño y vuelve a abrirse en un ciclo lento de 14s; solo gira al arrastrarla; el polvo gira en todo el hero con paralaje de profundidad; el puntero atrae como un imán las partículas cercanas del núcleo y del polvo, que se estiran hasta un límite, se sueltan y vuelven con resorte a su lugar; arrastrar el fondo rota el núcleo con una inercia que dura segundos, un clic lanza una onda y, el titular está dibujado solo con partículas, un punteado fino y aleatorio que se concentra en el contorno de cada letra y es más ligero dentro del trazo, como el núcleo en sus cintas; el imán y la onda lo mueven igual que al núcleo, y los puntos atraídos toman los colores del núcleo. El texto real sigue en el documento, transparente, para lectura y tecnologías de asistencia; sin JavaScript se ve como texto normal. Reduced motion conserva texto y núcleo estáticos. El motor evita dibujar fuera de pantalla o con documento oculto, escribe el núcleo y el titular directamente en búferes de píxeles, ajusta su ritmo de dibujo a cada cuadro o a cuadros alternos (32ms) según el costo medido, usa (24000) puntos en escritorio y (8000) bajo (700px), y limita la densidad de píxeles a (1.5) y a un presupuesto de (2.2) megapíxeles en el hero, para que una pantalla 4K no componga millones de píxeles por cuadro. El campo de partículas del resto de la página está fijo al área visible, estático y sin interacción con el puntero, a densidad completa, y solo se dibuja al cargar y al cambiar el tamaño de la ventana; la onda del clic existe solo en el hero; el hero tiene fondo opaco para cubrirlo sin recortes por scroll. El núcleo y el titular tienen cada uno su capa ya pintada: mientras nada se mueve se reutilizan en lugar de recalcularse, y mientras la pila respira solo se vuelve a pintar el núcleo. Estos límites son parte del comportamiento de esta visualización, no cuotas para otras superficies.

## Do's and Don'ts

### Do:

- **Do** conservar los tokens de la superficie, tinta, acento y regla al extender el sitio.
- **Do** mantener el titular completamente visible en reposo y con movimiento reducido.
- **Do** usar capturas y fotografía reales para presentar el trabajo y la persona.
- **Do** ofrecer foco visible, controles semánticos y las mismas capacidades en español e inglés.
- **Do** adaptar columnas a una lectura vertical en móvil.

### Don't:

- **Don't** convertir el núcleo calculado en una imagen de fondo.
- **Don't** sustituir las tres familias locales por fuentes de sistema en sus funciones expresivas.
- **Don't** añadir contenedores con sombras a las filas de proyectos.
- **Don't** ocultar contenido o depender del movimiento para comprender el perfil.
