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

---

## ERROR 9 — `sort((p,s)=>{})` confundido con `map((p,i)=>...)` — retorno implícito vs explícito

```js
const ordenado = [...inventario].sort((p, s) => {});   // <-- MAL
// ...
ordenado.map((p, i) => `${i + 1}. ${p.producto}...`)    // <-- BIEN (sin {})
```

**¿Por qué `map` funciona sin `return` y `sort` no?**

| Código | `{}` | Retorno | ¿Funciona? |
|--------|------|---------|------------|
| `sort((a,b) => a.precio - b.precio)` | No | implícito (`a-b`) | ✅ |
| `sort((a,b) => { return a.precio - b.precio; })` | Sí | explícito (`return`) | ✅ |
| `sort((a,b) => {})` | Sí | `undefined` | ❌ no ordena |
| `map((p,i) => \`...\`)` | No | implícito (template string) | ✅ |
| `map((p,i) => { return \`...\`; })` | Sí | explícito (`return`) | ✅ |
| `map((p,i) => {})` | Sí | `undefined` | ❌ devuelve `[undefined, ...]` |

**Regla definitiva:**

```
(param) => expresion     → retorna expresion automáticamente
(param) => { ... }       → necesitás return dentro de { }
```

**Confusión típica:** el estudiante ve que `map((p,i) => \`...\`)` funciona sin `return`, y asume que `sort((p,s) => {})` también debería funcionar. Pero no: `{}` significa "cuerpo de función" y requiere `return` explícito. El `map` funciona porque no usa `{}`, no por arte de magia.

**Parámetros con mismo nombre:** `sort((p,s)=>{})` usa `p`, y `map((p,i)=>...)` también usa `p`. Aunque están en ámbitos distintos y es válido, **confunde al leer**. Usá nombres diferentes:
- `sort((a, b) => ...)` — `a` y `b` son los estándar para sort
- `map((p, i) => ...)` — `p` de producto, `i` de índice

---

## ERROR 10 — `renderLista()`: `sort()` sin callback y template string mal formado

```js
function renderLista() {
  let ordenadoMap = [];
  const ordenado = [...inventario].sort();                // <-- MAL
  ordenadoMap = ordenado.map((p, i) => {
    let texto = "";
    texto = `${i+1} - p.producto ${p.precio} ${p.categoria} ${p.stock}`;  // <-- MAL
    return texto;
  });
  divLista.innerHTML = ordenadoMap.join(`<br>`);
}
```

### Bug A — `sort()` sin callback

```js
const ordenado = [...inventario].sort();   // <-- MAL
```

**Problema:** `sort()` sin argumentos ordena por **string Unicode**, no por número.
- `10` va antes que `2` porque `"10" < "2"` en Unicode.
- Ordena los objetos por su representación `[object Object]`, todas iguales → no cambia nada.

✅ **Corrección:**
```js
const ordenado = [...inventario].sort((a, b) => a.precio - b.precio);
```

**Regla:** `sort()` necesita un callback que retorne `negativo`, `0` o `positivo`.

---

### Bug B — `p.producto` fuera del placeholder `${}`

```js
texto = `${i+1} - p.producto ${p.precio} ${p.categoria} ${p.stock}`;
//            ↑↑↑↑↑↑↑↑↑↑↑
//      esto es texto LITERAL, no se reemplaza
```

**Problema:** Solo lo que está dentro de `${}` se evalúa como JavaScript.
`p.producto` está fuera de `${}`, así que en pantalla se ve literalmente `p.producto` en vez del nombre del producto.

✅ **Corrección:**
```js
texto = `${i+1} - ${p.producto} $${p.precio} ${p.categoria} (stock: ${p.stock})`;
//               ↑↑↑↑↑↑↑↑↑↑↑              ↑
//           envuelto en ${}     $ para símbolo moneda
```

---

### Bug C — Variable `ordenadoMap` declarada dos veces

```js
let ordenadoMap = [];                    // 1ra vez (innecesaria)
ordenadoMap = ordenado.map((p, i) => {   // 2da vez (reasigna)
```

**Problema:** Se crea un array vacío que nunca se usa, porque se reasigna inmediatamente en la siguiente línea.

✅ **Corrección:**
```js
const ordenadoMap = ordenado.map((p, i) => { ...
// o directamente:
const ordenadoMap = [...inventario].sort(...).map(...)
```

---

### Bug D — `let texto = ""` con reasignación inmediata

```js
let texto = "";
texto = `${i+1} - ...`;   // reasigna en la siguiente línea
```

**Problema:** la inicialización con `""` se descarta al instante.

✅ **Corrección:**
```js
const texto = `${i+1} - ...`;
```

---

