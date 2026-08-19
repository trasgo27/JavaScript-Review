# Response Body is Usable Once — Teoría y Ejercicios

## Contenido

1. [¿Qué es un Response body?](#1-qué-es-un-response-body)
2. [¿Por qué solo se puede leer una vez?](#2-por-qué-solo-se-puede-leer-una-vez)
3. [Response vs Datos JSON: la diferencia clave](#3-response-vs-datos-json-la-diferencia-clave)
4. [Métodos para leer el body](#4-métodos-para-leer-el-body)
5. [¿Qué pasa internamente cuando lees el body?](#5-qué-pasa-internamente-cuando-lees-el-body)
6. [Cómo solucionar el problema: `.clone()` y re-fetch](#6-cómo-solucionar-el-problema-clone-y-re-fetch)
7. [Ejercicios progresivos](#7-ejercicios-progresivos)

---

## 1. ¿Qué es un Response body?

Cuando haces `fetch()`, el resultado no es directamente un objeto JSON. Es un **objeto `Response`** que contiene metadatos (headers, status, etc.) y un **body** (cuerpo) que aún no ha sido leído.

```
fetch('https://api.ejemplo.com/datos')
  ↓
Promise se resuelve con un objeto Response
  ↓
Response tiene: { status, ok, headers, body, ... }
  ↓
El body es un ReadableStream — un flujo de datos crudo
  ↓
Tú debes "leer" el body con .json(), .text(), etc.
```

El **body** es como un tubo por donde viajan los datos. Una vez que lo lees, el tubo se vacía y no puedes leerlo de nuevo.

---

## 2. ¿Por qué solo se puede leer una vez?

Esto es lo que mucha gente no entiende. El body de un `Response` es un **ReadableStream** (flujo legible). Los flujos están diseñados para:

- **Eficiencia de memoria**: no almacenan los datos en un buffer interno una vez procesados.
- **Procesamiento en cascada**: cada consumidor recibe los datos sin copiarlos.
- **Seguridad**: no se duplican datos innecesariamente en memoria.

Una vez que llamaste a `.json()`, `.text()` o cualquier método de lectura:

1. Los bytes del body se procesan y se transforman en un valor (objeto, string, etc.).
2. El stream se **cierra** (se consume).
3. Si intentas leer de nuevo → **error**.

```
body = fetch().then(res => res)
               ↓
         body es ReadableStream (lleno de datos)
               ↓
      res.json() ← lee y vacía el stream
               ↓
         body está vacío (consumido)
               ↓
      res.json() ← intento de leer stream vacío
               ↓
         ❌ Error: "body is unusable"
```

---

## 3. Response vs Datos JSON: la diferencia clave

Muchos confunden el objeto `Response` con los datos JSON. Son cosas **totalmente distintas**:

```js
const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');

// res es un objeto Response (no son los datos)
console.log(res);           // Response { ok: true, status: 200, ... }
console.log(typeof res);    // "object"
console.log(res.ok);        // true
console.log(res.status);    // 200

// res.json() devuelve una PROMESA que resuelve con los datos reales
const datos = await res.json();

console.log(datos);         // { userId: 1, id: 1, title: "...", completed: false }
console.log(typeof datos);  // "object"
console.log(datos.title);   // "delectus aut autem"
```

**Tabla comparativa:**

| Aspecto | `Response` (res) | Datos JSON |
|---|---|---|
| ¿Qué es? | Objeto wrapper con metadata | Los datos reales de la API |
| ¿Tiene body? | Sí (ReadableStream) | No, ya es un objeto JS |
| ¿Se puede leer 1 vez? | El body, sí | Se puede usar cuantas veces quieras |
| Métodos disponibles | `.json()`, `.text()`, `.blob()`, `.clone()`, `.ok`, `.status` | Cualquier operación de JS normal |
| Ejemplo | `res.ok === true` | `datos.userId === 1` |

**El error típico:**

```js
const res = await fetch('https://api.ejemplo.com/datos');

// Intento 1: funciona
const datos1 = await res.json();    // ← consume el body
console.log(datos1);

// Intento 2: ERROR
const datos2 = await res.json();    // ❌ TypeError: Failed to fetch / body is unusable
```

---

## 4. Métodos para leer el body

El objeto `Response` ofrece varios métodos para consumir el body. Cada uno transforma los bytes en un tipo diferente:

### `.json()` — Parsea como JSON

```js
const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
const datos = await res.json();  // Object { userId: 1, id: 1, title: "...", completed: false }
```

### `.text()` — Devuelve un string

```js
const res = await fetch('https://httpbin.org/html');
const html = await res.text();  // "<html><body><h1>Herman Melville - MobyDick...</h1></body></html>"
```

### `.blob()` — Devuelve un Blob (archivos binarios)

```js
const res = await fetch('https://httpbin.org/image/png');
const imagen = await res.blob();  // Blob { size: 8090, type: "image/png" }

// Crear URL temporal para mostrar la imagen
const url = URL.createObjectURL(imagen);
document.getElementById('img').src = url;
```

### `.arrayBuffer()` — Devuelve un ArrayBuffer (datos binarios crudos)

```js
const res = await fetch('https://httpbin.org/image/png');
const buffer = await res.arrayBuffer();  // ArrayBuffer { byteLength: 8090 }

// Acceder a los bytes individuales
const bytes = new Uint8Array(buffer);
console.log(bytes[0]);  // primer byte del archivo
```

### `.formData()` — Parsea como FormData

```js
const res = await fetch('https://httpbin.org/formdata');
const form = await res.formData();  // FormData
```

### Lectura como stream (avanzado)

```js
const res = await fetch('https://httpbin.org/html');
const reader = res.body.getReader();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  console.log(value);  // Uint8Array con un chunk del stream
}
```

> **IMPORTANTE**: Todos estos métodos **consumen el body**. Solo puedes usar UNO por Response.

---

## 5. ¿Qué pasa internamente cuando lees el body?

Paso a paso de lo que ocurre cuando ejecutas `res.json()`:

```
Paso 1: Llamas a res.json()
         │
         ▼
Paso 2: JavaScript lee los bytes del ReadableStream
         │
         ▼
Paso 3: Decodifica los bytes como UTF-8 (string)
         │
         ▼
Paso 4: Parsea el string como JSON → convierte a objeto JS
         │
         ▼
Paso 5: Resuelve la promesa con el objeto
         │
         ▼
Paso 6: El stream se marca como "consumido" (closed)
         │
         ▼
Paso 7: Ya no hay datos para leer → segundo intento = ERROR
```

**Ejemplo visual del ciclo de vida:**

```
ANTES DE LEER:
┌──────────────────────────────┐
│  Response Body               │
│  ┌────────────────────────┐  │
│  │ bytes: [7B,22,75,73...]│  │  ← lleno de datos
│  └────────────────────────┘  │
│  Estado: OPEN (listo)        │
└──────────────────────────────┘

DESPUÉS DE .json():
┌──────────────────────────────┐
│  Response Body               │
│  ┌────────────────────────┐  │
│  │ bytes: []               │  │  ← vacío
│  └────────────────────────┘  │
│  Estado: CLOSED (consumido)  │
└──────────────────────────────┘
        │
        └─→ El valor retornado fue: { userId: 1, id: 1, ... }
```

---

## 6. Cómo solucionar el problema: `.clone()` y re-fetch

### Solución A: `.clone()` — Duplicar el Response antes de leer

El método `.clone()` crea una **copia exacta** del Response **antes** de que sea consumido. Ambas copias tienen su propio body independiente.

```js
const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');

// Clonar ANTES de leer
const copia = res.clone();

// Leer la copia original
const datos1 = await res.json();    // ✅ funciona
console.log('Original:', datos1);

// Leer la copia (body independiente, no consumido)
const datos2 = await copia.json();  // ✅ también funciona
console.log('Copia:', datos2);
```

**Regla de oro**: `.clone()` DEBE llamarse ANTES de leer el body. Si el body ya fue consumido, `.clone()` también falla.

```js
const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');

const datos1 = await res.json();    // ← consume el body
const copia = res.clone();          // ❌ Error: body already used
```

### Solución B: Re-fetch — Volver a hacer la petición

Si ya perdiste el body, la única opción es hacer un nuevo `fetch`:

```js
const url = 'https://jsonplaceholder.typicode.com/todos/1';
const res1 = await fetch(url);
const datos1 = await res1.json();  // ← consume el body

// Oops, necesito los datos de nuevo...
const res2 = await fetch(url);     // ← nueva petición HTTP
const datos2 = await res2.json();  // ✅ funciona, pero hiciste 2 peticiones
```

> **Desventaja**: esto genera tráfico de red innecesario y puede causar rate-limiting en APIs reales.

### Solución C: Almacenar el resultado (patrón más común)

```js
const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
const datos = await res.json();  // ← consume el body

// Ahora tienes los datos en memoria, úsalos cuantas veces quieras
console.log(datos.title);        // ✅
console.log(JSON.stringify(datos)); // ✅
console.log(datos.userId);       // ✅
```

**Resumen de soluciones:**

| Solución | Cuándo usarla | Ventaja | Desventaja |
|---|---|---|---|
| `.clone()` | Cuando necesitas leer el body 2+ veces | No genera nueva petición | Consumo extra de memoria |
| Re-fetch | Cuando ya consumiste el body | Simple | 2+ peticiones HTTP |
| Almacenar resultado | Cuando solo necesitas el objeto | Sin overhead | No tienes el Response original |

---

## 7. Ejercicios progresivos

### Ejercicio 1: Entender que `.json()` consume el body

**Objetivo**: Experimentar en carne propia el error "body is unusable".

**Instrucciones**: Copia el siguiente código en tu consola (F12 → Console) y ejecútalo. Observa qué pasa.

```js
console.log('=== Ejercicio 1: .json() consume el body ===');

async function ejercicio1() {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');

    // Intento 1: debería funcionar
    console.log('--- Primer intento ---');
    const datos1 = await res.json();
    console.log('Datos:', datos1);

    // Intento 2: debería FALLAR
    console.log('--- Segundo intento ---');
    try {
        const datos2 = await res.json();  // ← Esto falla
        console.log('Datos:', datos2);
    } catch (error) {
        console.error('Error capturado:', error.message);
        console.log('El body ya fue consumido por el primer .json()');
    }
}

ejercicio1();
```

**Preguntas para reflexionar:**

1. ¿Qué imprime el primer intento? ¿Los datos son un objeto o algo más?
2. ¿Qué tipo de error lanza el segundo intento?
3. Si en vez de `res.json()` usaras `res.text()`, ¿el segundo `.json()` funcionaría?

**Tu propio experimento**: Modifica el código para intentar hacer `.text()` después de `.json()`. ¿Qué pasa?

---

### Ejercicio 2: Usar `.clone()` para leer el body dos veces

**Objetivo**: Aprender a duplicar un Response antes de consumirlo.

**Instrucciones**: Escribe el código que haga funcionar ambas lecturas sin errores.

```js
console.log('=== Ejercicio 2: Duplicar con .clone() ===');

async function ejercicio2() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users/1');

    // TODO: Clona el Response ANTES de leer
    const copia = /* TU CÓDIGO AQUÍ: clona el response */;

    // Leer el body original
    const datosOriginales = await res.json();
    console.log('Original:', datosOriginales.name);

    // Leer la copia (debería funcionar porque tiene body propio)
    const datosCopia = await copia.json();
    console.log('Copia:', datosCopia.name);

    // Verificar que son iguales
    console.log('¿Son iguales?', datosOriginales.id === datosCopia.id);
}

ejercicio2();
```

**Pistas:**

```js
// 💡 Pista: El método para clonar es:
//   const copia = res.clone();
//
// ⚠️ OBLIGATORIO: Debe ir ANTES de cualquier .json() o .text()
// De lo contrario, fallará igual que antes.
//
// Ejemplo completo:
//   const res = await fetch(url);
//   const copia = res.clone();
//   const datos1 = await res.json();    // consume original
//   const datos2 = await copia.json();  // consume copia
```

**Experimento extra**: Intenta clonar DESPUÉS de hacer `.json()`. ¿Qué error obtienes?

---

### Ejercicio 3: Re-fetch con URLs extraídas

**Objetivo**: Practicar el patrón de extraer datos de una primera petición y usarlos para hacer nuevas peticiones.

**Contexto**: La API de JSONPlaceholder permite buscar posts por ID. Vamos a:
1. Obtener un post
2. Extraer el `userId` del post
3. Hacer fetch del usuario dueño de ese post

```js
console.log('=== Ejercicio 3: Re-fetch con URLs extraídas ===');

async function ejercicio3() {
    // Paso 1: Obtener un post específico
    const postRes = await fetch('https://jsonplaceholder.typicode.com/posts/5');
    const post = await postRes.json();
    console.log('Post:', post.title);
    console.log('UserId del post:', post.userId);

    // Paso 2: Construir la URL del usuario
    const usuarioUrl = `https://jsonplaceholder.typicode.com/users/${post.userId}`;
    console.log('URL del usuario:', usuarioUrl);

    // TODO: Hacer fetch del usuario usando la URL construida
    const usuarioRes = /* TU CÓDIGO AQUÍ: fetch de usuarioUrl */;
    const usuario = /* TU CÓDIGO AQUÍ: leer como .json() */;

    console.log('Autor del post:', usuario.name);
    console.log('Email del autor:', usuario.email);
    console.log('Empresa del autor:', usuario.company.name);
}

ejercicio3();
```

**Pistas:**

```js
// 💡 Pista 1: El fetch es igual que siempre
//   const usuarioRes = await fetch(usuarioUrl);
//   const usuario = await usuarioRes.json();
//
// 💡 Pista 2: La variable usuarioUrl ya contiene la URL completa
//   "https://jsonplaceholder.typicode.com/users/5"
//
// 💡 Pista 3: La estructura de un usuario de JSONPlaceholder es:
//   {
//     id: 5,
//     name: "Chelsey Dietrich",
//     username: "Kamren",
//     email: "Lucio_Hettinger@annie.ca",
//     phone: "(254)954-1289",
//     website: "demarco.info",
//     company: { name: "Keebler LLC", ... }
//   }
```

**Desafío extra**: Modifica el código para también obtener los comentarios del post. La URL sería: `https://jsonplaceholder.typicode.com/posts/5/comments`

---

### Ejercicio 4: Crear función reutilizable `fetchConCopia`

**Objetivo**: Construir una función que haga fetch y devuelva tanto los datos como una copia del Response.

```js
console.log('=== Ejercicio 4: Función fetchConCopia ===');

// TODO: Crear la función fetchConCopia
// Debe:
// 1. Hacer fetch a la URL
// 2. Clonar el Response
// 3. Leer el body original como .json()
// 4. Retornar { datos, resOriginal, resCopia }
//
// Firma sugerida:
//   async function fetchConCopia(url) { ... }

async function fetchConCopia(url) {
    // Tu código aquí:
    // 1. Fetch
    const res = /* TU CÓDIGO */;

    // 2. Clonar
    const copia = /* TU CÓDIGO */;

    // 3. Leer body
    const datos = /* TU CÓDIGO */;

    // 4. Retornar
    return /* TU CÓDIGO */;
}

// Test de la función
async function testFetchConCopia() {
    // Test 1: Obtener un usuario
    console.log('--- Test 1: fetchConCopia con usuario ---');
    const { datos: usuario, resCopia } = await fetchConCopia(
        'https://jsonplaceholder.typicode.com/users/1'
    );
    console.log('Datos:', usuario.name, '-', usuario.email);

    // Test 2: Leer la copia que aún tiene body
    console.log('--- Test 2: Leer la copia ---');
    const datosCopia = await resCopia.json();
    console.log('Copia:', datosCopia.name, '-', datosCopia.email);
    console.log('¿Son iguales?', usuario.id === datosCopia.id);

    // Test 3: Obtener varios posts
    console.log('--- Test 3: fetchConCopia con posts ---');
    const { datos: posts } = await fetchConCopia(
        'https://jsonplaceholder.typicode.com/posts?_limit=3'
    );
    console.log('Posts:', posts.length, 'obtenidos');
    posts.forEach(p => console.log(`  - ${p.title}`));
}

testFetchConCopia();
```

**Pistas:**

```js
// 💡 Pista 1: La función completa debería verse así:
//
// async function fetchConCopia(url) {
//     const res = await fetch(url);
//     const copia = res.clone();
//     const datos = await res.json();
//     return { datos, resOriginal: res, resCopia: copia };
// }
//
// 💡 Pista 2: ¿Por qué devolvemos resOriginal y resCopia?
//   - resCopia: para que el caller pueda leer el body de nuevo
//   - resOriginal: para acceder a metadatos (status, headers, ok, etc.)
//
// 💡 Pista 3: La desestructuración { datos, resCopia } al llamar
//   la función es equivalente a:
//   const resultado = await fetchConCopia(url);
//   const datos = resultado.datos;
//   const resCopia = resultado.resCopia;
```

**Desafío avanzado**: Modifica `fetchConCopia` para que acepte un segundo parámetro `tipoLectura` que puede ser `"json"` (default), `"text"` o `"blob"`:

```js
// Uso:
const { datos } = await fetchConCopia(url, 'text');
const { datos } = await fetchConCopia(url, 'blob');
```

---

## Resumen de conceptos clave

```
┌─────────────────────────────────────────────────────────┐
│                   fetch() retorna                       │
│                         │                               │
│                         ▼                               │
│               ┌───────────────────┐                     │
│               │  Objeto Response  │                     │
│               │                   │                     │
│               │  .ok / .status    │  ← metadatos        │
│               │  .headers         │  ← se pueden usar   │
│               │                   │    varias veces     │
│               │  .body (Stream)   │  ← solo 1 lectura   │
│               │    ├→ .json()     │                      │
│               │    ├→ .text()     │  ← elegir UNO       │
│               │    └→ .blob()     │                      │
│               │                   │                     │
│               │  .clone()         │  ← duplicar ANTES   │
│               └───────────────────┘    de leer          │
│                                                        │
│  REGLAS:                                               │
│  ✅ Clonar ANTES de leer                               │
│  ✅ Almacenar el resultado si necesitas usarlo luego    │
│  ❌ No leer el body dos veces sin clone                 │
│  ❌ No clonar después de leer                           │
└─────────────────────────────────────────────────────────┘
```

---

## 8. Promise.all vs Promise.allSettled — La diferencia clave

### Promise.all — "Todos o ninguno"

```javascript
const resultados = await Promise.all([
  fetch('https://api/users/1'),
  fetch('https://api/users/2'),
  fetch('https://api/NOEXISTE')  // ❌ Si FALLA, TODA la operación falla
]);
// resultados NUNCA se asigna si una promesa falla
```

**Comportamiento:**
- Si **TODAS** las promesas se resuelven → retorna array con resultados
- Si **UNA sola** falla → rechaza inmediatamente con el error
- Los demás fetch **no esperan** a completarse

### Promise.allSettled — "Nunca falla"

```javascript
const resultados = await Promise.allSettled([
  fetch('https://api/users/1'),      // ✅ fulfilled
  fetch('https://api/users/2'),      // ✅ fulfilled
  fetch('https://api/NOEXISTE')      // ❌ rejected
]);
// resultados SIEMPRE se asigna (3 elementos)
```

**Comportamiento:**
- **NUNCA** falla, siempre retorna un array con el estado de cada promesa
- Cada elemento tiene la forma:
  ```javascript
  { status: 'fulfilled', value: Response }   // ✅ Éxito
  { status: 'rejected', reason: Error }      // ❌ Fallo
  ```

### Comparación directa

| Característica | `Promise.all` | `Promise.allSettled` |
|----------------|---------------|----------------------|
| ¿Falla si una promesa falla? | Sí | No |
| Retorna | Array de valores | Array de `{status, value/reason}` |
| ¿Cuándo usarlo? | Necesitas TODOS los resultados | Puedes tener éxitos parciales |
| Ejemplo de uso | Cargar página completa | Carga parcial con fallback |

### Ejemplo práctico

```javascript
// ❌ Promise.all — Un error rompe todo
try {
  const [users, posts] = await Promise.all([
    fetch('/api/users'),
    fetch('/api/posts')  // Si esto falla, TODO falla
  ]);
} catch (error) {
  console.log('Algo falló:', error);  // Se ejecuta
}

// ✅ Promise.allSettled — Manejas cada caso
const resultados = await Promise.allSettled([
  fetch('/api/users'),
  fetch('/api/posts')
]);

resultados.forEach((r) => {
  if (r.status === 'fulfilled') {
    console.log('Éxito:', r.value);
  } else {
    console.log('Fallo:', r.reason);
  }
});
```

### Regla de oro

```
¿Necesitas TODOS los resultados para continuar?
  → Promise.all

¿Puedes trabajar con éxitos parciales?
  → Promise.allSettled
```

---

## 9. Array.push() — Retorna la LONGITUD, no el array

### El error común

```javascript
const numeros = [];

// ❌ Error: push() retorna el NUEVO largo, no el array
const resultado = numeros.push(1);
console.log(resultado);  // 1 (el largo)

numeros.push(2);
numeros.push(3);
console.log(numeros);     // [1, 2, 3]
console.log(resultado);   // ¡Sigue siendo 1! No se actualiza
```

### ¿Por qué?

`Array.push()` está diseñado para **modificar el array en su lugar** (mutación) y retornar la nueva longitud como confirmación.

```javascript
let arr = [];

console.log(arr.push('a'));  // 1 (nuevo largo)
console.log(arr.push('b'));  // 2 (nuevo largo)
console.log(arr.push('c'));  // 3 (nuevo largo)

console.log(arr);  // ['a', 'b', 'c']
// arr.push() NO retorna el array — solo el número
```

### El bug típico con reduce

```javascript
const numeros = [1, 2, 3, 4, 5];

// ❌ Error: acc se convierte en un número
const resultado = numeros.reduce((acc, num) => {
  return acc.push(num);  // acc.push() retorna el LARGO (1, 2, 3...)
}, []);

console.log(resultado);  // 5 (un número, no un array)
```

### La corrección

```javascript
const numeros = [1, 2, 3, 4, 5];

// ✅ Correcto: push sin return, return acc después
const resultado = numeros.reduce((acc, num) => {
  acc.push(num * 2);  // Modifica el array, no retorna
  return acc;          // Retorna el array modificado
}, []);

console.log(resultado);  // [2, 4, 6, 8, 10]
```

### Métodos que SÍ retornan el array

| Método | ¿Retorna array? | ¿Modifica original? |
|--------|-----------------|---------------------|
| `push()` | ❌ Retorna largo | Sí |
| `pop()` | ❌ Retorna elemento | Sí |
| `splice()` | ✅ Retorna array | Sí |
| `slice()` | ✅ Retorna array | No |
| `filter()` | ✅ Retorna array | No |
| `map()` | ✅ Retorna array | No |
| `concat()` | ✅ Retorna array | No |

### Alternativas a push

```javascript
const arr = [];

// Opción 1: push + return (en reduce)
const result = [1, 2, 3].reduce((acc, num) => {
  acc.push(num * 2);
  return acc;
}, []);

// Opción 2: spread operator (más limpio)
const result2 = [1, 2, 3].map(num => num * 2);
// [2, 4, 6]

// Opción 3: concat
const result3 = [].concat([1, 2, 3]);
// [1, 2, 3]
```

---

## Referencias

- [MDN: Response.body](https://developer.mozilla.org/en-US/docs/Web/API/Response/body)
- [MDN: Response.clone()](https://developer.mozilla.org/en-US/docs/Web/API/Response/clone)
- [MDN: Response.json()](https://developer.mozilla.org/en-US/docs/Web/API/Response/json)
- [MDN: ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream)
- [MDN: Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
- [MDN: Promise.allSettled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)
- [MDN: Array.push()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
