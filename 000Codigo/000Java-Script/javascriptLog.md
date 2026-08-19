# JavaScript Log — Errores y Conceptos Difíciles

Registro de problemas encontrados y soluciones aprendidas.

---

## 1. Async/Await — Errores Comunes

### 1.1 Response body solo se puede leer una vez

**Error:**
```
TypeError: Body is unusable: Body has already been read
```

**Causa:** Los objetos Response de `fetch()` usan un ReadableStream que se consume al leerlo.

**Solución:**
```javascript
// ❌ Error: Leer dos veces
const res = await fetch(url);
await res.json();
await res.json();  // Error

// ✅ Solución 1: Clonar
const clone = res.clone();
await res.json();
await clone.json();

// ✅ Solución 2: Re-fetch
const datos1 = await fetch(url).then(r => r.json());
const datos2 = await fetch(url).then(r => r.json());
```

---

### 1.2 Promise — El objeto de 3 estados

Una **Promise** es un objeto que representa el resultado eventual de una operación asíncrona.

```javascript
const promise = fetch('https://api/users/1');

// Es un objeto
console.log(typeof promise);              // "object"
console.log(promise instanceof Promise);  // true
```

#### Los 3 estados:

| Estado | Descripción | Resultado |
|--------|-------------|-----------|
| **pending** | Estado inicial, aún no se resolvió | Sin valor |
| **fulfilled** | La operación completó exitosamente | `value` |
| **rejected** | La operación falló | `reason` |

#### Ciclo de vida:

```
    ┌─────────────┐
    │   pending   │  ← Estado inicial
    └──────┬──────┘
           │
    ┌──────┴──────┐
    ▼             ▼
fulfilled     rejected
    │             │
    ▼             ▼
 .then()      .catch()
 .finally()   .finally()
```

#### Ejemplo práctico:

```javascript
const miPromesa = new Promise((resolve, reject) => {
  const exito = true;
  
  if (exito) {
    resolve('¡Éxito!');  // → fulfilled
  } else {
    reject('Error');     // → rejected
  }
});

// Manejar los3 estados
miPromesa
  .then(valor => console.log(valor))   // fulfilled
  .catch(error => console.log(error))  // rejected
  .finally(() => console.log('Siempre se ejecuta'));  // Siempre
```

---

### 1.3 Promise.all vs Promise.allSettled

| Método | ¿Falla si una promesa falla? | Retorna |
|--------|------------------------------|---------|
| `Promise.all` | Sí | Array de valores |
| `Promise.allSettled` | No | Array de `{status, value/reason}` |

```javascript
// Promise.all — Todos o ninguno
const [a, b] = await Promise.all([fetch(url1), fetch(url2)]);
// Si UNA falla, TODO falla

// Promise.allSettled — Nunca falla
const resultados = await Promise.allSettled([fetch(url1), fetch(url2)]);
// Siempre retorna 4 resultados con status
```

---

### 1.3 AbortController — Cancelar operaciones asíncronas

**AbortController** es un objeto que genera una **AbortSignal** (solo lectura) para cancelar operaciones asíncronas como `fetch`.

```javascript
// 1. Crear controller
const controller = new AbortController();

// 2. Extraer signal (solo lectura, instancia de AbortSignal)
const signal = controller.signal;
// signal tiene:
//   - .aborted (boolean) — indica si se abortó
//   - .reason (string) — razón del abort
//   - Event listener: 'abort'

// 3. Pasar a fetch (fetch solo lee, no modifica)
await fetch(url, { signal });

// 4. Abortar desde el controller (único que puede hacerlo)
setTimeout(() => controller.abort(), 3000);
```

**¿Por qué signal es solo lectura?**

Porque solo el controller controla la señal. El fetch u otra operación solo la **leen**, no pueden modificarla:

```javascript
const controller = new AbortController();
const signal = controller.signal;

controller.abort();  // ✅ Esto activa signal
signal.abort();      // ❌ signal no tiene ese método
```

**Flujo:**
```
new AbortController()
       │
       ▼
   controller.signal  ──────►  fetch(url, { signal })
       │                              │
       │                              ▼
       │                      Espera la respuesta...
       │
setTimeout(() => controller.abort(), 3000)
       │
       ▼
   abort() activado  ──────►  fetch lanza AbortError
```

---

### 1.4 Array.push() retorna la LONGITUD, no el array

**Error común con reduce:**
```javascript
const numeros = [1, 2, 3];
const resultado = numeros.reduce((acc, num) => {
  return acc.push(num);  // ❌ push() retorna 1, 2, 3...
}, []);
// resultado es 3 (un número), no un array
```

