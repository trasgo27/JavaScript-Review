# Práctica Extraordinaria — JavaScript (8 puntos)

---

### 1. Carga de libros desde JSON *(1 punto)*
Carga de forma asíncrona el archivo `libros.json`. Muestra los títulos de los libros al cargar la página.

---

### 2. Filtro por género *(2 puntos)*
Muestra un desplegable con los géneros extraídos del JSON. Ten en cuenta que si hay algún género repetido solo se mostrará una vez en el `select`. Al cambiar el género seleccionado, muestra solo los libros de esa categoría.

---

### 3. Almacenar último género elegido en cookie *(1 punto)*
Al seleccionar un género, guarda la opción elegida en una cookie. Al volver a cargar la página, esa categoría se selecciona automáticamente.

---

### 4. Temporizador de lectura *(1 punto)*
Muestra un temporizador que empieza al cargar la página. Debe mostrarse en décimas de segundo.

---

### 5. Botón para limpiar todo *(1 punto)*
Botón **"Reiniciar"** que limpia cookies y reinicia el temporizador.

---

### 6. Información adicional mediante promesa *(2 puntos)*
Al pasar por encima de un título muestra información del autor (no hace falta que esa información desaparezca después). Esta información se debe simular con una promesa.

---

## Solución — Punto 1: Carga de libros desde JSON

Crea `examen.js` y usa `fetch` para cargar el JSON de forma asíncrona, luego muestra los títulos en el `<ul>`.

```js
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('libros.json');
    const libros = await res.json();
    const ul = document.getElementById('lista-libros');
    ul.innerHTML = libros.map(libro => `<li>${libro.titulo}</li>`).join('');
  } catch (error) {
    console.error('Error al cargar los libros:', error);
  }
});
```

**Cómo funciona:**
- `DOMContentLoaded` → espera a que el HTML esté listo antes de ejecutarse.
- `fetch('libros.json')` → pide el archivo de forma asíncrona (devuelve una promesa).
- `res.json()` → convierte la respuesta a objeto JavaScript (otra promesa).
- `libros.map(...).join('')` → recorre el array y genera un `<li>` por cada título.
- `ul.innerHTML = ...` → inserta los `<li>` en el DOM.

Al abrir la página verás los 3 títulos listados automáticamente.

---

## Solución — Punto 2: Filtro por género

Extrae los géneros únicos del array y rellena el `<select>`. Al cambiar la selección, filtra los libros.

```js
const select = document.getElementById('categoria');
const librosGlobal = [];

function rellenarGeneros(libros) {
  const generos = [...new Set(libros.map(l => l.genero))];
  select.innerHTML = '<option value="">Todos los géneros</option>' +
    generos.map(g => `<option value="${g}">${g}</option>`).join('');
}

function mostrarLibrosFiltrados(libros, genero) {
  const ul = document.getElementById('lista-libros');
  const filtrados = genero ? libros.filter(l => l.genero === genero) : libros;
  ul.innerHTML = filtrados.map(l => `<li>${l.titulo}</li>`).join('');
}

document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch('libros.json');
  const libros = await res.json();
  librosGlobal.push(...libros);

  rellenarGeneros(libros);
  mostrarLibrosFiltrados(libros, '');

  select.addEventListener('change', () => {
    mostrarLibrosFiltrados(librosGlobal, select.value);
  });
});
```

**Cómo funciona:**
- `new Set(libros.map(l => l.genero))` → obtiene géneros sin duplicados.
- `select.innerHTML` → reconstruye las opciones del desplegable con los géneros únicos.
- `mostrarLibrosFiltrados()` → pinta solo los libros que coinciden con el género seleccionado (o todos si está vacío).
- El evento `change` del `<select>` dispara el filtrado.

---

## Solución — Punto 3: Cookie del último género

Al cambiar el género se guarda en una cookie. Al recargar la página se restaura automáticamente.

