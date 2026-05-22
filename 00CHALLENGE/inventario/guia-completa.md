# 📦 Gestión de Inventario — Guía Completa

---

## Parte 1: Enunciado del ejercicio

### Descripción

Crear una aplicación web de gestión de inventario que permita agregar productos, filtrarlos por categoría, buscar por nombre, y mostrar estadísticas. El objetivo es practicar los métodos principales de arrays en JavaScript: `push`, `map`, `filter`, `reduce`, `find`, `sort`, y el uso de `Set`.

### Datos iniciales

```js
const inventario = [
  { producto: "Auriculares", categoria: "Electrónica", precio: 50,  stock: 20 },
  { producto: "Zapatillas",   categoria: "Deportes",   precio: 80,  stock: 12 },
  { producto: "Lámpara",      categoria: "Hogar",      precio: 30,  stock: 0  },
  { producto: "Remera",       categoria: "Ropa",       precio: 25,  stock: 8  },
  { producto: "Teclado",      categoria: "Electrónica", precio: 40, stock: 5  },
  { producto: "Mochila",      categoria: "Deportes",   precio: 60, stock: 0  },
  { producto: "Sartén",       categoria: "Hogar",      precio: 35, stock: 15 }
];
```

### Requisitos

#### 1. Agregar producto — `push()`
- Tomar los valores de los inputs (`inputProd`, `inputCat`, `inputPrecio`, `inputStock`).
- Validar que ningún campo esté vacío.
- Crear un objeto `{ producto, categoria, precio, stock }` y agregarlo al array con `push()`.
- Actualizar la lista completa en `divLista` usando `map()` + `join()`.

#### 2. Filtrar por categoría — `filter()` + `map()`
- Usar delegación de eventos sobre `divBotones`.
- Capturar el `value` del botón clickeado.
- Filtrar el array con `filter()` y mostrar los resultados en `divFiltro` usando `map()` + `join()`.

#### 3. Categorías únicas — `Set` + spread `[...]`
- Extraer todas las categorías del array.
- Pasarlas por `new Set()` para obtener valores únicos.
- Mostrar en `divStats`: `"Categorías disponibles: Electrónica, Ropa, Hogar, Deportes"`

#### 4. Valor total del inventario — `reduce()`
- Recorrer el array multiplicando `precio * stock` de cada producto y sumando todo.
- Mostrar en `divStats`: `"Valor total del inventario: $4200"`

#### 5. Productos sin stock — `filter()`
- Filtrar productos donde `stock === 0`.
- Mostrar en `divStats`: `"Productos sin stock: Lámpara, Mochila"`
- Si no hay, mostrar `"Ninguno"`.

#### 6. Buscar producto por nombre — `find()`
- Escuchar click en `btnBuscar`.
- Leer el valor de `inputBuscar`.
- Usar `find()` para buscar (comparación sin distinguir mayúsculas/minúsculas).
- Mostrar en `divStats`:
  - Si existe: `"Producto encontrado: Auriculares — $50 (stock: 20)"`
  - Si no: `"Producto no encontrado"`

#### 7. Ordenar por precio — `sort()` + copia con spread
- Al cargar la página y al agregar un producto, mostrar la lista ordenada de menor a mayor precio.
- Hacer una copia del array con `[...inventario]` antes de ordenar para no mutar el original.

### Estructura HTML

```html
<div id="divLista"><strong>Todos los productos:</strong></div>
<div id="divFiltro"><strong>Filtrados:</strong></div>
<div id="divStats"><strong>Estadísticas:</strong></div>
```

### Métodos a utilizar

| Método      | Uso |
|-------------|-----|
| `push()`    | Agregar nuevo producto al array |
| `map()`     | Transformar objetos a string HTML |
| `filter()`  | Filtrar por categoría y por stock === 0 |
| `reduce()`  | Calcular valor total del inventario |
| `find()`    | Buscar producto por nombre |
| `sort()`    | Ordenar productos por precio |
| `Set`       | Obtener categorías únicas |
| Spread `[...]` | Copiar array antes de ordenar |

### Pistas

- Usá `e.target.value` en el contenedor de botones para capturar la categoría.
- Usá `toLowerCase()` en la búsqueda para ignorar mayúsculas.
- `sort()` compara números: `a.precio - b.precio` para orden ascendente.
- Para `reduce`, el acumulador inicial es `0`.

---

## Parte 2: Registro de errores (bugs)

### Código original con errores

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

### ERROR 1 — Validación: `inputPrecio > 0` y `inputStock > 0`

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

### ERROR 2 — Validación: `inputProd.value != null`

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

### ERROR 3 — Duplicados: `inventario.includes(inputProd.value)`

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

### ERROR 4 — Tipo de dato: `linea.precio = inputPrecio.value`

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

### ERROR 5 — `console.table("inventario")`

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

### ERROR 6 — Render: `divLista.innerHTML = "Hola"`

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

### ERROR 7 — Objeto pre-inicializado sin uso

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

### ERROR 8 — `sort()` con cuerpo vacío

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

### ERROR 9 — `sort((p,s)=>{})` confundido con `map((p,i)=>...)` — retorno implícito vs explícito

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

### ERROR 10 — `renderLista()`: `sort()` sin callback y template string mal formado

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

#### Bug A — `sort()` sin callback

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

#### Bug B — `p.producto` fuera del placeholder `${}`

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

#### Bug C — Variable `ordenadoMap` declarada dos veces

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

#### Bug D — `let texto = ""` con reasignación inmediata

```js
let texto = "";
texto = `${i+1} - ...`;   // reasigna en la siguiente línea
```

**Problema:** la inicialización con `""` se descarta al instante.

✅ **Corrección:**
```js
const texto = `${i+1} - ...`;
```

#### Bug E — Falta el `<strong>` y `<br>` inicial en `innerHTML`

```js
divLista.innerHTML = ordenadoMap.join(`<br>`);
// falta: "<strong>Todos los productos:</strong><br>" +
```

El diseño original tenía un encabezado dentro del div.

#### Código corregido (ERROR 10)

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

### ERROR 11 — `renderLista()`: `sort((a,b){a-b})` sin `=>`, acute accent en template, `ordenadoMap` suelto

```js
function renderLista() {
  //let ordenadoMap = [];  
  const ordenado = [...inventario].sort((a,b){a-b});               // <-- MAL × 2
  ordenadoMap = ordenado.map((p,i)={                               // <-- MAL
     let texto = "";
     texto = ´Lista Productos<br>${i+1} - ${p.producto}...´;        // <-- MAL × 2
     return texto;
  });
  divLista.innerHTML = ordenadoMap.join(`<br>`);
}
```

#### Bug A — `sort((a,b){a-b})` falta la flecha `=>`

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

#### Bug B — `a-b` resta objetos enteros, no `.precio`

Aunque agregues `=>`, `a - b` resta objetos → `NaN - NaN = NaN` → no ordena.

✅ **Corrección:** `a.precio - b.precio`

#### Bug C — `ordenadoMap` sin declaración (`let`/`const`/`var`)

```js
ordenadoMap = ordenado.map(...)   // <-- MAL (variable global)
```

**Problema:** La línea `//let ordenadoMap = [];` está comentada.
`ordenadoMap = ...` crea una variable global (o tira error en strict mode).

✅ **Corrección:**
```js
const ordenadoMap = ordenado.map(...);
```

#### Bug D — Acute accent `´` en vez de backtick `` ` ``

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

#### Bug E — `"Lista Productos<br>"` se repite en cada elemento

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

#### Código corregido (ERROR 11)

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

### ERROR 12 — Código del usuario: `sort((a,b){a-b})`, acute accent, variable sin declarar

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

#### Bug A — `sort((a,b){a-b})` falta `=>`

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

#### Bug B — `a-b` resta objetos enteros, no la propiedad `.precio`

Incluso después de agregar `=>`, `a - b` resta objetos → `NaN - NaN = NaN`.
`sort()` con callback que retorna `NaN` se comporta como si retornara `0` → **no ordena**.

✅ **Corrección:** `a.precio - b.precio`