**Solución:**
```javascript
const resultado = numeros.reduce((acc, num) => {
  acc.push(num * 2);  // ✅ push sin return
  return acc;
}, []);
// resultado es [2, 4, 6]
```

---

### 1.4 Scope en funciones async

```javascript
async function obtenerDatos() {
  const datos = await fetch(url).json();
}
console.log(datos);  // ❌ Error: datos no existe aquí
```

**Regla:** Variables con `const`/`let` solo existen dentro de la función donde se declaran.

---

### 1.5 Arrow functions con return implícito

```javascript
// ❌ Sin return (retorna undefined)
urls.map((url) => { fetch(url) })

// ✅ Con return implícito
urls.map((url) => fetch(url))

// ✅ Con return explícito
urls.map((url) => { return fetch(url) })
```

---

### 1.6 Objeto Error — Propiedades y Tipos

Cuando ocurre un error, el objeto `error` tiene propiedades útiles para depurar:

```javascript
try {
  throw new TypeError('Esperaba un número');
} catch (error) {
  console.log(error.message);  // "Esperaba un número"
  console.log(error.name);     // "TypeError"
  console.log(error.stack);    // Pila de llamadas completa
}
```

| Propiedad | Contenido | Ejemplo |
|-----------|-----------|---------|
| `.message` | Descripción del error | `"Algo salió mal"` |
| `.name` | Tipo de error | `"TypeError"` |
| `.stack` | Pila de llamadas | `at funcionB (script.js:6)` |
| `.cause` | Error original (ES2022) | Error encapsulado |

### Tipos de Error y cuándo usar cada uno

Puedes usar **cualquier tipo de Error** en lugar de `Error` genérico:

```javascript
// Error genérico — para errores generales
throw new Error('Algo falló');

// TypeError — tipo de dato incorrecto
throw new TypeError('Esperaba un número');

// ReferenceError — variable no existe
throw new ReferenceError('x no está definida');

// SyntaxError — sintaxis inválida
throw new SyntaxError('JSON inválido');
```

| Error | Cuándo usarlo | Ejemplo |
|-------|---------------|---------|
| `Error` | Error general, genérico | `throw new Error('Algo falló')` |
| `TypeError` | Tipo incorrecto | `null.propiedad` |
| `ReferenceError` | Variable no definida | `console.log(x)` sin declarar `x` |
| `SyntaxError` | Sintaxis mala | `JSON.parse('basura')` |
| `RangeError` | Fuera de rango | `new Array(-1)` |
| `AbortError` | Cancelación | `AbortController.abort()` |

### Diferencia entre Error y TypeError

```javascript
// Con Error genérico — no sabes qué tipo es
catch (error) {
  console.log(error.name);  // "Error"
}

// Con TypeError — sabes exactamente qué falló
catch (error) {
  console.log(error.name);  // "TypeError"
  if (error instanceof TypeError) {
    // manejar tipo incorrecto
  }
}
```

**Regla:** Usa `TypeError` cuando el problema sea de tipo, y `Error` para todo lo demás.

### Manejo por tipo de error

```javascript
catch (error) {
  if (error instanceof TypeError) {
    console.log('Tipo incorrecto:', error.message);
  } else if (error instanceof ReferenceError) {
    console.log('Variable no definida:', error.message);
  } else {
    console.log('Error:', error.message);
  }
}
```

### Identificar tipo de error con `constructor.name`

Cada objeto tiene un `constructor` que es la función que lo creó. Accediendo a `.constructor.name` obtenemos el tipo como string:

```javascript
const error = new TypeError("Algo falló");
console.log(error.constructor);        // → [Function: TypeError]
console.log(error.constructor.name);   // → "TypeError"
```

**¿Por qué usar `constructor.name` en vez de `instanceof`?**

```javascript
// instanceof puede fallar entre contextos (iframes, workers)
error instanceof TypeError  // ❌ A veces falla

// constructor.name siempre funciona
error.constructor.name === 'TypeError'  // ✅ Siempre
```

### Ejemplo: Error de red con fetch

Cuando `fetch` intenta acceder a un dominio que no existe, lanza un error:

```javascript
try {
    const resp = await fetch('https://dominio-que-no-existe.com/api');
    console.log('Did we arrived here? We shouldnt');  // ⛔ NUNCA llega aquí
} catch (error) {
    // ✅ El error de red se atrapa aquí
    console.log('🔴 Error de RED detectado');
    console.log('Tipo:', error.constructor.name);  // → "TypeError"
    console.log('Mensaje:', error.message);        // → "Failed to fetch"
}
```