### Bug E — Falta el `<strong>` y `<br>` inicial en `innerHTML`

```js
divLista.innerHTML = ordenadoMap.join(`<br>`);
// falta: "<strong>Todos los productos:</strong><br>" +
```

El diseño original tenía un encabezado dentro del div.

---

### Código corregido

```js
function renderLista() {
  const ordenado = [...inventario].sort((a, b) => a.precio - b.precio);
  const ordenadoMap = ordenado.map((p, i) =>
    `${i+1} - ${p.producto} $${p.precio} ${p.categoria} (stock: ${p.stock})`
  );
  divLista.innerHTML = "<strong>Todos los productos:</strong><br>" +
    ordenadoMap.join("<br>");
}
```

---

## ERROR 11 — `renderLista()`: `sort((a,b){a-b})` sin `=>`, acute accent en template, `ordenadoMap` suelto

```js
function renderLista() {
  //let ordenadoMap = [];  
  const ordenado = [...inventario].sort((a,b){a-b});               // <-- MAL × 2
  ordenadoMap = ordenado.map((p,i)=>{                               // <-- MAL
     let texto = "";
     texto = ´Lista Productos<br>${i+1} - ${p.producto}...´;        // <-- MAL × 2
     return texto;
  });
  divLista.innerHTML = ordenadoMap.join(`<br>`);
}
```

### Bug A — `sort((a,b){a-b})` falta la flecha `=>`

```js
const ordenado = [...inventario].sort((a,b){a-b});   // <-- MAL
```

**Problema:** La sintaxis de arrow function requiere `=>` entre parámetros y cuerpo.
`(a,b){a-b}` es un **SyntaxError** — el motor de JS se detiene acá.

| Intento | ¿Qué falta? |
|---------|-------------|
| `(a,b){a-b}` | ❌ `=>` |
| `(a,b) => {a-b}` | ❌ `return` |
| `(a,b) => { return a-b; }` | ❌ `.precio` |
| `(a,b) => a.precio - b.precio` | ✅ correcto |

✅ **Corrección:**
```js
const ordenado = [...inventario].sort((a, b) => a.precio - b.precio);
```

**Regla:** Arrow function siempre lleva `=>`:
```
(param) => expresion       → retorno implícito
(param) => { return x; }   → retorno explícito
```

---

### Bug B — `a-b` resta objetos enteros, no `.precio`

Aunque agregues `=>`, `a - b` resta objetos → `NaN - NaN = NaN` → no ordena.

✅ **Corrección:** `a.precio - b.precio`

---

### Bug C — `ordenadoMap` sin declaración (`let`/`const`/`var`)

```js
ordenadoMap = ordenado.map(...)   // <-- MAL (variable global)
```

**Problema:** La línea `//let ordenadoMap = [];` está comentada.
`ordenadoMap = ...` crea una variable global (o tira error en strict mode).

✅ **Corrección:**
```js
const ordenadoMap = ordenado.map(...);
```

---

### Bug D — Acute accent `´` en vez de backtick `` ` ``

```js
texto = ´Lista Productos<br>${i+1}...´;   // <-- MAL
```

**Problema:** JavaScript solo reconoce template literals con **backticks** `` ` ``.
El acute accent `´` no es un operador ni delimitador válido → **SyntaxError**.

| Símbolo | Nombre | ¿Template literal? |
|---------|--------|-------------------|
| `` ` `` | Backtick / Grave accent | ✅ Sí |
| `´` | Acute accent | ❌ No |
| `'` | Single quote | ❌ No |
| `"` | Double quote | ❌ No |

✅ **Corrección:** Usar backtick:
```js
texto = `Lista Productos<br>${i+1} - ${p.producto}...`;
```

---

### Bug E — `"Lista Productos<br>"` se repite en cada elemento

```js
texto = `Lista Productos<br>${i+1} - ${p.producto} ...`;
//       ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
//      esto se repite para CADA producto
```

**Problema:** El string `"Lista Productos<br>"` está dentro del `map()`, así que aparece al inicio de **cada** producto en vez de una sola vez como encabezado.

✅ **Corrección:** Poner el encabezado fuera del `map()`:
```js
divLista.innerHTML = "<strong>Lista Productos</strong><br>" +
  ordenado.map((p, i) => `${i+1} - ${p.producto}...`).join("<br>");
```

---

### Código corregido

```js
function renderLista() {
  const ordenado = [...inventario].sort((a, b) => a.precio - b.precio);
  const ordenadoMap = ordenado.map((p, i) =>
    `${i+1} - ${p.producto} $${p.precio} ${p.categoria} (stock: ${p.stock})`
  );
  divLista.innerHTML = "<strong>Lista Productos</strong><br>" +
    ordenadoMap.join("<br>");
}
```

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

