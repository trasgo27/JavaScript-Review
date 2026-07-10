## Debug Report — `examen.js`

He analizado el proyecto `0000Libreria` (examen JS con 6 puntos). Este es el estado actual:

### Archivos
| Archivo | Observación |
|---|---|
| `index.html` | ✅ Estructura completa: `<select>`, `<ul>`, `<span id="temporizador">`, `<button id="reiniciar">` |
| `libros.json` | ✅ 3 libros con `id, titulo, autor, genero` |
| `examen.js` | ❌ **22 líneas, mayormente no funcional** |
| `enunciado.md` | ✅ Contiene la solución completa de todos los puntos (guía/referencia) |

### Bugs en `examen.js` (actual)

```
1: let libros = [];
2: 
3: document.addEventListener('DOMContentLoaded', (e) => {
4:   return (miPromesa = new Promise((resolve, reject) => {
5:     const timerID = setTimeout(() => {
6:       libros = fetch('libros.json');          // ❌ B1
7:       if (!libros) {                          // ❌ B2
8:         reject(err);                          // ❌ B3
9:       } else {
10:        resolve('archivo cargado ...');
11:      }
12:    }, 800);
13:  }));
14:  miPromesa                                    // ❌ B4: dead code
15:    .then((men) => {
16:      console.log(men);
17:    })
18:    .catch((err) => {
19:      console.error(err);
20:    });
21: });
```

**B1 — `libros = fetch(...)` asigna una Promise, no los datos**
- `fetch()` devuelve un objeto `Promise`, no el JSON.  
- `libros` queda como `Promise {<pending>}`, no como array de libros.  
- Necesita: `const res = await fetch('libros.json'); libros = await res.json();`

**B2 — `if (!libros)` nunca es truthy con una Promise**
- Una Promise siempre es un objeto truthy. El `if` jamás entra en el `reject`.

**B3 — `reject(err)` con `err` sin definir**
- `err` no está declarado en ningún lado → `ReferenceError: err is not defined`.

**B4 — `return` mata todo el código posterior (líneas 14-21 son dead code)**
- El `return (miPromesa = ...)` sale del callback del event listener.  
- Las líneas 14-21 (`miPromesa.then(...).catch(...)`) **nunca se ejecutan**.

**B5 — `setTimeout` innecesario (800ms) sin `await fetch`**
- El timer no espera a que `fetch` resuelva. No hay `await`.  
- `libros = fetch(...)` se ejecuta, pero a los 800ms el fetch probablemente aún no ha terminado.

**B6 — Sin `async` para usar `await`**
- El callback no es `async`. No hay forma de esperar promesas correctamente aquí.

**B7 — Sin `try/catch` para errores de red**
- No hay manejo robusto de errores HTTP (`!resp.ok`).

**B8 — No se escribe nada en el DOM (Punto 1 no implementado)**
- Nunca se referencia `document.getElementById('lista-libros')`.  
- El `<ul>` permanece vacío.

**B9 — No se puebla el `<select>` con géneros (Punto 2 no implementado)**
- No hay extracción de géneros únicos del JSON.  
- No hay `categoria.innerHTML`.

**B10 — No hay event listener en el `<select>` (Punto 2)**
- `categoria.addEventListener('change', ...)` no existe.

**B11 — No hay cookie (Punto 3 no implementado)**
- No hay `guardarCookie()` ni `leerCookie()`.  
- No se guarda ni restaura el género seleccionado.

**B12 — No hay temporizador (Punto 4 no implementado)**
- No hay `setInterval`, `contador`, ni actualización del `#temporizador`.

**B13 — No hay botón Reiniciar (Punto 5 no implementado)**
- No hay event listener en `#reiniciar`.  
- No se limpia cookie, ni timer, ni filtro.

**B14 — No hay hover de autor con promesa (Punto 6 no implementado)**
- No hay `mouseenter`, no hay `Promise`, no hay `obtenerAutor()`.

### Resumen

