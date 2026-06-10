# 4.4 MÉTODOS DE ARRAYS

JavaScript proporciona una amplia variedad de métodos para trabajar con arrays. A continuación se presentan los más importantes, organizados por funcionalidad.

---

## 4.4.1 CREAR VECTORES

Con `new`:

```js
let a = new Array();      // Crear un array vacío
a[0] = 13;
console.log(a[0]);        // 13

let b = new Array(2);     // Array de 2 elementos sin valores iniciales
```

Con `[]`:

```js
let a = ["a", "b", "c", "d", "e"];  // Array de tamaño 5 con valores iniciales
console.log(a);                      // ["a", "b", "c", "d", "e"]
```

---

## 4.4.2 RELLENAR UN ARRAY: `fill`

El método `fill()` llena todos los elementos de un array con un valor específico, sobrescribiendo los valores existentes.

```js
const arr = [1, 2, 3, 4, 5];
arr.fill(0);           // Llena todo el array con 0
console.log(arr);      // [0, 0, 0, 0, 0]
```

También acepta parámetros de inicio y fin:

```js
const arr = [1, 2, 3, 4, 5];
arr.fill(0, 1, 3);     // Llena con 0 desde índice 1 hasta 3 (excluido)
console.log(arr);      // [1, 0, 0, 4, 5]
```

---

## 4.4.3 PROPIEDAD `length`

La longitud de un array depende de las posiciones que han sido asignadas:

```js
let a = new Array(12);
console.log(a.length);  // 12

let b = ["a", "b", "c", "d", "e"];
console.log(b.length);  // 5
```

`length` es una propiedad **modificable**. Si se asigna un valor menor, se truncan elementos:

```js
let c = [1, 2, 3, 4, 5];
c.length = 3;
console.log(c);  // [1, 2, 3]
```

---

## 4.4.4 INSERTAR VALORES: `unshift` Y `push`

- `push()` — inserta valores al **final** del array
- `unshift()` — inserta valores al **principio** del array

```js
let a = [];
a.push("a");              // Inserta "a" al final
a.push("b", "c", "d");    // Inserta múltiples valores al final
console.log(a);           // ["a", "b", "c", "d"]

a.unshift("A", "B", "C"); // Inserta al principio
console.log(a);           // ["A", "B", "C", "a", "b", "c", "d"]
```

Ambos devuelven la nueva longitud del array:

```js
let b = [1, 2];
console.log(b.push(3));   // 3 (nueva longitud)
console.log(b.unshift(0)); // 4 (nueva longitud)
```

---

## 4.4.5 BORRAR VALORES: `shift` Y `pop`

- `pop()` — borra y devuelve el **último** elemento
- `shift()` — borra y devuelve el **primer** elemento

```js
let a = ["A", "B", "C", "a", "b", "c", "d"];

console.log(a.pop());    // "d" — borra y devuelve la última posición
console.log(a.shift());  // "A" — borra y devuelve la primera posición
console.log(a);          // ["B", "C", "a", "b", "c"]
```

Si el array está vacío, ambos devuelven `undefined`.

---

## 4.4.6 IMPRIMIR ARRAYS: `join` Y `toString`

`toString()` convierte el array a string con elementos separados por comas:

```js
let a = [3, 21, 15, 61, 9];
console.log(a.toString());  // "3,21,15,61,9"
```

`join()` hace lo mismo pero permite especificar el separador:

```js
let a = [3, 21, 15, 61, 9];
console.log(a.join());        // "3,21,15,61,9"  (igual que toString)
console.log(a.join(" - # - ")); // "3 - # - 21 - # - 15 - # - 61 - # - 9"
console.log(a.join(""));      // "32115619"
```

---

## 4.4.7 CONCATENAR: `concat`

`concat()` combina dos o más arrays y devuelve un **nuevo array**. El array original no se modifica.

```js
let a = ["a", "b", "c"];
let b = ["d", "e", "f"];
let c = a.concat(b);

console.log(c);  // ["a", "b", "c", "d", "e", "f"]
console.log(a);  // ["a", "b", "c"] — no se modifica

// También acepta valores individuales
let d = a.concat("g", "h");
console.log(d);  // ["a", "b", "c", "g", "h"]
```

---

## 4.4.8 EXTRAER Y MODIFICAR: `slice` Y `splice`

