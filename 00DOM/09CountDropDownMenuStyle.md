Tu código funciona en gran parte, pero hay un detalle que no hace lo que probablemente esperas:

```js
texto02 += "<style> font-size:30px;</style>";
```

Eso **no aplica el estilo al texto**. Solo estás insertando una etiqueta `<style>` inválida dentro del contenido, y además sin selector, así que no afecta nada.

---

### ✅ Cómo solucionarlo correctamente

Tienes varias formas de aplicar estilo al resultado:

### ✔️ Opción 1: usar CSS directamente en el elemento `<p>`

```js
destino[0].style.fontSize = "30px";
destino[0].innerHTML = texto02;
```

---

### ✔️ Opción 2: envolver el texto en una etiqueta con estilo

```js
texto02 = "<div style='font-size:30px'>" + texto02 + "</div>";
destino[0].innerHTML = texto02;
```

---

### ✔️ Opción 3 (mejor práctica): usar una clase CSS

En tu `<style>`:

```html
<style>
    .grande {
        font-size: 30px;
    }
</style>
```

Y en JavaScript:

```js
destino[0].classList.add("grande");
destino[0].innerHTML = texto02;
```

---

### 🧠 Extra (mejora de tu código)

Ya que usas `id="target"`, es más limpio acceder así:

```js
var destino = document.getElementById("target");
destino.innerHTML = texto02;
```

---

Si quieres, puedo ayudarte a simplificar todo el script o hacerlo más moderno (por ejemplo usando `querySelector`).
