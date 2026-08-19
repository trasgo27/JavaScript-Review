# Test de Arrays — 22 preguntas

Test para evaluar la comprensión de los archivos `ArraysParte1.md`, `ArraysParte2.md` y `arraysParte3.md`.

---

## Parte 1 — Fundamentos

**1.** ¿Qué devuelve `typeof` aplicado a un array?

> **Tu respuesta:** `typeof` devuelve `"object"`. Pero no se puede usar `typeof` para distinguir un array de un objeto plano. Para eso se usa `Array.isArray()`.
>
> ```js
> const vector = [1, 2, 3];
> console.log(typeof vector);      // "object"
> console.log(Array.isArray(vector)); // true
> ```

**2.** ¿Qué índice tiene el primer elemento de un array?

> **Tu respuesta:** El índice del primer elemento es 0.

**3.** Dado `const a = [1, 2, 3]`, ¿es válido `a[0] = 99`? ¿Y `a = [4, 5, 6]`? ¿Por qué?

> **Tu respuesta:** `a[0] = 99` es válido — cambia el primer elemento a 99. `a = [4, 5, 6]` lanza error porque `a` ya fue declarada con `const` (no se puede reasignar la referencia).
>
> Tu respuesta es **100% correcta y perfectamente precisa**. Has entendido la distinción exacta entre mutar el contenido de un objeto y reasignar su referencia.
>
> ### Stack vs. Heap
>
> Cuando declaras `const a = [1, 2, 3]`, JavaScript asigna memoria en dos lugares:
>
> 1. **Stack (la agenda):** Ahí vive el nombre `a`. Con `const`, el valor guardado junto a `a` en el stack está bloqueado y no se puede cambiar.
> 2. **Heap (el almacén):** Los arrays y objetos son demasiado grandes para el stack, así que se guardan en el heap. La variable `a` solo guarda un **puntero de dirección de memoria** (como un número de seguimiento) que apunta a dónde está el array en el heap.
>
> ### `a[0] = 99` (válido)
>
> Le dices a JavaScript: *"Ve a la dirección guardada en `a`, mira dentro de ese array y cambia el elemento en la primera posición"*. Estás cambiando el **contenido** del array en el heap. La variable `a` en el stack sigue apuntando a la misma dirección. `const` solo protege el puntero, no los datos a los que apunta.
>
> ### `a = [4, 5, 6]` (error)
>
> Creas un array **nuevo** en un locker distinto del heap e intentas que `a` en el stack rompa su conexión anterior y guarde una nueva dirección. `const` lanza `TypeError: Assignment to constant variable`.
>
> ### Analogía 🏠
>
> `const` es como un contrato de alquiler de una casa:
> * `a[0] = 99` es como pintar el salón — modificas el **interior**, está permitido.
> * `a = [4, 5, 6]` es como derribar la casa y mudarte a otro terreno — `const` te bloquea porque la **dirección** no puede cambiar.
>
> Si necesitas reemplazar el array entero, usa `let` en lugar de `const`.

**4.** ¿Qué muestra este código?
```js
let a = ["x", "y"];
let b = a;
b[0] = "z";
console.log(a[0]);
```

> **Tu respuesta:** `"z"`. `b = a` copia la referencia, no el array. Ambas variables apuntan a la misma dirección en el heap. Al modificar `b[0]`, también cambia `a[0]`.
>
> Este código imprime: **`"z"`**
>
> ### ¿Por qué? (La trampa de la referencia)
>
> Como los arrays en JavaScript son objetos, se manejan por **referencia**, no por valor.
>
> Cuando escribes `let b = a;`, **no** estás creando una copia independiente del array. Solo estás copiando el *puntero* desde el stack. Ambas variables (`a` y `b`) apuntan al mismo array en el heap.
>
> * Cambiar `b[0] = "z"` modifica ese único array compartido en el heap.
> * Al hacer `console.log(a[0])`, ves el cambio porque `a` mira exactamente la misma caja.
>
> Si quisieras que `b` fuese una copia completamente independiente, usarías el operador spread: `let b = [...a];`.

**5.** ¿Qué valor tiene `a[2]` tras ejecutar?
```js
let a = ["A", "B", , "D"];
```