| Punto | Requisito | Estado |
|---|---|---|
| 1 | Carga asíncrona + mostrar títulos | ❌ |
| 2 | Filtro por género dinámico | ❌ |
| 3 | Cookie del último género | ❌ |
| 4 | Temporizador en décimas | ❌ |
| 5 | Botón Reiniciar | ❌ |
| 6 | Hover autor con promesa | ❌ |
| **Total** | **6/6 puntos** | **0/6 funcional** |

---

## Debug Report 2 — `examen.js` (tras cambios del usuario)

El código cambió: el viejo código (líneas 1-23) se comentó y hay un nuevo intento (líneas 25-32):

```js
let libros = [];

//cargar json asincrona. Mostrar titulos
/*
document.addEventListener('DOMContentLoaded', (e) => {
  return (miPromesa = new Promise((resolve, reject) => {
    const timerID = setTimeout(() => {
      libros = fetch('libros.json');
      if (!libros) {
        reject(err);
      } else {
        resolve('archivo cargado ...');
      }
    }, 800);
  }));
  miPromesa
    .then((men) => {
      console.log(men);
    })
    .catch((err) => {
      console.error(err);
    });
});
*/
document.addEventListener('DOMContentLoaded',(e)=>{
    (fetch('libros.json'))
    .then((men)=>{
        libros.push([...men]);
        console.table(libros);
    })
    .catch((err)=>console.error(err));    
});
```

### Bugs nuevos (B15–B17)

| # | Línea | Problema |
|---|-------|----------|
| **B15** | 28 | `[...men]` — `men` es un objeto `Response`, **no es iterable**. Lanza `TypeError: men is not iterable`. |
| **B16** | (falta) | Nunca se llama `resp.json()`. El `fetch` devuelve un `Response`, hay que parsearlo. Falta un `.then(resp => resp.json())` intermedio. |
| **B17** | 28 | Asumiendo que se arregle B16, `libros.push([...datos])` mete el **array completo como un solo elemento**. Debe ser `libros = datos` o `libros.push(...datos)`. |

### Bugs persistentes (B8–B14 siguen vigentes)

| # | Punto | Problema |
|---|-------|----------|
| B8 | 1 | No se escribe nada en el DOM (`<ul>` vacío) |
| B9 | 2 | No se extraen géneros ni se puebla `<select>` |
| B10 | 2 | No hay `addEventListener('change')` en `<select>` |
| B11 | 3 | No hay cookie (`guardarCookie`/`leerCookie`) |
| B12 | 4 | No hay `setInterval` ni temporizador |
| B13 | 5 | No hay evento `click` en `#reiniciar` |
| B14 | 6 | No hay `mouseenter` ni promesa de autor |

### Plan de implementación propuesto

Sobrescribir `examen.js` con una solución completa que cubra los 6 puntos del enunciado, siguiendo la referencia en `enunciado.md` (líneas 224–321):

1. **Variables globales**: `contador`, `intervalo`, `librosGlobal`, `select`
2. **Punto 4** — `iniciarTemporizador()` con `setInterval` cada 100ms
3. **Punto 3** — `guardarCookie(genero)` y `leerCookie()` con `encodeURIComponent`/`decodeURIComponent`
4. **Punto 6** — `obtenerAutor(libro)` → `Promise` con `setTimeout` 300ms
5. **Punto 2** — `rellenarGeneros(libros)` y `mostrarLibrosFiltrados(libros, genero)` con filtro dinámico
6. **Punto 1** — `DOMContentLoaded` con `async/await`, `fetch`, poblar DOM
7. **Punto 5** — Listener en `#reiniciar`: limpia cookie, reinicia timer, resetea filtro

---

## Debug Report 3 — `examen.js` (segunda actualización del usuario)

