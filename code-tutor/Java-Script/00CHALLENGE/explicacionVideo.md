# MediaRecorder API — Explicación del Proyecto

## ¿Qué es MediaRecorder?

MediaRecorder permite **grabar audio/video directamente en el navegador** y descargarlo como archivo. No necesita servidor — todo ocurre del lado del cliente.

---

## Archivos del Proyecto

### `2.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Grabar Video</title>
</head>
<body>
    <h1>Grabar Video con MediaRecorder</h1>
    <button id="startRecording">Iniciar Grabación</button>
    <button id="stopRecording" disabled>Detener Grabación</button>
    <video id="preview" autoplay playsinline
      style="width:100%;max-width:600px;border:1px solid black"></video>
    <a id="downloadLink" style="display:none">Descargar Video</a>
    <script src="scripts/2.js"></script>
</body>
</html>
```

### `scripts/2.js`

```js
const videoPreview = document.getElementById('preview');
const startButton = document.getElementById('startRecording');
const stopButton = document.getElementById('stopRecording');
const downloadLink = document.getElementById('downloadLink');

let mediaRecorder;
let recordedChunks = [];

navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then((stream) => {
    videoPreview.srcObject = stream;

    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = 'grabacion.webm';
      downloadLink.style.display = 'block';
      recordedChunks = [];
    };

    startButton.addEventListener('click', () => {
      mediaRecorder.start();
      startButton.disabled = true;
      stopButton.disabled = false;
    });

    stopButton.addEventListener('click', () => {
      mediaRecorder.stop();
      startButton.disabled = false;
      stopButton.disabled = true;
    });
  })
  .catch((error) => {
    console.error('Error al acceder a la cámara/micrófono:', error);
  });
```

---

## Flujo del Programa

```
getUserMedia() ──> MediaStream ──> MediaRecorder ──> chunks[] ──> Blob ──> Download
(cámara + mic)    (feed en vivo)   (graba datos)     (array de     (archivo)  (guardar en disco)
                                                      piezas crudas)
