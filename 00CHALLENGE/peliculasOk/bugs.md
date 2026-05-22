# 🐞 Registro de errores — Películas

## Errores transferibles del ejercicio Inventario

Estos errores también aplican al ejercicio de Películas:

### ERROR A — Validación: `input.value != null`

```js
inputTitulo.value != null   // <-- MAL
```

`.value` siempre devuelve string. Vacío es `""`, no `null`.

✅ `inputTitulo.value.trim() !== ""`

---

### ERROR B — `push()` sin convertir tipos

```js
pelicula.anio = inputAnio.value;   // <— MAL (string)
```

`inputAnio.value` devuelve `"2010"` (string), no `2010` (number).

✅ `Number(inputAnio.value)`

---

### ERROR C — `console.table("catalogo")`

```js
console.table(`catalogo`);   // <— MAL
```

Las comillas hacen que muestre el string literal `"catalogo"`, no el array.

✅ `console.table(catalogo);`

---

### ERROR D — `map()` sin `join()` o viceversa

```js
divLista.innerHTML = catalogo.map(p => `${p.titulo}`);
// sin join() → muestra "Pelicula1,Pelicula2,Pelicula3" (con comas)

divLista.innerHTML = catalogo.join("<br>");
// sin map() → muestra "[object Object]" porque join no transforma objetos
```

✅ Siempre: `.map(...).join("<br>")`

---

### ERROR E — Arrow function: `{}` necesita `return`

```js
// MAL — cuerpo vacío, no retorna nada
catalogo.map((p) => {
  `${p.titulo}`
})

// BIEN — sin {}, retorno implícito
catalogo.map((p) => `${p.titulo}`)

// BIEN — con {} y return explícito
catalogo.map((p) => { return `${p.titulo}`; })
```

**Regla:**
```
(param) => expr   → retorna expr
(param) => { ... } → necesita return
```

---

### ERROR F — `includes()` no busca por valor de propiedad

```js
catalogo.includes("Inception")   // <-- MAL (siempre false)
```

`includes()` compara por referencia (`===`). Un string nunca es igual a un objeto.

✅ Usar `find()` o `some()`:
```js
catalogo.find(p => p.titulo === "Inception")
```
