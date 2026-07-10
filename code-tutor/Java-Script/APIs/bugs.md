# 🐞 Registro de errores — Inventario

## Código original con errores

```js
btnAgregar.addEventListener('click', () => {
  if (inputProd.value != null &&
      inputCat.value != null  &&
      inputPrecio > 0         &&
      inputStock  > 0
  ) {
    agregar();
  } else {
    alert('Valores NO validos ...');
  }
});

function agregar() {
  let linea = { producto: "", categoria: "", precio: 0, stock: 0 };
  if (inventario.includes(inputProd.value)) {
    // sumar stock //recalcular precio
  } else {
    linea.producto  = inputProd.value;
    linea.categoria = inputCat.value;
    linea.precio    = inputPrecio.value;
    linea.stock     = inputStock.value;
    inventario.push(linea);
  }
  console.table(`inventario`);
  divLista.innerHTML = "Hola";
}
```

---

## ERROR 1 — Validación: `inputPrecio > 0` y `inputStock > 0`

```js
if (inputProd.value != null &&
    inputCat.value != null  &&
    inputPrecio > 0         &&   // <-- MAL
    inputStock  > 0             // <-- MAL
)
```

**Problema:** `inputPrecio` es un objeto `HTMLInputElement`, no un número.
`objeto > 0` no da error, da `false` silenciosamente porque convierte el objeto a `NaN`.

**Además:** `stock > 0` rechaza productos con stock = 0, pero los datos iniciales
tienen productos con stock 0 (Lámpara, Mochila). Son válidos.

✅ **Corrección:**
```js
Number(inputPrecio.value) > 0 && Number(inputStock.value) >= 0
```

**Regla:** Leer `.value` de inputs numéricos y convertirlos con `Number()`.

---

## ERROR 2 — Validación: `inputProd.value != null`

```js
inputProd.value != null   // <-- MAL
```

**Problema:** `.value` de un input siempre devuelve un string.
Si está vacío devuelve `""`, **nunca** `null`.

✅ **Corrección:**
```js
inputProd.value.trim() !== ""
```

**Regla:** Para verificar si un input está vacío: `valor.trim() === ""`.

---

## ERROR 3 — Duplicados: `inventario.includes(inputProd.value)`

```js
if (inventario.includes(inputProd.value)) {   // <-- MAL
```

**Problema:** `includes()` en arrays compara por identidad de referencia (`===`).
Un string `"Auriculares"` jamás será igual a un objeto `{ producto: "Auriculares", ... }`.
Esta condición es **siempre `false`**, el bloque `if` nunca se ejecuta.

✅ **Corrección:**
```js
if (inventario.find(p => p.producto.toLowerCase() === inputProd.value.trim().toLowerCase())) {
```

**Regla:** Para buscar objetos por valor de propiedad: `find()`, `some()`, o `findIndex()`.
`includes()` solo sirve para valores primitivos (strings, números).

---

## ERROR 4 — Tipo de dato: `linea.precio = inputPrecio.value`

```js
linea.precio = inputPrecio.value;   // <-- MAL (string)
linea.stock  = inputStock.value;    // <-- MAL (string)
```

**Problema:** `inputPrecio.value` devuelve `"50"` (string), no `50` (number).
Aunque sea `<input type="number">`, el DOM siempre devuelve string.
El array termina mezclando tipos: `{ ..., precio: 50 }` con `{ ..., precio: "50" }`.

✅ **Corrección:**
```js
linea.precio = Number(inputPrecio.value);
linea.stock  = Number(inputStock.value);
```

**Regla:** Todo `.value` de input es string. Convertir con `Number()`.

---

## ERROR 5 — `console.table("inventario")`

```js
console.table(`inventario`);   // <-- MAL (comillas)
```

**Problema:** Las comillas (simples, dobles o backticks) convierten el argumento
en un string literal. Muestra `"inventario"` en la consola, no el contenido del array.

✅ **Corrección:**
```js
console.table(inventario);   // <-- sin comillas
```

**Regla:** Las variables van sin comillas. Las comillas crean strings literales.

---

## ERROR 6 — Render: `divLista.innerHTML = "Hola"`

```js
divLista.innerHTML = "Hola";   // <-- MAL (placeholder)
```

**Problema:** No transforma el array a HTML. Ignora el requisito de usar `map()` + `join()`.

✅ **Corrección:**
```js
divLista.innerHTML = inventario.map(p =>
  `${p.producto} — $${p.precio} (stock: ${p.stock})`
).join("<br>");
```

**Regla:** `map()` transforma cada objeto a string. `join("<br>")` concatena con saltos de línea HTML.

---

## ERROR 7 — Objeto pre-inicializado sin uso

```js
let linea = { producto: "", categoria: "", precio: 0, stock: 0 };   // <-- innecesario
```

**Problema:** Se crea un objeto con valores vacíos que se sobrescribe
inmediatamente en el `else`. En el `if` de duplicado queda muerto sin usar.

✅ **Corrección:** Crear el objeto directamente al hacer `push`:
```js
inventario.push({
  producto: inputProd.value,
  categoria: inputCat.value,
  precio: Number(inputPrecio.value),
  stock: Number(inputStock.value)
});
```

---

## ERROR 8 — `sort()` con cuerpo vacío

```js
const ordenado = [...inventario].sort((p, s) => {});   // <-- MAL
```

**Problema:** El callback de `sort()` debe retornar un número.
Con `{}` el cuerpo está vacío y retorna `undefined`, que `sort()` interpreta como `0` → **no ordena**.

✅ **Corrección:**
```js
const ordenado = [...inventario].sort((a, b) => a.precio - b.precio);
```

| Si retorna | Resultado |
|------------|-----------|
| negativo (`a < b`) | `a` va antes que `b` |
| cero (`a === b`) | no cambia |
| positivo (`a > b`) | `b` va antes que `a` |

**Regla:** Arrow function con `{}` necesita `return` explícito. Sin `{}` el valor se retorna implícitamente.

---

## Resumen rápido de reglas

| # | Regla |
|---|-------|
| 1 | `.value` siempre es string → usar `Number()` para números |
| 2 | Input vacío es `""`, no `null` → validar con `.trim() === ""` |
| 3 | `includes()` compara por referencia → usar `find()` para objetos |
| 4 | `console.table(variable)` sin comillas |
| 5 | `sort()` necesita un número de retorno (negativo/cero/positivo) |
| 6 | `map()` transforma objetos, `join()` los une en un string |
| 7 | `objeto > 0` no da error, da `false` silencioso — siempre usar `.value` |