### `slice()`

Devuelve un **nuevo array** con una porción del original. No modifica el array original.

```js
let a = ["a", "b", "c", "d", "e", "f"];
let b = a.slice(1, 3);  // (inicio → incluido, fin → excluido)

console.log(b);  // ["b", "c"]
console.log(a);  // ["a", "b", "c", "d", "e", "f"] — sin cambios

console.log(a.slice(3));     // ["d", "e", "f"] — desde índice 3 hasta el final
console.log(a.slice(-2));    // ["e", "f"] — los dos últimos
```

### `splice()`

Modifica el array original: elimina y/o inserta elementos. Devuelve los elementos eliminados.

```js
let a = ["a", "b", "c", "d", "e", "f"];

// Eliminar
a.splice(1, 3);              // Elimina 3 elementos desde la posición 1
console.log(a);              // ["a", "e", "f"]

// Eliminar e insertar
a.splice(1, 1, "g", "h");    // Elimina 1 elemento en posición 1, inserta "g", "h"
console.log(a);              // ["a", "g", "h", "f"]

// Solo insertar (sin eliminar)
a.splice(3, 0, "i");         // En posición 3, no elimina nada, inserta "i"
console.log(a);              // ["a", "g", "h", "i", "f"]
```

---

## 4.4.9 ORDENACIÓN: `reverse` Y `sort`

### `reverse()`

Invierte el orden del array **in-place** (modifica el original).

```js
let a = ["a", "b", "c", "d", "e", "f"];
a.reverse();
console.log(a);  // ["f", "e", "d", "c", "b", "a"]
```

### `sort()`

Ordena el array **in-place**. Por defecto ordena alfabéticamente (según código Unicode):

```js
let a = ["Peter", "Anne", "Thomas", "Jen", "Rob", "Alison"];
a.sort();
console.log(a);  // ["Alison", "Anne", "Jen", "Peter", "Rob", "Thomas"]
```

**Cuidado con números:** el orden alfabético no funciona correctamente con números:

```js
let a = [20, 6, 100, 51, 28, 9];
a.sort();
console.log(a);  // [100, 20, 28, 51, 6, 9] — orden alfabético, no numérico
```

Para ordenar números correctamente hay que pasar una **función de comparación**:

```js
let a = [20, 6, 100, 51, 28, 9];
a.sort(function(n1, n2) {
  return n1 - n2;    // Ascendente
});
console.log(a);  // [6, 9, 20, 28, 51, 100]

// Descendente
a.sort(function(n1, n2) {
  return n2 - n1;
});
console.log(a);  // [100, 51, 28, 20, 9, 6]
```

Con arrow functions (ES6):

```js
a.sort((n1, n2) => n1 - n2);  // Ascendente
a.sort((n1, n2) => n2 - n1);  // Descendente
```

---

## 4.4.10 BÚSQUEDA: `indexOf` Y `lastIndexOf`

`indexOf()` devuelve la **primera posición** donde aparece el valor, o `-1` si no se encuentra:

```js
let a = [3, 21, 15, 61, 9, 15];
console.log(a.indexOf(15));   // 2  (primera aparición)
console.log(a.indexOf(56));   // -1 (no encontrado)
```

`lastIndexOf()` devuelve la **última posición** donde aparece el valor:

```js
console.log(a.lastIndexOf(15));  // 5 (última aparición)
```

Ambos aceptan un segundo parámetro opcional para indicar desde qué índice empezar la búsqueda.

---

## 4.4.11 COMPROBACIÓN: `every` Y `some`

### `every()`

Devuelve `true` si **todos** los elementos cumplen la condición:

```js
let a = [3, 21, 15, 61, 9, 54];

console.log(a.every(function(num) {
  return num < 100;
}));  // true — todos son menores que 100

console.log(a.every(function(num) {
  return num % 2 == 0;
}));  // false — no todos son pares
```

### `some()`

Devuelve `true` si **al menos uno** cumple la condición:

```js
let a = [3, 21, 15, 61, 9, 54];

console.log(a.some(function(num) {
  return num % 2 == 0;
}));  // true — hay al menos un par
```

Con arrow functions:

```js
console.log(a.every(num => num < 100));  // true
console.log(a.some(num => num % 2 == 0)); // true
```