```js
const libros = [];

//cargar json asincrona. Mostrar titulos
/*
document.addEventListener('DOMContentLoaded', (e) => {
  return (miPromesa = new Promise((resolve, reject) => {
    const timerID = setTimeout(() => {
      libros = fetch('libros.json');
      if (!libros) {
        reject(err);
      } else {
        resolve('archivo cargado ...');
      }
    }, 800);
  }));
  miPromesa
    .then((men) => {
      console.log(men);
    })
    .catch((err) => {
      console.error(err);
    });
});
*/
document.addEventListener('DOMContentLoaded',(e)=>{
    (fetch('libros.json'))
    .then((men)=>{
        //libros.push([...men]);
        console.table(`men, ${men}`);
        (men.json())
        .then((parse)=>{
            libros.push(...parse);
            console.table(libros);
            //mostrar generos
            const categoria = document.getElementById('categoria');
            let html="";
            libros.forEach((libro)=>{
                const tarjeta = document.createElement('li');
                const texto = `${libro.genero}`;
                tarjeta.textContent = texto;
                categoria.appendChild(tarjeta);
            });
            //mostrar libros

        })
        .catch((err)=>{console.error(err)})
    })
    .catch((err)=>console.error(err));    
});
```

### Bugs nuevos (B18–B22)

| # | Línea | Problema |
|---|-------|----------|
| **B18** | 1 | `const libros = []` — funciona con `push()`, pero no se puede reasignar globalmente si hiciera falta. |
| **B19** | 37-42 | Meten `<li>` dentro de `<select id="categoria">`. Los hijos válidos de un `<select>` son `<option>`, no `<li>`. No se renderizará correctamente. |
| **B20** | 37-42 | No se eliminan géneros duplicados. Si 2 libros tienen "Novela", aparece 2 veces en el desplegable. |
| **B21** | 30-31 | `.then()` anidado en vez de `return men.json()` plano. Funciona pero crea pirámide. El `catch` interior solo captura errores de `.json()`, no del `fetch`. |
| **B22** | 44 | `//mostrar libros` es solo un comentario — no hay código que pinte los títulos en el `<ul>`. |

### Bugs persistentes (B8–B14, siguen sin implementar)

| # | Punto | Problema |
|---|-------|----------|
| B8 | 1 | No se escriben títulos en `<ul id="lista-libros">` |
| B9-B10 | 2 | Filtro por género no implementado (sin event listener) |
| B11 | 3 | Sin cookie |
| B12 | 4 | Sin temporizador |
| B13 | 5 | Sin botón Reiniciar |
| B14 | 6 | Sin hover de autor |

### Resumen

| Punto | Estado |
|-------|--------|
| 1 — Carga JSON + mostrar títulos | ⚠️ `fetch` + `men.json()` ✅, pero nunca se renderizan títulos |
| 2 — Filtro género | ❌ Mete `<li>` en `<select>` en vez de `<option>`; sin duplicados; sin event listener |
| 3 — Cookie | ❌ |
| 4 — Temporizador | ❌ |
| 5 — Reiniciar | ❌ |
| 6 — Hover autor | ❌ |

---

## Debug Report 4 — `examen.js` (tercera actualización)

