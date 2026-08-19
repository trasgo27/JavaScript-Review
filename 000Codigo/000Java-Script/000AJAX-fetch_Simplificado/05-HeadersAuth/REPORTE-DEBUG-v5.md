# Reporte de Debug — `02Ej.js` (v5)

**Archivo:** `000AJAX-fetch_Simplificado/05-HeadersAuth/02Ej.js`
**Fecha:** 2026-07-18
**Estado:** 6 bugs restantes (2 criticos, 3 medios, 1 menor)

---

## Bugs corregidos desde v4

| # | Bug original | Ubicacion (v4) | Estado |
|---|-------------|-----------------|--------|
| 1 | `datos.ok` en vez de `respuesta.ok` | Linea 79 | CORREGIDO en v5 — ahora usa `respuesta.ok` |
| 3 | Headers vacios en hacerEj3 | Linea 125-126 | CORREGIDO en v5 — ahora tiene `Content-type` definido |

> Los dos bugs reportados en v4 estan resueltos. Sin embargo, la correccion del header en hacerEj3 introdujo un **nuevo bug** (ver Bug B mas abajo).

---

## Bugs nuevos/persistentes

| ID | Severidad | Linea | Bug | Impacto |
|----|-----------|-------|-----|---------|
| **A** | MEDIA | 83 | `await console.log(...)` — console.log no es Promise | Codigo confuso, await innecesario |
| **B** | ALTA | 126 | `'charset = UTF-8'` con espacios alrededor del igual | El servidor podria no reconocer el charset correctamente |
| **C** | MEDIA | 131 | `throw Error(...)` sin `new` | No es el patron estandar; puede fallar en algunos entornos |
| **D** | ALTA | 132 | Muestra `salvaPost.userId/title` en vez de `datos.id/title` | Muestra datos de entrada, no la respuesta del servidor |
| **E** | ALTA | 98-139 | `hacerEj3()` nunca llama `.json()` a la respuesta | `datos` es undefined; la tarea 3 no funciona |
| **F** | MENOR | 142-144 | Falta `await` en llamadas a funciones async | Las funciones async se ejecutan como fire-and-forget |

---

## Detalle y Fix de cada Bug

### Bug A — `await console.log(...)` (Linea 83)

**Problema:**
```js
await console.log('Creado ok ...', datos);
```
`console.log()` es una funcion sincronica. No retorna una Promise. El `await` no causa error pero es innecesario y confuso.

**Fix:**
```js
console.log('Creado ok ...', datos);
```

---

### Bug B — Espacios en `charset = UTF-8` (Linea 126)

**Problema:**
```js
'Content-type':'application/json; charset = UTF-8'
```
El header HTTP correcto es `charset=UTF-8` **sin espacios**. Los espacios pueden causar que el servidor no parsee correctamente el charset.

**Fix:**
```js
'Content-type': 'application/json; charset=UTF-8'
```

---

### Bug C — `throw Error(...)` sin `new` (Linea 131)

**Problema:**
```js
throw Error('El server funcionó, pero hubo otro falló');
```
El patron estandar es `new Error(...)`. Sin `new`, algunos entornos pueden no crear una instancia correcta del Error.

**Fix:**
```js
throw new Error('El server funcionó, pero hubo otro fallo');
```
> Nota: tambien se corrigio "falló" → "fallo" (tilde innecesaria en verbo).

---

### Bug D — Muestra datos de entrada en vez de respuesta (Linea 132)

**Problema:**
```js
console.log(`Post creado con userID:${salvaPost.userId} y Título:${salvaPost.title}`);
```
Esto muestra `salvaPost` (el objeto que se envio) en vez de `datos` (lo que el servidor devolvio). La tarea dice "mostrar id y title **del recurso creado**", es decir, la respuesta del servidor.

**Fix:**
```js
// Primero necesitas obtener datos (ver Bug E)
const datos = await respuesta.json();
console.log(`Post creado — ID: ${datos.id}, Título: ${datos.title}`);
```

---

### Bug E — `hacerEj3()` nunca llama `.json()` (Lineas 98-139)

**Problema:**
La funcion `hacerEj3()` hace el fetch pero **nunca convierte la respuesta a JSON**. La variable `datos` no existe, por eso la linea 132 recurre a mostrar `salvaPost` directamente.