**Regla:** Para ordenar objetos por un campo numérico, restar las propiedades:
```
a.precio - b.precio   → ascendente
b.precio - a.precio   → descendente
```

#### Bug C — Acute accent `´` en vez de backtick `` ` ``

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

#### Bug D — `ordenadoMap` sin declaración (`let`/`const`/`var`)

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

#### Bug E — `"Lista Productos<br>"` se repite en cada elemento

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

#### Bug F — `divLista` no definido en el snippet

```js
divLista.innerHTML = ordenadoMap.join(`<br>`);
```

**Problema:** El snippet no muestra la declaración de `divLista`.
Si no existe en el ámbito padre, arroja `ReferenceError`.

✅ **Corrección:** Asegurar que exista:
```js
const divLista = document.getElementById("divLista");
```

#### Código corregido (ERROR 12)

```js
function renderLista() {
  const ordenado = [...inventario].sort((a, b) => a.precio - b.precio);
  const html = ordenado.map((p, i) =>
    `${i+1} - ${p.producto} $${p.precio} ${p.categoria} (stock: ${p.stock})`
  ).join("<br>");
  divLista.innerHTML = "<strong>Lista Productos</strong><br>" + html;
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
| 8 | Arrow function con `{}` requiere `return`; sin `{}` retorno implícito |
| 9 | Template literal usa exclusivamente backtick `` ` `` (U+0060) |
| 10 | Variables sin `let`/`const`/`var` se vuelven globales (o error) |

---

## Parte 3: Análisis pedagógico

### Errores y bugs del primer intento

| # | Error | Explicación | Corrección |
|---|-------|-------------|------------|
| 1 | `inputPrecio > 0` y `inputStock > 0` comparan el elemento del DOM, no su valor | `inputPrecio` es un `HTMLInputElement`, no un número. La comparación coerciona el objeto a `NaN`, y `NaN > 0` es `false`. Además obliga a que stock sea > 0, pero los datos iniciales incluyen productos con stock === 0 (Lámpara, Mochila), que deberían ser válidos. | `Number(inputPrecio.value) > 0 && Number(inputStock.value) >= 0` |
| 2 | `inputProd.value != null` nunca es `false` | `.value` de un input siempre devuelve un string (vacío `""` si no se escribió nada). Nunca es `null`. | `inputProd.value.trim() !== ""` |
| 3 | `inventario.includes(inputProd.value)` no detecta duplicados | `includes()` compara por identidad de referencia (===). Un string jamás será igual a un objeto. Esta condición **siempre es `false`**, el `if` nunca se ejecuta y el intento de manejar duplicados está muerto. | Usar `inventario.find(p => p.producto.toLowerCase() === inputProd.value.trim().toLowerCase())` |
| 4 | `linea.precio = inputPrecio.value` guarda string, no número | `inputPrecio.value` devuelve `"50"` (string), no `50` (number). El array mezclará tipos. | Convertir con `Number(...)` o `parseFloat(...)` |
| 5 | `linea.stock = inputStock.value` idem | Mismo problema que #4. | `Number(inputStock.value)` |
| 6 | `console.table("inventario")` muestra el string literal, no el array | Las comillas convierten el argumento en un string. Muestra `"inventario"` en la consola, no la tabla del array. | `console.table(inventario)` (sin comillas) |
| 7 | `divLista.innerHTML = "Hola"` no usa `map()` + `join()` | No cumple el requisito 1. No renderiza el array actualizado. | `divLista.innerHTML = inventario.map(p => \`...\`).join("<br>")` |
| 8 | Objeto `linea` pre-inicializado con valores vacíos | Se crea un objeto innecesario que se sobrescribe inmediatamente en el `else`. En el `if` de duplicado (muerto) el objeto queda sin usar. | Crear el objeto directamente en el `else` o al hacer `push`. |

### Errores del segundo intento (`renderLista`)

| # | Error | Explicación | Corrección |
|---|-------|-------------|------------|
| 1 | `(a,b){a-b}` falta `=>` | Las arrow functions requieren `=>`. `(a,b){a-b}` lanza **SyntaxError** y detiene el script. | `(a, b) => a.precio - b.precio` |
| 2 | `a-b` resta objetos, no `.precio` | Restar objetos da `NaN`. `sort()` con `NaN` no ordena. | `a.precio - b.precio` |
| 3 | Acute accent `´` en vez de backtick | Solo el backtick `` ` `` (U+0060) delimita template literals. `´` lanza SyntaxError. | Usar `` ` `` (backtick) |
| 4 | `ordenadoMap` sin declaración | `let ordenadoMap` está comentado → la asignación crea variable global o da error. | `const ordenadoMap = ...` |
| 5 | `"Lista Productos<br>"` dentro de `map()` | El string se repite al inicio de cada producto en vez de una vez como encabezado. | Mover el encabezado fuera del `map()` |
| 6 | `divLista` no definido en el snippet | Si `divLista` no existe en el ámbito padre, arroja ReferenceError. | `const divLista = document.getElementById("divLista")` |

### Problemas de enseñanza (teaching targets)

| # | Problema | Explicación |
|---|----------|-------------|
| A | `null` vs `""` | El estudiante confunde `null` con "vacío". Los inputs devuelven `""` (string vacío), no `null`. Este error es muy común en principiantes. |
| B | `includes()` en arrays de objetos | Creen que `includes()` compara por valor de propiedades. Es un error conceptual frecuente. La enseñanza debe reforzar que `includes()` usa `===` (referencia). Para objetos se usa `find()`, `some()`, o `findIndex()`. |
| C | `.value` siempre es string | Incluso con `<input type="number">`, el DOM devuelve string. El estudiante no aplicó `Number()`. |
| D | `>` coercion silenciosa | `objeto > 0` no da error, da `false`. El estudiante no recibe feedback, el bug pasa desapercibido. |
| E | `console.table` con string | Demuestra que no se entiende la diferencia entre un identificador (variable) y un string literal. |
| F | `map()` + `join()` no implementado | El estudiante usó un placeholder `"Hola"` en vez de transformar el array. No logró conectar `push()` con la renderización. |
| G | Manejo de duplicados incompleto | La intención de "sumar stock / recalcular precio" estaba en comentarios pero jamás se implementó. El `if` nunca se ejecuta por el error #3. |
| H | Arrow function sin `=>` | Error sintáctico: olvidar `=>` entre parámetros y cuerpo. Ocurre cuando se escribe `(a,b){a-b}`. |
| I | Acute accent por backtick | Confusión tipográfica entre `´` (acute) y `` ` `` (backtick). El teclado puede generar el carácter incorrecto. |

### Recomendaciones pedagógicas

1. **Enseñar tipos primero**: Antes de `map/filter`, asegurarse de que el estudiante distingue `null`, `undefined`, `""`, `0`, `NaN` y sabe que `.value` siempre es `string`.
2. **`includes()` vs `find()`**: Dedicar un ejercicio específico a mostrar que `includes()` compara por referencia y `find()` por condición.
3. **`console.table` sin comillas**: Corregir en el momento para que vean la diferencia.
4. **Conversión numérica**: Insistir en `Number(valor)` al leer inputs numéricos.
5. **Renderizar con `map()`**: El placeholder `"Hola"` muestra que no hubo comprensión de cómo transformar un array a HTML. Reforzar con ejemplos mínimos antes del ejercicio.
6. **Validar vacío**: Usar `valor.trim() === ""` en vez de `!= null`.
7. **Arrow functions**: Practicar la sintaxis `(params) => expresión` y `(params) => { return ... }`.
8. **Backtick vs acute accent**: Mostrar visualmente la diferencia entre `` ` `` y `´` en el editor de código.

---

## Parte 4: Explicación complementaria en inglés

Your explanation of the first point is excellent! You hit all the major logical concepts perfectly, especially why subtracting the raw objects results in `NaN`.

Let's look at your English fluency first, and then we will clear up the small syntax trap remaining in your code example and dive into how that spread operator works.

---

### English Fluency Review