---

## ERROR 12 — Código del usuario: `sort((a,b){a-b})`, acute accent, variable sin declarar

```js
function renderLista() {
//let ordenadoMap = [];  
const ordenado = [...inventario].sort((a,b){a-b});
ordenadoMap = ordenado.map((p,i)=>{
   let texto = "";
texto = ´Lista Productos<br>${i+1} - ${p.producto} ${p.precio} ${p.categoria} ${p.stock}´;
return texto;
});
divLista.innerHTML = ordenadoMap.join(`<br>`);
}
```

### Bug A — `sort((a,b){a-b})` falta `=>`

```js
const ordenado = [...inventario].sort((a,b){a-b});   // SyntaxError
```

**Problema:** Las arrow functions requieren `=>` entre parámetros y cuerpo.
`(a,b){a-b}` no es válido. El motor de JS lanza **SyntaxError** y el script muere.

| Intento | ¿Qué falta? |
|---------|-------------|
| `(a,b){a-b}` | ❌ `=>` |
| `(a,b) => a.precio - b.precio` | ✅ correcto |

✅ **Corrección:**
```js
const ordenado = [...inventario].sort((a, b) => a.precio - b.precio);
```

---

### Bug B — `a-b` resta objetos enteros, no la propiedad `.precio`

Incluso después de agregar `=>`, `a - b` resta objetos → `NaN - NaN = NaN`.
`sort()` con callback que retorna `NaN` se comporta como si retornara `0` → **no ordena**.

✅ **Corrección:** `a.precio - b.precio`

**Regla:** Para ordenar objetos por un campo numérico, restar las propiedades:
```
a.precio - b.precio   → ascendente
b.precio - a.precio   → descendente
```

---

### Bug C — Acute accent `´` en vez de backtick `` ` ``

```js
texto = ´Lista Productos<br>${i+1} - ...´;   // SyntaxError
```

**Problema:** JavaScript solo reconoce template literals con **backticks** `` ` ``.
El acute accent `´` (U+00B4) no es un delimitador de string válido → **SyntaxError**.

| Carácter | Código | ¿Template literal? |
|----------|--------|-------------------|
| `` ` `` | U+0060 — Grave accent / Backtick | ✅ Sí |
| `´` | U+00B4 — Acute accent | ❌ No |
| `'` | U+0027 — Single quote | ❌ No |
| `"` | U+0022 — Double quote | ❌ No |

✅ **Corrección:** Reemplazar `´` por `` ` ``:
```js
texto = `Lista Productos<br>${i+1} - ${p.producto} ${p.precio} ${p.categoria} ${p.stock}`;
```

**Regla:** Los template literals usan **exclusivamente** backtick `` ` `` (grave accent, U+0060).

---

### Bug D — `ordenadoMap` sin declaración (`let`/`const`/`var`)

```js
//let ordenadoMap = [];           // ← comentado
ordenadoMap = ordenado.map(...);  // ← variable global
```

**Problema:** La declaración con `let` está comentada.
`ordenadoMap = ...` crea una **variable global** implícita (o arroja `ReferenceError` en strict mode).

✅ **Corrección:**
```js
const ordenadoMap = ordenado.map((p, i) => ...);
```
O directamente encadenado:
```js
const html = [...inventario].sort(...).map(...).join("<br>");
```

---

### Bug E — `"Lista Productos<br>"` se repite en cada elemento

```js
texto = `Lista Productos<br>${i+1} - ${p.producto} ...`;
//       ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
//      aparece en CADA producto
```

**Problema:** El encabezado está dentro del `map()`, así que se renderiza
al inicio de cada fila en vez de una sola vez como título.

✅ **Corrección:** Encabezado fuera del `map()`:
```js
divLista.innerHTML = "<strong>Lista Productos</strong><br>" +
  ordenado.map((p, i) => `${i+1} - ${p.producto}...`).join("<br>");
```

---

### Bug F — `divLista` no definido en el snippet

```js
divLista.innerHTML = ordenadoMap.join(`<br>`);
```

**Problema:** El snippet no muestra la declaración de `divLista`.
Si no existe en el ámbito padre, arroja `ReferenceError`.

✅ **Corrección:** Asegurar que exista:
```js
const divLista = document.getElementById("divLista");
```

---

### Código corregido

```js
function renderLista() {
  const ordenado = [...inventario].sort((a, b) => a.precio - b.precio);
  const html = ordenado.map((p, i) =>
    `${i+1} - ${p.producto} $${p.precio} ${p.categoria} (stock: ${p.stock})`
  ).join("<br>");
  divLista.innerHTML = "<strong>Lista Productos</strong><br>" + html;
}
```