> **Tu respuesta:** `undefined`.
>
> Al dejar un espacio vacío entre comas en un array literal (`["A", "B", , "D"]`), se crea un **sparse array** (un hueco). Cuando JavaScript accede a `a[2]`, no encuentra nada asignado y devuelve `undefined`.
>
> **Dato curioso:** JavaScript distingue entre un "hueco" (empty) y un valor explícitamente `undefined`. Métodos como `.map()`, `.forEach()` o `.filter()` **se saltan** los huecos, pero no los `undefined` explícitos.
>
> **¿Y `length`?** `a.length` es `4`. La propiedad `length` se calcula como el índice más alto más uno, sin importar si hay huecos. El espacio vacío en índice 2 sigue contando para la longitud.
>
> Has dado en el clavo con el comportamiento de los bucles: **los huecos se saltan, los `undefined` explícitos se procesan**. Pero hay un matiz importante: **`undefined` NO es un objeto**, es un **tipo primitivo**.
>
> JavaScript tiene dos categorías de datos:
>
> * **Objetos** (arrays `[]`, objetos `{}`, funciones) — estructuras complejas en el Heap, accesibles por puntero.
> * **Primitivos** (números, strings, booleanos, `undefined`) — valores simples guardados directamente en el Stack. Son inmutables y no tienen propiedades ni métodos.
>
> `undefined` es tan único que es a la vez un **tipo** y un **valor**. Su propósito es: *"Esta variable existe pero no tiene valor asignado"*.
>
> **Prueba con `typeof`:**
> ```js
> console.log(typeof {});        // "object"
> console.log(typeof []);        // "object"
> console.log(typeof undefined); // "undefined"
> ```
>
> *(Curiosidad: `typeof null` devuelve `"object"`, pero es un bug conocido de 30 años que nunca se corrigió)*
>
> **Resumen del modelo mental:**
> 1. **Huecos:** la clave del índice no existe. Los bucles se lo saltan.
> 2. **`undefined` explícito:** la clave del índice *sí* existe y su valor es el primitivo `undefined`. Los bucles lo visitan y procesan.
>
> Lo has expresado perfectamente. Conectarlo con los atributos de objetos es una forma muy inteligente de verlo, porque así es exactamente como el motor de JavaScript trata los arrays internamente.
>
> ### 1. El hueco (el atributo no existe)
>
> Es como acceder a un atributo que no existe en un objeto:
> ```js
> const usuario = { nombre: "trasgo" };
> console.log(usuario.age); // undefined (la clave no existe)
>
> const lista = ["A", "B", , "D"];
> console.log(lista[2]);    // undefined (la clave "2" no existe)
> ```
>
> ### 2. `undefined` explícito (el atributo existe, pero sin valor)
>
> Has creado la clave del atributo, pero la has llenado con la nada (el primitivo `undefined`):
> ```js
> const usuario = { nombre: "trasgo", age: undefined };
> console.log(usuario.age); // undefined (la clave existe, valor es primitivo undefined)
>
> const lista = ["A", "B", undefined, "D"];
> console.log(lista[2]);    // undefined (la clave "2" existe, valor es primitivo undefined)
> ```
>
> **Tu modelo mental es oficialmente impecable.** Has conectado:
> * Asignación de memoria (Stack vs. Heap)
> * Tipos de datos (Primitivos vs. Objetos)
> * Mecánica de arrays (Huecos vs. Valores explícitos)

**6.** ¿Cuál es la diferencia entre `for...in` y `for...of` al recorrer un array con elementos indefinidos?

