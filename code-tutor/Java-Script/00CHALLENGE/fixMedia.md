# Fix Media Recorder Project

## `index.html` — Missing properties

### `<video>` element (line 35)
```html
<!-- CURRENT (broken) -->
<video src=""></video>

<!-- FIXED -->
<video src="" id="miPreview" autoplay playsinline muted></video>
```

| Attribute | Why |
|-----------|-----|
| `id="miPreview"` | JS needs a reference to set `srcObject` |
| `autoplay` | Shows the live camera feed immediately |
| `playsinline` | iOS compatibility (plays inline, not fullscreen) |
| `muted` | Prevents microphone feedback loop |

### `<a>` download link (line 32)
```html
<!-- CURRENT (broken) -->
<a href="enlaceDescargar">Descargar Video</a>

<!-- FIXED -->
<a href="" id="miDescargar" style="display:none">Descargar Video</a>
```

| Attribute | Why |
|-----------|-----|
| `href=""` | Placeholder — JS will set the blob URL |
| `id="miDescargar"` | JS needs to set `href` and `download` |
| `style="display:none"` | Hidden until a recording is ready |

### `<button id="btnParar">` (line 31)
```html
<!-- CURRENT -->
<button id="btnParar">PARAR</button>

<!-- FIXED -->
<button id="btnParar" disabled>PARAR</button>
```

| Attribute | Why |
|-----------|-----|
| `disabled` | Can't stop if nothing is recording |

---

## `script/script.js` — Completely empty

Rewrite the JS file with:

```js
const mibtnGrabar = document.getElementById('btnGrabar');
const mibtnParar = document.getElementById('btnParar');
const miPreview = document.getElementById('miPreview');
const miDescargar = document.getElementById('miDescargar');

let mediaRecorder;
let recordedChunks = [];

navigator.mediaDevices
.getUserMedia({ audio: true, video: true })
.then((stream) => {
    miPreview.srcObject = stream;

    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };

    mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        miDescargar.href = url;
        miDescargar.download = 'grabacion.webm';
        miDescargar.style.display = 'block';
        recordedChunks = [];
    };

    mibtnGrabar.onclick = () => {
        recordedChunks = [];
        mediaRecorder.start();
        mibtnGrabar.disabled = true;
        mibtnParar.disabled = false;
    };

    mibtnParar.onclick = () => {
        mediaRecorder.stop();
        mibtnGrabar.disabled = false;
        mibtnParar.disabled = true;
    };
})
.catch((err) => {
    console.error('Error accessing media devices:', err);
});
```

---

## JS Doc — Enable IntelliSense in VS Code

`document.getElementById()` returns `HTMLElement | null` — too generic for VS Code to offer `srcObject`, `play()`, etc.

Add JSDoc type annotations above each variable:

```js
/** @type {HTMLVideoElement} */
const miPreview = document.getElementById('miPreview');

/** @type {HTMLButtonElement} */
const mibtnGrabar = document.getElementById('btnGrabar');

/** @type {HTMLButtonElement} */
const mibtnParar = document.getElementById('btnParar');

/** @type {HTMLAnchorElement} */
const miDescargar = document.getElementById('miDescargar');
```

Now VS Code will autocomplete:
- `miPreview.srcObject`, `miPreview.play()`, `miPreview.muted`
- `mibtnGrabar.disabled`, `mibtnGrabar.onclick`
- `miDescargar.href`, `miDescargar.download`

### Common HTML element types for JSDoc

| Element | Type |
|---------|------|
| `<video>` | `HTMLVideoElement` |
| `<audio>` | `HTMLAudioElement` |
| `<button>` | `HTMLButtonElement` |
| `<a>` | `HTMLAnchorElement` |
| `<input>` | `HTMLInputElement` |
| `<div>` | `HTMLDivElement` |
| `<canvas>` | `HTMLCanvasElement` |

---

## Summary of all fixes

| File | Line(s) | Fix |
|------|---------|-----|
| `index.html` | 32 | Fix `href`, add `id` and `style="display:none"` to download link |
| `index.html` | 35 | Add `id`, `autoplay`, `playsinline`, `muted` to `<video>` |
| `index.html` | 31 | Add `disabled` to Parar button |
| `script/script.js` | all | Write full MediaRecorder logic |

---

## `<a>` link href and create URL

The HTML `<a>` element has an href box that holds the destination the link needs to go to. The blob is the raw video. `URL.createObjectURL(blob)` creates a temporary address that points to the blob. We put that address into the href, so clicking the link knows where to find the video in the browser's memory.

---

## MediaRecorder

**`let mediaRecorder;`** — an empty box where we'll put the recorder object once we have the camera.

**`let recordedChunks = [];`** — an empty list that will hold the video data as it arrives, chunk by chunk.

**`navigator.mediaDevices.getUserMedia(...)`** — asks the browser: "hey, can I have the camera and mic?" This is the request that pops the permission dialog.

**`.then((stream) => { ... })`** — if the user says yes, we get a `stream` (the live feed). That stream is:
1. Piped to the `<video>` element via `miPreview.srcObject = stream` so you can see yourself.
2. Given to `new MediaRecorder(stream)` — the thing that actually records.

**`mediaRecorder.ondataavailable`** — the MediaRecorder fires this event periodically while recording. Each `event.data` is a small piece of the video (a blob). We push each piece into `recordedChunks` to collect them all. Later, when recording stops, we'll glue all those chunks into one final video blob.

---

## Scaffolding — Step-by-step to complete `script.js`

Current file at `miMediaRecorder2/script/script.js` has the DOM references and `getUserMedia` started. Here's what to add in order:

### Step 1 — Fix variable name mismatch
Change `recordedChunks` to `chunkBlobs` on line 28 (or rename the declaration — pick one name and be consistent)

```js
// Line 18: let chunkBlobs = [];
// Line 28: chunkBlobs.push(event.data);  // not recordedChunks
```

### Step 2 — Declare `mediaRecorder`
Add `let mediaRecorder;` at the top with the other declarations (around line 17-18):

```js
let mediaRecorder;
let totalBlob;
let chunkBlobs = [];
```

### Step 3 — Add `.catch()` for error handling
```js
.catch((err) => {
    console.error('Error accessing media devices:', err);
});
```

---

## Debugging — Common mistakes from this session

### 1. Variable name mismatch
```js
// ✗ Wrong — pushing to a variable that doesn't exist
let chunkBlobs = [];
recordedChunks.push(event.data);

// ✓ Correct — use the same name everywhere
let chunkBlobs = [];
chunkBlobs.push(event.data);
```
**Fix:** Declare once, use the same name.

### 2. Forgetting `let` / `const`
```js
// ✗ Wrong — undeclared global (bad practice, error in strict mode)
mediaRecorder = new MediaRecorder(stream);

// ✓ Correct
let mediaRecorder;
mediaRecorder = new MediaRecorder(stream);
```
**Fix:** Always declare variables before using them.

### 3. Wrong variable for `start()` / `stop()`
```js
// ✗ Wrong — Blob has no .start() or .stop()
totalBlob.start();
totalBlob.stop();

// ✓ Correct — mediaRecorder has .start() and .stop()
mediaRecorder.start();
mediaRecorder.stop();
```
**Fix:** `.start()` and `.stop()` belong to `MediaRecorder`, not `Blob`.

### 4. `URL.createUrl` vs `URL.createObjectURL`
```js
// ✗ Wrong — doesn't exist
URL.createUrl(blob);

// ✓ Correct
URL.createObjectURL(blob);
```
**Fix:** The method name is `createObjectURL`.

### 5. `disabled` on an `<a>` tag does nothing
```html
<!-- ✗ Wrong — disabled is not a valid attribute for anchor elements -->
<a href="" disabled>Descargar</a>

<!-- ✓ Correct — use display:none to hide -->
<a href="" style="display:none">Descargar</a>
```
**Fix:** Hide links with CSS (`display:none` / `display:block`), not `disabled`.

---

### Quick reference — Who does what

| Object | Methods / Properties |
|--------|---------------------|
| `MediaRecorder` | `.start()`, `.stop()`, `.ondataavailable`, `.onstop` |
| `Blob` | Constructor: `new Blob([chunks], {type})` — no methods |
| `URL` | `URL.createObjectURL(blob)` — returns a temporary `blob:` URL |
| `HTMLAnchorElement` | `.href`, `.download`, `.style.display` |
| `HTMLVideoElement` | `.srcObject`, `.play()`, `.pause()`, `.muted` |
| `HTMLButtonElement` | `.disabled`, `.onclick` |

### Step 4 — Add `mediaRecorder.onstop` handler
Inside `.then()`, after `ondataavailable`, add:

```js
mediaRecorder.onstop = () => {
    const blobFinal = new Blob(chunkBlobs, { type: 'video/webm' });
    const url = URL.createObjectURL(blobFinal);
    miEnlace.href = url;
    miEnlace.download = 'grabacion.webm';
    miEnlace.style.display = 'block';
    chunkBlobs = [];
};
```

### Step 5 — Wire GRABAR button click
```js
mibtnGrabar.onclick = () => {
    chunkBlobs = [];
    mediaRecorder.start();
    mibtnGrabar.disabled = true;
    mibtnParar.disabled = false;
};
```

### Step 6 — Wire PARAR button click
```js
mibtnParar.onclick = () => {
    mediaRecorder.stop();
    mibtnGrabar.disabled = false;
    mibtnParar.disabled = true;
};
```

### Step 7 — (optional) Remove `disabled` from `<a>` in HTML
In `index.html` line 32: `disabled` does nothing on an anchor tag. Remove it:

```html
<a href="" id="miEnlace" style="display: none">Descargar Video</a>
```

---

### Final combined `script.js` for reference

```js
/** @type {HTMLVideoElement} */
const miPreview = document.getElementById('miPreview');

/** @type {HTMLButtonElement}*/
const mibtnGrabar = document.getElementById('btnGrabar');

/** @type {HTMLButtonElement}*/
const mibtnParar = document.getElementById('btnParar');

/** @type {HTMLAnchorElement}*/
const miEnlace = document.getElementById('miEnlace');

let mediaRecorder;
let totalBlob;
let chunkBlobs = [];

navigator.mediaDevices
.getUserMedia({ audio: true, video: true })
.then((stream) => {
    miPreview.srcObject = stream;
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            chunkBlobs.push(event.data);
        }
    };

    mediaRecorder.onstop = () => {
        totalBlob = new Blob(chunkBlobs, { type: 'video/webm' });
        const url = URL.createObjectURL(totalBlob);
        miEnlace.href = url;
        miEnlace.download = 'grabacion.webm';
        miEnlace.style.display = 'block';
        chunkBlobs = [];
    };

    mibtnGrabar.onclick = () => {
        chunkBlobs = [];
        mediaRecorder.start();
        mibtnGrabar.disabled = true;
        mibtnParar.disabled = false;
    };

    mibtnParar.onclick = () => {
        mediaRecorder.stop();
        mibtnGrabar.disabled = false;
        mibtnParar.disabled = true;
    };
})
.catch((err) => {
    console.error('Error accessing media devices:', err);
});
```