```js
function guardarCookie(genero) {
  // encodeURIComponent convierte caracteres especiales (ñ, acentos, espacios)
  // a formato seguro para cookies: "Ficción" → "Ficci%C3%B3n"
  document.cookie = `genero=${encodeURIComponent(genero)}; path=/; max-age=86400`;
}

function leerCookie() {
  // Antes con regex:
  // const match = document.cookie.match(/(?:^|;\s*)genero=([^;]*)/);
  // return match ? decodeURIComponent(match[1]) : '';
  const cookies = document.cookie.split('; ').filter(item => item.startsWith('genero='));
  // decodeURIComponent revierte la codificación: "Ficci%C3%B3n" → "Ficción"
  return cookies.length > 0 ? decodeURIComponent(cookies[0].split('=')[1]) : '';
}

// Integración con el cambio del select:
select.addEventListener('change', () => {
  mostrarLibrosFiltrados(librosGlobal, select.value);
  guardarCookie(select.value);
});

// Al cargar la página, restaurar desde cookie:
const generoGuardado = leerCookie();
if (generoGuardado) {
  select.value = generoGuardado;
  mostrarLibrosFiltrados(librosGlobal, generoGuardado);
}
```

---

## Solución — Punto 4: Temporizador de lectura

Usa `setInterval` cada 100 ms para actualizar un contador en décimas de segundo.

```js
let contador = 0;
let intervalo = null;

function iniciarTemporizador() {
  const span = document.getElementById('temporizador');
  intervalo = setInterval(() => {
    contador++;
    span.textContent = contador;
  }, 100); // 100 ms = 1 décima de segundo
}

// Llamar al iniciar la página:
iniciarTemporizador();
```

---

## Solución — Punto 5: Botón Reiniciar

Limpia la cookie, reinicia el contador a 0 y restablece el `<select>`.

```js
document.getElementById('reiniciar').addEventListener('click', () => {
  // 1. Limpiar cookie
  document.cookie = 'genero=; path=/; max-age=0';

  // 2. Reiniciar temporizador
  clearInterval(intervalo);
  contador = 0;
  document.getElementById('temporizador').textContent = '0';

  // 3. Restablecer filtro
  select.value = '';
  mostrarLibrosFiltrados(librosGlobal, '');

  // 4. Reiniciar temporizador de nuevo
  iniciarTemporizador();
});
```

---

## Solución — Punto 6: Información del autor con promesa

Al pasar el ratón sobre un título, una promesa simulada devuelve el autor y se muestra en el DOM.

```js
function obtenerAutor(libro) {
  return new Promise(resolve => {
    setTimeout(() => resolve(libro.autor), 300);
  });
}

// Al mostrar los libros, añadir evento mouseover:
function mostrarLibrosFiltrados(libros, genero) {
  const ul = document.getElementById('lista-libros');
  const filtrados = genero ? libros.filter(l => l.genero === genero) : libros;
  ul.innerHTML = filtrados.map(l =>
    `<li data-id="${l.id}">${l.titulo} <span class="autor-info" id="autor-${l.id}"></span></li>`
  ).join('');

  // Añadir mouseover a cada <li>
  filtrados.forEach(l => {
    const li = ul.querySelector(`[data-id="${l.id}"]`);
    li.addEventListener('mouseenter', async () => {
      const span = document.getElementById(`autor-${l.id}`);
      if (!span.textContent) {
        span.textContent = await obtenerAutor(l);
      }
    });
  });
}
```

---

## Código completo de `examen.js`