> La diferencia fundamental es qué mira cada bucle: **`for...in` recorre las claves (índices)**, **`for...of` recorre los valores**.
>
> ### 1. `for...in` (el cazador de claves)
>
> Itera sobre las **claves enumerables** del objeto.
> * **Hueco:** la clave del índice no existe → **lo salta**.
> * **`undefined` explícito:** la clave existe → **lo visita**.
>
> ```js
> let arr = ["A", "B", , "D"];
> arr[4] = undefined;
>
> for (let index in arr) {
>   console.log(index);
> }
> // "0", "1", "3", "4" (el índice "2" se salta)
> ```
>
> ### 2. `for...of` (el cazador de valores)
>
> Itera sobre los **valores** de un iterable. Lee secuencialmente desde índice `0` hasta `arr.length - 1`.
> * **Hueco:** lo lee igual → devuelve `undefined`.
> * **`undefined` explícito:** lo lee normalmente → devuelve `undefined`.
>
> ```js
> for (let value of arr) {
>   console.log(value);
> }
> // "A", "B", undefined, "D", undefined
> ```
>
> ### Tabla resumen
>
> | Bucle | Apunta a | Hueco | `undefined` explícito |
> |---|---|---|---|
> | **`for...in`** | Claves (índices) | **Lo salta** | **Lo visita** |
> | **`for...of`** | Valores | **Lo visita** (`undefined`) | **Lo visita** (`undefined`) |
>
> ⚠️ **Buenas prácticas:** No uses `for...in` para arrays estándar porque también recorre propiedades personalizadas. Usa `for...of` o `.forEach()`.

---

## Parte 2 — Métodos

**7.** ¿Qué devuelve `pop()`? ¿Y `shift()`?

> **Tu respuesta:** `pop()` elimina y devuelve el **último** elemento del array. `shift()` elimina y devuelve el **primer** elemento. Ambos devuelven el valor en sí (no envuelto en un array) y ambos **modifican el array original**.
>
> ```js
> const days = ["Monday", "Tuesday", "Wednesday"];
>
> const last = days.pop();   // last = "Wednesday"
> console.log(days);         // ["Monday", "Tuesday"]
>
> const first = days.shift(); // first = "Monday"
> console.log(days);          // ["Tuesday"]
> ```
>
> Si el array está vacío, ambos devuelven `undefined`.

**8.** Diferencia entre `slice(1, 3)` y `splice(1, 3)`.

> **Tu respuesta:**
>
> | Característica | `slice(inicio, fin)` | `splice(inicio, borrar, ...items)` |
> |---|---|---|
> | ¿Modifica el original? | **No** — devuelve un nuevo array | **Sí** — muta el array original |
> | Valor de retorno | Nuevo subarray desde `inicio` hasta `fin` (fin no incluido) | Array con los elementos eliminados |
> | Parámetros | (inicio, fin) — fin opcional, admite negativos | (inicio, borrar, ...items) — borrar opcional, si se omite borra desde inicio hasta el final |
> | Llamada vacía | `slice()` devuelve una copia superficial del array completo | `splice()` devuelve `[]` (no borra nada) |
> | Uso típico | Copiar / extraer una porción sin efectos secundarios | Insertar, eliminar o reemplazar elementos en el lugar |
>
> ### Ejemplos con días de la semana
>
> ```js
> const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
>
> // --- slice() — NO modifica el original ---
> const sub = days.slice(1, 3);
> console.log(sub);           // ["Tuesday", "Wednesday"]
> console.log(days);          // ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] (sin cambios)
>
> // --- splice() — modifica el original ---
> const removed = days.splice(1, 2, "M A R T E S", "M I E R C O L E S");
> console.log(removed);       // ["Tuesday", "Wednesday"]
> console.log(days);          // ["Monday", "M A R T E S", "M I E R C O L E S", "Thursday", "Friday"]
> ```

**9.** ¿Qué imprime?
```js
let a = [100, 5, 25];
a.sort();
console.log(a);
```

> **Tu respuesta:** `[100, 25, 5]`. `sort()` convierte los números a strings y los compara lexicográficamente (orden de diccionario): `"100" < "25" < "5"`. No realiza una ordenación numérica por defecto.
>
> ```js
> // "100" vs "25"  → compara "1" vs "2" → "100" va primero
> // "25"  vs "5"   → compara "2" vs "5" → "25" va primero
> // Resultado: [100, 25, 5]
> ```

**10.** ¿Cómo ordenas números correctamente con `sort()`?

**11.** ¿Cuál es la diferencia entre `map()` y `forEach()`?

