# Guía: publicar Rafafurniture gratis y usar el panel de fotos/proyectos

Esta guía explica, paso a paso y sin dar nada por sabido, cómo publicar esta web en internet sin coste, cómo activar y usar el panel de administración para añadir fotos y proyectos nuevos, qué medidas de seguridad tiene y cuáles dependen de ti, y cómo añadir más adelante una forma de cobrar online de manera segura.

No hace falta saber programar para seguir esta guía. Se tarda entre 20 y 40 minutos la primera vez.

---

## 1. Qué hay en esta carpeta

```
index.html                    → la página web
css/style.css                 → todos los estilos (colores, tipografías, diseño)
js/archstyle.js               → el comportamiento de la web (menú, formulario, preguntas frecuentes...)
js/site-data.js               → lee los datos del panel y los aplica a la web
js/netlify-identity-redirect.js → gestiona el enlace de invitación al panel
data/settings.json            → email, WhatsApp, Instagram, zona, fotos de portada
data/categories.json          → foto de cada categoría de muebles
data/gallery.json             → proyectos de la galería ("trabajos anteriores")
data/testimonials.json        → opiniones de clientes
images/uploads/               → aquí llegan las fotos que se suben desde el panel
admin/index.html              → el panel de administración en sí
admin/config.yml               → la configuración del panel (qué se puede editar)
_headers                      → cabeceras de seguridad que aplica Netlify (ver sección 5)
docker-compose.local.yml      → opcional, solo para probar el panel en tu ordenador
GUIA-PUBLICAR-Y-PANEL.md      → este documento
```

La web es "estática": no necesita un servidor propio ni una base de datos. Eso es lo que permite alojarla gratis y sin mantenimiento.

---

## 2. Publicar la web gratis (GitHub + Netlify)

Vamos a usar dos servicios gratuitos que se usan juntos muy habitualmente:

- **GitHub**: guarda el código de la web (como una carpeta con historial de cambios).
- **Netlify**: coge lo que hay en GitHub y lo publica en internet automáticamente, con HTTPS y una dirección gratuita del tipo `rafafurniture.netlify.app`. Cada vez que algo cambia en GitHub (por ejemplo, porque se añadió una foto desde el panel), Netlify vuelve a publicar solo, sin que nadie tenga que hacer nada.

### 2.1. Crear el repositorio en GitHub

