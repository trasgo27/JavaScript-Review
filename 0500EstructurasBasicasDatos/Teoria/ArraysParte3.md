# 4.5 DESESTRUCTURACIÓN DE ARRAYS

El estándar **ES2015** introdujo la **desestructuración** (destructuring), una sintaxis que permite extraer valores de arrays (y objetos) y asignarlos a variables de forma cómoda y legible.

## 4.5.1 ASIGNACIÓN MÚLTIPLE

Permite asignar valores a varias variables a la vez en una sola línea:

```js
let [saludo, despedida, cierre] = ["Hola", "Adiós", "Hasta nunca"];

console.log(saludo);     // Hola
console.log(despedida);  // Adiós
console.log(cierre);     // Hasta nunca
```

Las expresiones asignadas pueden ser tan complejas como se desee:

```js
let [n1, n2] = [10, Math.random() * 20];
```

## 4.5.2 INTERCAMBIO DE VARIABLES (SWAP)

La desestructuración facilita el clásico intercambio de valores entre dos variables sin necesidad de una variable auxiliar:

```js
let a = 5;
let b = 10;

[a, b] = [b, a];

console.log(a); // 10
console.log(b); // 5
```

## 4.5.3 OPERADOR SPREAD (`...`)

El **operador de propagación** (spread) permite expandir un array en elementos individuales:

```js
let array = [1, 2, 3];
let [x, y, z] = [...array];

console.log(x); // 1
console.log(y); // 2
console.log(z); // 3
```

### Omitir elementos

Se pueden saltar elementos del array dejando espacios vacíos en la desestructuración:

```js
let array = [1, 2, 3];
let [x, , y] = [...array];

console.log(x); // 1
console.log(y); // 3 (se saltó el 2)
```

### Rest operator

El operador `...` también puede usarse para agrupar el resto de elementos en un array:

```js
let a, b, array;
[a, b, ...array] = [1, 2, 3, 4, 5];

console.log(a);     // 1
console.log(b);     // 2
console.log(array); // [3, 4, 5]
```

Esta sintaxis es muy potente, pero conviene adaptarse a ella progresivamente.

---

# 4.6 ESTRUCTURAS DE TIPO `Set`

## 4.6.1 INTRODUCCIÓN

Los **Sets** (conjuntos) son una estructura de datos —son objetos realmente— que permiten almacenar datos de forma similar a los arrays. Aparecieron en el estándar **ES2015**.

La diferencia fundamental con los arrays es que **no admiten valores duplicados**. Es muy habitual necesitar recoger datos eliminando aquellos que ya están repetidos. En los arrays esta tarea es pesada, pero con los conjuntos es directa.

## 4.6.2 DECLARACIÓN Y CREACIÓN

### Conjunto vacío

```js
const lista = new Set();
```

Esto confirma que los conjuntos son objetos.

### Añadir valores con `add`

```js
lista.add(8);
lista.add(6);
lista.add(5);
lista.add(5);
lista.add(6);

console.log(lista); // Set { 8, 6, 5 }
```

Los valores duplicados (`5` y `6`) no se mantienen en el conjunto.

El método `add` devuelve una referencia al propio conjunto, por lo que se puede **encadenar**:

```js
lista.add(8).add(6).add(5).add(5).add(6);
console.log(lista); // Set { 8, 6, 5 }
```

### Inicializar desde un array

```js
const lista = new Set([5, 6, 4, 5, 6, 5, 5, 6, 4, 6, 6]);
console.log(lista); // Set { 5, 6, 4 }
```

Aunque los datos procedan de un array, los duplicados se eliminan automáticamente.

### Inicializar con un string

```js
const lista = new Set("Conjunto");
console.log(lista); // Set { 'C', 'o', 'n', 'j', 'u', 't' }
```

Cada letra es un elemento y, como siempre, no se repiten caracteres iguales.

Para añadir strings completos (no separados por caracteres) se usa `add`:

```js
const lista = new Set();
lista.add("Conjunto");
console.log(lista); // Set { 'Conjunto' }
```

## 4.6.3 MÉTODOS DE LOS CONJUNTOS

### 4.6.3.1 TAMAÑO: `size`

La propiedad `size` indica cuántos elementos tiene el conjunto:

```js
const lista = new Set([2, 4, 6, 8, 10]);
console.log(lista.size); // 5
```

### 4.6.3.2 ELIMINAR VALORES

**`delete`** — elimina un valor específico:

```js
const lista = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
lista.delete(6);
console.log(lista); // Set { 1, 2, 3, 4, 5, 7, 8, 9 }
```

**`clear`** — elimina **todos** los elementos del conjunto:

```js
const lista = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
lista.clear();
console.log(lista); // Set {}
```

### 4.6.3.3 BUSCAR VALORES: `has`

