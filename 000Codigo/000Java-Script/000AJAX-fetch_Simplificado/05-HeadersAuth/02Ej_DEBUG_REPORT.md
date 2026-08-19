# Reporte de Debug — Ejercicio 02: Content-Type y body JSON

**Archivo:** `05-HeadersAuth/02Ej.js`
**Fecha:** 2026-07-18
**Versión analizada:** v3 (sin cambios desde la revisión anterior)
**Estado:** 7 bugs confirmados, 0 resueltos desde v3

---

## Tabla Resumen de Bugs

| # | Severidad | Línea | Bug | Estado v3 → Actual |
|---|-----------|-------|-----|---------------------|
| 1 | CRÍTICO | 79 | `datos.ok` en vez de `respuesta.ok` | ❌ SIN CAMBIO |
| 2 | MEDIO | 36 | `console.table()` con string | ❌ SIN CAMBIO |
| 3 | ALTO | 124-126 | Headers vacíos en hacerEj3 | ❌ SIN CAMBIO |
| 4 | ALTO | 97-134 | No hace `.json()` en respuesta | ❌ SIN CAMBIO |
| 5 | MEDIO | 131 | Log muestra datos locales, no del server | ❌ SIN CAMBIO |
| 6 | BAJO | 130 | `throw Error()` sin `new` | ❌ SIN CAMBIO |
| 7 | MEDIO-ALTO | 141-143 | Falta `await` en llamadas async | ❌ SIN CAMBIO |

**Conclusión:** El archivo NO ha cambiado desde v3. Todos los bugs persisten.

---

## Análisis Detallado por Bug

### Bug #1 — CRÍTICO: `datos.ok` en vez de `respuesta.ok` (línea 79)

**Código problemático:**
```js
const datos = await respuesta.json();  // línea 78
if(!datos.ok){                          // línea 79 ← AQUÍ
    throw new Error('Error en el fetch');
}
```

**¿Por qué falla?**
La API de jsonplaceholder al hacer POST devuelve algo como:
```json
{ "id": 101, "title": "...", "body": "...", "userId": 1 }
```

Este objeto **NUNCA** tiene una propiedad `.ok`. Entonces `datos.ok` es `undefined`, y `!undefined` es `true`. Resultado: **SIEMPRE lanza el error**, incluso cuando el POST fue exitoso.

**Severidad: CRÍTICA** — El código funciona "por accidente" porque el error se captura en el `catch` y solo se imprime, pero si en el futuro se usa esa validación para decidir algo (mostrar UI, continuar flujo), romperá todo.

**Fix:**
```js
// LÍNEA 79: Cambiar datos.ok → respuesta.ok
if(!respuesta.ok){
    throw new Error(`Error HTTP: ${respuesta.status}`);
}
```

---

### Bug #2 — MEDIO: `console.table()` con string (línea 36)

**Código problemático:**
```js
const miPostString = JSON.stringify(miPost);  // línea 33
console.log('Crear objeto', miPostString);     // línea 34
console.log('Mostrar por console.table ...');  // línea 35
console.table(miPostString);                   // línea 36 ← AQUÍ
```

**¿Por qué falla?**
`console.table()` espera un objeto o array. Le pasas un string (`'{"title":"Mi título","body":"...","userId":1}'`). El resultado en consola es una tabla fecha y confusa que no aporta nada educativo.

**Severidad: MEDIA** — No rompe el código, pero genera salida confusa para el estudiante.

**Fix:**
```js
// OPCIÓN A: Mostrar el objeto original con table
console.table(miPost);

// OPCIÓN B: Mostrar el string con log normal
console.log('Stringificado:', miPostString);

// OPCIÓN C: Parsear de vuelta y mostrar con table
console.table(JSON.parse(miPostString));
```

---

### Bug #3 — ALTO: Headers vacíos en hacerEj3 (líneas 124-126)

**Código problemático:**
```js
const respuesta = await fetch(`${API}/posts`, {
    method:'POST',
    headers:{          // ← VACÍO
    },                 // ← AQUÍ
    body:salvaPostString,
});
```

**¿Por qué falla?**
Sin `Content-type: application/json`, el servidor no sabe que el body es JSON. En jsonplaceholder esto pasa inadvertidamente porque es una API permisiva. En un servidor real, esto resultaría en:
- **400 Bad Request** — el servidor no puede parsear el body
- **415 Unsupported Media Type** — el servidor rechaza el content-type

**Severidad: ALTA** — Enseña una práctica incorrecta que fallará en producción.