---

## 4.4.12 ITERAR: `forEach`

`forEach()` ejecuta una función por cada elemento del array. No devuelve nada.

```js
let a = [3, 21, 15, 61, 9, 54];
let sum = 0;

a.forEach(function(num) {
  sum += num;
});
console.log(sum);  // 163
```

La función callback puede recibir hasta **tres parámetros**: valor, índice y array completo.

```js
a.forEach(function(num, indice, array) {
  console.log(`Índice ${indice} en [${array}] es ${num}`);
});
// Índice 0 en [3,21,15,61,9,54] es 3
// Índice 1 en [3,21,15,61,9,54] es 21
// ...
```

> **Importante:** Modificar los elementos dentro de `forEach` **no** persiste en el array original. Para transformar elementos se debe usar `map`.

Con arrow function:

```js
a.forEach(num => sum += num);
```

---

## 4.4.13 TRANSFORMAR: `map`

`map()` crea un **nuevo array** aplicando una función a cada elemento del original. El array original no se modifica.

```js
let a = [4, 21, 33, 12, 9, 54];

let dobles = a.map(function(num) {
  return num * 2;
});
console.log(dobles);  // [8, 42, 66, 24, 18, 108]
console.log(a);       // [4, 21, 33, 12, 9, 54] — sin cambios
```

Con arrow function:

```js
let dobles = a.map(num => num * 2);
```

---

## 4.4.14 FILTRAR: `filter`

`filter()` crea un **nuevo array** con los elementos que cumplen la condición. El array original no se modifica.

```js
let a = [4, 21, 33, 12, 9, 54];

let pares = a.filter(function(num) {
  return num % 2 == 0;  // Si devuelve true, el elemento se incluye
});
console.log(pares);  // [4, 12, 54]
console.log(a);      // [4, 21, 33, 12, 9, 54] — sin cambios
```

Con arrow function:

```js
let pares = a.filter(num => num % 2 == 0);
```

---

## 4.4.15 ACUMULAR: `reduce` Y `reduceRight`

### `reduce()`

Reduce el array a un único valor aplicando una función acumuladora. Recibe dos parámetros: la función (acumulador, valorActual) y el valor inicial.

```js
let a = [4, 21, 33, 12, 9, 54];

// Sumar todos los elementos
let suma = a.reduce(function(total, num) {
  return total + num;
}, 0);  // valor inicial = 0
console.log(suma);  // 133

// Obtener el valor máximo
let max = a.reduce(function(total, num) {
  return num > total ? num : total;
}, 0);
console.log(max);  // 54
```

Con arrow function:

```js
let suma = a.reduce((total, num) => total + num, 0);
let max  = a.reduce((total, num) => num > total ? num : total, 0);
```

### `reduceRight()`

Igual que `reduce`, pero recorre el array de **derecha a izquierda**:

```js
let a = [4, 21, 33, 12, 9, 154];

let resultado = a.reduceRight(function(total, num) {
  return total - num;
});
// Sin valor inicial: empieza con el último elemento (154) y resta los demás
// 154 - 9 - 12 - 33 - 21 - 4 = 75
console.log(resultado);  // 75
```

---

## 4.4.16 DIVIDIR STRINGS: `split`

`split()` divide un string en partes usando un **delimitador** y devuelve un array. Acepta un segundo parámetro opcional para limitar el número de elementos.

```js
let mensaje = "Soy un tipo feliz";

let arr = mensaje.split(" ");
console.log(arr);          // ["Soy", "un", "tipo", "feliz"]

console.log(arr[0]);       // "Soy"
console.log(arr[1]);       // "un"
console.log(arr[2]);       // "tipo"
console.log(arr[3]);       // "feliz"

// Con límite de elementos
console.log(mensaje.split(" ", 2));  // ["Soy", "un"]

// Sin delimitador: devuelve el string completo como único elemento
console.log(mensaje.split());  // ["Soy un tipo feliz"]

// Con delimitador vacío: separa por caracteres
console.log("hola".split(""));  // ["h", "o", "l", "a"]
```

---

## 4.4.17 VERIFICAR SI CONTIENE UN ELEMENTO: `includes`

`includes()` devuelve `true` si el array contiene el elemento especificado, `false` en caso contrario. Es una forma sencilla y eficiente de comprobar existencia sin necesidad de recorrer el array manualmente.