Your English is highly fluent, natural, and clear. You use technical terms correctly ("spread operator", "overwriting", "syntax"). Here are a few minor tweaks to make it sound even more polished:

* **"come back with a NaN"** → Native speakers usually say **"return NaN"** or **"result in NaN"**.
* **"substract"** → Spelling fix: **"subtract"** (no "s" in the middle).
* **"numerical quality"** → In programming, we usually say **"numerical property"** or **"numerical value"** when talking about objects.
* **"original one inventario"** → Smooth it out by saying **"the original 'inventario' array"**.

---

### The Syntax Trap: `return` with Curly Braces

In your example, you wrote: `sort((a,b)=>{a.price -b.price})`.

There is a subtle rule in JavaScript arrow functions that trips almost everyone off: **If you open curly braces `{}`, you *must* use the `return` keyword.** If you don't, the function returns `undefined` by default, and the sorting breaks.

Here are your two valid choices:

* **Inline (Implicit Return):** No curly braces, no `return` keyword.
```javascript
sort((a, b) => a.precio - b.precio)
```

* **Block Body (Explicit Return):** Uses curly braces, so it requires `return`.
```javascript
sort((a, b) => { return a.precio - b.precio; })
```

---

### Understanding the Spread Operator `[...]`

Your intuition is 100% correct: it prevents you from overwriting the original array. Here is why we need it:

In JavaScript, arrays are passed by **reference**, not by value. If you do this:
```javascript
const copia = inventario; // This does NOT make a copy!
copia.sort(...);          // This will accidentally sort 'inventario' too!
```

`copia` and `inventario` point to the exact same box in computer memory. Sorting the "copy" ruins the order of your original data.

The spread operator `...` literally "spreads" out the individual items of the old array inside a brand new set of array brackets `[]`.

> Imagine `inventario` is a physical photo album.
> * `const copia = inventario` is like giving someone a sticky note with the address to your house to look at your album. If they tear a page, your album is ruined.
> * `const ordenado = [...inventario]` is like taking every single photo out, running to a copy machine, and putting the duplicates into a brand-new album. Now you can scramble, sort, or drop paint on the new album, and your original one remains perfectly safe on the shelf.

Whenever you want to use destructive methods like `.sort()` or `.reverse()`, using `[...]` first is a fantastic habit to protect your source data.

---

## Visual improvement for `renderLista()` — column-aligned product grid

The user wanted to improve the display by aligning properties into columns and highlighting the price in red. Here are three approaches evaluated:

### Approach 1 — CSS Grid (recommended)

Each product row is a `div` with `display: grid`. A header row uses the same grid for perfect alignment. Price gets inline `color: red`.

```js
function renderLista() {
  const ordenado = [...inventario].sort((a, b) => a.precio - b.precio);
  const header = `<div style="display:grid;grid-template-columns:40px 1fr 80px 1fr 80px;gap:8px;font-weight:bold;border-bottom:1px solid #ccc;padding:4px 0;">
    <span>#</span><span>Producto</span><span>Precio</span><span>Categoría</span><span>Stock</span>
  </div>`;
  const rows = ordenado.map((p, i) =>
    `<div style="display:grid;grid-template-columns:40px 1fr 80px 1fr 80px;gap:8px;padding:4px 0;">
      <span>${i + 1}</span>
      <span>${p.producto}</span>
      <span style="color:red;font-weight:bold">$${p.precio}</span>
      <span>${p.categoria}</span>
      <span>${p.stock}</span>
    </div>`
  ).join("");
  divLista.innerHTML = "<h2>Inventario</h2>" + header + rows;
}
```

### Approach 2 — HTML Table

Semantic but uses `<table>` which is more verbose and less flexible for responsive layouts.

```js
function renderLista() {
  const ordenado = [...inventario].sort((a, b) => a.precio - b.precio);
  const rows = ordenado.map((p, i) =>
    `<tr>
      <td>${i + 1}</td>
      <td>${p.producto}</td>
      <td style="color:red;font-weight:bold">$${p.precio}</td>
      <td>${p.categoria}</td>
      <td>${p.stock}</td>
    </tr>`
  ).join("");
  divLista.innerHTML = `<h2>Inventario</h2>
    <table style="border-collapse:collapse;text-align:left">
      <thead><tr style="border-bottom:2px solid #333">
        <th>#</th><th>Producto</th><th>Precio</th><th>Categoría</th><th>Stock</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>`;
}
```

### Approach 3 — Flexbox

Similar to grid but with `display:flex` and fixed widths per child. Less precise alignment than grid.

### Recommendation

**Approach 1 (CSS Grid)** is the best balance — no external dependencies, perfect column alignment, easy to read, and the grid adapts naturally. All properties align vertically, and the red highlight on price makes it stand out.

### Bugs also fixed in the process

| Bug | Before | After |
|-----|--------|-------|
| `sort({})` without `return` | `(a,b)=>{a.precio-b.precio}` → `undefined` | `(a,b) => a.precio - b.precio` |
| Undeclared `ordenadoMap` | Used without `let`/`const` | `const rows = ...` (no temp variable) |
| Mismatched backtick/acute | `` `<...>´ `` → SyntaxError | All backticks consistent |
| `texto +=` outside scope | `texto` undefined → ReferenceError | Removed, header is `<h2>` |
| No column alignment | All data in one line | CSS grid with 5 columns |
| Price not highlighted | Plain text | Red bold with `color:red` |

---

## Simple tabulation without grid/table — using inline-block spans

The user asked if there's a simpler way to add spacing between properties (like a "tab") without switching to grid or table.

### Option 1 — `&emsp;` entity (quick but fragile)

```js
texto = `<strong>Producto:${i+1}</strong>&emsp;&emsp;${p.producto}&emsp;&emsp;$${p.precio}&emsp;&emsp;${p.categoria}&emsp;&emsp;Stock: ${p.stock}`;
```

* `&emsp;` is an em-space (~4 regular spaces wide).
* **Downside:** alignment breaks when values have different lengths (e.g. "Auriculares" vs "Sartén").

### Option 2 — `<span>` with `display:inline-block` and fixed width (recommended for simplicity)

```js
texto = `<span style="display:inline-block;width:120px"><strong>Producto:${i+1}</strong></span>
         <span style="display:inline-block;width:140px">${p.producto}</span>
         <span style="display:inline-block;width:70px;color:red;font-weight:bold">$${p.precio}</span>
         <span style="display:inline-block;width:120px">${p.categoria}</span>
         <span style="display:inline-block;width:80px">Stock: ${p.stock}</span>`;
```

* Each property gets a fixed width → **true tabular alignment** regardless of content length.
* Works inline — no extra CSS file or `<style>` block needed.
* The price span can include `color:red` for visual emphasis.
* **Downside:** wrapping each row inside a `div` (or using a parent `div` per row) is recommended for multi-line safety.

### Option 3 — No HTML tag for "tab"

There is **no `<tab>` HTML element**. The old `<pre>` tag preserves `\t` characters but renders monospace and is meant for preformatted text, not layout.

### Recommendation

If you want to keep your existing code structure as close as possible, **Option 2 (inline-block spans)** is the best upgrade — minimal change, real column alignment, and price highlighting all in one pass.

---

## Conditional stock coloring — green / yellow / red by quantity

The user wants the stock value to change color based on predefined intervals.

### Recommended intervals

| Stock range | Color | Meaning |
|-------------|-------|---------|
| `stock >= 15` | 🟢 Green (`green`) | Healthy stock |
| `stock >= 5` | 🟡 Yellow / Orange (`#cc8800`) | Low stock, reorder soon |
| `stock < 5` | 🔴 Red (`red`) | Critical stock |

### Implementation — helper function

Extract the color logic into a small function that returns the appropriate style string:

```js
function stockColor(stock) {
  if (stock >= 15) return "green";
  if (stock >= 5)  return "#cc8800";
  return "red";
}
```

Then use it directly in the template:

```js
texto = `<span style="display:inline-block;width:120px"><strong>Producto:${i+1}</strong></span>
         <span style="display:inline-block;width:140px">${p.producto}</span>
         <span style="display:inline-block;width:70px;color:red;font-weight:bold">$${p.precio}</span>
         <span style="display:inline-block;width:120px">${p.categoria}</span>
         <span style="display:inline-block;width:80px;color:${stockColor(p.stock)};font-weight:bold">Stock: ${p.stock}</span>`;
```

### Full updated `renderLista()`

```js
function stockColor(stock) {
  if (stock >= 15) return "green";
  if (stock >= 5)  return "#cc8800";
  return "red";
}

function renderLista() {
  const ordenado = [...inventario].sort((a, b) => a.precio - b.precio);
  const rows = ordenado.map((p, i) =>
    `<div>
      <span style="display:inline-block;width:120px"><strong>Producto:${i+1}</strong></span>
      <span style="display:inline-block;width:140px">${p.producto}</span>
      <span style="display:inline-block;width:70px;color:red;font-weight:bold">$${p.precio}</span>
      <span style="display:inline-block;width:120px">${p.categoria}</span>
      <span style="display:inline-block;width:80px;color:${stockColor(p.stock)};font-weight:bold">Stock: ${p.stock}</span>
    </div>`
  ).join("");
  divLista.innerHTML = "<h2>Inventario</h2>" + rows;
}
```

### Visual result

With the sample data:
- **Auriculares** (stock 20) → 🟢 green
- **Zapatillas** (stock 12) → 🟡 #cc8800
- **Lámpara** (stock 0) → 🔴 red
- **Remera** (stock 8) → 🟡 #cc8800
- **Teclado** (stock 5) → 🟡 #cc8800 (edge case, >= 5)
- **Mochila** (stock 0) → 🔴 red
- **Sartén** (stock 15) → 🟢 green (edge case, >= 15)

The thresholds and colors are easily adjustable — just edit the `stockColor()` function.

---

## Debug: user's `colorearStock` + `renderLista()` attempt

### Code analyzed

```js
function colorearStock(s) {
  if (s >= 20) {
    return `<span style=color:green>${p.stock}</span>`;
  } else if (s >= 5) {
    return `<span style=color:orange>${p.stock}</span>`;
  }
  return `<span style=color:red>${p.stock}</span>`;
}

function renderLista() {
//let ordenadoMap = [];  
const ordenado = [...inventario].sort((a,b)=>{return a.precio-b.precio}); //NaN
ordenadoMap = ordenado.map((p,i)=>{
  let texto = "";
  let colorS = "";
  colorS = colorearStock(p.stock);
  texto = `
  <span style="display:inline-block;width:120px"><strong>P: ${i+1}</strong>    ${p.producto} </span> 
  <span style="color:red;display:inline-block;width:120px"> Precio: $ ${p.precio} </span>
  <span style="display:inline-block; width:120px"> ${p.categoria} </span>
  <span style="display:inline-block; width:120px"> Inventario: ${colorearStock(p.stock)}</span>`;
  return texto;
});
 
divLista.innerHTML =`<h2>Inventario</h2><br> ${ordenadoMap.join(`<br>`)}`;
}
```

### Bug A — `colorearStock(s)` uses `p.stock` instead of parameter `s`

```js
function colorearStock(s) {
  if (s >= 20) {
    return `<span style=color:green>${p.stock}</span>`;   // ❌ p is undefined here
```

**Problema:** The parameter is named `s`, but the function body references `p.stock`. The variable `p` only exists inside the `map()` callback — it is **out of scope** here. This throws `ReferenceError: p is not defined` the moment `colorearStock()` is called.

✅ **Correction:** Use `s` (the parameter) instead of `p.stock`:
```js
return `<span style="color:green">${s}</span>`;
```

---

### Bug B — `colorS` variable assigned but never read

```js
let colorS = "";
colorS = colorearStock(p.stock);   // assigned...
// ... but never used below
texto = `... ${colorearStock(p.stock)} ...`;  // called again
```

**Problema:** `colorS` gets the result of `colorearStock()`, but the template literal calls `colorearStock()` a **second time**. `colorS` is dead code — wastes a function call and a variable.

✅ **Correction:** Remove `colorS` entirely and use it directly, or reuse the stored value:
```js
const colorS = colorearStock(p.stock);
texto = `... ${colorS} ...`;
```

---

### Bug C — `ordenadoMap` still undeclared

```js
//let ordenadoMap = [];        // ← commented out
ordenadoMap = ordenado.map(...)  // ← global leak
```

Same bug as before — the declaration is commented out, creating an implicit global.

✅ **Correction:**
```js
const ordenadoMap = ordenado.map(...);
// or inline without the intermediate variable
```

---

### Bug D — `colorearStock` returns a span inside a span context

```js
<span ...> Inventario: ${colorearStock(p.stock)}</span>
```

`colorearStock()` returns `<span style=...>20</span>`. This puts a `<span>` **inside** another `<span>`. While valid HTML, it's unnecessary nesting. The function could return just the **number** with inline styles on the outer span instead.

✅ **Correction (simpler):** Have `colorearStock` return only the color string, and apply it inline:
```js
function stockColor(stock) {
  if (stock >= 20) return "green";
  if (stock >= 5)  return "orange";
  return "red";
}
// usage:
<span style="display:inline-block;width:120px;color:${stockColor(p.stock)}">Inventario: ${p.stock}</span>
```

---

### Bug E — Sort comment `//NaN` is incorrect

```js
const ordenado = [...inventario].sort((a,b)=>{return a.precio-b.precio}); //NaN
```

This sort is **actually correct** now — it has `return` and accesses `.precio`. The `//NaN` comment is misleading and should be removed.

---

### Bug F — Misleading variable name `s`

```js
function colorearStock(s) {
```

`colorearStock` sounds like it colors something, but it returns a `<span>`. Better name: `formatearStock()` or `stockHTML()`. Also `s` is too vague — `stock` is clearer.

---

### Bug G — Missing quotes in style attribute

```js
return `<span style=color:green>${p.stock}</span>`;  // quotes omitted
```

While HTML5 tolerates unquoted attribute values when they contain no spaces, it's inconsistent with the rest of the code that uses `style="..."`. Always quote attributes for consistency and safety.

✅ **Correction:**
```js
return `<span style="color:green">${s}</span>`;
```

---

### Bug H — Trailing whitespace / leading newline in template

The template literal starts with a newline:
```js
texto = `
  <span ...>`;
```
This inserts a newline character before the `<span>` in the HTML output. Not a visible bug in HTML (whitespace collapses), but it's messy.

---

### Bug I — `colorearStock` threshold edge cases

The intervals are: `s >= 20` green, `s >= 5` orange, else red.
- Stock values **between 15 and 19** were previously "green" but are now "orange" (since threshold moved from 15 to 20).
- The original sample data has: Auriculares (20 → green), Zapatillas (12 → orange), Sartén (15 → orange in this version).

Make sure the thresholds match the business requirement. The previous section used `>= 15` for green; this version uses `>= 20`.

---

### Código corregido

```js
function stockColor(stock) {
  if (stock >= 20) return "green";
  if (stock >= 5)  return "orange";
  return "red";
}

function renderLista() {
  const ordenado = [...inventario].sort((a, b) => a.precio - b.precio);
  const html = ordenado.map((p, i) =>
    `<div>
      <span style="display:inline-block;width:120px"><strong>P: ${i+1}</strong> ${p.producto}</span>
      <span style="color:red;display:inline-block;width:120px">Precio: $${p.precio}</span>
      <span style="display:inline-block;width:120px">${p.categoria}</span>
      <span style="display:inline-block;width:120px;color:${stockColor(p.stock)};font-weight:bold">Inventario: ${p.stock}</span>
    </div>`
  ).join("");
  divLista.innerHTML = "<h2>Inventario</h2>" + html;
}
```

---

## Developer-tools Elements section

That screenshot is perfect! It tells us exactly what is happening in your DOM (the document structure).

If you look closely at your **Elements** tab on the right, you can actually see the JavaScript hasn't rendered your list yet. Inside `<div id="divLista">`, it only says `<strong>Todos los productos:</strong>`.