```js
let contador = 0;
let intervalo = null;
const librosGlobal = [];
const select = document.getElementById('categoria');

// --- Punto 4: Temporizador ---
function iniciarTemporizador() {
  const span = document.getElementById('temporizador');
  intervalo = setInterval(() => {
    contador++;
    span.textContent = contador;
  }, 100);
}

// --- Punto 3: Cookies ---
function guardarCookie(genero) {
  // encodeURIComponent convierte caracteres especiales (ñ, acentos, espacios)
  // a formato seguro para cookies: "Ficción" → "Ficci%C3%B3n"
  document.cookie = `genero=${encodeURIComponent(genero)}; path=/; max-age=86400`;
}

function leerCookie() {
  // Antes con regex:
  // const match = document.cookie.match(/(?:^|;\s*)genero=([^;]*)/);
  // return match ? decodeURIComponent(match[1]) : '';
  const cookies = document.cookie.split('; ').filter(item => item.startsWith('genero='));
  // decodeURIComponent revierte la codificación: "Ficci%C3%B3n" → "Ficción"
  return cookies.length > 0 ? decodeURIComponent(cookies[0].split('=')[1]) : '';
}

// --- Punto 6: Promesa del autor ---
function obtenerAutor(libro) {
  return new Promise(resolve => {
    setTimeout(() => resolve(libro.autor), 300);
  });
}

// --- Punto 2: Filtro ---
function rellenarGeneros(libros) {
  const generos = [...new Set(libros.map(l => l.genero))];
  select.innerHTML = '<option value="">Todos los géneros</option>' +
    generos.map(g => `<option value="${g}">${g}</option>`).join('');
}

function mostrarLibrosFiltrados(libros, genero) {
  const ul = document.getElementById('lista-libros');
  const filtrados = genero ? libros.filter(l => l.genero === genero) : libros;
  ul.innerHTML = filtrados.map(l =>
    `<li data-id="${l.id}">${l.titulo} <span id="autor-${l.id}"></span></li>`
  ).join('');

  filtrados.forEach(l => {
    const li = ul.querySelector(`[data-id="${l.id}"]`);
    li.addEventListener('mouseenter', async () => {
      const span = document.getElementById(`autor-${l.id}`);
      if (!span.textContent) {
        span.textContent = await obtenerAutor(l);
      }
    });
  });
}

// --- Punto 1: Carga inicial + Punto 3: Restaurar cookie ---
document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch('libros.json');
  const libros = await res.json();
  librosGlobal.push(...libros);

  rellenarGeneros(libros);

  const generoGuardado = leerCookie();
  if (generoGuardado) {
    select.value = generoGuardado;
    mostrarLibrosFiltrados(libros, generoGuardado);
  } else {
    mostrarLibrosFiltrados(libros, '');
  }

  select.addEventListener('change', () => {
    mostrarLibrosFiltrados(librosGlobal, select.value);
    guardarCookie(select.value);
  });

  iniciarTemporizador();
});

// --- Punto 5: Reiniciar ---
document.getElementById('reiniciar').addEventListener('click', () => {
  document.cookie = 'genero=; path=/; max-age=0';
  clearInterval(intervalo);
  contador = 0;
  document.getElementById('temporizador').textContent = '0';
  select.value = '';
  mostrarLibrosFiltrados(librosGlobal, '');
  iniciarTemporizador();
});
```

---

## Correcciones de código

### Uso incorrecto de `.catch()` dentro de `.then()`

El código aportado tenía varios errores:

```js
document.addEventListener('DOMContentLoaded',(e)=>{
    libros = cargar()
    .then((resp)=>{
        if(!resp.ok){
            catch(resp);
        }else{
            libros = JSON.resp;
        }
    })
    .catch((err)=>{
        console.error('Ha habido Error', err)
    });
});
```

**Problemas identificados:**

1. **`cargar()` no está definido** → debería ser `fetch('libros.json')`.
2. **`JSON.resp` no existe** → `resp` es un objeto `Response`. Para obtener los datos usas `resp.json()`, que devuelve otra promesa.
3. **`.catch(resp)` dentro del `.then()`** → estás llamando a `catch` como si fuera una función, pero es un método de promesa. Además, si `!resp.ok` debes lanzar un error, no llamar a `catch`.
4. **`libros` sin declaración** → falta `let` o `const`.

**Versión corregida con `async/await`:**

```js
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const resp = await fetch('libros.json');
    if (!resp.ok) throw new Error(`Error HTTP: ${resp.status}`);
    const libros = await resp.json();
    console.log(libros);
  } catch (err) {
    console.error('Ha habido Error', err);
  }
});
```

**Alternativa con `.then()` / `.catch()`:**

```js
document.addEventListener('DOMContentLoaded', () => {
  fetch('libros.json')
    .then(resp => {
      if (!resp.ok) throw new Error(`Error HTTP: ${resp.status}`);
      return resp.json();
    })
    .then(libros => {
      console.log(libros);
    })
    .catch(err => {
      console.error('Ha habido Error', err);
    });
});
```

**Diferencias clave respecto al código original:**
- `fetch(...)` en lugar de `cargar()`
- `resp.json()` para parsear el JSON
- `throw new Error(...)` dentro del `if (!resp.ok)` en lugar de `catch(resp)`
- El segundo `.then()` recibe el array de libros ya parseado

---

### Análisis del código en `examen.js`

| # | Línea | Problema |
|---|-------|----------|
| 1 | **20, 32** | `const libros = []` y luego `libros = cargar()` → **TypeError**: no se puede reasignar una constante. |
| 2 | **35-36** | `throw new Error().catch(...)` → `.catch()` está encadenado al objeto `Error`, no a la promesa. El error **no se captura** correctamente. |
| 3 | **38-39** | `resp.json()` sin `return` → la promesa interna se pierde, el flujo asíncrono no espera a que se parse el JSON. |
| 4 | **38-39** | Sombreado de variable: el `resp` del `.then((resp) => ...)` interior oculta al `resp` exterior. |
| 5 | **39** | `libros.push(resp)` → inserta el **array entero** como un solo elemento, no los libros individuales. |
| 6 | **—** | **Nunca se escribe en el DOM**: el `<ul id="lista-libros">` queda vacío. El enunciado pide mostrar los títulos. |