```js
const libros = [];

//cargar json asincrona. Mostrar titulos
/*
document.addEventListener('DOMContentLoaded', (e) => {
  ...
});
*/
//funciones
function dibujar(genero){
    listado = "";
    if(genero ==='todos'){
        libros.forEach((libro,ind)=>{
        const tarjeta = document.createElement('li');
        const texto = `${ind}.- ${libro.titulo}`;
        tarjeta.innerText = texto;
        tarjeta.value = libro;
        listado.appendChild(tarjeta);
        });        
    }else{
        libros.filter((libro)=>{
            libro.genero.toLowerCase() == genero;
        }).forEach((libro,ind)=>{
            const targeta = document.createElement('li');
            const texto = `${ind}.- ${libro.titulo}`;
            targeta.textContent = texto;
            listado.appendChild(targeta);
        });
    }
}
document.addEventListener('DOMContentLoaded',(e)=>{
    (fetch('libros.json'))
    .then((men)=>{
        console.table(`men, ${men}`);
        (men.json())
        .then((parse)=>{
            libros.push(...parse);
            console.table(libros);
            //mostrar generos
            const categoria = document.getElementById('categoria');             
            //filtrar los generos
            const tarjetaT = document.createElement('option');
            tarjetaT.textContent = "Todos";
            tarjetaT.value = "todos";
            categoria.appendChild(tarjetaT);
            const generosVector = [...new Set(libros.map((libro)=>libro.genero))];
            generosVector.forEach((libro)=>{
                const tarjeta = document.createElement('option');
                const texto = `${libro}`;
                tarjeta.textContent = texto;
                tarjeta.value = texto.toLowerCase();
                categoria.appendChild(tarjeta);
            });
            //mostrar libros
            const listado = document.getElementById('lista-libros');
            
            libros.forEach((libro,ind)=>{
                const tarjeta = document.createElement('li');
                const texto = `${ind+1}.- ${libro.titulo}`;
                tarjeta.innerText = texto;
                listado.appendChild(tarjeta);
            });
            //Add event change
            categoria.addEventListener('change',(e)=>{
                const genero = e.target.value;
                dibujar(genero);
            });


        })
    })
    .catch((err)=>console.error(err));    
});
```

### Bugs nuevos (B23–B27)

| # | Línea | Problema |
|---|-------|----------|
| **B23** | 27, 34 | `listado = ""` (string) → `listado.appendChild(tarjeta)` lanza **TypeError**: los strings no tienen `.appendChild()`. Falta `document.getElementById('lista-libros')`. |
| **B24** | 37-38 | `filter()` con `{ }` pero **sin `return`**: `libro.genero.toLowerCase() == genero` se ejecuta pero no se retorna. Todos los callback devuelven `undefined` (falsy) → filtro siempre devuelve `[]`. |
| **B25** | 27 | `dibujar()` nunca obtiene el `<ul>` real — la variable `listado` es un string local, no el elemento del DOM. |
| **B26** | — | `dibujar()` nunca limpia el `<ul>` antes de añadir elementos. Llamadas múltiples duplicarían los `<li>`. |
| **B27** | 27, 34, 43 | `listado` sin declaración (`let`/`const`) → se filtra/escapa al ámbito global. |

### Bugs persistentes (Puntos 3–6 sin implementar)

| Punto | Requisito | Estado |
|-------|-----------|--------|
| 1 — Carga JSON | `fetch` + `men.json()` ✅, renderiza títulos ✅ | ✅ |
| 2 — Filtro género | `<option>` dinámicos ✅, event listener ✅, **`dibujar()` rota** ❌ | ⚠️ |
| 3 — Cookie ❌ | — | ❌ |
| 4 — Temporizador ❌ | — | ❌ |
| 5 — Reiniciar ❌ | — | ❌ |
| 6 — Hover autor ❌ | — | ❌ |

### Resumen de `dibujar()` — errores concretos

```js
function dibujar(genero){
    listado = "";                          // ❌ B25: string, no DOM
    if(genero ==='todos'){
        libros.forEach((libro,ind)=>{
            ...
            listado.appendChild(tarjeta);  // ❌ B23: string no tiene appendChild
        });        
    }else{
        libros.filter((libro)=>{
            libro.genero.toLowerCase() == genero;  // ❌ B24: falta return
        }).forEach(...)                    // filter siempre vacío, no se ejecuta
    }
}
```

### Plan de corrección

1. **Arreglar `dibujar()`** — Obtener `<ul>` con `getElementById`, limpiar con `innerHTML = ''`, usar `let`, añadir `return` en el `filter`, usar `===`.
2. **Aplanar cadena de promesas** — `return men.json()` en vez de anidar.
3. **Punto 3** — `guardarCookie` / `leerCookie` con `encodeURIComponent`.
4. **Punto 4** — `setInterval` cada 100ms actualizando `#temporizador`.
5. **Punto 5** — Listener en `#reiniciar`: limpia cookie, reinicia timer, resetea filtro.
6. **Punto 6** — `mouseenter` en cada `<li>` con promesa simulada del autor.

