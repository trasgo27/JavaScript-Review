# Async/Await Log — Errores y Soluciones

Registro específico de problemas con async/await, fetch, Promise.all y Promise.allSettled.

---

## 1. Response body is unusable

**Error:**
```
TypeError: Body is unusable: Body has already been read
```

**Causa:** El body de un Response es un ReadableStream que se consume al leerlo.

**Soluciones:**

| Método | Código |
|--------|--------|
| Clonar | `const clone = res.clone(); await res.json(); await clone.json();` |
| Re-fetch | `await fetch(url).then(r => r.json())` |

**Regla:** Si necesitas leer el body dos veces, clona ANTES de leer o vuelve a hacer fetch.

---

## 2. Promise — El objeto de 3 estados

Una **Promise** es un objeto que representa el resultado eventual de una operación asíncrona.

```javascript
const promise = fetch('https://api/users/1');

// Es un objeto
console.log(typeof promise);              // "object"
console.log(promise instanceof Promise);  // true
```

### Los 3 estados:

| Estado | Descripción | Resultado |
|--------|-------------|-----------|
| **pending** | Estado inicial, aún no se resolvió | Sin valor |
| **fulfilled** | La operación completó exitosamente | `value` |
| **rejected** | La operación falló | `reason` |

### Ciclo de vida:

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

### Ejemplo práctico:

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

## 3. Promise.all vs Promise.allSettled

### Promise.all — "Todos o ninguno"
```javascript
const [a, b, c] = await Promise.all([
  fetch(url1),
  fetch(url2),
  fetch(url3)  // Si ESTO falla, TODO falla
]);
```
- Si **UNA** promesa falla → rechaza inmediatamente
- Retorna array de valores directamente

### Promise.allSettled — "Nunca falla"
```javascript
const resultados = await Promise.allSettled([
  fetch(url1),   // ✅ {status: 'fulfilled', value: Response}
  fetch(url2),   // ✅ {status: 'fulfilled', value: Response}
  fetch(url3)    // ❌ {status: 'rejected', reason: Error}
]);
```
- **NUNCA** falla, siempre retorna array
- Cada elemento tiene `{status, value}` o `{status, reason}`

### Cuándo usar cada uno

| Escenario | Método recomendado |
|-----------|-------------------|
| Necesitas TODOS los resultados | `Promise.all` |
| Puedes tener éxitos parciales | `Promise.allSettled` |
| Uno falla = todo falla | `Promise.all` |
| Uno falla = mostrar error y continuar | `Promise.allSettled` |

---

## 3. AbortController — Cancelar operaciones asíncronas

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

## 4. Array.push() retorna la LONGITUD

### El error
```javascript
const arr = [];
const resultado = arr.push(1);  // ❌ resultado es 1, no [1]
console.log(resultado);  // 1
```

### El bug con reduce
```javascript
const numeros = [1, 2, 3];
const dobles = numeros.reduce((acc, num) => {
  return acc.push(num * 2);  // ❌ Retorna largo (1, 2, 3)
}, []);
// dobles es 3 (un número)
```

### La corrección
```javascript
const dobles = numeros.reduce((acc, num) => {
  acc.push(num * 2);  // ✅ push sin return
  return acc;          // ✅ Retorna el array
}, []);
// dobles es [2, 4, 6]
```

### Alternativa más limpia
```javascript
const dobles = numeros.map(num => num * 2);  // [2, 4, 6]
```

---

## 4. Scope en funciones async

### Error típico
```javascript
async function obtenerDatos() {
  const usuario = await fetch(url).json();
}
console.log(usuario);  // ❌ ReferenceError
```

### Solución
```javascript
let usuario;  // Declarar fuera

async function obtenerDatos() {
  usuario = await fetch(url).json();
}
```

O mejor:
```javascript
async function obtenerDatos() {
  const usuario = await fetch(url).json();
  return usuario;  // Retornar y capturar donde se necesite
}

const datos = await obtenerDatos();
```

---

## 5. Arrow functions con return

### Error
```javascript
// ❌ Sin return — retorna undefined
urls.map((url) => { fetch(url) })
```

### Corrección
```javascript
// ✅ Return implícito
urls.map((url) => fetch(url))

// ✅ Return explícito
urls.map((url) => { return fetch(url) })
```

---

## 6. .json() retorna Promise

### Error
```javascript
const res = await fetch(url);
const datos = res.json();  // ❌ datos es Promise, no objeto
console.log(datos.name);   // undefined
```

### Corrección
```javascript
const res = await fetch(url);
const datos = await res.json();  // ✅ Await para resolver
console.log(datos.name);         // "Leanne Graham"
```

---

## 7. fetch() no lanza error en HTTP 4xx/5xx

### Error
```javascript
const res = await fetch('https://api/users/999');
// res.ok = false, res.status = 404
// PERO NO LANZA EXCEPCIÓN
```

### Corrección
```javascript
const res = await fetch('https://api/users/999');
if (!res.ok) {
  throw new Error('HTTP ' + res.status);
}
```

---

## 8. Errores de sintaxis comunes

| Error | Código incorrecto | Corrección |
|-------|-------------------|------------|
| Promise.all con corchetes | `Promise.all[fetch(url)]` | `Promise.all([fetch(url)])` |
| Doble punto y coma | `fetch(url);;` | `fetch(url);` |
| Variable global accidental | `return variable = valor` | `variable = valor; return acc` |

---

## 9. Patrones correctos

### Fetch encadenado
```javascript
async function obtenerDatos() {
  try {
    const res = await fetch(url1);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
```

### Promise.all para paralelo
```javascript
const [users, posts] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json())
]);
```

### Promise.allSettled para parcial
```javascript
const resultados = await Promise.allSettled([
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/INVALID')
]);

const exitosos = resultados
  .filter(r => r.status === 'fulfilled')
  .map(r => r.value);
```

### Filtrar y convertir
```javascript
const resultados = await Promise.allSettled(
  urls.map(url => fetch(url))
);

const urlsExitosas = resultados
  .filter(r => r.status === 'fulfilled')
  .map(r => r.value.url);

const datos = await Promise.all(
  urlsExitosas.map(url => fetch(url).then(r => r.json()))
);
```

---

## 10. Checklist de debugging

Cuando veas un error en async/await:

- [ ] ¿Usaste `await` donde necesitas Promise resuelta?
- [ ] ¿`fetch()` retorna Response, no JSON directamente?
- [ ] ¿Llamaste `.json()` dos veces al mismo Response?
- [ ] ¿Usaste `Promise.all` o `Promise.allSettled` según necesites?
- [ ] ¿`.push()` retorna largo, no array en tu `reduce`?
- [ ] ¿Las variables están en el scope correcto?
- [ ] ¿Las arrow functions con `{}` tienen `return`?
- [ ] ¿Verificaste `res.ok` para errores HTTP?

---

*Última actualización: 2026-07-15*