**Diagrama del flujo actual (roto):**

```
const libros = []         // array vacío
libros = cargar()         // ERROR: const no se puede reasignar
  ↓
.then(resp => {
  if (!resp.ok) throw new Error().catch(...)  // catch colgado del throw, no de la promesa
  else resp.json().then(resp => libros.push(resp))  // sin return, sombreado
})
```

**Versión corregida:**

```js
let libros = [];

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const resp = await fetch('libros.json');
    if (!resp.ok) throw new Error(`Error HTTP: ${resp.status}`);
    libros = await resp.json();
    const ul = document.getElementById('lista-libros');
    ul.innerHTML = libros.map(l => `<li>${l.titulo}</li>`).join('');
  } catch (err) {
    console.error('Ha habido Error', err);
  }
});
```

---

### Reglas clave de las promesas encadenadas

Exacto. Lo has entendido a la perfección.

No necesitas crear un segundo `.catch` ni anidar promesas. En JavaScript, la clave de las promesas es **devolver la nueva promesa** con un `return` y dejar que la cadena siga hacia abajo de forma plana.

**Las dos reglas de oro:**

* **El `return` abre el siguiente `.then()`:** Al hacer `return resp.json()`, estás pasando el testigo de la carrera. El siguiente `.then()` que pongas abajo recibirá el resultado de esa transformación (el contenido real de tu JSON).
* **Un solo `.catch()` los domina a todos:** No importa si el error ocurre porque el archivo no existe (error de `fetch`), porque tú lo lanzas manualmente (`throw new Error`), o porque el JSON está mal formateado. Cualquier fallo en la cadena "caerá" automáticamente en el único `.catch()` que pongas al final.

Así es como tu cerebro debe visualizar el flujo plano y limpio de las promesas:

```javascript
cargar()                  // 1. Inicia la petición
   .then((resp) => { ... }) // 2. Comprueba si la red OK y retorna el JSON
   .then((datos) => { ... }) // 3. Recibe los datos limpios y hace el push()
   .catch((err) => { ... }); // 4. Red de seguridad para CUALQUIER error de arriba

```

¡Has dominado el flujo de promesas encadenadas! ¿Te apetece que probemos ahora a escribir este mismo proceso pero usando la otra sintaxis (`async / await` con `try...catch`) para ver la diferencia, o prefieres hacer alguna prueba manipulando el array `libros`?

---

### Pasos para mostrar los libros al cargar la página

Estado actual: `libros.push(resp)` mete el **array entero** dentro del array `libros` como un solo elemento (`libros[0]` = toda la lista). Para mostrar los títulos hay que desglosarlo.

**Paso 0 — Arreglar la estructura de datos**
- Cambiar `libros.push(resp)` por `libros = resp` (asignación directa, no push). Así `libros` será el array de objetos directamente.

**Paso 1 — Capturar el `<ul>` del DOM**
- Usar `document.getElementById('lista-libros')` para obtener la referencia al elemento donde vas a pintar.

**Paso 2 — Recorrer el array y generar los `<li>`**
- Con `libros.map(libro => \`<li>${libro.titulo}</li>\`)` conviertes cada libro en un string HTML.
- Luego `.join('')` une todos los strings en uno solo.

**Paso 3 — Insertar en el DOM**
- Asignar el HTML generado a `ul.innerHTML`.

**Paso 4 — ¿Dónde ponerlo?**
- Dentro del último `.then()`, justo después de asignar `libros = resp`.

**Esquema visual de lo que quedaría:**

```
cargar()
  .then(resp => { ... return resp.json() })  // obtienes el JSON
  .then(datos => {
    libros = datos;                           // guardas los datos
    // AQUÍ: mostrar los títulos en el <ul>   ← Paso Nuevo
  })
  .catch(err => console.error(err));
```

---

¡Clavado! Ahora sí que tienes la estructura perfecta: la cadena está completamente aplanada, controlas los errores de nivel de red con el `if(!resp.ok)`, transformas el cuerpo de la respuesta con `return resp.json()` y envías el resultado limpiamente al siguiente bloque `.then()`.

