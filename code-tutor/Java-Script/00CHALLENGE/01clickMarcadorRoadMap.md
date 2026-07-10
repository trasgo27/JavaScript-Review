You’re very close, but right now your code doesn’t actually **store anything in `localStorage`**, and your buttons don’t change the counter yet.

Let me guide you step by step (so you learn it properly 👇)

---

## 🔎 1. What’s missing?

You have:

* A variable → `contador`
* Buttons → ✅
* Event listeners → ✅
* A function to display → `mostrar()` → ✅

But you **don’t have**:

* Logic to **increase / decrease**
* Logic to **save in localStorage**
* Logic to **load saved value when page starts**

---

## 🧠 2. Key idea (important)

`localStorage` works like this:

```js
localStorage.setItem("key", value);   // save
localStorage.getItem("key");          // read
localStorage.removeItem("key");       // delete
```

---

## 🛠️ 3. Fix your code step by step

### ✅ A. Load saved value when page opens

Add this at the top of your script:

```js
if (localStorage.getItem("contador")) {
    contador = parseInt(localStorage.getItem("contador"));
}
mostrar();
```

---

### ✅ B. Create missing functions

Add these below your `mostrar()` function:

```js
function sumar() {
    contador++;
    localStorage.setItem("contador", contador);
    mostrar();
}

function restar() {
    contador--;
    localStorage.setItem("contador", contador);
    mostrar();
}

function borrar() {
    contador = 0;
    localStorage.removeItem("contador");
    mostrar();
}
```

---

### ✅ C. Small improvement (important)

Right now you are using:

```js
miMarcador.innerText = contadorLetras;
```

That **removes your original text**.

Better approach:

```js
miMarcador.innerHTML = `<p>Counter: ${contador}</p>`;
```

---

## 💡 4. Result

Now your app will:

* Increase / decrease counter ✅
* Save value in `localStorage` ✅
* Keep value after refresh or closing browser ✅
* Reset when clicking "Delete" ✅

---

## 🇬🇧 Improve your English (as you requested)

### ❌ Your sentence:

> "the counter doesn't start from cero"

### ✅ Correct:

* "The counter doesn't start from zero."
* "The counter keeps its previous value."

### ✨ Better version:

> "If you close the browser or tab and open it again, the counter keeps its previous value instead of starting from zero."

---

## 🇪🇸 Spanish version

* "El contador no empieza desde cero"
* "El contador mantiene su valor anterior"

---

## 🧩 Simple English (easy version)

> When you close the browser and open it again, the number is still there. It does not go back to zero.

---

If you want next step 🚀
I can help you:

* Add **+10 / -10 buttons**
* Add **limit (no negative numbers)**
* Or convert this into a **small real app (with UI improvements)**