1. Entra en [github.com](https://github.com) y crea una cuenta gratuita si no tienes una.
2. Arriba a la derecha, pulsa el icono **+** → **New repository**.
3. Ponle un nombre, por ejemplo `rafafurniture-web`. Puede ser público o privado, da igual para esto. Pulsa **Create repository**.
4. En la página del repositorio recién creado, pulsa **uploading an existing file** (o el botón **Add file → Upload files**).
5. Arrastra **todo el contenido de esta carpeta** (no la carpeta en sí, sino lo que hay dentro: `index.html`, `css`, `js`, `data`, `images`, `admin`, este documento...) y pulsa **Commit changes**.

### 2.2. Publicar con Netlify

1. Entra en [netlify.com](https://www.netlify.com) y crea una cuenta gratuita (puedes registrarte directamente con tu cuenta de GitHub, es lo más cómodo).
2. En el panel de Netlify, pulsa **Add new site → Import an existing project**.
3. Elige **GitHub** y autoriza el acceso cuando te lo pida.
4. Selecciona el repositorio `rafafurniture-web` que creaste antes.
5. En la configuración de compilación (*build settings*) no hace falta tocar nada: esta web no necesita ningún comando de compilación. Deja los campos "Build command" y "Publish directory" en blanco, o pon `.` en "Publish directory" si te pide algo.
6. Pulsa **Deploy site**.

En menos de un minuto tendrás la web publicada en una dirección como `nombre-aleatorio.netlify.app`. Desde **Site settings → Change site name** puedes cambiarla por algo como `rafafurniture.netlify.app`.

> **¿Dominio propio (rafafurniture.com)?** Cuando quieras, puedes comprar un dominio (en Namecheap, IONOS, Google Domains, etc., normalmente 8-15 €/año) y conectarlo desde **Site settings → Domain management → Add a domain**. Netlify te da instrucciones exactas para ese dominio. El alojamiento en sí sigue siendo gratis; lo único que cuesta dinero, si se quiere, es el propio nombre de dominio.

---

## 3. Activar el panel de administración

El panel (carpeta `admin`) usa dos piezas de Netlify, ambas gratuitas:

- **Netlify Identity**: gestiona quién puede iniciar sesión en el panel.
- **Git Gateway**: permite que el panel guarde los cambios (fotos, proyectos, textos) directamente en GitHub, sin que el dueño del negocio necesite saber qué es GitHub.

### 3.1. Activar Identity

1. En el panel de Netlify, entra en tu site → **Site configuration → Identity** (en versiones antiguas de la interfaz: pestaña **Identity**).
2. Pulsa **Enable Identity**.
3. Baja hasta **Registration** y cámbialo a **Invite only**. Esto es importante: así nadie puede crearse una cuenta por su cuenta, solo entra quien tú invites explícitamente.

### 3.2. Activar Git Gateway

1. En la misma sección de Identity, busca **Services → Git Gateway**.
2. Pulsa **Enable Git Gateway**. Netlify se conecta automáticamente con el repositorio de GitHub que ya tienes vinculado, sin pedirte contraseñas.

### 3.3. Invitar al dueño del negocio

1. En **Identity**, pulsa **Invite users**.
2. Escribe su email y envía la invitación.
3. Esa persona recibirá un correo de Netlify con un enlace para crear su contraseña. Al confirmarlo, entrará directamente al panel.

### 3.4. Entrar al panel

A partir de ahora, el panel está disponible en:

```
https://tu-sitio.netlify.app/admin/
```

(sustituyendo `tu-sitio` por el nombre real que le hayas puesto en Netlify). Conviene guardar ese enlace en favoritos.

---

## 4. Usar el panel día a día

Dentro del panel hay dos bloques:

**Ajustes generales**
- *Contacto y fotos de portada*: email, WhatsApp, Instagram, zona de trabajo, y las dos fotos grandes de la portada. Al guardar, se actualizan solos en todos los sitios de la web donde aparecen (cabecera, sección de encargos, pie de página, botón flotante de WhatsApp...).
- *Fotos de categorías*: una foto para cada categoría de la sección "Nuestros muebles" (mesas, sillas, armarios, estanterías, auxiliares, a medida).

**Contenido de la web**
- *Galería de proyectos*: aquí es donde se añade **cualquier proyecto nuevo**. Pulsa **Proyectos**, luego **Add "Galería de proyectos"** → **Add Proyecto**, sube la foto, escribe un título, y pulsa **Publish** (arriba a la derecha). El proyecto nuevo aparece automáticamente en la sección "Trabajos anteriores" de la web, sin límite de cuántos se pueden añadir. Se pueden reordenar arrastrándolos en la lista, o borrar los que ya no interesen.
- *Opiniones de clientes*: igual que la galería, pero para reseñas reales de clientes (nombre, pieza encargada, valoración de 1 a 5, texto). En cuanto se añade la primera opinión real, las tres tarjetas de ejemplo que trae la web desaparecen solas.

Cada vez que se pulsa **Publish** en el panel, el cambio se guarda en GitHub y Netlify vuelve a publicar la web automáticamente (suele tardar menos de un minuto en verse reflejado).

### Cómo funciona por dentro (para referencia futura)

El panel (Decap CMS, un editor visual gratuito y de código abierto) no "sabe" nada de esta web en concreto: simplemente edita cuatro archivos de texto (`data/settings.json`, `data/categories.json`, `data/gallery.json`, `data/testimonials.json`) y sube las fotos a `images/uploads/`. La propia web, al cargar en el navegador de cualquier visitante, lee esos archivos (`js/site-data.js`) y rellena el contenido correspondiente. Si algún archivo estuviera vacío o no existiera, la web no se rompe: simplemente se queda con los bloques de ejemplo que trae por defecto.

### Probar el panel en tu ordenador (opcional, antes de publicar)

Esto es opcional — sirve solo para practicar. Para el uso real del día a día, una vez publicado en Netlify, no hace falta nada de esto.

Para probarlo en local hacen falta **dos piezas a la vez**:

1. Algo que sirva los archivos por `http://` (no vale abrir `index.html` con doble clic — con `file://` el navegador bloquea la lectura de los `data/*.json`, por seguridad).
2. **decap-server**: un pequeño programa que hace de intermediario para que el botón "Publish" del panel pueda guardar cambios en tus archivos locales. Solo hace falta para probar el **guardado**; si únicamente quieres ver la web leyendo los datos de ejemplo, con el punto 1 ya te vale (sigue leyendo, más abajo se explica esta diferencia).

`decap-server` es una pieza de Node.js — no existe una versión en Python que la sustituya directamente. Pero tienes varias formas de levantar todo esto según lo que tengas instalado. **Antes de elegir, lee la sección 5 (Seguridad) más abajo si te preocupa la procedencia de los paquetes de npm** — todas las opciones de aquí abajo ya usan una versión fijada (`decap-server@3.10.0`) en vez de "la última disponible en cada momento", precisamente por eso.

**Opción A — Node.js**

1. Instala [Node.js](https://nodejs.org) (gratis).
2. Abre una terminal en esta carpeta y ejecuta `npx decap-server@3.10.0` (con la versión fijada; comprueba antes en [npmjs.com/package/decap-server](https://www.npmjs.com/package/decap-server) si prefieres usar una más reciente a propósito).
3. En otra terminal, ejecuta `npx serve .` (o `python3 -m http.server 8000`, ver Opción C) y abre `http://localhost:3000/admin/` (o el puerto que corresponda).

**Opción B — Docker (si no quieres instalar Node.js en tu sistema)**

Con Docker no hace falta instalar Node ni Python en tu ordenador: las imágenes ya los traen. En esta carpeta se incluye `docker-compose.local.yml`, que levanta las dos piezas a la vez (una con Node para `decap-server`, otra con Python solo para servir los archivos), con la versión de `decap-server` ya fijada. Con [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado, ejecuta en esta carpeta:

```
docker compose -f docker-compose.local.yml up
```

y abre `http://localhost:8000/admin/`. Para parar, `Ctrl+C` y luego `docker compose -f docker-compose.local.yml down`.

Si prefieres no usar un archivo de Compose, son los mismos dos contenedores por separado, uno en cada terminal:

```
docker run --rm -p 8081:8081 -v "$PWD":/app -w /app node:20-alpine npx decap-server@3.10.0
docker run --rm -p 8000:8000 -v "$PWD":/app -w /app python:3.12-alpine python3 -m http.server 8000
```

Si prefieres `pnpm` en vez de `npm` (ver por qué en la sección 5), la variante del primer contenedor sería:

```
docker run --rm -p 8081:8081 -v "$PWD":/app -w /app node:20-alpine sh -c "corepack enable && pnpm dlx decap-server@3.10.0"
```

**Opción C — Solo Python (para ver la web, sin probar el guardado del panel)**

Si lo único que quieres es ver la web funcionando en tu navegador (comprobar que la galería, las opiniones y los datos de contacto se leen bien de `data/*.json`), no hace falta ni Node ni Docker: basta con un servidor de archivos. Python ya trae uno integrado:

```
python3 -m http.server 8000
```

y abre `http://localhost:8000`. Esto sirve para ver la web tal cual queda, pero si entras en `/admin/` y pulsas "Publish" no habrá nada que reciba ese guardado (te dará error) — para probar el guardado de verdad necesitas además `decap-server` (Opción A o B), o simplemente publicar en Netlify y probarlo ahí, que es lo más simple de todo: subir los cambios a GitHub tarda un minuto y Netlify + Git Gateway ya hacen de backend real, sin instalar nada en tu ordenador.

---

## 5. Seguridad: qué protege esta web y qué depende de ti

Es una preocupación razonable, así que vamos por partes: qué es seguro por diseño, qué se ha reforzado explícitamente, y qué conviene vigilar tú mismo con el tiempo.

### 5.1. Lo que ya es seguro por cómo está construida la web

- **La web pública no tiene servidor propio ni base de datos.** Es HTML, CSS y JavaScript que se descargan tal cual al navegador de cada visitante. Eso elimina de raíz familias enteras de ataques típicos de webs "dinámicas" (inyección SQL, ejecución de código en el servidor, robo de una base de datos que ni siquiera existe aquí).
- **El formulario de encargos no envía nada a ningún servidor.** Solo prepara un email (`mailto:`) en el propio navegador de quien lo rellena. No hay ningún sitio donde alguien pueda "inyectar" algo a través de ese formulario.
- **HTTPS viene incluido y automático** en cuanto publicas en Netlify (certificado gratuito, se renueva solo). Eso cifra todo el tráfico entre el visitante y la web.
- **El panel de administración exige inicio de sesión** (Netlify Identity), y en el paso 3.1 lo configuramos en modo **"Invite only"**: nadie puede registrarse por su cuenta, solo entra quien tú invitas explícitamente por email. Esta es, con diferencia, la protección más importante de las que dependen de ti — revísala si alguna vez algo te hace sospechar.

### 5.2. Lo que se ha añadido explícitamente en el código

- **Cabeceras de seguridad (`_headers`)**: Netlify las aplica automáticamente al publicar. Incluyen una *Content-Security-Policy* (una lista blanca de qué orígenes pueden cargar scripts, estilos, imágenes, etc. en la web — bloquea que un script inyectado desde fuera de esa lista se llegue a ejecutar), y cabeceras que impiden que la web se pueda incrustar en un iframe ajeno (`X-Frame-Options`, protección contra *clickjacking*), que fuercen HTTPS (`Strict-Transport-Security`) y que reduzcan la información que se filtra al navegar a otros sitios (`Referrer-Policy`).
- **Sin scripts "inline"**: todo el JavaScript vive en archivos `.js` propios en vez de código suelto dentro del HTML, precisamente para que la política de arriba pueda ser estricta (bloquear cualquier script que no venga de un archivo conocido) sin tener que hacer excepciones.
- **Los datos del panel se muestran de forma segura**: cuando `js/site-data.js` coge lo que el dueño escribió en el panel (nombre de un cliente, título de un proyecto, una URL de foto...) y lo coloca en la página, lo hace escapando el texto y validando las URLs de imagen — para que, aunque alguien lograra escribir algo raro en esos campos, no pudiera ejecutar código ni romper el diseño de la página.
- **Versiones fijadas, no "la última disponible"**: tanto Decap CMS (`admin/index.html`) como `decap-server` (solo para pruebas locales) cargan una versión concreta y conocida, no un rango que se actualice solo. Lo explico con más detalle en el punto siguiente, porque viene directamente de tu pregunta sobre npm.

### 5.3. Sobre tu duda de npm/pnpm y los paquetes maliciosos

Tu preocupación está bien fundada: en 2025 y también en 2026 ha habido varios episodios reales de paquetes maliciosos publicados en el registro de npm, incluyendo un ataque en cadena conocido como "Shai-Hulud" que comprometió cuentas de mantenedores y se propagó publicando versiones envenenadas de paquetes muy usados (hay avisos oficiales de CISA y de la Agencia de Ciberseguridad de Singapur, entre otros — enlaces abajo). No es algo puntual ya resuelto, sigue siendo un riesgo activo del ecosistema de JavaScript en general.

Dicho esto, con precisión sobre qué cambia y qué no cambia usar `pnpm` en vez de `npm`:

- **`pnpm` descarga los paquetes exactamente del mismo sitio que `npm`** (el registro público de npm). Cambiar de gestor no te saca de ese registro ni te protege de que un paquete concreto esté comprometido en el origen.
- Donde `pnpm` sí ayuda un poco es en cómo organiza los paquetes ya descargados: es más estricto con las "dependencias fantasma" (un paquete usando por sorpresa código de otro paquete que no declaró como dependencia suya). Es una protección real, pero acotada — no es un antivirus ni un filtro de paquetes maliciosos.
- **Lo que de verdad reduce el riesgo, uses `npm` o `pnpm`, es fijar versiones exactas** en vez de instalar siempre "lo último": así, aunque una versión nueva de un paquete salga comprometida mañana, tu proyecto no la va a coger sola. Es justo lo que se ha hecho aquí (`decap-server@3.10.0`, `decap-cms@3.15.1` en vez de rangos abiertos).

Y el punto más importante para tu caso concreto: **`decap-server` (lo que usa npm/npx) es una herramienta 100% opcional, solo para probarlo en tu ordenador antes de publicar.** No forma parte de la web publicada ni se ejecuta nunca en producción — el sitio real, una vez en Netlify, no ejecuta npm ni Node.js en ningún momento; es HTML/CSS/JS estático servido tal cual, y el panel de administración carga Decap CMS directamente en el navegador de quien entra (con la versión fijada de la que hablamos arriba), sin pasar por tu ordenador ni por npm en absoluto. Si el riesgo de npm te sigue preocupando, la forma más simple de evitarlo del todo es **no usar la Opción A/B de pruebas locales**: usa la Opción C (solo Python, para ver la web) y, para probar el guardado real del panel, publica directamente en Netlify — ahí el "backend" es Git Gateway, gestionado por Netlify, sin ningún `npm install` de por medio.

Sources:
- [Widespread Supply Chain Compromise Impacting npm Ecosystem | CISA](https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem)
- ["Shai-Hulud" Worm Compromises npm Ecosystem in Supply Chain Attack | Unit 42](https://unit42.paloaltonetworks.com/npm-supply-chain-attack/)
- [Shai-Hulud npm Supply Chain Attack: What to Know | Panther](https://panther.com/blog/shai-hulud-npm-supply-chain-attack)
- [Ongoing npm Supply Chain Attack Affecting Keyv and Related Packages ("Shai-Hulud" Worm) | Cyber Security Agency of Singapore](https://www.csa.gov.sg/alerts-and-advisories/advisories/ad-2026-009/)

### 5.4. Buenas prácticas a mantener tú, con el tiempo

- Deja siempre **Identity en modo "Invite only"** — no lo cambies a registro abierto.
- Activa la **verificación en dos pasos (2FA)** en tu cuenta de GitHub y en tu cuenta de Netlify — son las dos llaves maestras de todo esto.
- Revisa de vez en cuando **quién tiene acceso al panel** (Identity → Users) y elimina a quien ya no lo necesite.
- Si algún día instalas algo con `npm`/`npx`/`pnpm` en tu ordenador para este proyecto, evita comandos que instalen "lo último de lo último" sin versión fijada, sobre todo si vienen de un tutorial que no controlas tú.
- Si algo del panel deja de funcionar justo después de publicar, revisa primero la consola del navegador (F12) por si la Content-Security-Policy de `_headers` está bloqueando algo que no se previó — la nota al principio de ese archivo explica cómo ajustarlo.

---

## 6. Añadir un método de pago online seguro (para cuando lo necesites)

De momento la web no cobra nada online: los encargos se piden por formulario o WhatsApp y se acuerda el pago aparte. Cuando quieras activar un cobro online (por ejemplo, para pedir una señal al confirmar un encargo), estas son las opciones más habituales y seguras. Ninguna de ellas requiere guardar datos de tarjetas en la propia web — y eso es importante: **nunca se deben pedir ni guardar datos de tarjeta directamente** (por normativa de seguridad, PCI DSS); siempre se usa un proveedor especializado que ya cumple esa normativa por ti.

| Opción | Cómo funciona | Coste | Dificultad |
|---|---|---|---|
| **Stripe** | Generas un "enlace de pago" (Payment Link) o un botón de pago desde el panel de Stripe, sin programar. Se pega en la web como un botón. También existen packs más avanzados (Stripe Checkout) si más adelante se quiere una tienda completa. | Gratis de crear. Comisión por cobro (aprox. 1,5% + 0,25 € en tarjetas europeas; algo más en tarjetas internacionales). | Baja |
| **PayPal** | Botón de pago de PayPal/tarjeta, generado desde su panel de "PayPal Buttons". Muy reconocido por los clientes. | Gratis de crear. Comisión similar por cobro (varía según volumen). | Baja |
| **Bizum** | Muy popular en España para señales entre particulares, pero integrarlo de forma **automática** en una web requiere contratar un TPV virtual con tu banco (más trámites y, normalmente, alguna cuota). Mientras tanto, se puede mostrar el número de cuenta o el número de Bizum y confirmar el pago a mano. | Gratis si se hace manual; el TPV virtual bancario suele tener coste. | Manual: muy baja. Automático: alta |

**Recomendación práctica para un taller de muebles a medida:** normalmente no hace falta una tienda online completa, sino cobrar una **señal** al confirmar el presupuesto. Para eso, lo más sencillo suele ser un enlace de pago de Stripe o un botón de PayPal colocado en la sección de encargos (o enviado por email/WhatsApp tras acordar el presupuesto), sin necesidad de rehacer la web.

Cuando quieras dar este paso, dime qué opción prefieres (Stripe o PayPal, señal fija o importe variable) y lo integro directamente en la sección "Encargos a medida" de la web.

---

## 7. Límites del plan gratuito (para tenerlo en cuenta)

- **Netlify (gratis)**: 100 GB de transferencia al mes y 300 minutos de compilación al mes. Esta web no usa proceso de compilación real (no hay "build"), así que prácticamente no consume minutos de compilación; el límite que de verdad importa es la transferencia, muy difícil de agotar para una web de un taller local.
- **Netlify Identity (gratis)**: hasta 5 usuarios con acceso al panel en el plan gratuito. Más que suficiente para un negocio pequeño (dueño + algún empleado de confianza).
- **GitHub (gratis)**: sin límites relevantes para este uso.
- **Decap CMS**: es software libre y gratuito, sin límites de uso.

Si el negocio crece mucho (mucho tráfico, muchos usuarios del panel), estos servicios tienen planes de pago, pero no son necesarios para empezar ni para un funcionamiento normal.

---

## 8. Checklist rápido

- [ ] Código subido a un repositorio de GitHub
- [ ] Sitio importado y publicado en Netlify (el archivo `_headers` se aplica solo, sin configurar nada)
- [ ] Identity activado, con registro en modo "Invite only"
- [ ] Git Gateway activado
- [ ] 2FA activado en las cuentas de GitHub y Netlify
- [ ] Dueño del negocio invitado por email a `/admin/`
- [ ] Datos de contacto reales confirmados en el panel (Ajustes generales) — el email y el usuario de Instagram que trae la web por defecto son de ejemplo
- [ ] Primeras fotos de categorías y de portada subidas
- [ ] Primeros proyectos añadidos a la galería
- [ ] (Opcional, más adelante) Método de pago online conectado