```js
const numeros = [1, 2, 3, 4, 5];

console.log(numeros.includes(3));  // true  — el 3 está presente
console.log(numeros.includes(6));  // false — el 6 no está presente
```

También acepta un segundo parámetro opcional para indicar desde qué índice empezar la búsqueda:

```js
console.log(numeros.includes(3, 4));  // false — busca desde índice 4
```

---

## 4.4.18 FORMATO JSON

El formato **JSON** (JavaScript Object Notation, [más información](https://es.wikipedia.org/wiki/JSON)) permite definir objetos y arrays de forma estructurada. Es especialmente útil para trabajar con datos complejos.

Podemos definir un array de objetos:

```js
let datos = [
  { nombre: "Nacho", telefono: "966112233", edad: 40 },
  { nombre: "Ana",   telefono: "911223344", edad: 35 },
  { nombre: "Mario", telefono: "611998877", edad: 15 },
  { nombre: "Laura", telefono: "633663366", edad: 17 }
];
```

- Para acceder a una posición del array: `datos[0]`
- Para acceder a una propiedad específica: `datos[0].edad`

```js
console.log(datos[0]);        // { nombre: "Nacho", telefono: "966112233", edad: 40 }
console.log(datos[0].nombre); // "Nacho"
console.log(datos[0].edad);   // 40
```

Se puede usar cualquier método de los vistos anteriormente con arrays en formato JSON:

```js
// Filtrar mayores de edad
let mayores = datos.filter(persona => persona.edad >= 18);
console.log(mayores);  // [{ nombre: "Nacho", ... }, { nombre: "Ana", ... }]

// Obtener solo los nombres
let nombres = datos.map(persona => persona.nombre);
console.log(nombres);  // ["Nacho", "Ana", "Mario", "Laura"]

// Buscar un elemento
let encontrado = datos.find(persona => persona.edad === 15);
console.log(encontrado);  // { nombre: "Mario", telefono: "611998877", edad: 15 }
```

### Conversión JSON

```js
// Convertir array de objetos a string JSON
let jsonString = JSON.stringify(datos);
console.log(jsonString);
// '[{"nombre":"Nacho","telefono":"966112233","edad":40},...]'

// Convertir string JSON de vuelta a array de objetos
let jsonArray = JSON.parse(jsonString);
console.log(jsonArray);  // Array original restaurado
```

---

## RESUMEN DE MÉTODOS

| Método | ¿Modifica el original? | Devuelve | Descripción |
|---|---|---|---|
| `fill()` | ✅ Sí | El array modificado | Rellena con un valor fijo |
| `push()` | ✅ Sí | Nueva longitud | Inserta al final |
| `unshift()` | ✅ Sí | Nueva longitud | Inserta al principio |
| `pop()` | ✅ Sí | Elemento eliminado | Borra del final |
| `shift()` | ✅ Sí | Elemento eliminado | Borra del principio |
| `join()` | ❌ No | String | Une elementos con separador |
| `toString()` | ❌ No | String | Convierte a string |
| `concat()` | ❌ No | Nuevo array | Combina arrays |
| `slice()` | ❌ No | Nuevo array | Extrae una porción |
| `splice()` | ✅ Sí | Array de eliminados | Elimina/inserta en posición |
| `reverse()` | ✅ Sí | Array invertido | Invierte el orden |
| `sort()` | ✅ Sí | Array ordenado | Ordena los elementos |
| `indexOf()` | ❌ No | Número | Primera posición del valor |
| `lastIndexOf()` | ❌ No | Número | Última posición del valor |
| `every()` | ❌ No | Booleano | ¿Todos cumplen? |
| `some()` | ❌ No | Booleano | ¿Alguno cumple? |
| `forEach()` | ❌ No | `undefined` | Itera sobre cada elemento |
| `map()` | ❌ No | Nuevo array | Transforma cada elemento |
| `filter()` | ❌ No | Nuevo array | Filtra elementos |
| `reduce()` | ❌ No | Valor único | Acumula de izquierda a derecha |
| `reduceRight()` | ❌ No | Valor único | Acumula de derecha a izquierda |
| `includes()` | ❌ No | Booleano | ¿Contiene el elemento? |
