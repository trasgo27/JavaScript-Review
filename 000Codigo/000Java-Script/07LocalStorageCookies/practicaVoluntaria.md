Your practice combines several important JavaScript concepts together:

* Promises
* async/await
* setTimeout
* setInterval
* Notification API
* Video API
* DOM manipulation
* Events

I'll explain it section by section.

---

# 1. COUNTDOWN PAGE

This is the first HTML page.

---

# HTML PART

```html
<div id="contador">5</div>
```

This div shows the countdown on the screen.

Initially it displays:

```text
5
```

---

# 2. THE `timeout(ms)` FUNCTION

```javascript
function timeout(ms) {
    return new Promise((resolve) => {

        setTimeout(() => {
            resolve();
        }, ms);

    });
}
```

---

## What does it do?

Creates a Promise that waits some milliseconds.

---

## Step by step

### `new Promise(...)`

Creates a Promise object.

A Promise represents:

> "Something that will finish later."

---

### `resolve`

`resolve()` means:

> "The Promise finished successfully."

---

### `setTimeout`

```javascript
setTimeout(() => {
    resolve();
}, ms);
```

Waits `ms` milliseconds and then finishes the Promise.

---

# VISUAL IDEA

If:

```javascript
timeout(5000)
```

then:

```text
wait 5 seconds
↓
Promise resolved
```

---

# 3. COUNTDOWN

```javascript
let segundos = 5;
```

Variable storing remaining seconds.

---

## Selecting the div

```javascript
const miContador =
document.getElementById('contador');
```

Gets the HTML element.

---

# 4. `setInterval`

```javascript
const intervalo = setInterval(() => {

    segundos--;

    miContador.innerText = segundos;

    if (segundos <= 0) {
        clearInterval(intervalo);
    }

}, 1000);
```

---

## What does `setInterval` do?

Runs code repeatedly every X milliseconds.

---

# Here:

```javascript
1000
```

means:

```text
every 1 second
```

---

# Flow

## First second

```text
5 → 4
```

---

## Second second

```text
4 → 3
```

---

## etc...

Until:

```text
0
```

---

# `clearInterval(intervalo)`

Stops the repetition.

Without this:

```text
0
-1
-2
-3
```

would continue forever.

---

# 5. `async function`

```javascript
async function iniciarNotificacion()
```

`async` allows using:

```javascript
await
```

inside the function.

---

# 6. `await timeout(5000)`

```javascript
await timeout(5000);
```

This pauses the function for 5 seconds.

---

# Flow

```text
Start function
↓
Wait 5 seconds
↓
Continue execution
```

---

# 7. NOTIFICATION PERMISSION

```javascript
if (Notification.permission !== "granted")
```

Checks if notification permission already exists.

---

# Possible values

```javascript
"granted"
"denied"
"default"
```

---

# Asking permission

```javascript
const permiso =
await Notification.requestPermission();
```

Browser shows popup:

```text
Allow notifications?
```

---

# If denied

```javascript
if (permiso !== "granted") {
    return;
}
```

Stops the function.

---

# 8. CREATING THE NOTIFICATION

```javascript
const noti = new Notification(
    "Nuevo Video Disponible",
    {
        body: "Haz click para ver el nuevo video",
        icon: "..."
    }
);
```

Creates the desktop notification.

---

# Result

The user sees:

```text
Nuevo Video Disponible
Haz click para ver el nuevo video
```

with an icon.

---

# 9. CLICKING THE NOTIFICATION

```javascript
noti.onclick = () => {

    window.open("video.html", "_blank");

};
```

---

# What happens?

When user clicks notification:

```text
video.html opens
```

---

# `_blank`

Means:

```text
open in new tab
```

---

# SECOND PAGE: VIDEO

Now let's explain `video.html`.

---

# 10. VIDEO TAG

```html
<video id="miVideo">
```

Creates a video player.

---

# SOURCE

```html
<source src="./monoleg.mp4"
type="video/mp4">
```

Loads the video file.

---

# 11. SELECTING ELEMENTS

```javascript
const miVideo =
document.getElementById('miVideo');
```

Gets the video element.

---

# 12. LEFT CLICK → PLAY/PAUSE

```javascript
miVideo.addEventListener('click', () => {

    if (miVideo.paused) {

        miVideo.play();

    } else {

        miVideo.pause();

    }

});
```

---

# Important property

```javascript
miVideo.paused
```

Returns:

```javascript
true
```

or

```javascript
false
```

---

# Flow

If paused:

```javascript
play()
```

Otherwise:

```javascript
pause()
```

---

# 13. RIGHT CLICK EVENT

```javascript
miVideo.addEventListener(
    'contextmenu',
```

`contextmenu` means:

```text
right mouse click
```

---

# 14. `preventDefault()`

```javascript
e.preventDefault();
```

Prevents browser menu:

```text
Copy
Inspect
Save video as...
```

from appearing.

---

# 15. VIDEO DURATION

```javascript
const duracion = miVideo.duration;
```

Gets total video duration in seconds.

Example:

```text
125.8 seconds
```

---

# 16. CONVERTING TO MINUTES

```javascript
const minutos =
Math.floor(duracion / 60);
```

Example:

```text
125 / 60 = 2.08
```

↓

```text
2 minutes
```

---

# 17. REMAINING SECONDS

```javascript
const segundos =
Math.floor(duracion % 60);
```

`%` means remainder.

Example:

```text
125 % 60 = 5
```

So:

```text
2 min 5 sec
```

---

# 18. SHOWING TEXT

```javascript
miTexto.innerText =
`Duración Total:
${minutos} min ${segundos} seg`;
```

Updates HTML text dynamically.

---

# COMPLETE FLOW

```text
Page loads
↓
Countdown starts
↓
5 seconds pass
↓
Notification appears
↓
User clicks notification
↓
video.html opens
↓
Left click:
Play/Pause
↓
Right click:
Show duration
```

---

# IMPORTANT CONCEPTS YOU PRACTICED

## Timers

```javascript
setTimeout()
setInterval()
```

---

## Promises

```javascript
new Promise()
resolve()
```

---

## Async/Await

```javascript
async
await
```

---

## DOM

```javascript
getElementById()
innerText
```

---

## Browser APIs

```javascript
Notification API
Video API
```

---

# Small English Corrections

You wrote:

```text
Please explain that previous code
```

More natural English:

```text
Please explain the previous code.
```

or

```text
Please explain that code.
```
