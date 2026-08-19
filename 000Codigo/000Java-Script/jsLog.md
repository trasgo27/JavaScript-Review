# JS Log — Errores de Fetch, Headers y Autenticacion

Registro de problemas encontrados en las sesiones de debug de los ejercicios
`02Ej.js` (Content-Type y body JSON) y `03Ej.js` (Token de autorizacion).

---

## 1. Response vs Datos Parseados

El error mas frecuente: confundir el **objeto Response** que retorna `fetch()`
con los **datos JSON** que contiene el body.

### 1.1 `respuesta.ok` vs `datos.ok`

```javascript
// ❌ Error: datos es el JSON parseado, no tiene .ok
const datos = await fetch(url).then(r => r.json());
if (datos.ok) { ... }  // undefined — no existe en el JSON

// ❌ Error: intentar .ok en Response sin parsear
const respuesta = await fetch(url);
console.log(respuesta.title);  // undefined — Response no tiene title

// ✅ Correcto: separar Response de datos
const respuesta = await fetch(url);
const datos = await respuesta.json();
if (respuesta.ok) { ... }   // true/false — estado HTTP
console.log(datos.title);   // "..." — contenido del JSON
```

**Leccion:** El Response tiene metadatos HTTP (`.ok`, `.status`, `.headers`).
Los datos parseados tienen el contenido real. Son dos objetos distintos.

---

### 1.2 No llamar `.json()` en la respuesta

```javascript
// ❌ Error: fetch retorna Response, no JSON
const datos = await fetch(url);
console.log(datos.title);  // undefined — es un Response, no datos

// ❌ Error: olvidar await en .json()
const datos = fetch(url).json();  // Promise pendiente, no datos

// ✅ Correcto
const res = await fetch(url);
const datos = await res.json();
console.log(datos.title);
```

**Leccion:** `fetch()` retorna un **Response object**. Para obtener el JSON
necesitas llamar `.json()`, que a su vez es una Promise que requiere `await`.

---

### 1.3 `console.table()` con strings en vez de objetos

```javascript
// ❌ Error: mostrar strings con table
const nombres = ['Ana', 'Luis', 'Maria'];
console.table(nombres);
// Muestra una tabla fea sin sentido

// ✅ Correcto: table es para arrays de objetos
const usuarios = [
  { id: 1, nombre: 'Ana' },
  { id: 2, nombre: 'Luis' },
  { id: 3, nombre: 'Maria' }
];
console.table(usuarios);
// Muestra tabla con columnas id y nombre
```

**Leccion:** `console.table()` esta disenado para arrays de objetos. Para
strings usa `console.log()`.

---

## 2. Headers — Content-Type y Autenticacion

### 2.1 Headers vacios — olvidar Content-Type

```javascript
// ❌ Error: sin Content-Type, el servidor no sabe que envias JSON
const res = await fetch(url, {
  method: 'POST',
  headers: {},  // Vacio
  body: JSON.stringify({ title: 'Nuevo post' })
});

// ✅ Correcto: especificar Content-Type
const res = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ title: 'Nuevo post' })
});
```

**Leccion:** Al enviar JSON con POST/PUT, **siempre** incluye
`'Content-Type': 'application/json'` en los headers.

---

### 2.2 `'Autorizacion'` en vez de `'Authorization'`

```javascript
// ❌ Error: nombre incorrecto del header
headers: {
  'Autorizacion': `Bearer ${token}`   // No existe este header
}

// ✅ Correcto: en ingles, exactamente
headers: {
  'Authorization': `Bearer ${token}`  // Header estandar
}
```

**Leccion:** Los headers HTTP estan en ingles. `'Authorization'` es el
nombre estandar. `'Autorizacion'` simplemente no hace nada.

---

### 2.3 `charset:UTF-8` con dos puntos en vez de `=`

```javascript
// ❌ Error: sintaxis incorrecta
'Content-Type': 'application/json:charset:UTF-8'

// ✅ Correcto: charset va despues de ; y con =
'Content-Type': 'application/json;charset=UTF-8'
```