**Fix (bloque completo de hacerEj3):**
```js
async function hacerEj3() {
  console.log('\n--- Tarea 3: Respuesta del servidor ---');
  const salvaPost = {
    title: 'post de Salvador',
    body: 'Este post ha sido creado por Salvador',
    userId: 10
  };
  const salvaPostString = JSON.stringify(salvaPost);
  try {
    const respuesta = await fetch(`${API}/posts`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: salvaPostString,
    });
    if (!respuesta.ok) throw new Error('El server funcionó, pero hubo otro fallo');
    const datos = await respuesta.json();  // ← ESTA LINEA FALTABA
    console.log(`Post creado — ID: ${datos.id}, Título: ${datos.title}`);
  } catch (error) {
    console.error(error);
  }
}
```

---

### Bug F — Falta `await` en llamadas async (Lineas 142-144)

**Problema:**
```js
hacerEj1();   // sync — OK
hacerEj2();   // async — retorna Promise, no se espera
hacerEj3();   // async — retorna Promise, no se espera
```
Sin `await`, las funciones async se ejecutan "en background". Si alguna falla fuera del try/catch interno, el error no se propaga.

**Fix — envolver en async IIFE:**
```js
(async () => {
  hacerEj1();
  await hacerEj2();
  await hacerEj3();
})();
```

---

## Codigo corregido completo (v6)

```js
console.log('=== Ejercicio 02: Content-Type y body JSON ===');

const API = 'https://jsonplaceholder.typicode.com';

function hacerEj1() {
  console.log('\n--- Tarea 1: Crear objeto ---');
  console.log('Crear un objeto post con fetch ');
  const miPost = {
    title: 'Mi título',
    body: 'Este post ha sido creado con un fetch',
    userId: 1,
  };
  console.log('Crear objeto', miPost);
  console.log('Objeto con Table');
  console.table(miPost);

  const miPostString = JSON.stringify(miPost);
  console.log('Crear objeto', miPostString);
  console.log('Mostrar por console.table ...');
  console.table(miPostString);
}

async function hacerEj2() {
  console.log('\n--- Tarea 2: POST con Content-Type ---');
  try {
    const nuevoPost = {
      title: 'Post desde fetch de Salva',
      body: 'Salva ha creado este Post. Contenido enviado con headers correctos',
      userId: 1
    };
    const nuevoPostString = JSON.stringify(nuevoPost);
    const respuesta = await fetch(`${API}/posts`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: nuevoPostString
    });

    if (!respuesta.ok) {
      throw new Error('Error en el fetch');
    }
    const datos = await respuesta.json();
    console.log('Creado ok ...', datos);  // FIX: sin await
  } catch (error) {
    console.error(error);
  }
}

async function hacerEj3() {
  console.log('\n--- Tarea 3: Respuesta del servidor ---');
  const salvaPost = {
    title: 'post de Salvador',
    body: 'Este post ha sido creado por Salvador',
    userId: 10
  };
  const salvaPostString = JSON.stringify(salvaPost);
  try {
    const respuesta = await fetch(`${API}/posts`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'  // FIX: sin espacios
      },
      body: salvaPostString,
    });
    if (!respuesta.ok) throw new Error('El server funcionó, pero hubo otro fallo');  // FIX: con new
    const datos = await respuesta.json();  // FIX: se agrego .json()
    console.log(`Post creado — ID: ${datos.id}, Título: ${datos.title}`);  // FIX: usa datos
  } catch (error) {
    console.error(error);
  }
}

// Ejecutar todos — FIX: await en funciones async
(async () => {
  hacerEj1();
  await hacerEj2();
  await hacerEj3();
})();
```

---

## Resumen visual de cambios

```
v4 → v5 (ya aplicado)
  ✅ datos.ok → respuesta.ok
  ✅ Headers vacios → Content-type definido

v5 → v6 (pendiente)
  🔧 L83:  await console.log(...) → console.log(...)
  🔧 L126: charset = UTF-8 → charset=UTF-8
  🔧 L131: throw Error(...) → throw new Error(...)
  🔧 L132: salvaPost.userId → datos.id (requiere Bug E)
  🔧 +L:   Agregar const datos = await respuesta.json()
  🔧 L142-144: Envolver en async IIFE con await
```

---

## Checklist para el estudiante

- [ ] Entiendes por que `await` no funciona con `console.log()`?
- [ ] Puedes explicar que es `JSON.stringify()` y por que va en el body?
- [ ] Sabes que el header `Content-type` le dice al servidor que el body es JSON?
- [ ] Entiendes la diferencia entre mostrar datos de entrada vs datos de respuesta?
- [ ] Sabes que `.json()` es necesario para leer la respuesta del servidor?
- [ ] Entiendes por que las funciones async necesitan `await` al ser llamadas?