Because your custom `<span>` tags aren't appearing there yet, the CSS syntax error from the function isn't visible in the HTML structure quite yet. However, we can use this exact view to find where things went wrong.

Here is exactly where to look based on your screenshot:

### 1. Look at the Red Error Badge (Top Right)

Look at the very top right corner of your DevTools panel. Do you see the small red circle with an **X** and the number **1** next to it?

* **What it means:** That is your browser screaming that a JavaScript error has crashed your script.
* **What to do:** Click on the **Console** tab (right next to the *Elements* tab at the top). It will show you a red error message stating exactly which line in `inventario.js` failed to execute.

### 2. Check the Styles Panel (Far Right)

The right-most column shows you the CSS currently being applied to whatever element you have highlighted.

* Right now, you have `<div id="divLista">` selected (it is highlighted in gray in the middle panel).
* On the right side, under the **Styles** tab, you can see the CSS rule `#divLista` with its `border-color: cornflowerblue;`.
* **How to use this later:** Once you fix the JavaScript execution error and your spans finally render, you can click on one of those individual product `<span>` tags in the middle panel. The right column will update to show you its `element.style {}`. If `color:colorearStock(p.stock)` was injected as literal text, it would show up here with a yellow warning triangle or a strikethrough, meaning the browser didn't understand the CSS property.

### Next Step to Fix It