**Leccion:** El formato del Content-Type es:
`tipo/subtipo;parametro=valor`. Los dos puntos `:` no son validos aqui.

---

## 3. Spread Operator en Headers

El error mas sutil y dificil de detectar.

### 3.1 `{aut}` shorthand anida headers incorrectamente

```javascript
const auth = { 'Authorization': `Bearer ${token}` };

// ❌ Error: crea un objeto anidado
headers: {
  'Content-Type': 'application/json',
  auth   // → auth: { 'Authorization': 'Bearer ...' }  ← NESTED
}

// Resultado JSON de headers:
// { "Content-Type": "application/json",
//   "auth": { "Authorization": "Bearer ..." } }  ← MAL
```

### 3.2 Solucion: spread operator `...`

```javascript
const auth = { 'Authorization': `Bearer ${token}` };

// ✅ Correcto: spread para mergear
headers: {
  'Content-Type': 'application/json',
  ...auth   // → 'Authorization': 'Bearer ...'  ← FLAT
}

// Resultado JSON de headers:
// { "Content-Type": "application/json",
//   "Authorization": "Bearer ..." }  ← BIEN
```

### 3.3 Spread manual (sin variable)

```javascript
// ✅ Alternativa: escribir todo directamente
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
}
```

**Leccion:** `{ ...objeto }` copia las propiedades a nivel plano.
`{ objeto }` crea una nueva propiedad cuyo nombre es el de la variable y
cuyo valor es el objeto completo (anidacion).

---

## 4. `throw Error()` sin `new`

```javascript
// ❌ Error: Error() sin new es comportamiento indefinido
throw Error('No autorizado');

// ✅ Correcto: siempre usar new
throw new Error('No autorizado');
```

**Leccion:** `throw` requiere un objeto Error. Sin `new`, el comportamiento
de `Error()` como funcion no constructor puede variar entre entornos.

---

## 5. Async/Await — Cuando usar y cuando no

### 5.1 Falta `await` en llamadas a funciones async

```javascript
async function obtenerUsuario(id) {
  const res = await fetch(`/api/users/${id}`);
  return await res.json();
}

// ❌ Error: olvidar await
function ejecutar() {
  const usuario = obtenerUsuario(1);  // Promise, no datos
  console.log(usuario.name);          // undefined
}

// ✅ Correcto
async function ejecutar() {
  const usuario = await obtenerUsuario(1);
  console.log(usuario.name);
}
```

**Leccion:** Las funciones `async` siempre retornan una Promise. Si no
usas `await`, recibes la Promise, no el valor resuelto.

---

### 5.2 `await` innecesario en funciones sincronas

```javascript
// ❌ Error: await en console.log (sincrono)
await console.log('Hola');  // await innecesario

// ❌ Error: await en JSON.stringify (sincrono)
const json = await JSON.stringify(datos);  // await innecesario

// ❌ Error: await en localStorage (sincrono)
const token = await localStorage.getItem('token');  // await innecesario

// ✅ Correcto: sin await en funciones sincronas
console.log('Hola');
const json = JSON.stringify(datos);
const token = localStorage.getItem('token');
```

**Leccion:** `await` solo es necesario en **Promises**. Las funciones
sincronas (`console.log`, `JSON.stringify`, `localStorage.getItem`) no
necesitan ni admiten `await`.

---

### 5.3 `async` innecesario en funciones sincronas

```javascript
// ❌ Error: async en funcion que solo usa localStorage
async function guardarToken(token) {
  localStorage.setItem('token', token);  // sincrono
}

// ✅ Correcto: solo si usas await internamente
function guardarToken(token) {
  localStorage.setItem('token', token);
}
```

**Leccion:** `async` solo es necesario cuando la funcion contiene `await`.
Si todo el codigo es sincrono, `async` es overhead innecesario.

---

### 5.4 `fechear()` wrapper innecesario — sobrecomplejidad