`has` devuelve `true` si el valor existe en el conjunto:

```js
const lista = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

console.log(lista.has(7));  // true
console.log(lista.has(10)); // false
```

## 4.6.4 CONVERTIR CONJUNTOS EN ARRAYS

El **operador de propagación** (`...`) permite convertir un conjunto en array fácilmente:

```js
const lista = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const array = [...lista];

console.log(array); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## 4.6.5 RECORRER CONJUNTOS

Los conjuntos se recorren con el bucle `for...of`:

```js
const lista = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

for (let numero of lista) {
  console.log(numero);
}
// 1
// 2
// 3
// ...
```

La variable se declara antes de `of` y va tomando el valor de cada elemento del conjunto.

---

# 4.7 MAPAS (`Map`)

## 4.7.1 ¿QUÉ SON LOS MAPAS?

Los **Mapas** (`Map`) permiten crear estructuras de tipo **clave-valor**, donde las claves no se pueden repetir y cada clave tiene asociado un valor. También forman parte del estándar **ES2015**.

Tanto las claves como los valores pueden ser de **cualquier tipo**. En un mismo mapa no puede haber dos elementos con la misma clave, pero sí pueden repetirse los valores.

## 4.7.2 DECLARAR MAPAS

Para declarar un mapa vacío:

```js
const provincias = new Map();
```

Como los arrays y los conjuntos, los mapas son objetos.

## 4.7.3 ASIGNAR VALORES A MAPAS

### 4.7.3.1 MÉTODO `set`

El método `set` asigna un nuevo elemento. Recibe la clave y el valor:

```js
const provincias = new Map();

provincias.set(1,  "Álava");
provincias.set(28, "Madrid");
provincias.set(34, "Palencia");
provincias.set(41, "Sevilla");

console.log(provincias);
```

Resultado:

```
Map {
  1 => 'Álava',
  28 => 'Madrid',
  34 => 'Palencia',
  41 => 'Sevilla'
}
```

Si se añade un elemento con una clave ya existente, el valor **se sustituye** (las claves no se repiten).

El método `set` puede **encadenarse** porque devuelve el propio mapa:

```js
const provincias = new Map();
provincias.set(1, "Álava").set(28, "Madrid").set(34, "Palencia").set(41, "Sevilla");
```

### 4.7.3.2 USO DE ARRAYS PARA CREAR MAPAS

Se puede crear un mapa a partir de un array de pares `[clave, valor]`:

```js
const personas = new Map([
  [1, "Jose"],
  [2, "María"],
  [3, "Elena"]
]);

console.log(personas);
// Map { 1 => 'Jose', 2 => 'María', 3 => 'Elena' }
```

## 4.7.4 OPERACIONES SOBRE MAPAS

### 4.7.4.1 OBTENER VALORES: `get`

El método `get` devuelve el valor asociado a una clave. Es una operación muy rápida:

```js
console.log(provincias.get(34)); // Palencia
console.log(provincias.get(99)); // undefined (clave inexistente)
```

### 4.7.4.2 BUSCAR UNA CLAVE: `has`

`has` devuelve `true` si la clave existe en el mapa:

```js
console.log(provincias.has(34));        // true
console.log(provincias.has("Palencia")); // false
```

`"Palencia"` devuelve `false` porque es un **valor**, no una clave.

### 4.7.4.3 TAMAÑO: `size`

```js
console.log(provincias.size); // 4
```

### 4.7.4.4 ELIMINAR: `delete` Y `clear`

```js
provincias.delete(28);            // Elimina la clave 28
console.log(provincias.has(28));  // false

provincias.clear();               // Elimina todo
console.log(provincias.size);     // 0
```

### 4.7.4.5 RECORRER UN MAPA

Los mapas se pueden recorrer con `for...of`:

```js
for (let [clave, valor] of provincias) {
  console.log(`${clave} => ${valor}`);
}
```

También proporcionan métodos específicos:

```js
provincias.forEach((valor, clave) => {
  console.log(`${clave}: ${valor}`);
});

// Solo claves
console.log([...provincias.keys()]);   // [1, 28, 34, 41]

// Solo valores
console.log([...provincias.values()]); // ["Álava", "Madrid", "Palencia", "Sevilla"]
```

---

## RESUMEN

| Estructura | Característica principal | Añadir | Buscar | Eliminar | Tamaño |
|---|---|---|---|---|---|
| `Array` | Ordenado, admite duplicados | `push` / `unshift` | `indexOf` / `includes` | `pop` / `shift` / `splice` | `.length` |
| `Set` | Sin duplicados | `add` | `has` | `delete` / `clear` | `.size` |
| `Map` | Clave-valor, claves únicas | `set` | `get` / `has` | `delete` / `clear` | `.size` |
