# Guion de la animación del hero: «Del diseño al sistema»

Este archivo es la fuente del guion de la historia en partículas que abre el hero. El código vive en
`src/lib/nucleus.js` y se corresponde con este documento sección por sección. **Cualquier cambio en la animación
actualiza este archivo en el mismo cambio, y cualquier cambio pedido sobre el guion se hace en el código.** La
sección [Dónde se cambia cada cosa](#dónde-se-cambia-cada-cosa) indica qué tocar.

## Resumen

- **Duración:** 64 s, igual en todas las pantallas. El ritmo está medido para un lector medio (ver
  [Ritmo](#ritmo)).
- **Cuándo se reproduce:** en cada carga de la página (nada se guarda: recargar empieza de cero), tras la puerta de entrada (ver
  [Puerta de entrada](#puerta-de-entrada)). Durante la historia un clic, una tecla, el foco o «Saltar animación»
  llevan directo al final; «Ver evolución» la repite sin puerta. Con movimiento reducido no hay puerta ni historia:
  se ven el titular y el núcleo estáticos. Terminada la historia, un clic solo lanza una onda y el cursor es un punto
  rojo.
- **Hilo conductor:** la trayectoria real de Felipe contada como paso del tiempo y leída de izquierda a derecha.
  Cada etapa es un capítulo. A la izquierda están su año, su aporte destacado, la empresa debajo en un tamaño menor y sus herramientas. Las partículas
  salen del año y construyen a la derecha, módulo a módulo, la interfaz típica de esa etapa. En el salto de tiempo
  la interfaz se descompone y vuelve a la izquierda, al año siguiente, mientras el contador avanza; de ese año sale
  la interfaz siguiente. No hay formas intermedias ni vórtice: solo el viaje entre el año y la interfaz. Al llegar a
  «HOY», la última interfaz se tiende entera sobre la capa superior del núcleo. El núcleo es una pila de cinco capas
  (diseño, retícula, componentes, lógica y datos) que se despliega en el sistema que hay debajo y escribe «DEL
  DISEÑO AL SISTEMA.».
- **Cómo se lee el tiempo:**
  - **Contador de año:** cifras grandes en Anton, donde luego aparece el titular. Gira como un odómetro y pasa
    por cada año en los saltos. Es el origen y el destino de las partículas.
  - **Línea de tiempo:** abajo, una marca por año desde 2009 hasta hoy, con etiquetas en cada etapa. El tramo
    recorrido va en tinta, la etapa actual en acento y un punto de acento marca el presente de la historia.
  - **Polvo:** gira despacio en todo el hero, un poco más rápido en cada etapa y en cada salto.
- **Un solo sentido de giro:** las interfaces y el núcleo giran siempre hacia el mismo lado (ver [Giro](#giro)).

## Puerta de entrada

Antes de mostrar nada (sin texto, sin titular, sin control), con solo el polvo del hero repartido por toda la pantalla, de lado a lado, las partículas se reúnen en un símbolo de play
(círculo en tinta, triángulo en acento) en 1,8 s, lo sostienen 1,4 s y se deshacen en 5 s hacia el rótulo «Ver
evolución», que los absorbe: la forma se estrecha como un genio entrando en su lámpara, primero por el lado más cercano al texto, que se ilumina. Mientras
tanto el hero normal (titular, núcleo y botones) se construye detrás con menos partículas y más tenues, que se completan al terminar, que llegan de todo el hero (el polvo, las letras y el núcleo), sin fundidos; el texto llega al final. El icono del botón repite el play, el rótulo es mayor y se escribe de izquierda a derecha a medida que las partículas aterrizan en él. Un primer clic en cualquier parte del hero lanza una onda (1,3 s) que también
desplaza las partículas; cuando termina empieza la historia. Los tiempos están en `GATE` y el código en
`beginGate()`, `buildGate()` y `drawGate()`.

## Ritmo

Los tiempos salen de cuánto tarda una persona media en leer y en mirar, no de lo que cabe en pantalla.

- **Leer:** el texto de cada capítulo (aporte, empresa y herramientas: entre 110 y 128 caracteres) queda en pantalla
  9,2 s, entre 9 y 13 caracteres por segundo. Como referencia, los subtítulos para adultos admiten como máximo 15–17
  caracteres por segundo; aquí va más lento porque la vista también sigue la interfaz que se construye. La frase de
  entrada (49 caracteres) se escribe en 2,4 s, se lee a la vez que se escribe y queda completa 1,4 s más.
- **Mirar:** cada interfaz queda completa y quieta 2 s antes del salto, lo justo para recorrerla con la vista. La
  última se queda 3,4 s.
- **Seguir con la vista:** cada partícula tarda 1,2 s en ir del año a la interfaz o de vuelta. Al volver, la interfaz
  se descompone durante 0,8 s, empezando por el lado más cercano al año. Tras el salto, el capítulo nuevo deja 1,6 s
  para leer su rótulo antes de que salgan las partículas.
- **Al cambiar textos:** el texto de un capítulo dividido entre `STEPS.jump` + 0,6 no debe pasar de 14 caracteres
  por segundo. Si una frase crece, alarga `STEPS.jump`.

## Recorrido

La mirada va de izquierda a derecha y vuelve, una vez por capítulo:

1. **Año (izquierda):** el contador llega al año y debajo aparecen el aporte destacado, la empresa en un tamaño menor y las herramientas.
2. **Del año a la interfaz:** las partículas salen de las cifras del año en tinta. Primero cruzan hacia la derecha a
   la altura del año, por encima del rótulo, y después bajan a su sitio en la interfaz, donde toman su tono. Salen
   en el orden de los módulos, así que la interfaz se arma por partes.
3. **Interfaz (derecha):** se completa, llegan sus detalles vivos y se queda quieta para mirarla.
4. **De la interfaz al año:** la interfaz se descompone empezando por su lado izquierdo. Las partículas suben, cruzan
   hacia la izquierda y entran en las cifras del año siguiente, que las tapa, mientras el contador recorre los años.

En móvil el rótulo queda entre el año y la interfaz. Las partículas lo cruzan, pero se aclaran al pasar sobre él
para no tapar la lectura.

## Giro

Las interfaces giran siempre hacia el mismo lado: visto desde arriba, en el sentido de las agujas del reloj, de modo
que su lado más cercano va hacia la izquierda. Un giro de vuelta se lee como un tirón.

- **Interfaz:** llega girada unos 20° (`TURN_IN`) e inclinada hacia atrás (`TILT_IN`). Mientras se construye gira
  hasta quedar de frente, y mientras se lee sigue girando muy despacio en el mismo sentido (`DRIFT`, 1° por
  segundo).
- **Núcleo:** se despliega girando en el mismo sentido hasta su pose de reposo.

## Línea de tiempo

Los tiempos son segundos desde el inicio. Cada capítulo tiene los mismos pasos internos (ver `STEPS` en el código). Dura
8,6 s más su salto de 2,4 s (`JUMP`).

| Tiempo    | Momento                    | Qué pasa                                                                                                                                                                                                                                                                                            |
| --------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0–4,8     | Introducción               | El polvo aparece. Se escribe, con cursor, «Cómo ha cambiado mi trabajo en la web desde 2009.» (0,4–2,8) y queda para leerla. La línea de tiempo se dibuja de izquierda a derecha con sus años (0,6–2,8). La frase se retira (4,2–4,7).                                                              |
| 4,3–5,2   | Primer año                 | «2009» sube en el contador y el punto de acento aparece en la línea de tiempo.                                                                                                                                                                                                                      |
| 4,8–15,8  | 2009 · Webcreativa         | Ver capítulo 1. Salto 13,4–15,8: la interfaz vuelve al año mientras el contador recorre 2010…2014.                                                                                                                                                                                                  |
| 15,8–26,8 | 2014 · CO/Digital Colombia | Ver capítulo 2. Salto 24,4–26,8: 2015…2018.                                                                                                                                                                                                                                                         |
| 26,8–37,8 | 2018 · Todo en Artes       | Ver capítulo 3. Salto 35,4–37,8: 2019.                                                                                                                                                                                                                                                              |
| 37,8–48,8 | 2019 · Comodísimos         | Ver capítulo 4. Salto 46,4–48,8: 2020…2022.                                                                                                                                                                                                                                                         |
| 48,8–58,8 | 2022 · Puntos Colombia     | Ver capítulo 5. Sin salto: las pruebas pasan y la interfaz se sostiene hasta 58,8.                                                                                                                                                                                                                  |
| 58,8–61,0 | Colapso                    | La interfaz se tiende entera sobre la capa superior de la pila plegada, cada partícula en el mismo punto del plano que ocupaba en la interfaz. La pila nace debajo (59,5–61,0). El contador corre de 2022 al año actual (58,8–60,4) y gira a «HOY» (60,4–60,9). La línea de tiempo llega al final.  |
| 61,0–63,9 | Cierre                     | La pila se despliega en sus cinco capas girando hasta su pose (61,0–62,4); la interfaz sube con la capa superior y le cede el sitio. Las letras salen del núcleo y escriben el titular (61,5–63,2). «HOY» y la línea de tiempo se desvanecen. El texto de apoyo y los botones aparecen (62,7–63,9). |

### Pasos de cada capítulo (segundos desde su inicio)

| Paso         | Tiempo    | Qué pasa                                                                                                                                                                                                                |
| ------------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rótulo       | 0–1,2     | Bajo el año entran el nombre de la empresa (Manrope semibold) y la frase (Manrope).                                                                                                                                     |
| Herramientas | 0,5–2,2   | Se escriben una tras otra en DM Mono, subrayadas como las etiquetas de los proyectos.                                                                                                                                   |
| Construcción | 1,6–5,8   | Las partículas salen del año entre 1,6 y 4,6, módulo a módulo, y cada una tarda 1,2 s en llegar. Las líneas de texto se «escriben» de izquierda a derecha y las barras crecen. La interfaz gira hasta quedar de frente. |
| Detalle vivo | hasta 6,6 | Llegan los detalles que dan vida a la interfaz (ver cada capítulo).                                                                                                                                                     |
| Pausa        | hasta 8,6 | La interfaz completa queda quieta 2 s, girando apenas, para mirarla.                                                                                                                                                    |
| Salto        | 8,6–11    | El rótulo se retira (0,6 s). La interfaz se descompone desde la izquierda (8,6–9,4) y sus partículas vuelven al año en 1,2 s. El contador avanza hasta el año siguiente, al que llega al final del salto.               |

La cantidad de partículas crece con la trayectoria: cada etapa suma las suyas a las anteriores (50 %, 62 %, 75 %,
87 % y 100 % de 12 000 en escritorio y 5 000 en móvil). Las nuevas salen del año junto con las que vuelven.

## Capítulos

Años y empresas salen de `experience` en `src/lib/content.js`. Las frases resumen esa misma fuente: no se inventan
cargos, logros ni métricas.

### 1 · 2009 · Webcreativa

- **Frase:** «Desarrollé más de 97 sitios web y me especialicé en ecommerce y CMS.» / «I developed over 97 websites and specialized in ecommerce and CMS.»
- **Herramientas:** HTML, CSS, jQuery, PHP, Joomla, WordPress.
- **Interfaz:** sitio de contenidos de ancho fijo en una ventana de navegador. Tiene logo y menú de pestañas (la
  activa en acento), un banner con indicadores de carrusel, dos artículos con miniatura, título y texto, una barra
  lateral con buscador y lista de enlaces, y un pie.

### 2 · 2014 · CO/Digital Colombia

- **Frase:** «Desarrollé tiendas y aplicaciones, del frontend al backend, con interfaces que destacaban por sus detalles.» / «I developed stores and applications, from frontend to backend, with interfaces that stood out for their details.»
- **Herramientas:** AngularJS, Node.js, API REST, Drupal, Sass.
- **Interfaz:** a la izquierda, una aplicación de una página en el navegador: menú, titular, botón y formas
  geométricas como las del sitio de la agencia, tres columnas de servicios y un formulario. En el centro, su versión
  en teléfono. A la derecha, la API como servidor de tres unidades.
- **Detalle vivo:** paquetes de datos viajan por las conexiones entre el navegador, el teléfono y la API.

### 3 · 2018 · Todo en Artes

- **Frase:** «Alcanzando miles de ventas, diseñé y desarrollé una tienda en línea, desde las interfaces hasta las integraciones.» / «Reaching thousands of sales, I designed and developed an online store, from interfaces to integrations.»
- **Herramientas:** PrestaShop, PHP, Docker, pagos, envíos.
- **Interfaz:** tienda en línea con logo, buscador, carrito y cuenta. Abajo, una barra de categorías, filtros con
  casillas y rango de precio, y una cuadrícula de ocho productos (imagen, nombre, precio y botón) que se arma
  producto a producto. Cierra el pago en tres pasos: carrito, envío y pago.
- **Detalle vivo:** aparece el indicador del carrito y el pago avanza paso a paso.

### 4 · 2019 · Comodísimos

- **Frase:** «Desarrollé el frontend del POS que acompañó un salto en las ventas de la empresa.» / «I developed the frontend of the POS that accompanied a jump in the company’s sales.»
- **Herramientas:** React, Vue, VTEX, Docker.
- **Interfaz:** el sistema de ventas. Tiene navegación lateral, buscador, cuatro indicadores con su tendencia y un
  gráfico de barras que crecen. Al lado, una tabla de ventas cuyas filas llegan una a una.
- **Detalle vivo:** la línea de tendencia se traza sobre las barras.

### 5 · 2022 · Puntos Colombia

- **Frase:** «Creé el sistema de componentes y la arquitectura frontend con microfrontends. Acompañé al equipo en UX e IA.» / «I created the component system and frontend architecture with microfrontends. I supported the team in UX and AI.»
- **Herramientas:** Angular, TypeScript, Vitest, Docker, IA (AI en inglés).
- **Interfaz:** a la izquierda, una aplicación hecha de componentes. Se arma una tarjeta, que luego se clona dos
  veces; siguen un campo, un interruptor, una casilla, un selector y dos botones. A la derecha, el ejecutor de
  pruebas: una barra de progreso y ocho pruebas pendientes.
- **Detalle vivo:** las ocho pruebas pasan una tras otra (marcas en acento) y la barra se llena. Es el paso al
  sistema que da pie al colapso.

## El núcleo: capas del sistema

Una interfaz y el sistema que hay debajo, en cinco planos apilados (`STACK`), vistos desde arriba en tres cuartos.

1. **Diseño:** la interfaz tal como se ve: cabecera con logo y menú, imagen principal, titular, texto, botón en
   acento y tres tarjetas.
2. **Retícula:** doce columnas y las filas sobre las que se apoya el diseño.
3. **Componentes:** los bloques de los que está hecho el diseño, con su misma huella; el del botón en acento.
4. **Lógica:** el árbol de componentes como nodos y enlaces, un nodo bajo cada bloque.
5. **Datos:** registros como una matriz de puntos, con una fila en acento.

Tres hilos de acento atraviesan las cinco capas donde un elemento del diseño (el botón, la imagen y la tarjeta
central) tiene su componente, su nodo y sus datos.

- **Respiración en reposo** (`BREATH`, ciclo de 14 s): abierta 7 s, se pliega sobre el diseño en 2,4 s, sigue
  plegada 2,2 s y se abre en 2,4 s. Al plegarse, las capas inferiores y los hilos se atenúan y el sistema se
  transparenta bajo el diseño. El ciclo empieza abierto al terminar la historia.
- **Con movimiento reducido:** abierta y quieta.
- **Puntos:** 24 000 en escritorio y 8 000 en móvil. El 5 % forma los hilos.

## Color y forma

- **Paleta:** todas las partículas usan la paleta del sitio (`src/lib/theme.js`): la tinta, los grises azulados
  entre tinta y regla, y el acento. En las interfaces, la estructura va en tinta, el contenido secundario en gris
  azulado y los detalles vivos y acciones en acento. En el núcleo, el diseño va en tinta con el botón en acento, la
  retícula y los datos en gris azulado, y los hilos en acento. El polvo es sobre todo gris azulado, con poca tinta y
  poco acento. Claro y oscuro tienen su propia versión de cada tono.
- **Escena:** en escritorio, el rótulo ocupa la columna izquierda, donde después aparece el titular, y la interfaz
  la mitad derecha. En móvil se apilan el rótulo, la interfaz y la línea de tiempo.
- **Lectura:** las interfaces giran poco en 3D para que sus detalles se lean. Nada se mueve sobre la interfaz
  mientras se construye o se mira: solo el polvo de fondo.

## Al terminar

- La pila de capas respira (ver arriba) y solo gira si se arrastra el fondo, con inercia de unos segundos.
- El puntero atrae como un imán las partículas del núcleo, del polvo y del titular.
- Un clic dentro del hero lanza una onda.
- El titular está dibujado solo con partículas. El texto real sigue en el documento para lectura y tecnologías de
  asistencia.
- Fuera del hero, el fondo es estático.

## Dónde se cambia cada cosa

Todo en `src/lib/nucleus.js`, salvo donde se indica:

| Para cambiar…                                                   | Edita                                                                                                                                                                                                                                                    |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Frase, herramientas u orden de un capítulo; añadir o quitar uno | `CHAPTERS`. Cada capítulo necesita una entrada en `experience` (año y empresa) y una interfaz en la misma posición de `SITES`.                                                                                                                           |
| Frase de introducción                                           | `INTRO_COPY`                                                                                                                                                                                                                                             |
| «HOY» / «TODAY»                                                 | `NOW_LABEL`                                                                                                                                                                                                                                              |
| Duración de la introducción, de cada capítulo o de sus pasos    | `INTRO`, `STEPS`, `JUMP`, `TRAVEL`, `RETURN_SPREAD`. Respeta el [Ritmo](#ritmo). Los detalles vivos deben salir antes del salto: su `at`, más su `sweep`, no debe pasar de 1,25.                                                                         |
| Recorrido entre el año y la interfaz                            | `flight()` (primero cruza, luego baja), `yearPixel()` y las cifras de cada año en `layoutStory()`; el salto en `particleState()`.                                                                                                                        |
| Sentido y cantidad de giro                                      | `TURN_IN`, `TILT_IN`, `TILT`, `DRIFT`; el del núcleo en `drawStory()`. Respeta el [Giro](#giro).                                                                                                                                                         |
| Capas del núcleo y su contenido                                 | `STACK` (planos, `threads`, `gap`), dibujados con `ui()` como las interfaces; `weight` reparte los puntos.                                                                                                                                               |
| Pose, plegado y respiración del núcleo                          | `REST_YAW`, `REST_PITCH`, `FOLDED`, `BREATH`; tamaño y lugar en `center()` y `radius()`.                                                                                                                                                                 |
| Pausa del último capítulo antes del colapso                     | `HOLD_LAST`                                                                                                                                                                                                                                              |
| Colapso y cierre                                                | `makePlan()` (`fold`, `years`, `hoy`, `core`, `unfold`, `handoff`, `write`, `reveal`, `copy`); dónde cae cada partícula sobre el plano, `flat` en `layoutStory()`                                                                                        |
| Dibujo de una interfaz                                          | `SITES`, con `ui()`: `rect`, `line`, `path`, `image`, `block`, `bar`, `ring`, `disc`, `check`, `text`. `at` ordena los módulos, `sweep` escribe o hace crecer, `flow` hace viajar partículas y `clone` construye sobre la primera copia y luego desliza. |
| Número de partículas                                            | `count` y `dust` en `layoutStory()`; puntos del núcleo en `resize()`                                                                                                                                                                                     |
| Colores de partículas                                           | `colors` y `DUST_TONES` en `src/lib/theme.js`                                                                                                                                                                                                            |
| Contador de año, línea de tiempo, rótulos                       | `drawYear` y `digitAt` (las cifras, compartidas con las partículas), `drawRuler`, `drawCaptions`, `drawIntro`                                                                                                                                            |

Si cambia la duración total, actualiza también la espera de `scripts/verify.mjs` y el resumen de la animación en
`DESIGN.md`.