**Fix:**
```js
const respuesta = await fetch(`${API}/posts`, {
    method: 'POST',
    headers: {
        'Content-type': 'application/json; charset=UTF-8'  // ← AGREGAR
    },
    body: salvaPostString,
});
```

---

### Bug #4 — ALTO: No hace `.json()` en respuesta de hacerEj3 (líneas 97-134)

**Código problemático:**
```js
async function hacerEj3() {
    // ...
    const respuesta = await fetch(`${API}/posts`, {  // línea 122
        method:'POST',
        headers:{},
        body:salvaPostString,
    });
    if(!respuesta.ok) throw Error('...');  // línea 130
    // ← AQUÍ falta respuesta.json()
    console.log(`Post creado con userID:${salvaPost.userId}...`); // línea 131
}
```

**¿Por qué falla?**
Nunca se consume la respuesta del servidor. El flujo correcto es:
1. Hacer fetch → obtener `respuesta`
2. Verificar `respuesta.ok`
3. **Parsear con `respuesta.json()` → obtener `datos`**
4. Usar `datos` para verificar lo que el servidor devolvió

Sin el paso 3, el estudiante nunca aprende a leer la respuesta del servidor.

**Severidad: ALTA** — Omite un paso fundamental del patrón fetch POST.

**Fix:**
```js
const respuesta = await fetch(`${API}/posts`, {
    method: 'POST',
    headers: {
        'Content-type': 'application/json; charset=UTF-8'
    },
    body: salvaPostString,
});
if(!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);

const datos = await respuesta.json();  // ← AGREGAR
console.log('Respuesta del servidor:', datos);
console.log(`Post creado — ID: ${datos.id}, Título: ${datos.title}`);
```

---

### Bug #5 — MEDIO: Log muestra datos locales, no del servidor (línea 131)

**Código problemático:**
```js
console.log(`Post creado con userID:${salvaPost.userId} y Título:${salvaPost.title}`);
```

**¿Por qué falla?**
Muestra `salvaPost.userId` (variable local = 10) y `salvaPost.title` (variable local = 'post de Salvador'). Estos valores los tienes TÚ en tu máquina. Lo interesante es ver qué devolvió el SERVIDOR (el `id` que asignó, por ejemplo).

**Severidad: MEDIA** — El estudiante no verifica la respuesta real del servidor.

**Fix:**
```js
const datos = await respuesta.json();
console.log(`Post creado — ID del servidor: ${datos.id}, Título: ${datos.title}`);
```

---

### Bug #6 — BAJO: `throw Error()` sin `new` (línea 130)

**Código problemático:**
```js
if(!respuesta.ok) throw Error('El server funcionó, pero hubo otro falló');
//                 ^^^^^ sin "new"
```

**¿Por qué falla?**
JavaScript auto-envuelve `Error(...)` como `new Error(...)`, así que no rompe. Pero:
1. Produces un objeto ligeramente diferente (sin `new`, el prototype puede no estar correctamente encadenado en algunos entornos)
2. Es mala práctica — todos los estándares usan `new Error()`
3. "falló" tiene tilde incorrecta — debería ser "fallo" (fallo = noun, falló = verb past tense, aquí se usa como sustantivo)

**Severidad: BAJA** — Funciona, pero es incorrecto.

**Fix:**
```js
if(!respuesta.ok) throw new Error(`HTTP ${respuesta.status} — El servidor respondió con error`);
```

---

### Bug #7 — MEDIO-ALTO: Falta `await` en llamadas async (líneas 141-143)

**Código problemático:**
```js
hacerEj1();    // línea 141 — sync, OK
hacerEj2();    // línea 142 — ASYNC sin await ← PROBLEMA
hacerEj3();    // línea 143 — ASYNC sin await ← PROBLEMA
```

**¿Por qué falla?**
`hacerEj2()` y `hacerEj3()` son `async`, lo que significa que devuelven Promises. Sin `await`:
1. Se lanzan "fire and forget" — no esperan a que terminen
2. Si `hacerEj2()` falla con un error NO capturado por su propio try/catch, se convierte en un **Unhandled Promise Rejection**
3. El orden de ejecución entre hacerEj2 y hacerEj3 es impredecible
4. El script termina antes de que las funciones async completen

**Severidad: MEDIO-ALTO** — En este caso particular sobrevive porque ambas funciones tienen su propio try/catch interno, pero es un patrón incorrecto.

**Fix:**
```js
// OPCIÓN A: Async IIFE (recomendada)
(async () => {
    hacerEj1();
    await hacerEj2();
    await hacerEj3();
})();

// OPCIÓN B: Promise.all (ejecuta en paralelo)
hacerEj1();
Promise.all([hacerEj2(), hacerEj3()]).catch(console.error);
```