---

Welcome back! Let's get this assignment sorted out. I see exactly why your genre filtering isn't working. You have a few logical missteps in your `dibujar` function that are preventing the books from rendering.

Let's break down the bugs, review the key technical concepts, and analyze the professional English vocabulary.

---

## 🛠️ The Bugs Explained

### 1. The `listado` Variable Issue

* **The Mistake:** Inside `dibujar()`, you declare `listado = "";` as a plain string, but then you try to call `.appendChild()` on it.
* **Why it fails:** Strings do not have an `.appendChild()` method. That method only exists on DOM elements. Because of this, JavaScript throws a `TypeError`.
* **The Correction:** You need to grab the actual DOM container element inside your function, just like you did in your DOMContentLoaded event: `const listado = document.getElementById('lista-libros');`. Also, remember to clear its old content (`listado.innerHTML = "";`) before drawing the new filtered list!

### 2. The Missing `return` inside `.filter()`

* **The Mistake:** Inside your `else` block, you call `.filter()`, but your arrow function does not return a value:
```javascript
libros.filter((libro) => { libro.genero.toLowerCase() == genero; })

```


* **Why it fails:** When you use curly braces `{}` in an arrow function, you *must* explicitly use the `return` keyword. Without it, the filter evaluates everything as `undefined`, and your filtered array ends up completely empty.
* **The Correction:** Either remove the curly braces for an implicit return, or add the word `return`:
```javascript
libros.filter((libro) => libro.genero.toLowerCase() === genero)

```



---

## 💻 Technical Vocabulary

| Term | Meaning | Example Context |
| --- | --- | --- |
| **Implicit Return** | A feature of arrow functions where you omit the curly braces `{}` and the `return` keyword, causing the expression to automatically return its result. | *Removing the curly braces from your filter creates an **implicit return**.* |
| **TypeError** | An error thrown when an operation is performed on a value of the wrong data type (like trying to treat a string as a DOM element). | *Calling `.appendChild()` on an empty string causes a **TypeError**.* |
| **To Clear the Container** | The process of wiping out existing HTML content inside a DOM element before inserting fresh data. | *Make sure **to clear the container** using `innerHTML = ""` before adding new list items.* |

---

## 🗣️ Regular Vocabulary & Coding Missteps

### Everyday English Terminology

* **To omit:** To leave out or exclude something, either intentionally or forgetfully.
> *If you **omit** the return keyword inside a block-body arrow function, it returns undefined.*


* **Fresh data:** Newly fetched or updated information used to replace stale, old content on a screen.
> *We clear the list so the **fresh data** doesn't get stacked underneath the old items.*



### Structural Recommendation

Right now, you are duplicating the loop that creates the `<li>` items (once on initial load, and twice inside `dibujar`).

Instead of writing `document.createElement('li')` over and over in different parts of your code, you can simply call your fixed `dibujar('todos')` right after your array is populated inside your `fetch` promise chain. This keeps your code highly **maintainable** and clean.

How do you want to handle these fixes inside your `dibujar` function? Would you like to check the `.filter()` syntax adjustment first?

---

## Debug Report 5 — `examen.js` (cuarta actualización)