```

---

## Explicación Paso a Paso

### 1. Obtener referencias del DOM

```js
const videoPreview = document.getElementById('preview');
const startButton = document.getElementById('startRecording');
const stopButton = document.getElementById('stopRecording');
const downloadLink = document.getElementById('downloadLink');
```

Se obtienen los elementos HTML: el `<video>` para mostrar el feed, los dos botones, y el enlace de descarga oculto.

### 2. Variables de estado

```js
let mediaRecorder;
let recordedChunks = [];
```

- `mediaRecorder` — el motor de grabación (se crea cuando el stream esté listo).
- `recordedChunks` — array que acumula los trozos de datos conforme llegan.

### 3. Acceder a la cámara y micrófono

```js
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
```

- `navigator.mediaDevices.getUserMedia()` pide permiso al navegador para usar cámara y micrófono.
- Devuelve una **Promise** que resuelve a un objeto **`MediaStream`**.
- El navegador muestra un popup de permiso.
- `{ video: true, audio: true }` — solicita ambas pistas de audio y video.

### 4. Mostrar el feed en vivo

```js
.then((stream) => {
  videoPreview.srcObject = stream;
```

- `video.srcObject = stream` — asigna el stream en vivo al elemento `<video>`.
- Con `autoplay` y `playsinline` en la etiqueta `<video>`, se muestra instantáneamente.

### 5. Crear el MediaRecorder

```js
mediaRecorder = new MediaRecorder(stream);
```

- `MediaRecorder` recibe un `MediaStream` y lo graba.
- Formato por defecto: **webm** (video VP8/VP9 + audio Opus).
- Se puede especificar formato: `new MediaRecorder(stream, { mimeType: 'video/webm' })`.

### 6. Evento `ondataavailable` — recolectar trozos

```js
mediaRecorder.ondataavailable = (event) => {
  if (event.data.size > 0) {
    recordedChunks.push(event.data);
  }
};
```

- Se dispara periódicamente mientras se graba (por defecto al detener la grabación se hace un flush final).
- `event.data` es un **`Blob`** — un trozo binario de la grabación.
- Cada trozo se guarda en `recordedChunks[]`.
- El filtro `size > 0` evita trozos vacíos.

### 7. Evento `onstop` — construir el archivo final

```js
mediaRecorder.onstop = () => {
  const blob = new Blob(recordedChunks, { type: 'video/webm' });
  const url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = 'grabacion.webm';
  downloadLink.style.display = 'block';
  recordedChunks = [];
};
```

Cuando el usuario pulsa "Detener":

1. **`new Blob(recordedChunks, { type: 'video/webm' })`** — fusiona todos los trozos en un solo archivo binario de tipo `video/webm`.
2. **`URL.createObjectURL(blob)`** — crea una URL temporal en memoria (ej: `blob:http://...`) que apunta al blob. El navegador puede tratar el blob como un archivo descargable.
3. Asigna la URL al `<a>`, añade el atributo `download` (sugiere nombre de archivo), hace visible el enlace.
4. Resetea `recordedChunks` para la próxima grabación.

### 8. Manejadores de botones

```js
startButton.addEventListener('click', () => {
  mediaRecorder.start();
  startButton.disabled = true;
  stopButton.disabled = false;
});

stopButton.addEventListener('click', () => {
  mediaRecorder.stop();
  startButton.disabled = false;
  stopButton.disabled = true;
});
```

- Start → `mediaRecorder.start()` comienza la grabación, desactiva Start, activa Stop.
- Stop → `mediaRecorder.stop()` detiene la grabación (dispara `ondataavailable` final + `onstop`), reactiva Start.

### 9. Manejo de errores

```js
.catch((error) => {
  console.error('Error al acceder a la cámara/micrófono:', error);
});
```

- Captura errores como: usuario deniega permiso, no hay cámara/micrófono, u otros fallos de hardware.

---

## Conceptos Clave

| Concepto | Qué es | Ejemplo |
|----------|--------|---------|
| `MediaStream` | Datos en vivo de cámara/micrófono | `stream = await getUserMedia(...)` |
| `MediaRecorder` | Graba un MediaStream en trozos | `new MediaRecorder(stream)` |
| `ondataavailable` | Se dispara con cada trozo de datos | `event.data` (un Blob) |
| `Blob` | Objeto binario que representa datos de archivo | `new Blob(chunks, { type: 'video/webm' })` |
| `URL.createObjectURL()` | Crea una URL temporal para un Blob | `URL.createObjectURL(blob)` |
| `chunks[]` | Array que acumula trozos Blob durante la grabación | `recordedChunks.push(event.data)` |

---

## Métodos y Propiedades del MediaRecorder

| API | Propósito |
|-----|-----------|
| `mediaRecorder.start()` | Comenzar grabación |
| `mediaRecorder.stop()` | Detener grabación (dispara flush final de datos) |
| `mediaRecorder.pause()` | Pausar (mantiene el stream, pausa la grabación) |
| `mediaRecorder.resume()` | Reanudar grabación pausada |
| `mediaRecorder.state` | Estado actual: `"inactive"`, `"recording"` o `"paused"` |
| `mediaRecorder.mimeType` | Formato de grabación en uso |
| `mediaRecorder.ondataavailable` | Callback que recibe `BlobEvent` con datos grabados |
| `mediaRecorder.onstop` | Callback cuando la grabación se detiene por completo |

---

## Formato de Salida

- Por defecto: **WebM** (VP8/VP9 video + Opus audio). Soportado por Chrome, Firefox, Edge.
- Safari prefiere `.mp4` si está disponible.
- Se puede especificar formato:
  ```js
  new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
  ```

---

## Permisos del Navegador

- `getUserMedia()` dispara un **diálogo de permiso** del navegador pidiendo acceso a cámara/micrófono.
- Si se deniega, la Promise se rechaza y se maneja en `.catch()`.
- El usuario puede revocar el permiso desde la configuración del sitio en el navegador.