```javascript
// ❌ Error: wrapper que no aporta nada
async function fechear(url, options) {
  const res = await fetch(url, options);
  return res;
}

const datos = await fechear(url);
```

**Leccion:** No envuelvas `fetch()` en otra funcion a menos que agregue
valor real (retry, logging, transformacion). Un wrapper vacio solo agrega
complejidad innecesaria.

---

## 6. Variables y Scope

### 6.1 `document.localStorage` — localStorage es global

```javascript
// ❌ Error: localStorage no es propiedad de document
const token = document.localStorage.getItem('token');

// ✅ Correcto: localStorage es un objeto global
const token = localStorage.getItem('token');
```

**Leccion:** `localStorage` y `sessionStorage` son objetos globales del
navegador. No pertenecen a `document`. A diferencia de `document.getElementById`,
estos no requieren prefijo.

---

### 6.2 Variable shadowing — `const post` sombrea parametro `post`

```javascript
// ❌ Error: const post sombrea el parametro post
async function actualizarPost(post) {
  const res = await fetch(`/api/posts/${post.id}`);
  const post = await res.json();  // SyntaxError + shadowing
  console.log(post.title);
}

// ✅ Correcto: renombrar una de las dos
async function actualizarPost(post) {
  const res = await fetch(`/api/posts/${post.id}`);
  const postActualizado = await res.json();  // nombre diferente
  console.log(postActualizado.title);
}
```

**Leccion:** No puedes declarar `const` con el mismo nombre que un
parametro en el mismo scope. Ademas, shadowing causa confusion porque
hay dos variables con el mismo nombre y significados diferentes.

---

### 6.3 Key inconsistente en localStorage

```javascript
// ❌ Error: usar claves diferentes para guardar y leer
localStorage.setItem('auth_token', token);
const saved = localStorage.getItem('token');  // null — clave distinta

// ✅ Correcto: misma clave siempre
localStorage.setItem('auth_token', token);
const saved = localStorage.getItem('auth_token');  // funciona
```

**Leccion:** `localStorage` es un key-value store estricto. Las claves
son case-sensitive y no hay autocompletado. Define una constante para
la clave y reutilizala.

---

## 7. Sintaxis de Objetos y Fetch

### 7.1 Body en requests GET — innecesario

```javascript
// ❌ Error: GET no deberia tener body
const res = await fetch('/api/posts', {
  method: 'GET',
  body: JSON.stringify({ id: 1 })  // Ignorado por el servidor
});

// ✅ Correcto: GET sin body
const res = await fetch('/api/posts/1');
```

**Leccion:** Los metodos GET y HEAD no deben tener body. El servidor lo
ignora. Si necesitas parametros, usa query strings: `/api/posts?id=1`.

---

### 7.2 Sintaxis rota del objeto fetch — comas faltantes

```javascript
// ❌ Error: comas faltantes entre propiedades
const res = await fetch(url, {
  method: 'POST'
  headers: { 'Content-Type': 'application/json' }  // Falta coma arriba
  body: JSON.stringify(data)                        // Falta coma arriba
})

// ✅ Correcto: comas entre cada propiedad
const res = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
```

### 7.3 Objetos adyacentes sin coma

```javascript
// ❌ Error: dos objetos literales juntos sin separador
headers: {
  'Content-Type': 'application/json'
} {
  'Authorization': `Bearer ${token}`
}

// ✅ Correcto: un solo objeto con todas las propiedades
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
}
```

**Leccion:** Revisa siempre las comas entre propiedades de un objeto.
Un error de coma produce errores sintacticos confusos.

---

## 8. Resumen — Tabla de Errores Comunes

