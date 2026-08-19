This exercise introduces you to the **Web Notifications API**, which allows your website to communicate with the user even if they aren't looking at the tab.

Because notifications are sensitive, the process involves two distinct steps: **Permission** and **Execution**.

---

### 🛠️ Step 1: The "Handshake" (Permission)

Browsers do not allow websites to send notifications without explicit consent. You must first check if the user has granted permission.

```javascript
function pedirPermiso() {
    Notification.requestPermission().then(permiso => {
        if (permiso === "granted") {
            console.log("Acceso concedido");
        }
    });
}

```

### 🛠️ Step 2: The Logic (Creating the Notification)

Once you have permission, you create a `new Notification` object. This is where you define the title, the body text, and the icon.

```javascript
function mostrarNotificacion() {
    // 1. Check if permission is already granted
    if (Notification.permission === "granted") {
        
        // 2. Configure the notification details
        const opciones = {
            body: "This is the main message of the notification.",
            icon: "img/tu-icono.png" // Path to your local icon file
        };

        // 3. Trigger the notification
        new Notification("New Message!", opciones);

    } else if (Notification.permission !== "denied") {
        // If they haven't decided yet, ask again
        pedirPermiso();
    }
}

```

---

### ✍️ English Fluency Check

When discussing notifications, use these professional terms:

1. **"Opt-in":** This refers to the user actively choosing to receive notifications.
* *Example:* "We need the user to **opt-in** before we can push updates."


2. **"Payload":** In a technical sense, the title and body of the notification are sometimes called the **notification payload**.
3. **"Dismiss":** When a user clicks the 'X' to close a notification, they are **dismissing** it.

**Refining your Technical Expression:**
Instead of saying "I am making a window on the computer," try:

> *"I am **triggering a system-level notification** using the **Notification constructor** once the user has **granted permission**."*

---

### 💡 A "Real World" Tip: The Icon

For the `icon` property to work correctly, ensure the image is a **square** (like 128x128 pixels). If the image is too large or rectangular, the browser might crop it or not show it at all.

### ⚠️ Common "Gotcha" (The Security Rule)

Notifications usually only work on a **Secure Context** (HTTPS). If you are testing locally with a file (like `C:/Users/.../index.html`), some browsers might block it. It is best to use a "Live Server" in VS Code to test this feature!

Do you have a button ready in your HTML to link to the `mostrarNotificacion` function?



You’re very close, but this version has a **logic loop bug + scope bug + wrong flow design** that will break the notification.

Let’s fix it cleanly.

---

# ❌ Main problems

## 1. ❌ `manejador()` does not exist

You call:

```js
manejador();
```

But you never defined it → **ReferenceError**

---

## 2. ❌ Infinite loop risk (`while(bandera)`)

This is dangerous:

```js
while(bandera)
```

Because:

* `Notification.requestPermission()` is async
* but your loop is synchronous
* so it can freeze the browser

---

## 3. ❌ `opciones` scope problem

You define:

```js
const opciones = { ... }
```

inside the `if`, but you use it outside.

---

## 4. ❌ Notification created inside loop

This is wrong:

```js
new Notification(...)
```

inside a `while` → can spam or freeze tab.

---

# 🧠 Key concept you are missing

👉 Notifications are **event-driven**, NOT loop-driven.

You should do:

1. Ask permission once
2. If granted → show notification once

---

# ✅ CLEAN FIX (correct architecture)

```html
<script>
const miBoton = document.getElementById('miBoton');

miBoton.addEventListener('click', hacerNotificacion);

// Ask permission (only once if needed)
function darLaMano() {
    return Notification.requestPermission();
}

// Main function
async function hacerNotificacion() {

    const permiso = await darLaMano();

    if (permiso !== "granted") {
        console.log("Permiso denegado");
        return;
    }

    const opciones = {
        body: "Este es el BODY de la notificación ...",
        icon: "./img/dancing.png"
    };

    new Notification("Un Nuevo Mensaje", opciones);
}
</script>
```

---

# 🚀 What you fixed conceptually

### Before (wrong thinking)

* loop checking permission
* retrying constantly
* creating notifications inside loop

### After (correct thinking)

* request permission once
* then act based on result
* event-driven flow

---

# 🧠 Simple English explanation

> You do not need a loop.
> Notifications work with permission once, then you create them.

---

# ⚠️ Extra important note

If the icon doesn’t show:

* make sure `./img/dancing.png` exists
* must be served via `localhost` or HTTPS

---

If you want, next step I can help you build:

* 🔔 notification scheduler (like alarms)
* 💬 chat notification system
* 📦 or a full “notification manager” with history + localStorage