---

## Código Corregido Completo

```js
console.log('=== Ejercicio 02: Content-Type y body JSON ===');

const API = 'https://jsonplaceholder.typicode.com';

// ============================================================
// TAREA 1: Crear objeto con datos del post
// ============================================================
function hacerEj1() {
  console.log('\n--- Tarea 1: Crear objeto ---');

  const miPost = {
    title: 'Mi título',
    body: 'Este post ha sido creado con un fetch',
    userId: 1,
  };
  console.log('Objeto creado:', miPost);
  console.log('Tipo:', typeof miPost);

  // FIX #2: Mostrar objeto original con table, NO el string
  console.table(miPost);

  const miPostString = JSON.stringify(miPost);
  console.log('Stringificado:', miPostString);
  console.log('Tipo después de stringify:', typeof miPostString);
}


// ============================================================
// TAREA 2: POST con Content-Type y JSON.stringify
// ============================================================
async function hacerEj2() {
  console.log('\n--- Tarea 2: POST con Content-Type ---');

  const nuevoPost = {
    title: 'Post desde fetch de Salva',
    body: 'Salva ha creado este Post. Contenido enviado con headers correctos',
    userId: 1
  };

  try {
    const respuesta = await fetch(`${API}/posts`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(nuevoPost)
    });

    // FIX #1: Verificar respuesta.ok, NO datos.ok
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    console.log('Creado ok:', datos);
  } catch (error) {
    console.error('Error en hacerEj2:', error.message);
  }
}


// ============================================================
// TAREA 3: Respuesta del servidor
// ============================================================
async function hacerEj3() {
  console.log('\n--- Tarea 3: Respuesta del servidor ---');

  const salvaPost = {
    title: 'post de Salvador',
    body: 'Este post ha sido creado por Salvador',
    userId: 10
  };

  try {
    const respuesta = await fetch(`${API}/posts`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'  // FIX #3: Headers correctos
      },
      body: JSON.stringify(salvaPost),
    });

    if (!respuesta.ok) {
      throw new Error(`HTTP ${respuesta.status} — El servidor respondió con error`);  // FIX #6: new Error()
    }

    // FIX #4: Parsear la respuesta
    const datos = await respuesta.json();

    // FIX #5: Mostrar datos del SERVIDOR, no locales
    console.log(`Post creado — ID del servidor: ${datos.id}, Título: ${datos.title}`);
    console.log('Respuesta completa:', datos);
  } catch (error) {
    console.error('Error en hacerEj3:', error.message);
  }
}


// FIX #7: Async IIFE con await
(async () => {
  hacerEj1();
  await hacerEj2();
  await hacerEj3();
})();
```

---

## Cambios Aplicados (resumen)

| Fix | Línea original | Línea corregida | Cambio |
|-----|---------------|-----------------|--------|
| #1 | `if(!datos.ok)` | `if(!respuesta.ok)` | Verifica la respuesta HTTP, no el body |
| #2 | `console.table(miPostString)` | `console.table(miPost)` | Table recibe objeto, no string |
| #3 | `headers:{}` | `headers:{'Content-type':'application/json; charset=UTF-8'}` | Header correcto |
| #4 | (falta) | `const datos = await respuesta.json()` | Parsea la respuesta |
| #5 | `salvaPost.userId` / `salvaPost.title` | `datos.id` / `datos.title` | Usa datos del servidor |
| #6 | `throw Error(...)` | `throw new Error(...)` | Constructor correcto |
| #7 | `hacerEj2(); hacerEj3();` | `await hacerEj2(); await hacerEj3();` | Respeta el patrón async |

---

## Notas para el Tutor

1. **Bug #1 es el más peligroso** — Aunque no crashea, enseña al estudiante que `datos.ok` es una forma válida de verificar éxito, cuando NO lo es. Si el estudiante copia este patrón en otros proyectos, siempre fallará.

2. **Bug #3 + #4 juntos** — hacerEj3 es el ejemplo más débil del ejercicio. No tiene headers correctos, no parsea la respuesta, y muestra datos locales. Es basicamente un POST ciego.

3. **Bug #7 es sutil** — Funciona "por suerte" porque las funciones tienen try/catch interno. Pero en un entorno real sin ese try/catch, sería un Unhandled Promise Rejection que Node.js 15+ trata como error fatal.

4. **El ORIGINAL (`02EjORIGINAL.js`) está limpio** — El problema fue introducido cuando el estudiante completó el código. Esto es normal y esperado; el ORIGINAL sirve como referencia.