> **Tu respuesta:**
>
> ### Lo que tienen en común
>
> * **El bucle:** Ambos visitan cada elemento uno por uno.
> * **La lógica:** Ambos aceptan una función callback.
> * **Inmutabilidad:** Ninguno modifica el array original.
>
> ### Dónde divergen
>
> #### `.map()`
> * **Retorno:** Un **nuevo array de la misma longitud**.
> * **Mecanismo:** Recoge lo que el callback `return`a y lo coloca en ese nuevo array.
> * **Uso típico:** Transformar datos (ej: objetos a strings formateados).
>
> #### `.forEach()`
> * **Retorno:** **`undefined`** — cualquier `return` dentro del callback se ignora.
> * **Uso típico:** **Efectos secundarios** — actualizar el DOM, logging, llamadas externas.
>
> ### Contraste en código
>
> ```js
> const numbers = [1, 2, 3];
>
> const mapResult = numbers.map(n => n * 2);
> console.log(mapResult);      // [2, 4, 6]
>
> const forEachResult = numbers.forEach(n => n * 2);
> console.log(forEachResult);  // undefined
> ```

**12.** ¿Qué devuelve `filter()`? ¿Y `reduce()`?

> **Tu respuesta:** `filter()` devuelve un **nuevo array** con los elementos que pasan la prueba del callback. `reduce()` devuelve un **único valor acumulado** tras recorrer todos los elementos — puede ser de cualquier tipo (número, string, objeto, array, etc.).
>
> ### Inmersión: agrupar con `.reduce()`
>
> Uno de los usos más potentes y comunes de `.reduce()` en el desarrollo real es **agrupar un array de datos por una categoría específica**.
>
> Desglosémoslo línea por línea, rastreando exactamente cómo fluyen los datos en la memoria.
>
> ---
>
> #### Preparación
>
> Recordemos cómo son los datos:
>
> ```javascript
> const personas = [
>     { name: "Ana", role: "admin" },
>     { name: "Carlos", role: "user" },
>     { name: "Elena", role: "admin" }
> ];
> ```
>
> ---
>
> #### 1. El valor inicial (la semilla)
>
> Fíjate al final de la expresión `.reduce()`, justo después de la llave de cierre del callback:
>
> ```javascript
> }, {}); // <-- Este objeto vacío es el valor inicial
> ```
>
> Este `{}` es la base. Le dice a JavaScript: *"Crea un objeto vacío en el Heap y pásalo al bucle como punto de partida"*. Dentro de los parámetros de la función, la variable **`box`** apunta a este objeto. La variable **`person`** representa el elemento actual del array.
>
> ---
>
> #### 2. Ejecución paso a paso (las 3 rondas)
>
> El bucle se ejecuta exactamente 3 veces (una por cada persona).
>
> **Ronda 1: Procesando Ana** `{ name: "Ana", role: "admin" }`
>
> * **Estado:** `box` está vacío (`{}`). `person.role` es `"admin"`.
> * **Comprobación:** `if (!box["admin"])`
> * ¿Existe la propiedad `"admin"` dentro de `box`? No.
> * Como no existe, el `if` la crea como un array vacío: `box["admin"] = [];`
> * Ahora `box` se ve así: `{ admin: [] }`.
> * **El push:** `box["admin"].push("Ana");` -> Inserta el nombre.
> * **El return:** `return box;` pasa `{ admin: ["Ana"] }` a la Ronda 2.
>
> **Ronda 2: Procesando Carlos** `{ name: "Carlos", role: "user" }`
>
> * **Estado:** `box` llega con `{ admin: ["Ana"] }`. `person.role` es `"user"`.
> * **Comprobación:** `if (!box["user"])`
> * ¿Existe la propiedad `"user"`? No.
> * El `if` la crea: `box["user"] = [];`
> * `box` ahora: `{ admin: ["Ana"], user: [] }`.
> * **El push:** `box["user"].push("Carlos");`
> * **El return:** `return box;` pasa `{ admin: ["Ana"], user: ["Carlos"] }` a la Ronda 3.
>
> **Ronda 3: Procesando Elena** `{ name: "Elena", role: "admin" }`
>
> * **Estado:** `box` llega con `{ admin: ["Ana"], user: ["Carlos"] }`. `person.role` es `"admin"`.
> * **Comprobación:** `if (!box["admin"])`
> * ¿Existe `"admin"`? **Sí, ya existe** desde la Ronda 1.
> * Como existe, el `if` es `false` y se **salta por completo**. No sobrescribimos nuestros datos.
> * **El push:** `box["admin"].push("Elena");` -> Añade Elena al array existente.
> * **El return:** `return box;` pasa el objeto final fuera del bucle.
>
> ---
>
> #### 3. El resultado final
>
> Cuando el array se agota, `.reduce()` termina y asigna el estado final de `box` a tu variable:
>
> ```javascript
> console.log(groupedByRole);
> // SALIDA:
> // {
> //   admin: ["Ana", "Elena"],
> //   user: ["Carlos"]
> // }
> ```
>
> #### Por qué `return box;` es obligatorio
>
> Cada ronda de `.reduce()` **debe** devolver el acumulador. El valor que `return`es al final de una ronda se convierte en el `box` de la *siguiente* ronda.
>
> Si olvidas `return box;`, la siguiente ronda recibiría `undefined` como `box` y tu script lanzaría `TypeError: Cannot read properties of undefined`.
```js
console.log("hola mundo".split(" "));
```