| # | Error | Ejercicio | Solucion |
|---|-------|-----------|----------|
| 1 | `datos.ok` en vez de `respuesta.ok` | 02 | Separar Response de datos parseados |
| 2 | `console.table()` con strings | 02 | Usar solo con arrays de objetos |
| 3 | Headers vacios sin Content-Type | 02 | Siempre incluir `'Content-Type': 'application/json'` |
| 4 | No llamar `.json()` en Response | 02 | `await res.json()` despues de `await fetch()` |
| 5 | `throw Error()` sin `new` | 02 | Siempre usar `throw new Error()` |
| 6 | Falta `await` en funciones async | 02 | Agregar `await` antes de llamadas a funciones async |
| 7 | `await console.log(...)` | 02 | No usar `await` en funciones sincronas |
| 8 | `document.localStorage` | 03 | `localStorage` es global, no de `document` |
| 9 | `async` en funciones sincronas | 03 | Solo usar `async` cuando hay `await` interno |
| 10 | `'Autorizacion'` en vez de `'Authorization'` | 03 | Headers HTTP en ingles exacto |
| 11 | `{aut}` anida headers (sin spread) | 03 | Usar spread: `{ ...aut }` — copia plano |
| 12 | `const post` sombrea parametro | 03 | Renombrar una de las variables |
| 13 | `body` en requests GET | 03 | GET no lleva body |
| 14 | Key inconsistente en localStorage | 03 | Usar constante para la clave |
| 15 | Sintaxis rota — comas faltantes | 03 | Revisar comas entre propiedades |
| 16 | `await JSON.stringify()` | 03 | `JSON.stringify` es sincrono |
| 17 | `fechear()` wrapper innecesario | 03 | No sobrecomplejar con wrappers vacios |
| 18 | `charset:UTF-8` con `:` | 03 | Usar `charset=UTF-8` con `=` |

---

## 9. Spread Operator en Objetos — Merge de Propiedades

El spread operator (`...`) copia las **propiedades** de un objeto a nivel plano dentro de otro objeto.

### 9.1 Spread para mergear objetos

```javascript
const auth = { 'Authorization': 'Bearer token123' };

// ✅ Correcto: spread copia las propiedades a nivel plano
headers: {
  'Content-Type': 'application/json',
  ...auth   // → 'Authorization': 'Bearer token123'
}

// Resultado:
// { "Content-Type": "application/json",
//   "Authorization": "Bearer token123" }
```

### 9.2 Sin spread — crea objeto anidado (ERROR)

```javascript
const auth = { 'Authorization': 'Bearer token123' };

// ❌ Error: sin spread, crea un objeto anidado
headers: {
  'Content-Type': 'application/json',
  auth   // → auth: { Authorization: 'Bearer ...' }  ← ANIDADO
}

// Resultado:
// { "Content-Type": "application/json",
//   "auth": { "Authorization": "Bearer ..." } }  ← MAL
```

### 9.3 Regla de oro

| Sintaxis | Resultado |
|----------|-----------|
| `{ ...objeto }` | Copia propiedades a nivel plano ✅ |
| `{ objeto }` | Crea objeto anidado ❌ |

**Leccion:** El spread operator en objetos funciona igual que en arrays — desempaqueta las propiedades y las copia directamente al nuevo objeto. Es la forma moderna de mergear objetos en JavaScript (desde ES2018).

---

## 10. Checklist de Debug — Fetch y API

Cuando trabajes con `fetch()`, verifica:

- [ ] `fetch()` retorna un **Response**, necesitas `.json()` para datos
- [ ] `await` antes de `fetch()` **y** antes de `.json()`
- [ ] `'Content-Type': 'application/json'` al enviar JSON
- [ ] `'Authorization': 'Bearer ...'` para autenticacion
- [ ] Spread `...objeto` para mergear headers (no `{ objeto }`)
- [ ] `throw new Error()` — nunca sin `new`
- [ ] `await` solo en Promises, nunca en `console.log`, `JSON.stringify` o `localStorage`
- [ ] `localStorage` es global, no `document.localStorage`
- [ ] No repetir nombres de variables (shadowing)
- [ ] GET no lleva body
- [ ] Comas entre todas las propiedades de un objeto
- [ ] Spread en objetos: `{ ...obj }` copia plano, `{ obj }` anida

---

*Fecha: 18 de julio de 2026*
*Ejercicios: 02Ej.js (Content-Type/JSON) y 03Ej.js (Token/Auth)*