Ya que dominas las promesas nativas como un pro, fíjate en un pequeño truco de optimización limpia para el `.push()`.

Si tu `libros.json` contiene un array de objetos (por ejemplo, `[{"id":1}, {"id":2}]`), al hacer `libros.push(resp)` vas a meter el array entero dentro de tu constante, transformándolo en `[[{"id":1}, {"id":2}]]` (un array bidimensional).

Para desempaquetar esos libros y que se guarden uno a uno de forma individual dentro de tu constante universal, usa el **operador spread (`...`)**:

```javascript
.then((resp) => libros.push(...resp))

```

Con ese detalle de los tres puntos, tu código pasa de nivel "funciona" a nivel "producción limpia". ¡Buen trabajo manteniendo el foco hasta entender el flujo asíncrono!

---

### Extraer géneros — Punto 2

El problema con el código actual es el `.join(' ')`. Conviertes el array `["Novela", "Fantasía", "Novela"]` en un string `"Novela Fantasía Novela"` y pierdes la estructura.

**Paso 1 — Extraer géneros únicos**
```js
const generos = [...new Set(libros.map(libro => libro.genero))];
```

**Paso 2 — Poblar el `<select>`**
```js
const select = document.getElementById('categoria');
select.innerHTML = '<option value="">Todos los géneros</option>' +
  generos.map(g => `<option value="${g}">${g}</option>`).join('');
```

**Paso 3 — Probar en consola**
```js
console.table(generos);  // ["Novela", "Fantasía"]
```

**¿Dónde va este código?**
Dentro del segundo `.then()`, justo después de asignar `libros = resp`.

---

### Bug Report — `examen.js`

**#1 — Código de extracción de géneros se ejecuta demasiado pronto (líneas 63-65)**

```js
console.table(`Hola ${libros}`);                               // ← se ejecuta AL INSTANTE
const generos = [...new Set(libros.map((libro)=> libro.genero))]; // ← libros vacío
```

`fetch` es asíncrono. Cuando estas líneas corren, `libros` sigue siendo `[]`. El `Set` siempre dará vacío.
- **Solución**: mover dentro del `.then()`.

**#2 — `mostrar()` sin caso `'todos'` (línea 22-31)**

```js
function mostrar(valor){
    if(valor==='novela'){       // ← hardcodeado
    }else if(valor==='fantasia'){ // ← hardcodeado
    }else{                       // ← 'todos' cae aquí por accidente
```

Llamas `mostrar('todos')` pero no existe el caso. Funciona porque cae en el `else`, pero es confuso y frágil.

**#3 — Mismatch de mayúsculas/tildes con el JSON**

- HTML: `value="novela"` y `value="fantasia"`
- JSON: `"Novela"` y `"Fantasía"` (con tilde y mayúscula)
- `if(valor==='novela')` nunca coincidirá con `"Novela"`.

**#4 — No hay evento `change` en el `<select>`**

El `<select>` existe en HTML pero nadie escucha sus cambios. Filtrar no funcionará.

**#5 — Los géneros están hardcodeados en HTML (no dinámicos)**

```html
<option value="todo">Todos</option>
<option value="novela">Novela</option>
<option value="fantasia">Fantasia</option>
```

El enunciado pide **extraerlos del JSON** dinámicamente.

**Resumen visual:**

```
línea 62-65  →  Síncrono (libros = [])  →  MAL
línea 53     →  Código comentado         →  OK
línea 54-56  →  Push + mostrar('todos')  →  OK
línea 22-31  →  Casos hardcodeados       →  MAL
HTML         →  Sin event listener       →  MAL
```

---

### Debug Report 2 — `examen.js`

**✅ Fixed desde el último reporte:**
- El código de extracción de géneros ahora está dentro del `.then()` (línea 59-61).
- Capturaste `categoria` del DOM (línea 3).

**❌ Nuevos bugs:**

**#1 — `generos.map()` mal usado (líneas 63-65)**

```js
const generos = [...new Set(libros.map((libro)=> libro.genero))]; // ["Novela", "Fantasía"]
// generos es un array de STRINGS, no de objetos
const html = generos.map((libro)=>{
    `<option value="${libro.genero}">${libro.genero}</option>`  // ← libro.genero → undefined
}).join(' ');
```

- `generos` es `["Novela", "Fantasía"]` → cada elemento es un **string**, no un objeto.
- `libro.genero` en un string da `undefined`.
- Las `{ }` del `map` no tienen `return`, así que devuelve `[undefined, undefined]`.

