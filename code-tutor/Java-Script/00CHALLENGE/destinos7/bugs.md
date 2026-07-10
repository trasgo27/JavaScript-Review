## Bug 1 (CRÍTICO): `catalogo.push[{...}]` — Error de sintaxis/ejecución

**Archivo:** `destinos.js:22`  
`push` es un método, debe usarse con paréntesis `()`, no con corchetes `[]`.

```js
// Actual (no agrega nada, retorna undefined):
catalogo.push[{ destino, continente }];

// Correcto:
catalogo.push({ destino, continente });
```

Usar `push[{...}]` trata `push` como acceso de propiedad por bracket notation, lo que devuelve `undefined` y el objeto **nunca se agrega al array**.

---

## Bug 2 (LÓGICA): `const unico = true` — El check de duplicados está hardcodeado

**Archivo:** `destinos.js:17-19`  
`unico` siempre es `true`, por lo que `if(!unico)` jamás se cumple. La funcionalidad de evitar destinos repetidos no está implementada; falta lógica que recorra `catalogo` y compare con el nuevo valor.

---

## Bug 3 (MENOR): `function agregar(){}` está vacía y su llamada está comentada

**Archivo:** `destinos.js:7-8, 21`  
La función existe pero no hace nada y no se invoca. No es un bug funcional, pero es código muerto.

---

## Bug 4 (MENOR, CONTEXTO): No hay `e.preventDefault()`

**Archivo:** `destinos.js:9`  
Si el botón estuviera dentro de un `<form>`, el click recargaría la página. En este HTML es un `<button>` independiente, así que no hay impacto, pero es una buena práctica para robustez.

---

**Resumen:** El bug principal es que `push[{...}]` no agrega nada al catálogo — los nuevos destinos se pierden en silencio.

---

## Bug 1 (CRITICAL): `catalogo.push[{...}]` — Syntax/runtime error

**File:** `destinos.js:22`  
`push` is a method and must be called with parentheses `()`, not brackets `[]`.

```js
// Actual (does nothing, returns undefined):
catalogo.push[{ destino, continente }];

// Correct:
catalogo.push({ destino, continente });
```

Using `push[{...}]` treats `push` as a property access via bracket notation, which returns `undefined` and the object **never gets added to the array**.

---

## Bug 2 (LOGIC): `const unico = true` — Duplicate check is hardcoded

**File:** `destinos.js:17-19`  
`unico` is always `true`, so `if(!unico)` never executes. The duplicate prevention logic is missing — there is no code to iterate `catalogo` and compare against the new value.

---

## Bug 3 (MINOR): `function agregar(){}` is empty and its call is commented out

**File:** `destinos.js:7-8, 21`  
The function exists but does nothing and is never invoked. Not a functional bug, but dead code.

---

## Bug 4 (MINOR, CONTEXT): Missing `e.preventDefault()`

**File:** `destinos.js:9`  
If the button were inside a `<form>`, clicking it would reload the page. In this HTML it is a standalone `<button>`, so there is no impact, but adding it is good practice for robustness.

---

**Summary:** The main bug is that `push[{...}]` silently fails to add anything to the catalog — new destinations are lost without error.