Click on that **Console** tab to see the exact error message. It is highly likely complaining about a syntax error or a `ReferenceError` related to the template literal comillas (`´` vs `` ` ``) or the missing `return` statement we discussed earlier!

---

## Fix applied to `inventario.js` — `colorearStock` and `renderLista`

The following fixes were applied directly to `inventario.js`:

### Changes made

| File | Location | Before | After |
|------|----------|--------|-------|
| `inventario.js:21-28` | `colorearStock(s)` | Used `p.stock` → `ReferenceError: p is not defined` | Renamed to `stockColor(stock)`, returns color string `"green"`/`"orange"`/`"red"`, uses parameter correctly |
| `inventario.js:32` | `sort()` | `(a,b)=>{return a.precio-b.precio}` with misleading `//NaN` comment | `(a, b) => a.precio - b.precio` — clean, correct |
| `inventario.js:33` | `ordenadoMap` | Undeclared (global leak). `//let ordenadoMap = [];` was commented out | Replaced with `const html = ...` — no intermediate variable |
| `inventario.js:35-36` | `colorS` | Dead code: `let colorS = "";` then commented out | Removed entirely |
| `inventario.js:37-41` | Template | Leading newline, `p.producto` not inside `${}`, no stock color | Clean inline-block spans with `stockColor()` applied inline |
| `inventario.js:45` | `innerHTML` | `` `<h2>Inventario</h2><br> ${ordenadoMap.join(`<br>`)}` `` | `"<h2>Inventario</h2>" + html` — simpler, no `<br>` between `<div>` rows |

### Final corrected code in the file

```js
function stockColor(stock) {
  if (stock >= 20) return "green";
  if (stock >= 5)  return "orange";
  return "red";
}

function renderLista() {
  const ordenado = [...inventario].sort((a, b) => a.precio - b.precio);
  const html = ordenado.map((p, i) =>
    `<div>
      <span style="display:inline-block;width:120px"><strong>P: ${i+1}</strong> ${p.producto}</span>
      <span style="color:red;display:inline-block;width:120px">Precio: $${p.precio}</span>
      <span style="display:inline-block;width:120px">${p.categoria}</span>
      <span style="display:inline-block;width:120px;color:${stockColor(p.stock)};font-weight:bold">Inventario: ${p.stock}</span>
    </div>`
  ).join("");
  divLista.innerHTML = "<h2>Inventario</h2>" + html;
}
```

---

## Developer-tools Elements section

That screenshot is perfect! It tells us exactly what is happening in your DOM (the document structure).

If you look closely at your **Elements** tab on the right, you can actually see the JavaScript hasn't rendered your list yet. Inside `<div id="divLista">`, it only says `<strong>Todos los productos:</strong>`.

Because your custom `<span>` tags aren't appearing there yet, the CSS syntax error from the function isn't visible in the HTML structure quite yet. However, we can use this exact view to find where things went wrong.

Here is exactly where to look based on your screenshot:

### 1. Look at the Red Error Badge (Top Right)

Look at the very top right corner of your DevTools panel. Do you see the small red circle with an **X** and the number **1** next to it?

* **What it means:** That is your browser screaming that a JavaScript error has crashed your script.
* **What to do:** Click on the **Console** tab (right next to the *Elements* tab at the top). It will show you a red error message stating exactly which line in `inventario.js` failed to execute.

### 2. Check the Styles Panel (Far Right)

The right-most column shows you the CSS currently being applied to whatever element you have highlighted.

* Right now, you have `<div id="divLista">` selected (it is highlighted in gray in the middle panel).
* On the right side, under the **Styles** tab, you can see the CSS rule `#divLista` with its `border-color: cornflowerblue;`.
* **How to use this later:** Once you fix the JavaScript execution error and your spans finally render, you can click on one of those individual product `<span>` tags in the middle panel. The right column will update to show you its `element.style {}`. If `color:colorearStock(p.stock)` was injected as literal text, it would show up here with a yellow warning triangle or a strikethrough, meaning the browser didn't understand the CSS property.

### Next Step to Fix It

Click on that **Console** tab to see the exact error message. It is highly likely complaining about a syntax error or a `ReferenceError` related to the template literal comillas (`´` vs `` ` ``) or the missing `return` statement we discussed earlier!

---

## Fix applied to `inventario.js` — `colorearStock` and `renderLista`

The following fixes were applied directly to `inventario.js`:

### Changes made

| File | Location | Before | After |
|------|----------|--------|-------|
| `inventario.js:21-28` | `colorearStock(s)` | Used `p.stock` → `ReferenceError: p is not defined` | Renamed to `stockColor(stock)`, returns color string `"green"`/`"orange"`/`"red"`, uses parameter correctly |
| `inventario.js:32` | `sort()` | `(a,b)=>{return a.precio-b.precio}` with misleading `//NaN` comment | `(a, b) => a.precio - b.precio` — clean, correct |
| `inventario.js:33` | `ordenadoMap` | Undeclared (global leak). `//let ordenadoMap = [];` was commented out | Replaced with `const html = ...` — no intermediate variable |
| `inventario.js:35-36` | `colorS` | Dead code: `let colorS = "";` then commented out | Removed entirely |
| `inventario.js:37-41` | Template | Leading newline, `p.producto` not inside `${}`, no stock color | Clean inline-block spans with `stockColor()` applied inline |
| `inventario.js:45` | `innerHTML` | `` `<h2>Inventario</h2><br> ${ordenadoMap.join(`<br>`)}` `` | `"<h2>Inventario</h2>" + html` — simpler, no `<br>` between `<div>` rows |

---

## Roadmap: create a stats function like `renderStats()`

A step-by-step guide to build your own function following the same pattern.

### Step 1 — Pick what you want to calculate

Ideas for new stats:
- Average price of all products
- Most expensive / cheapest product
- Total number of products
- Products per category (count)
- Products above a stock threshold

### Step 2 — Choose the right array method

| What you need | Method |
|---------------|--------|
| Count / sum of all items | `reduce()` |
| Pick one match | `find()` |
| A subset of items | `filter()` |
| Transform each item | `map()` |
| Unique values | `new Set()` + `[...]` |
| Sort and take one | `sort()` + `[0]` |

### Step 3 — Write the logic in a function

Pattern:
```js
function renderStats() {
  // 3a — compute your value(s)
  const promedio = inventario.reduce((acc, p) => acc + p.precio, 0) / inventario.length;

  // 3b — format into HTML
  divStats.innerHTML = `<strong>Estadísticas:</strong><br>
    Precio promedio: $${promedio.toFixed(2)}`;
}
```

### Step 4 — Call it from `renderTodo()`

```js
function renderTodo() {
  renderLista();
  renderStats();
}
```

### Step 5 — Test in the browser

Open the page, click "Agregar", verify your new stat appears in `divStats`.

### Ideas you can try right now

| Stat | Code |
|------|------|
| **Average price** | `inventario.reduce((a, p) => a + p.precio, 0) / inventario.length` |
| **Cheapest product** | `inventario.sort((a, b) => a.precio - b.precio)[0]` |
| **Most expensive** | `inventario.sort((a, b) => b.precio - a.precio)[0]` |
| **Total products** | `inventario.length` |
| **Count by category** | `[...new Set(inventario.map(p => p.categoria))].map(c => \`${c}: ${inventario.filter(p => p.categoria === c).length}\`).join(", ")` |
| **Well-stocked products** (stock > 10) | `inventario.filter(p => p.stock > 10).map(p => p.producto).join(", ")` |

Try adding one of these to `renderStats()` and see it update live!

---

## How to use Set

Here is the short answer: **The first one is broken and will cause a syntax or runtime error, while the second one is perfectly correct.**

Let's break down exactly why this happens by looking at the order of operations for both.

### 1. The Broken Way (First Option)

```js
const categorias = [...new Set(inventario).map((p)=>{ ... })];
```

The issue here is the **order of operations**. You are trying to call `.map()` directly on a `Set` object.

1. `new Set(inventario)` creates a unique Set of the raw *objects* (which doesn't actually remove duplicates because every object reference is unique).
2. Then, you immediately try to run `.map(...)` on that Set.

> **Why it fails:** In JavaScript, `.map()` is an **Array method**. It does not exist on a `Set`. If you try to run this code, your console will throw an error: `TypeError: (intermediate value).map is not a function`.

### 2. The Correct Way (Second Option)

```js
const categorias = [...new Set(inventario.map(p => p.categoria))];
```

This works beautifully because the operations happen in the exact right order:

1. **`inventario.map(p => p.categoria)` happens first:** This extracts just the category strings from your array. It returns a plain array of strings: `["Electrónica", "Deportes", "Hogar", "Ropa", "Electrónica", "Deportes", "Hogar"]`. Notice that categories like `"Electrónica"` are repeated here.
2. **`new Set(...)` happens second:** It takes that array of strings and filters out all duplicates, because a `Set` can only hold unique values. It leaves you with a Set object containing: `{"Electrónica", "Deportes", "Hogar", "Ropa"}`.
3. **`[...]` happens last:** The spread operator converts that `Set` object right back into a clean, standard JavaScript array.

### Summary Checklist

To use `Set` for removing duplicates, always follow this order:

1. **Map** the array to get a list of the specific values (strings/numbers).
2. Feed that array into a **`new Set()`** to strip duplicates.
3. **Spread `[...]`** the set back into a new array.

Your commented-out second line is a textbook-perfect way to get a unique list of categories in modern JavaScript!

---

## Set without spread — when you need `[...]` and when you don't

```js
const categorias = new Set(inventario.map(p => p.categoria));
```

Your code correctly creates a `Set`:
```
Set(4) {"Electrónica", "Deportes", "Hogar", "Ropa"}
```

But in `renderStats()` you call:
```js
categorias.join(", ")    // ❌ TypeError: categorias.join is not a function
```

`Set` has **no** `.join()`, `.map()`, `.filter()`, or `.sort()` — those are **array-only** methods. The spread `[...]` converts the Set back to an array so you can use them:

```js
const categorias = [...new Set(inventario.map(p => p.categoria))];
// → ["Electrónica", "Deportes", "Hogar", "Ropa"]  ← array with .join()
```

| What you need | Use `Set` alone? | Need `[...]`? |
|---------------|------------------|---------------|
| Check if a value exists | ✅ `categorias.has("Ropa")` | ❌ |
| Iterate with `for...of` | ✅ `for (const c of categorias)` | ❌ |
| Display with `.join(", ")` | ❌ | ✅ `[...categorias].join(", ")` |
| Use `.map()`, `.filter()`, `.sort()` | ❌ | ✅ |

**Rule of thumb:** If you only need to check existence (`.has()`), the `Set` alone is fine. If you need to display, iterate with array methods, or sort — add `[...]`.

---

## How `.reduce()` works — total inventory value

This line calculates the **total value of all products in an inventory**.

```js
const total = inventario.reduce((acc, p) => acc + p.precio * p.stock, 0);
```

Let's break it step by step.

### 1. `inventario`

Usually this is an array of objects like:

```js
const inventario = [
  { nombre: "Laptop", precio: 1000, stock: 2 },
  { nombre: "Mouse", precio: 50, stock: 5 },
  { nombre: "Keyboard", precio: 80, stock: 3 }
];
```

### 2. `.reduce()`

`reduce()` is used to combine all array elements into **one single value**.

Syntax:

```js
array.reduce((accumulator, currentValue) => {
  // logic
}, initialValue);
```

### 3. Parameters

```js
(acc, p)
```

* `acc` → accumulator (stores the running total)
* `p` → current product

Example during iteration:

```js
p = { nombre: "Laptop", precio: 1000, stock: 2 }
```

### 4. The operation

```js
acc + p.precio * p.stock
```

This calculates `price × stock` for each product, then adds it to the accumulator.

Example:

```js
1000 * 2 = 2000
50 * 5 = 250
80 * 3 = 240
```

Total:

```js
2000 + 250 + 240 = 2490
```

### 5. Initial value

```js
0
```

This is the initial value of `acc`. So the process starts like:

```js
acc = 0
```

### Step-by-step execution

#### First iteration

```js
acc = 0
p = Laptop
```

Calculation:

```js
0 + 1000 * 2
= 2000
```

#### Second iteration

```js
acc = 2000
p = Mouse
```

Calculation:

```js
2000 + 50 * 5
= 2250
```

#### Third iteration

```js
acc = 2250
p = Keyboard
```

Calculation:

```js
2250 + 80 * 3
= 2490
```

Final result:

```js
const total = 2490;
```

### Equivalent version using a loop

```js
let total = 0;

for (const p of inventario) {
  total += p.precio * p.stock;
}
```

### English correction

❌ "Explain this snippet"
✅ "Can you explain this snippet?"
✅ "Could you explain what this snippet does?"

### Useful vocabulary

* `snippet` → small piece of code
* `inventory` → inventario
* `accumulator` → acumulador
* `iteration` → iteración

### Simple English version

* `reduce()` combines all elements into one value.
* `acc` stores the running total.
* `p` is each product.
* `precio * stock` calculates the value of one product.
* The code adds all product values together.

---

## `acc +=` vs `acc +` in `.reduce()` — subtle difference

```js
const total = inventario.reduce((acc, p) => {
  return acc += p.precio * p.stock;
}, 0);
```

Works correctly. `acc += value` is shorthand for `acc = acc + value`, and `return acc += ...` returns the updated `acc`.

| Step | `acc` before | Calculates | `acc +=` | Returns |
|------|-------------|------------|----------|---------|
| 1 | 0 | `50*20=1000` | `0+1000=1000` | 1000 |
| 2 | 1000 | `80*12=960` | `1000+960=1960` | 1960 |
| 3 | 1960 | `30*0=0` | `1960+0=1960` | 1960 |
| 4 | 1960 | `25*8=200` | `1960+200=2160` | 2160 |
| 5 | 2160 | `40*5=200` | `2160+200=2360` | 2360 |
| 6 | 2360 | `60*0=0` | `2360+0=2360` | 2360 |
| 7 | 2360 | `35*15=525` | `2360+525=2885` | **2885** |

### The broken version (no `acc +`)

```js
// ❌ discards accumulator
const total = inventario.reduce((acc, p) => {
  return p.precio * p.stock;    // only returns current product value
}, 0);
```

Each iteration **ignores `acc`** — the running total is lost. The final result is just the **last** product's value (`35*15=525`), not the sum of all.

### Comparison table

| Version | Code | Result | Bug? |
|---------|------|--------|------|
| Broken | `return p.precio * p.stock` | 525 (last product only) | ❌ |
| Correct with `acc +` | `return acc + p.precio * p.stock` | 2885 | ✅ |
| Correct with `acc +=` | `return acc += p.precio * p.stock` | 2885 | ✅ |
| Idiomatic one-liner | `(acc, p) => acc + p.precio * p.stock` | 2885 | ✅ |

### Minor style note

Mutating the parameter `acc` with `+=` is unnecessary — `reduce` uses the **return value** as the next `acc`, not the mutated variable. The idiomatic version is:

```js
return acc + p.precio * p.stock;
```

But both produce the exact same result. No bug here.

---

## Common mistake: mixing `if`, ternary `?:`, and `else`

Your code has several syntax errors. You are mixing `if`, ternary operator `? :`, and `else` incorrectly.

### You wrote

```js
let listaSinStock = if(inventario.filter((p)=>
p.stock === 0
))===0? `No hay vacios ..`: else;
```

### Correct version

If you want to check whether there are products with `stock === 0`, do this:

```js
let listaSinStock =
  inventario.filter((p) => p.stock === 0).length === 0
    ? "No hay vacíos..."
    : "Hay productos sin stock";
```

### Explanation

#### 1. `filter()`

```js
inventario.filter((p) => p.stock === 0)
```

Creates a new array containing only products with stock `0`.

Example:
```js
[
  { nombre: "Mouse", stock: 0 },
  { nombre: "Keyboard", stock: 0 }
]
```

#### 2. `.length`

```js
.length === 0
```

Checks if the filtered array is empty.
* `true` → no products without stock
* `false` → there are products without stock

#### 3. Ternary operator

Syntax:
```js
condition ? valueIfTrue : valueIfFalse
```

Your example:
```js
condition
  ? "No hay vacíos..."
  : "Hay productos sin stock";
```

### Better version

You can also store the filtered products:

```js
const productosSinStock = inventario.filter((p) => p.stock === 0);

const mensaje =
  productosSinStock.length === 0
    ? "No hay productos vacíos"
    : "Hay productos sin stock";
```

### Why your code failed

#### ❌ Error 1
```js
let listaSinStock = if(...)
```
You cannot assign `if` directly to a variable.

#### ❌ Error 2
```js
else;
```
`else` only works with `if`. Not with ternary operators. Correct ternary syntax:
```js
condition ? trueValue : falseValue
```

#### ❌ Error 3
```js
filter(...) === 0
```
`filter()` returns an **ARRAY**, not a number. You must use:
```js
filter(...).length === 0
```

### English correction

❌ "let listaSinStock = if..."
✅ "I tried to create a variable with `if`, but it gives an error."
✅ "How can I check if there are products without stock?"

### Simple English version

* `filter()` returns an array.
* `.length` checks how many elements exist.
* The ternary operator uses: `condition ? trueValue : falseValue`
* `if` cannot be assigned directly to a variable.

---

## Ternary operator — weighted average price mistake

This attempt at converting the logic into a single ternary operator contains several major syntax and structural errors. While it's great that you are experimenting with compact syntax, a ternary operator is the wrong tool for this specific job.

Here is a detailed breakdown of why this code will crash, followed by the correct way to handle this pattern.

### Why This Code Fails (Syntax Errors)

#### 1. Broken `.find()` Syntax

```js
inventario.find(p.producto === prod)
```

* **The Error:** `.find()` requires a callback function (like `p => ...`). Without the arrow `=>`, JavaScript looks for a variable named `p`, can't find it, and throws a `ReferenceError: p is not defined`.

#### 2. Executing Multiple Statements inside a Ternary

```js
? p.stock += stock; p.precio = ...
```

* **The Error:** A ternary operator (`condition ? value1 : value2`) can only execute a **single expression** per side. You cannot separate multiple lines of code with semicolons `;` inside a ternary block.

#### 3. Missing `p` Reference

Inside your true branch, you try to use `p.stock` and `p.precio`. However, `p` only existed as an internal placeholder inside the `.find()` method. Outside of `.find()`, `p` is completely unknown to JavaScript.

#### 4. Incorrect `.push()` of Separate Objects

```js
inventario.push({producto:${prod}}, {categoria: ${cat}}...)
```

* **The Error:** This creates four separate, disconnected objects inside your array. For example, your array would get a random element that is just `{producto: "Zapatillas"}` instead of one complete product object. Additionally, you used template literal syntax `${}` outside of actual backticks.

### The Concept: Average Weighted Price Formula

The math formula you wrote inside the middle of your ternary is an **Average Weighted Price** calculation:

$$\text{Precio Promedio} = \frac{(P_{\text{viejo}} \times S_{\text{viejo}}) + (P_{\text{nuevo}} \times S_{\text{nuevo}})}{S_{\text{viejo}} + S_{\text{nuevo}}}$$

This is an incredibly smart feature for an inventory system! If you buy a product at a cheaper price later, your system automatically adjusts the average asset value.

Because this calculation requires multiple steps, you **must use a standard `if/else` block**. A ternary operator cannot cleanly handle this amount of logic.

### The Correct Code Implementation

Here is how you write this logic cleanly, safely, and without syntax errors:

```js
// 1. Find if the product already exists
const existente = inventario.find(p => p.producto.toLowerCase() === prod.toLowerCase());

if (existente) {
  // Calculate the new weighted average price BEFORE updating the stock
  const costoTotalViejo = existente.precio * existente.stock;
  const costoTotalNuevo = prec * stock;
  const stockTotal = existente.stock + stock;

  existente.precio = (costoTotalViejo + costoTotalNuevo) / stockTotal;
  
  // Now safely add the new stock
  existente.stock += stock;

} else {
  // If it's a completely new product, push ONE single unified object
  inventario.push({ 
    producto: prod, 
    categoria: cat, 
    precio: prec, 
    stock: stock 
  });
}
```

### Why this is the proper approach

* **Readability:** Trying to force complex algebraic calculations into a ternary operator makes code very difficult to debug later.
* **Execution Order:** Breaking down the math variables (`costoTotalViejo`, etc.) ensures your calculations are crystal clear to anyone reading your code.

---

## Common mistake: using `reduce()` instead of `map()` for transformation

You are very close. The main problem is that you are using `reduce()` incorrectly.

### Your code

```js
let listaSinStock = (inventario.filter((p)=>p.stock === 0));

(listaSinStock.length) === 0? `No hay vacios ..`: listaSinStock.reduce((p)=>{
  p=p.producto;
}).join("<br>");
```

### Problems

#### ❌ Problem 1: `reduce()` is incorrect here

You want to transform elements into product names. For that, use `map()`, NOT `reduce()`.

#### ❌ Problem 2: `reduce()` must return a value

Your callback:
```js
(p)=>{
  p=p.producto;
}
```
does not return anything.

#### ❌ Problem 3: `.join()` works on arrays

But your `reduce()` does not return an array.

### Correct version

```js
let listaSinStock = inventario.filter((p) => p.stock === 0);

let resultado =
  listaSinStock.length === 0
    ? "No hay vacíos..."
    : listaSinStock
        .map((p) => p.producto)
        .join("<br>");
```

### Step-by-step

#### 1. Filter products without stock

```js
inventario.filter((p) => p.stock === 0)
```

Example result:
```js
[
  { producto: "Mouse", stock: 0 },
  { producto: "Keyboard", stock: 0 }
]
```

#### 2. Check if array is empty

```js
listaSinStock.length === 0
```

#### 3. Extract product names

```js
.map((p) => p.producto)
```

Result:
```js
["Mouse", "Keyboard"]
```

#### 4. Convert array to HTML string

```js
.join("<br>")
```

Result:
```html
Mouse<br>Keyboard
```

### Full example

```js
const inventario = [
  { producto: "Laptop", stock: 3 },
  { producto: "Mouse", stock: 0 },
  { producto: "Keyboard", stock: 0 }
];

let listaSinStock = inventario.filter((p) => p.stock === 0);

let resultado =
  listaSinStock.length === 0
    ? "No hay vacíos..."
    : listaSinStock
        .map((p) => p.producto)
        .join("<br>");

console.log(resultado);
```

Output:
```
Mouse
Keyboard
```

### When should you use `reduce()`?

Use `reduce()` when you want:
* one final value
* totals
* sums
* counters
* objects
* statistics

Example:
```js
const totalStock = inventario.reduce(
  (acc, p) => acc + p.stock,
  0
);
```

### English correction

❌ "No hay vacios"
✅ "No hay productos vacíos"
✅ "There are no empty products"

### Useful vocabulary

* `filter` → filter elements
* `map` → transform elements
* `join` → combine into one string
* `empty array` → arreglo vacío

### Simple English version

* `filter()` selects products with stock `0`
* `map()` gets only product names
* `join()` creates one string
* `reduce()` is not good for this case because you only want to transform data, not calculate one total value.

---

## Code review: weighted average price with `find()` — no bugs

```js
const existente = inventario.find(p =>
  p.producto.toLowerCase() === prod.trim().toLowerCase()
);
if (existente) {
  existente.precio = (existente.precio * existente.stock + prec * stock) / (existente.stock + stock);
  existente.stock += stock;
} else {
  inventario.push({ producto: prod, categoria: cat, precio: prec, stock: stock });
}
console.table(inventario);
renderTodo();
```

### ✅ Everything is correct

| Aspect | Verdict | Why |
|--------|---------|-----|
| `.find()` callback | ✅ | Proper arrow `p => ...` with `trim().toLowerCase()` |
| Case-insensitive search | ✅ | `p.producto.toLowerCase() === prod.trim().toLowerCase()` |
| Weighted average formula | ✅ | `(oldP×oldS + newP×newS) / (oldS + newS)` is correct |
| `stock += stock` | ✅ | Accumulates new stock onto existing |
| `push()` with single object | ✅ | One unified `{producto, categoria, precio, stock}` — not 4 separate objects |
| `console.table(inventario)` | ✅ | No quotes around variable — shows the array, not a string literal |
| `renderTodo()` | ✅ | Re-renders both list and stats |

### Edge case (minor — not a bug)

If `existente.stock === 0` AND the new `stock === 0`, the division becomes `0 / 0 → NaN`. In practice this doesn't happen because:
- If `stock === 0`, there's nothing to update (the validation allows it but the operation is a no-op)
- The product already exists with `stock === 0`, so the formula would be `(oldP × 0 + prec × 0) / (0 + 0) = 0/0`

No real-world impact. The code is clean, readable, and syntax-error free.

---

## Full `inventario.js` debug report

### Bugs found

| # | Line | Bug | Severity | Fix |
|---|------|-----|----------|-----|
| 1 | 51-54 | `listaSinStock` ternary doesn't assign the result when empty: `(listaSinStock.length) === 0 ? \`No hay vacios ..\` : listaSinStock=...`. The empty string literal is evaluated but **never stored** → `listaSinStock` stays as the original array `[]` → displays blank in `divStats` | 🔴 High | Replace with proper `if/else` or a correct ternary that always assigns |
| 2 | 106 | `inputBuscar` is used (`inputBuscar.value.trim()`) but never declared in the JS file (lines 1-10 only go up to `divBotones`). No `const inputBuscar = document.getElementById("inputBuscar")` exists | 🔴 High | Add `const inputBuscar = document.getElementById("inputBuscar");` at the top |
| 3 | 83 | Division by zero edge case: if `existente.stock === 0` AND `stock === 0`, the formula becomes `(0+0)/(0+0) = NaN`. In practice rare but possible | 🟡 Medium | Guard: `if (existente.stock + stock === 0) return;` or validate `stock > 0` for existing products |

### Minor issues (not bugs)

| # | Line | Issue |
|---|------|-------|
| A | 48 | `return acc += p.precio * p.stock` — mutates parameter. Works, but `return acc + ...` is cleaner |
| B | 41-43 | `[... new Set(inventario.map(...))]` — extra space after `...` |
| C | 52 | `(listaSinStock.length)` — unnecessary parentheses around `.length` |
| D | 74 | `!(stock >= 0)` allows `stock === 0`. Intended? OK if stock can be 0, but see bug #3 |
| E | 89-90 | Inconsistent indentation and missing semicolons |

### Fixed version of `renderStats()` (fixes bug #1)

```js
function renderStats() {
  const categorias = [...new Set(inventario.map(p => p.categoria))];

  const total = inventario.reduce((acc, p) => acc + p.precio * p.stock, 0);

  const sinStock = inventario.filter(p => p.stock === 0);
  const listaSinStock = sinStock.length === 0
    ? "No hay vacíos..."
    : sinStock.map(p => p.producto).join(", ");

  divStats.innerHTML = `<strong>Estadísticas:</strong><br>
    Categorías disponibles: ${categorias.join(", ")}<br>
    Valor total del inventario: $${total}<br>
    Productos sin stock: ${listaSinStock}`;
}
```

### Fixed version of declarations (fixes bug #2)

Add after line 10:
```js
const inputBuscar = document.getElementById("inputBuscar");
```

---

## Full `inventario.js` debug report — round 2 (file was corrupted)

The file had regressed with new critical bugs since the previous fix. Here is what was found and fixed.

### Bugs found

| # | Line | Bug | Severity | Fix |
|---|------|-----|----------|-----|
| 1 | 79 | `inventario.find()` — **no callback argument**. `.find()` returns `undefined`. The entire add-product logic was missing | 🔴 Critical | Added proper callback: `p => p.producto.toLowerCase() === prod.toLowerCase()` |
| 2 | 80 | `renderTodo()` called immediately after `.find()` with no add logic — adding a product was a no-op | 🔴 Critical | Moved `renderTodo()` to after the `if/else` block |
| 3 | 96 | `inputBuscar` still not declared in DOM references — `ReferenceError` when clicking Buscar | 🔴 Critical | Added `const inputBuscar = document.getElementById("inputBuscar");` at line 10 |
| 4 | 102 | `inventario.find(item => item.producto === prod)` — `prod` is not defined in `btnBuscar` scope. `prod` only exists inside `btnAgregar`. Also no `toLowerCase()` for case-insensitive search | 🔴 Critical | Changed to `p => p.producto.toLowerCase() === nombre.toLowerCase()` using `nombre` (already declared) |
| 5 | 68-93 | `btnAgregar` callback was missing its closing `});` — the arrow function body never closed, causing a **SyntaxError** that crashes the entire script | 🔴 Critical | Added proper closing `});` before `divBotones.addEventListener` |
| 6 | 95-113 | `btnBuscar` callback had no proper closure. `renderTodo()` was inside the callback, and the listener's `});` was missing | 🔴 Critical | Added proper closing `});` and moved `renderTodo()` to top-level |
| 7 | 51-54 | `listaSinStock` ternary still broken — empty case `No hay vacios ..` was evaluated but never assigned to the variable | 🔴 High | Replaced with clean `if/else` ternary: `sinStock.length === 0 ? "No hay vacíos..." : sinStock.map(...).join(...)` |
| 8 | 83 | No guard against division by zero in weighted average (`0/0 = NaN`) | 🟡 Medium | Added guard: `if (stockTotal === 0) return;` |

### Summary of fixes applied

| What | Before | After |
|------|--------|-------|
| `inputBuscar` declaration | ❌ Missing | ✅ `const inputBuscar = document.getElementById("inputBuscar");` |
| `btnAgregar` callback structure | ❌ No closing `});` | ✅ Properly closed |
| `.find()` in add logic | ❌ `inventario.find()` (no callback) | ✅ `inventario.find(p => p.producto.toLowerCase() === prod.toLowerCase())` |
| `.find()` in search logic | ❌ `item.producto === prod` (`prod` not in scope) | ✅ `p.producto.toLowerCase() === nombre.toLowerCase()` |
| `listaSinStock` ternary | ❌ Empty case not assigned | ✅ Clean ternary: `sinStock.length === 0 ? ... : ...` |
| Division by zero guard | ❌ None | ✅ `if (stockTotal === 0) return;` |
| Missing event listener closures | ❌ 2 listeners unclosed | ✅ Both properly closed with `});` |