```js
const libros = [];
const listado = document.getElementById('lista-libros');
//cargar json asincrona. Mostrar titulos
/*
document.addEventListener('DOMContentLoaded', (e) => {
  ...
});
*/
//funciones
function dibujar(genero){
    listado.innerHTML = "";
    if(genero ==='todos'){
        libros.forEach((libro,ind)=>{
        const tarjeta = document.createElement('li');
        const texto = `${ind+1}.- ${libro.titulo}`;
        tarjeta.innerText = texto;
        tarjeta.value = libro;
        listado.appendChild(tarjeta);
        });        
    }else{
        libros.filter((libro)=>
            libro.genero.toLowerCase() == genero
        ).forEach((libro,ind)=>{
            const targeta = document.createElement('li');
            const texto = `${ind+1}.- ${libro.titulo}`;
            targeta.textContent = texto;
            listado.appendChild(targeta);
        });
    }
}
document.addEventListener('DOMContentLoaded',(e)=>{
    (fetch('libros.json'))
    .then((men)=>{
        console.table(`men, ${men}`);
        (men.json())
        .then((parse)=>{
            libros.push(...parse);
            console.table(libros);
            const categoria = document.getElementById('categoria');             
            const tarjetaT = document.createElement('option');
            tarjetaT.textContent = "Todos";
            tarjetaT.value = "todos";
            categoria.appendChild(tarjetaT);
            const generosVector = [...new Set(libros.map((libro)=>libro.genero))];
            generosVector.forEach((libro)=>{
                const tarjeta = document.createElement('option');
                const texto = `${libro}`;
                tarjeta.textContent = texto;
                tarjeta.value = texto.toLowerCase();
                categoria.appendChild(tarjeta);
            });
            //recuperar la cookie
            const guardado = document.cookie
            .split('; ')
            .find((item)=> item.startsWith('genero='))
            ?.(split('='))[1];
            dibujar(guardado);
            //Add event change
            categoria.addEventListener('change',(e)=>{
                const genero = e.target.value;
                console.log(genero);
                dibujar(genero);
                //crear cookie
                document.cookie = `genero=${genero}; path=/; max-age=84600;`;
            });
        })
    })
    .catch((err)=>console.error(err));    
});
```

### Bugs nuevos (B28–B30)

| # | Línea | Problema |
|---|-------|----------|
| **B28** | 85 | `?.(split('='))` — sintaxis inválida. `?.` seguido de `(` es **optional function call**, no property access. Además `split` no está definida como variable → `ReferenceError: split is not defined`. Debe ser `?.split('=')[1]`. |
| **B29** | 86 | `dibujar(guardado)` — si no hay cookie, `guardado` es `undefined`. `dibujar(undefined)` entra al `else`, el `filter` no coincide con nada → **lista vacía al cargar**. Falta valor por defecto: `dibujar(guardado ?? 'todos')`. |
| **B30** | 2 | `const listado = document.getElementById(...)` se ejecuta **antes** de `DOMContentLoaded`. Como el `<script>` está al final del `<body>`, el DOM ya existe ✅ — **no es bug** realmente. |

### Bugs persistentes

| # | Punto | Problema |
|---|-------|----------|
| B21 | — | `.then()` anidado (líneas 52-53). Sigue sin aplanar con `return men.json()`. |
| — | 4 | ❌ Sin temporizador (`setInterval`) |
| — | 5 | ❌ Sin botón Reiniciar |
| — | 6 | ❌ Sin hover de autor con promesa |

### Resumen

| Punto | Estado |
|-------|--------|
| 1 — Carga + mostrar títulos | ✅ |
| 2 — Filtro género | ✅ `dibujar()` corregida, `<select>` dinámico, event listener |
| 3 — Cookie | ⚠️ Guarda ✅, pero lectura rota (B28) y sin fallback (B29) |
| 4 — Temporizador | ❌ |
| 5 — Reiniciar | ❌ |
| 6 — Hover autor | ❌ |

---

## Debug Report 6 — `examen.js` (sin cambios)

El código está idéntico al del reporte anterior. Los bugs B28 (`?.(split('='))` → `ReferenceError`) y B29 (sin fallback al no haber cookie) siguen intactos.

### Bugs activos