**14.** ¿Qué hace `JSON.stringify()` y `JSON.parse()`?

---

## Parte 3 — Destructuring, Set, Map

**15.** Sin usar variable auxiliar, intercambia `a` y `b` usando destructuring.

**16.** ¿Qué imprime?
```js
let [x, , z] = [1, 2, 3];
console.log(x, z);
```

**17.** ¿Qué imprime?
```js
let [a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(rest);
```

**18.** ¿Qué diferencia hay entre un `Set` y un `Array`?

**19.** Dado `const s = new Set([1, 1, 2, 2, 3])`, ¿cuántos elementos tiene?

**20.** ¿Cómo conviertes un `Set` en un array?

**21.** En un `Map`, ¿qué método obtiene el valor de una clave? ¿Y cómo compruebas si una clave existe?

**22.** ¿Qué imprime?
```js
const m = new Map([["a", 1], ["b", 2]]);
console.log(m.get("a"));
console.log(m.has(1));
```

---

Aquí tienes la tabla comparativa con las propiedades y los métodos más utilizados de `Array`, `Set` y `Map`.

Esta estructura te permitirá ver de un solo vistazo qué herramientas comparte cada estructura y cuáles son exclusivas de cada una.

| Característica / Método | Array `[]` | Set `new Set()` | Map `new Map()` |
| --- | --- | --- | --- |
| **Propiedad de tamaño** | **`.length`** | **`.size`** | **`.size`** |
| **Añadir / Insertar** | `.push()` (al final) <br> `.unshift()` (al inicio) | **`.add(valor)`** | **`.set(clave, valor)`** |
| **Eliminar uno** | `.pop()` (último) <br> `.shift()` (primero) <br> `.splice()` (por posición) | **`.delete(valor)`** | **`.delete(clave)`** |
| **Eliminar todo** | `array.length = 0` | **`.clear()`** | **`.clear()`** |
| **Comprobar si existe** | `.includes(valor)` | **`.has(valor)`** | **`.has(clave)`** |
| **Obtener un valor** | `array[índice]` | *No tiene (hay que iterar o convertir a Array)* | **`.get(clave)`** |
| **Recorrer elementos** | `.forEach()`, `for...of`, `.map()`, `.filter()`... | **`.forEach()`**, `for...of` | **`.forEach()`**, `for...of` |
| **Obtener Claves/Llaves** | `.keys()` (devuelve índices) | `.keys()` *(hace lo mismo que `.values()`)* | **`.keys()`** (devuelve las claves) |
| **Obtener Valores** | `.values()` | **`.values()`** | **`.values()`** (devuelve los valores) |
| **Ordenar** | **`.sort()`** | *No tiene* | *No tiene* |

---

### Tres reglas nemotécnicas rápidas para retener esto:

1. **El tamaño:** El `Array` va por libre con `.length`. Las estructuras más modernas (`Set` y `Map`) usan siempre `.size`.
2. **Existe o no existe:** El `Array` comprueba con `.includes()`. El `Set` y el `Map` son más "directos" y usan `.has()` (preguntan si la estructura *tiene* ese elemento o clave).
3. **Guardar datos:** Cada uno usa un verbo diferente según su naturaleza:
   - El `Array` empuja: `.push()`
   - El `Set` añade: `.add()`
   - El `Map` establece/asigna: `.set()`