**El tipo varía según entorno:**

| Entorno | `error.constructor.name` |
|---------|--------------------------|
| Chrome/Edge | `TypeError` |
| Firefox | `TypeError` |
| Node.js 18+ | `TypeError` o `FetchError` |

**Lo que siempre funciona:**
1. El error SÍ se atrapa (el programa no se detiene)
2. Siempre es un error de red (no de sintaxis)
3. Siempre puedes acceder a `.message`
4. Siempre `.constructor.name` te da ALGÚN nombre válido

---

## 2. Fetch — Errores Comunes

### 2.1 fetch() retorna Response, no JSON

```javascript
// ❌ Error
const datos = await fetch(url);

// ✅ Correcto
const res = await fetch(url);
const datos = await res.json();
```

---

### 2.2 Errores HTTP no lanzan excepciones

```javascript
const res = await fetch('https://api/users/999');
console.log(res.ok);     // false
console.log(res.status); // 404
// Pero NO lanza error — necesitas verificar manualmente

if (!res.ok) {
  throw new Error('HTTP ' + res.status);
}
```

---

## 3. Métodos de Array — Errores Comunes

### 3.1 .filter() no modifica el array original

```javascript
const numeros = [1, 2, 3, 4, 5];
const pares = numeros.filter(n => n % 2 === 0);
console.log(pares);      // [2, 4]
console.log(numeros);    // [1, 2, 3, 4, 5] — sin cambios
```

---

### 3.2 .map() retorna nuevo array

```javascript
const numeros = [1, 2, 3];
const dobles = numeros.map(n => n * 2);
console.log(dobles);  // [2, 4, 6]
```

---

## 4. Scope y Variables

### 4.1 const vs let vs var

```javascript
var x = 1;   // Function scope
let y = 2;   // Block scope
const z = 3; // Block scope + no reasignable
```

### 4.2 Shadowing

```javascript
const usuario = { nombre: 'Ana' };

function ejemplo() {
  const usuario = { nombre: 'Luis' }; // Shadowing — misma variable nombre
  console.log(usuario.nombre);  // 'Luis'
}
```

---

## 5. Errores de Sintaxis

### 5.1 Paréntesis vs Corchetes en funciones

```javascript
// ❌ Error: Promise.all[...] en vez de Promise.all(...)
const datos = await Promise.all[fetch(url1), fetch(url2)];

// ✅ Correcto
const datos = await Promise.all([fetch(url1), fetch(url2)]);
```

### 5.2 Doble punto y coma

```javascript
// Funciona pero es innecesario
const respuesta = await fetch(url);;
```

---

## 6. Errores de Scope

### 6.1 Código fuera de funciones

```javascript
function hacerEj() {
  const datos = [];
}

// ❌ Error: datos no existe aquí
console.log(datos);
```

### 6.2 Variables de un scope no accesibles en otro

```javascript
function tarea1() {
  const usuario = fetch(...);
}

function tarea2() {
  console.log(usuario);  // ❌ Error: usuario no está definido
}
```

---

## 7. Async/Await — Patrones Correctos

### 7.1 Fetch encadenado

```javascript
async function obtenerDatos() {
  try {
    const res1 = await fetch(url1);
    const data1 = await res1.json();
    
    const res2 = await fetch(url2 + data1.id);
    const data2 = await res2.json();
    
    return data2;
  } catch (error) {
    console.error(error);
  }
}
```

### 7.2 Promise.all para paralelo

```javascript
async function obtenerTodo() {
  const [users, posts] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json())
  ]);
  return { users, posts };
}
```

### 7.3 Promise.allSettled para éxitos parciales

```javascript
async function obtenerParcial() {
  const resultados = await Promise.allSettled([
    fetch('/api/users'),
    fetch('/api/posts'),
    fetch('/api/INVALID')  // No falla todo
  ]);
  
  return resultados
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value);
}
```

---

## 8. Conceptos Clave para Recordar

| Concepto | Regla |
|----------|-------|
| Response body | Solo se lee una vez |
| `.json()` | Retorna Promise, necesita `await` |
| `Promise.all` | Falla si una falla |
| `Promise.allSettled` | Nunca falla |
| `.push()` | Retorna largo, no array |
| Arrow function `{}` | Necesita `return` explícito |
| Scope `const/let` | Solo dentro del bloque |
| `fetch()` | No lanza error en HTTP 4xx/5xx |

---

*Última actualización: 2026-07-15*