| # | Línea | Problema | Gravedad |
|---|-------|----------|----------|
| B28 | 85 | `?.(split('='))` — sintaxis inválida, `ReferenceError: split is not defined` | 🔴 Bloqueante — rompe toda la carga |
| B29 | 86 | `dibujar(guardado)` sin fallback — si no hay cookie, `guardado` es `undefined` → lista vacía | 🟡 Media |
| B21 | 52-53 | `.then()` anidado en vez de `return men.json()` | 🟡 Media |
| — | — | Punto 4 (temporizador), Punto 5 (reiniciar), Punto 6 (hover autor) sin implementar | 🔴 |

### Resumen

| Punto | Estado |
|-------|--------|
| 1 — Carga + títulos | ✅ |
| 2 — Filtro género | ✅ |
| 3 — Cookie | ⚠️ Guarda OK, **lectura rota** (B28) |
| 4 — Temporizador | ❌ |
| 5 — Reiniciar | ❌ |
| 6 — Hover autor | ❌ |

---

## Fix aplicado — `examen.js` reescrito con los 6 puntos

```js
const libros = [];
const listado = document.getElementById('lista-libros');
const select = document.getElementById('categoria');
let contador = 0;
let intervalo = null;

function iniciarTemporizador() {
  const span = document.getElementById('temporizador');
  intervalo = setInterval(() => {
    contador++;
    span.textContent = contador;
  }, 100);
}

function guardarCookie(genero) {
  document.cookie = `genero=${encodeURIComponent(genero)}; path=/; max-age=86400`;
}

function leerCookie() {
  const cookies = document.cookie.split('; ').find(item => item.startsWith('genero='));
  return cookies ? decodeURIComponent(cookies.split('=')[1]) : '';
}

function obtenerAutor(libro) {
  return new Promise(resolve => {
    setTimeout(() => resolve(libro.autor), 300);
  });
}

function dibujar(genero) {
  listado.innerHTML = "";
  const filtrados = genero && genero !== 'todos'
    ? libros.filter(l => l.genero.toLowerCase() === genero)
    : libros;
  filtrados.forEach((libro, ind) => {
    const li = document.createElement('li');
    li.dataset.id = libro.id;
    li.innerHTML = `${ind + 1}.- ${libro.titulo} <span id="autor-${libro.id}"></span>`;
    li.addEventListener('mouseenter', async () => {
      const span = document.getElementById(`autor-${libro.id}`);
      if (!span.textContent) {
        span.textContent = await obtenerAutor(libro);
      }
    });
    listado.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('libros.json');
    const data = await res.json();
    libros.push(...data);

    const generos = [...new Set(libros.map(l => l.genero))];
    select.innerHTML = '<option value="todos">Todos los géneros</option>' +
      generos.map(g => `<option value="${g.toLowerCase()}">${g}</option>`).join('');

    const generoGuardado = leerCookie();
    select.value = generoGuardado || 'todos';
    dibujar(select.value);

    select.addEventListener('change', () => {
      dibujar(select.value);
      guardarCookie(select.value);
    });

    iniciarTemporizador();
  } catch (err) {
    console.error('Error al cargar los libros:', err);
  }
});

document.getElementById('reiniciar').addEventListener('click', () => {
  document.cookie = 'genero=; path=/; max-age=0';
  clearInterval(intervalo);
  contador = 0;
  document.getElementById('temporizador').textContent = '0';
  select.value = 'todos';
  dibujar('todos');
  iniciarTemporizador();
});
```

### Estado final tras el fix

| Punto | Estado |
|-------|--------|
| 1 — Carga JSON + mostrar títulos | ✅ `async/await`, `fetch`, render en `<ul>` |
| 2 — Filtro género | ✅ `<option>` dinámicos con `Set`, `dibujar()` con `filter()` |
| 3 — Cookie | ✅ `guardarCookie`/`leerCookie` con `encodeURIComponent`/`decodeURIComponent` |
| 4 — Temporizador | ✅ `setInterval` cada 100ms actualizando `#temporizador` |
| 5 — Reiniciar | ✅ Limpia cookie, timer, y resetea lista |
| 6 — Hover autor | ✅ `mouseenter` con `Promise` simulada de 300ms |