**Corrección:**
```js
const html = generos.map(g => `<option value="${g}">${g}</option>`).join('');
```

**#2 — Pisas todas las opciones del `<select>` (línea 66)**

```js
categoria.innerHTML = html;  // ← borra la opción "Seleccionar un genero ..."
```

El `<select>` pierde el placeholder. Debes concatenarlo:
```js
categoria.innerHTML = '<option value="">Todos los géneros</option>' + html;
```

**#3 — `mostrar()` sigue con casos hardcodeados (líneas 23-31)**

- `if(valor==='novela')` y `else if(valor==='fantasia')` no coinciden con los géneros reales `"Novela"` y `"Fantasía"`.
- No hay evento `change` en el `<select>` para llamar a `mostrar()`.

**#4 — Sin event listener en el `<select>`**

Falta:
```js
categoria.addEventListener('change', () => {
    mostrar(categoria.value);
});
```

**Plan de acción:**
1. Corregir `.map()`: `libro` → `g` y quitar `{ }`
2. Concatenar option vacía en `innerHTML`
3. Añadir event listener `'change'` al `<select>`
4. Refactorizar `mostrar()` para que filtre por género dinámico

---

### Debug Report 3 — Estado actual

**✅ Corregido desde el último reporte:**
- Variable renombrada de `libro` a `genero` en el `.map()` (línea 63)
- Concatenación del option `"todos"` en el `innerHTML` (línea 66)
- `.join(' ')` → `.join('')` (línea 65)

**❌ Sigue roto:**

**#1 — Arrow function sin `return` (líneas 63-65)**

```js
const html = generos.map((genero)=>{
    `<option value="${genero}">${genero}</option>`  // ← no hay return
}).join('');
```

Las `{ }` crean un bloque. Sin `return` explícito, devuelve `undefined`.
- **Corrección**: quitar `{ }` y escribir en una línea:
```js
const html = generos.map(genero => `<option value="${genero}">${genero}</option>`).join('');
```

**#2 — `mostrar()` sin filtro real + sin event listener**

```js
function mostrar(valor){
    if(valor==='novela'){      // hardcodeado, nunca coincide
    }else if(valor==='fantasia'){ // hardcodeado
    }else{ mostrar todo }
}
categoria.addEventListener('change', () => mostrar(categoria.value));  // ← no existe
```

Falta el evento y la lógica de filtrado dinámico.

**Árbol de dependencias:**

```
DOMContentLoaded
  └─ cargar() → fetch
       └─ .then(resp.json())
            └─ .then(datos)
                 ├─ libros.push(...datos)
                 ├─ mostrar('todos')   ← necesita refactor
                 └─ extraer géneros
                      └─ poblar <select>   ← casi listo
                           └─ event listener 'change'  ← falta
                                 └─ mostrar(valor)       ← necesita refactor
```

---

### Debug Report 4 — Estado actual

**✅ Corregido desde el último reporte:**
- `generos.map()` ahora tiene `return` (línea 64)
- Event listener `change` añadido fuera del `.then()` (línea 73-76)
- Select se puebla dinámicamente con los géneros del JSON

**❌ Bugs activos:**

**#1 — `mostrar()` entra en `if` pero no hace nada (líneas 24-27)**

```js
if(valor==='Novela'){
    // vacío → no muestra nada
}else if(valor==='Fantasía'){
    // vacío → no muestra nada
}else{
    // solo 'todos' llega aquí
}
```

Al seleccionar "Novela" o "Fantasía" en el desplegable, `mostrar()` entra en el `if` correspondiente, está vacío, y el `else` se salta. **Resultado: la lista se limpia y no se ve nada.**

**#2 — `mostrar('todos')` se ejecuta antes de poblar el select (línea 57 vs 66)**

```
línea 57:  mostrar('todos')         ← se ejecuta con options viejas del HTML
línea 66:  categoria.innerHTML = ... ← sobreescribe las options
```

Funcionalmente no rompe nada, pero es un orden ilógico.

**Solución propuesta — Refactorizar `mostrar()` para filtrado dinámico:**

```js
function mostrar(valor) {
    const filtrados = (!valor || valor === 'todos')
        ? libros
        : libros.filter(libro => libro.genero === valor);
    listaMostrar.innerHTML = filtrados
        .map(l => `<li>${l.titulo}</li>`)
        .join('');
}
```

Esto reemplaza completamente los `if` hardcodeados por filtrado dinámico.

---

