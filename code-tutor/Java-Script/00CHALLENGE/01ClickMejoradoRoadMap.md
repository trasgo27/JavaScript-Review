Nice progress — this is already much closer to a solid mini-app 👍
But there are **2 important bugs** and a couple of design issues you should fix to level up.

---

## ❌ 1. `classList` is used incorrectly

Your code:

```js
miBoton.classList('desaparecer');
```

👉 This does **nothing**.

### ✅ Correct:

```js
miBoton.classList.add('desaparecer');
```

---

## ❌ 2. You’re mixing sources of truth (important concept)

In `mostrar()` you do:

```js
let contadorLetras = localStorage.getItem('contador') || '0';
```

👉 This is not ideal.

### 🧠 Why?

You already have:

```js
contador
```

So:

* `contador` → should be your **real value**
* `localStorage` → only for saving/loading

---

### ✅ Fix:

```js
function mostrar() {
    const miMarcador = document.getElementById('divResultados');
    miMarcador.innerHTML = `<p>Contador: ${contador}</p>`;
}
```

---

## ⚠️ 3. Your negative logic is a bit messy

Current:

```js
if (contador > 0) {
    contador--;
} else if(contador === 0){
    quitarBoton();
} else {
    alert(...)
}
```

👉 The `else` will **never happen**
(because contador is never negative anymore)

---

### ✅ Cleaner version:

```js
function restar() {
    if (contador === 0) {
        quitarBoton();
        return;
    }

    contador--;
    localStorage.setItem('contador', contador);
    mostrar();
}
```

---

## ❌ 4. Your "disable button" idea is incomplete

Right now you only change a class, but:

* You don’t **disable** the button
* Your CSS doesn’t actually hide or disable it

---

### ✅ Better approach (real UX improvement)

#### JS:

```js
function quitarBoton() {
    const miBoton = document.getElementById('btnSubst');
    miBoton.disabled = true;
}
```

#### And re-enable when needed:

```js
function sumar() {
    contador++;
    localStorage.setItem('contador', contador);

    document.getElementById('btnSubst').disabled = false;

    mostrar();
}
```

---

## 🎨 Optional CSS improvement

```css
button:disabled {
    background-color: lightcoral;
    cursor: not-allowed;
}
```

---

## 🧠 Final clean version (key improvements)

* Single source of truth ✅
* No negative numbers ✅
* Button disables correctly ✅

---

## 🇬🇧 English corrections (important for you)

### ❌ Your text:

> "the tap"

### ✅ Correct:

* "the tab"

---

### ❌ Your text:

> "the counter doesn't start from cero"

### ✅ Correct:

* "The counter doesn't start from zero."

---

### ✨ Better version:

> "If you close the browser or the tab and open it again, the counter keeps its previous value."

---

## 🇪🇸 Spanish

* tab → pestaña
* zero → cero
* keeps its previous value → mantiene su valor anterior

---

## 🧩 Simple English

> When you open the page again, the number is still there. It does not go to zero.

---

## 🚀 Next step (this is where it gets interesting)

If you want to level up like a real frontend dev, next improvements:

1. Add **+10 / -10 buttons**
2. Add **max limit (e.g. 100)**
3. Add **animation when number changes**
4. Store **history of clicks**

I can guide you step by step (like a real bootcamp).