### Debug Report 5 — Estado actual

**✅ Corregido desde el último reporte:**
- `mostrar()` ahora filtra dinámicamente con `filter()`
- Sin casos hardcodeados
- Event listener `change` funcionando

**❌ Bugs activos:**

**#1 — Falta `.join('')` en el `map()` (líneas 28-31)**

```js
const html = librosFiltrados.map((libro)=>
    `<li>...</li>`
)                     // ← devuelve array, no string
listaMostrar.innerHTML = html;  // ← [object Array] en el DOM
```

**Corrección:**
```js
listaMostrar.innerHTML = librosFiltrados.map(libro =>
    `<li>id: ${libro.id}, titulo: ${libro.titulo}, autor: ${libro.autor}, genero: ${libro.genero}</li>`
).join('');
```

**#2 — Cookie rota (líneas 78-80)**

```js
document.cookie = `name=${genero}; expires=expiracion.toUTFString(); path=/`;
```

- `toUTFString()` no existe → debe ser `toUTCString()`
- `expiracion` está fuera de `${}` → debe ser `${expiracion.toUTCString()}`
- La cookie se llama `name` → debería llamarse `genero`
- La variable `expiracion` sobra si usas `max-age`

**Corrección:**
```js
document.cookie = `genero=${encodeURIComponent(genero)}; path=/; max-age=86400`;
```

**#3 — No se restaura la cookie al cargar la página**

El punto 3 pide que al recargar se seleccione automáticamente el último género elegido. Falta:

```js
const generoGuardado = document.cookie.split('; ').filter((item)=>
      item.startsWith('genero=')
      );
if (generoGuardado.length > 0) {
    categoria.value = decodeURIComponent(generoGuardado[0].split('=')[1]);
    mostrar(categoria.value);
}
```

**#4 — Orden ilógico: `mostrar()` antes de poblar el select (línea 57 vs 67)**

```
57:  mostrar('todos')           ← con opciones viejas del HTML
64-67: categoria.innerHTML = ... ← opciones dinámicas
```

Invertir orden: poblar el select primero, luego mostrar.

**Resumen visual:**

```
mostrar()        →  filtro OK, falta .join('')   ⚠️
cookie           →  toUTFString error             ❌
restaurar cookie →  no implementado               ❌
orden (57 vs 67) →  mostrar antes de poblar       ⚠️
```

---

### Aclaración — ¿Por qué `.join('')` si ya se veía?

Cuando asignas un **array** a `innerHTML`, el navegador lo convierte a string automáticamente con `.toString()`, que equivale a `.join(',')`:

```js
const arr = ['<li>A</li>', '<li>B</li>'];
console.log(arr.toString());   // "<li>A</li>,<li>B</li>"
console.log(arr.join(''));     // "<li>A</li><li>B</li>"
```

**¿Se ve?** Sí, los `<li>` aparecen.
**¿Hay comas extra?** Sí, entre `</li>` y `<li>` se renderizan comas fantasma.

Con `.join('')` eliminas esas comas y el DOM queda limpio. No es un error grave, pero es buena práctica.

---

### Cookie — `expires` vs `max-age`

La línea corregida con `expires`:

```js
document.cookie = `genero=${genero}; expires=${expiracion.toUTCString()}; path=/`
```

Funciona, pero requiere 3 pasos: crear `Date`, sumar tiempo con `setTime`, formatear con `toUTCString()`.

Con **`max-age`** es una línea y cero cuentas:

```js
document.cookie = `genero=${genero}; path=/; max-age=86400`
// max-age en segundos → 86400 = 24 horas
```

| Método | Pasos | Complejidad |
|--------|-------|-------------|
| `expires` + `Date` | 3 | Crear objeto, sumar tiempo, formatear |
| `max-age` | 1 | Solo el número de segundos |

Si no necesitas una fecha de expiración exacta (ej. "caduca el 1 de enero"), `max-age` es siempre la opción más limpia.

---

### Orden dentro del `.then()` — Análisis

Estado actual del código:

```js
.then((resp) => {
    const html = generos          // ← línea 46: generos NO existe aún
        .map(...)...;
    categoria.innerHTML = ...;
    libros.push(...resp);
    ...
    const generos = [...new Set(...)];  // ← línea 57: generos se declara AQUÍ
})
```

**❌ Error grave — `generos` usado antes de declararse**

`const generos` está en **Temporal Dead Zone** hasta la línea 57. Usarlo en la línea 46 lanza `ReferenceError` y todo el bloque se rompe.

**✅ Orden correcto:**

```
1. libros.push(...resp)         ← datos primero
2. const generos = ...          ← géneros extraídos
3. const html = generos.map()   ← options del select
4. categoria.innerHTML = ...    ← select en el DOM
5. mostrar('todos')             ← mostrar libros
6. restaurar cookie             ← al final (cuando ya existan las options)
```

En código:

```js
.then((resp) => {
    libros.push(...resp);                              // 1

    const generos = [...new Set(libros.map(l => l.genero))];  // 2
    const html = generos.map(g =>                      // 3
        `<option value="${g}">${g}</option>`
    ).join('');
    categoria.innerHTML = `<option value="todos">Todos</option>` + html;  // 4

    mostrar('todos');                                  // 5
    // aquí irá la cookie después                       // 6
})
```

---

### Debug Report 6 — Estado actual `examen.js`

**✅ Corregido desde el último reporte:**
- Variables `contador` y `temporizador` globales (fuera de `iniciarTempo()`)
- `miReiniciar.addEventListener('click', reiniciar)` conectado correctamente
- `clearInterval(temporizador)` en `reiniciar()`
- Cookie se borra en `reiniciar()` con `expires` en pasado

**❌ Bugs activos:**

**#1 — `reiniciar()` no restaura visualmente (Punto 5)**

```js
function reiniciar(){
  listaMostrar.innerHTML = "BORRADO";          // ❌ texto fijo
  clearInterval(temporizador);
  // falta: contador = 0
  // falta: span.textContent = '0'
  // falta: categoria.value = 'todos'
  // falta: mostrar('todos')
  // falta: iniciarTempo() — reiniciar el timer
  document.cookie = "genero=...; expires=...";
}
```

Faltan 5 acciones para que el botón funcione completamente.

**#2 — Cookie sin `encodeURIComponent` / `decodeURIComponent` (Punto 3)**

Guardado (L115):
```js
document.cookie = `genero=${genero}; expires=...`;  // ❌
// debería: encodeURIComponent(genero)
```

Lectura (L88):
```js
categoria.value = generoGuardado[0].split('=')[1];  // ❌
// debería: decodeURIComponent(...)
```

Con géneros como `"Fantasía"` el acento se corrompe en la cookie.

**#3 — `iniciarTempo()` siempre arranca al cargar, pero `reiniciar()` no lo reinicia**

```js
// L83: se llama al cargar la página ✅
// reiniciar(): falta iniciarTempo() tras clearInterval ❌
```

**Resumen visual:**

```
mostrar()               →  filtro dinámico OK    ✅
géneros dinámicos       →  desde JSON            ✅
event change            →  conectado             ✅
cookie guardar          →  falta encodeURIComponent ❌
cookie restaurar        →  falta decodeURIComponent ❌
iniciarTempo()          →  global, funciona      ✅
reiniciar()             →  borra cookie + timer  ⚠️
  └─ restaurar lista    →  "BORRADO" ❌
  └─ contador = 0       →  falta ❌
  └─ mostrar('todos')   →  falta ❌
  └─ reiniciar timer    →  falta ❌
```

---

### Cookie Encoding Fix — `examen.js`

**✅ Corregido:**

**#1 — Guardar cookie con `encodeURIComponent` (L122)**
```js
// Antes:
document.cookie = `genero=${genero}; expires=...`;
// Después:
document.cookie = `genero=${encodeURIComponent(genero)}; expires=...`;
```

**#2 — Leer cookie con `decodeURIComponent` (L95)**
```js
// Antes:
categoria.value = generoGuardado[0].split('=')[1];
// Después:
categoria.value = decodeURIComponent(generoGuardado[0].split('=')[1]);
```

**Problema resuelto:** Caracteres especiales como `ñ`, acentos (`é`, `í`, `ó`, `ú`) ahora se codifican al guardarse en la cookie y se decodifican al leerse. Sin esto, `"Fantasía"` se guardaba corrupto y no coincidía al restaurar la selección.

**Bugs restantes en `reiniciar()`:**
- `contador = 0` y `span` actualizados ✅ (arreglado)
- `categoria.value = 'todos'` y `mostrar('todos')` ✅ (arreglado)
- Timer se reinicia dentro de `reiniciar()` ✅
- Queda: `listaMostrar.innerHTML = "BORRADO"` se ejecuta antes de `mostrar('todos')`, pisando el resultado (la línea sobra)
```
