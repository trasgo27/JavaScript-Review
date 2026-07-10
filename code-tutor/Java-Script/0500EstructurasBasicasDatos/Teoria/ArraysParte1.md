# 4.2 ARRAYS

## 4.2.1 ¿QUÉ ES UN ARRAY?

Todos los lenguajes de programación disponen de un tipo de variable que es capaz de manejar conjuntos de datos. A este tipo de estructuras se las llama **arrays** (también *listas*, *vectores* o *arreglos*), pero estos nombres tienen connotaciones que se pueden confundir con otras estructuras de datos. Por ello, es más popular el nombre sin traducir al castellano: **array**.

Los arrays aparecieron en la programación para solucionar un problema habitual: almacenar múltiples valores sin necesidad de crear una variable distinta para cada uno. Supongamos que deseamos almacenar 25 notas de alumnos. Sin arrays necesitaríamos 25 variables distintas. Los arrays permiten manejar las 25 notas bajo un **mismo nombre**.

En definitiva, los arrays son variables que permiten almacenar, usando una misma estructura, una serie de valores. Para acceder a un dato individual dentro del array, hay que indicar su **posición**. Esa posición es un número entero conocido como **índice**. Así, `nota[4]` es el nombre que recibe el **quinto** elemento de la sucesión de notas. La razón por la que `nota[4]` se refiere al quinto y no al cuarto es porque el **primer elemento tiene índice cero**.

Esto, con algunos matices, funciona igual en casi cualquier lenguaje. Sin embargo, en JavaScript los arrays son **objetos**. Es decir, no hay un tipo de datos `array`. Si utilizamos `typeof` para averiguar el tipo de datos de un array, el resultado será la palabra `"object"`.

En algunos lenguajes como C, el tamaño del array se debe anticipar en la creación y no se puede cambiar más adelante. Este tipo de arrays son **estáticos**. Los arrays de JavaScript son **totalmente dinámicos**: su tamaño se puede modificar después de la declaración a voluntad.

```
    ┌─────────────────────────────────────┐
    │        7    8    6    6    5    4    3    9    │  ← valores
    │    nota[0] nota[1] nota[2] nota[3] nota[4] nota[5] nota[6] nota[7] │  ← índices
    └─────────────────────────────────────┘
            ↑                                      ↑
      nombre del array                       permite referirnos
      que permite referirnos                 al array entero
      al array entero
```
*Figura 4.1: Ejemplo de array que almacena notas*

Otro detalle importante que diferencia a JavaScript de lenguajes más formales es que los arrays en JavaScript son **heterogéneos**. Lenguajes como C o Java usan arrays **homogéneos**, que solo pueden almacenar valores del mismo tipo. JavaScript admite, por ejemplo, que un elemento sea un número y otro un `string`. Cada elemento del array puede ser de un tipo distinto.

---

## 4.2.2 CREACIÓN DE ARRAYS

### 4.2.2.1 DECLARACIÓN Y ASIGNACIÓN DE VALORES

Hay muchas formas de declarar un array. Por ejemplo, si deseamos declarar un array **vacío**, la forma habitual es:

```js
let a = [];
```

Los corchetes vacíos tras la asignación significan *array vacío*. Es un array llamado `a` (nombre poco recomendable) que está listo para recibir valores.

De forma equivalente podemos escribir:

```js
let a = new Array();
```

Esto anticipa que los arrays, en realidad, son objetos. El operador `new` sirve para crear objetos.

Para **colocar valores** en el array se usa el índice que indica la posición en la que colocamos el valor. El primer índice es el cero:

```js
a[0] = "Antonio";
```

Asignamos el texto `"Antonio"` al primer elemento del array. Podemos continuar:

```js
a[1] = "Luis";
a[2] = "Marta";
a[3] = "Sofía";
```

Si quisiéramos mostrar un elemento concreto por consola:

```js
console.log(a[2]); // Muestra: Marta
```

Podemos asignar valores **en la propia declaración** del array:

```js
let nota = [7, 8, 6, 6, 5, 4, 3, 9];
```

También disponemos de esta otra forma de declarar:

```js
let nota = new Array(7, 8, 6, 6, 5, 4, 3, 9);
```

Para mostrar el primer elemento:

```js
console.log(nota[0]); // Muestra: 7
```

El método `console.log` tiene capacidad para mostrar todo un array:

```js
console.log(nota); // Muestra: [7, 8, 6, 6, 5, 4, 3, 9]
```

Sin embargo, salvo para tareas de depuración, no es conveniente este uso. Lo lógico es utilizar **bucles de recorrido** (explicados más adelante) para mostrar el valor del array en la forma que deseemos.

### 4.2.2.2 USO DE `const` Y `let` CON ARRAYS

Es muy habitual declarar arrays con la palabra clave `const` en lugar de con `let`. Con los arrays hay matices a tener en cuenta:

```js
const datos = [4.5, 6.78, 7.12, 9.123];
```

Hemos declarado un array de cuatro valores decimales con `const`, lo que, en principio, indica que el valor de la variable `datos` no puede variar. Sin embargo, este código es **válido**:

```js
datos[0] = 4.671; // Modificamos el primer elemento
```

E incluso este otro:

```js
datos[4] = 3.87; // Añadimos un nuevo elemento al array
```

Luego, aun declarando la variable con `const`, se ha modificado el contenido del array.

La razón es que, realmente, los arrays son **objetos**. De hecho, este código:

```js
console.log(typeof datos); // Escribe: object
```

Cuando se crea un objeto, la variable a la que se asigna el array es una **referencia** al array, pero no es el array en sí. Es decir, la variable contiene **cómo llegar** al objeto, no el objeto mismo.

Para entender mejor la idea, este código sí provoca un **error**:

```js
const datos = [4.5, 6.78, 7.12, 9.123];
datos = [9.18, 4.95]; // Error: Assignment to constant variable.
```

En la primera línea declaramos `datos` como la forma de acceder al array `[4.5, 6.78, 7.12, 9.123]`. Esta variable es un enlace o una referencia a ese array. En la segunda línea decimos que `datos` es un enlace a **otro** array. Estamos modificando la referencia y eso no se permite porque `datos` se declaró con `const`.

Cuando **modificamos**, **eliminamos** o **añadimos** elementos, el array sigue siendo el mismo: la **referencia no cambia**.

### 4.2.2.3 OPERACIÓN DE ASIGNACIÓN CON ARRAYS

Otro detalle importante sobre referencias:

```js
const datos = [4.5, 6.78, 7.12, 9.123];
const datos2 = datos;

datos2[0] = 400;
console.log(datos[0]); // Escribe: 400
```

Cuando asignamos `datos2 = datos`, **no se hace una copia** del array. Tanto `datos` como `datos2` son dos variables que hacen referencia al **mismo** array. Por eso, cuando cambiamos el primer elemento mediante `datos2`, también cambia en `datos`: en realidad es el mismo array.

### 4.2.2.4 VALORES INDEFINIDOS

Veamos este código:

```js
let a = ["Saúl", "Rocío"];
a[3] = "María";
console.log(a[2]); // Escribe: undefined
```

En la definición `let a = ["Saúl", "Rocío"]` creamos el array dando valor a los dos primeros elementos (`a[0]` y `a[1]`). Luego damos valor al cuarto elemento (`a[3]`). En ningún momento hemos dado valor al elemento `a[2]` y por eso el código escribe `undefined`.

El resumen es que podemos dejar elementos **sin definir** en un array. Es más, incluso en la propia declaración se pueden dejar elementos vacíos:

```js
let a = ["Saúl", "Rocío", , "María"];
```

Las dos comas seguidas (después del valor `"Rocío"`) hacen que el tercer elemento (`a[2]`) quede indefinido.

### 4.2.2.5 ELIMINAR ELEMENTOS DE UN ARRAY

Para borrar un elemento se utiliza la palabra `delete` tras la cual se indica el elemento a eliminar:

```js
const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
delete dias[2];
console.log(dias);
```

Resultado:

```
["Lunes", "Martes", <1 empty item>, "Jueves", "Viernes", "Sábado", "Domingo"]
```

Ha desaparecido el miércoles (aparece `"<1 empty item>"` en su lugar). Ese elemento pasa a ser **indefinido**.

> **Nota:** `delete` no reordena el array ni elimina el espacio físico. Solo marca el elemento como vacío. Para eliminar y reordenar se usan métodos como `splice()`.

### 4.2.2.6 ARRAYS HETEROGÉNEOS

Como se comentó antes, los arrays de JavaScript son **heterogéneos**. Admiten mezclar en el mismo array valores de diferente tipo:

```js
const a = [3, 4, "Hola", true, Math.random()];
```

El array contiene dos números enteros (3 y 4), un string (`"Hola"`), un booleano (`true`) y un número decimal (resultado de `Math.random()`).

Incluso podemos definir arrays que contengan otros arrays:

```js
const b = [3, 4, "Hola", [99, 55, 33]];
```

El cuarto elemento (`b[3]`) es un array. Es decir, se pueden colocar arrays **dentro** de otros arrays. Para acceder a un elemento interno:

```js
console.log(b[3][1]); // Escribe: 55
```

`b[3][1]` hace referencia al segundo elemento del cuarto elemento de `b`. Las posibilidades de uso de arrays en JavaScript son muy amplias.

---

# 4.3 RECORRER ARRAYS

## 4.3.1 USO DEL BUCLE `for` PARA RECORRER ARRAYS

Una de las tareas fundamentales en la manipulación de arrays es **recorrer** cada elemento para poder examinarlo. Esto se hace fácilmente mediante el bucle `for`:

```js
const notas = [5, 6, 7, 4, 9, 8, 9, 9, 7, 8];

for (let i = 0; i < notas.length; i++) {
  console.log(`La nota ${i} es ${notas[i]}`);
}
```

En el bucle se utiliza el método `.length` que nos permite saber el tamaño del array. El contador `i` recorre todos los índices del array `notas`. Resultado:

```
La nota 0 es 5
La nota 1 es 6
La nota 2 es 7
La nota 3 es 4
La nota 4 es 9
La nota 5 es 8
La nota 6 es 9
La nota 7 es 9
La nota 8 es 7
La nota 9 es 8
```

El problema surge cuando hay elementos **indefinidos** en el array:

```js
const notas = [5, 6, , , , 9, , , 8, , 9, , 7, 8];

for (let i = 0; i < notas.length; i++) {
  console.log(`La nota ${i} es ${notas[i]}`);
}
```

Resultado:

```
La nota 0 es 5
La nota 1 es 6
La nota 2 es undefined
La nota 3 es undefined
La nota 4 es undefined
La nota 5 es 9
La nota 6 es undefined
La nota 7 es undefined
La nota 8 es 8
La nota 9 es undefined
La nota 10 es 9
La nota 11 es undefined
La nota 12 es 7
La nota 13 es 8
```

Lo lógico es **evitar los elementos indefinidos**. El código debería modificarse así:

```js
const notas = [5, 6, , , , 9, , , 8, , 9, , 7, 8];

for (let i = 0; i < notas.length; i++) {
  if (notas[i] !== undefined) {
    console.log(`La nota ${i} es ${notas[i]}`);
  }
}
```

El bloque `if` permite comprobar primero que el elemento está definido y, solo si es así, se muestra. Resultado:

```
La nota 0 es 5
La nota 1 es 6
La nota 5 es 9
La nota 8 es 8
La nota 10 es 9
La nota 12 es 7
La nota 13 es 8
```

---

## 4.3.2 BUCLE `for...in`

JavaScript posee un bucle mucho más cómodo para recorrer arrays: el bucle `for...in`. La ventaja es que no necesita tanto código. Su sintaxis general es:

```js
for (let indice in nombreArray) {
  // instrucciones
}
```

El índice es una variable que se declara en el propio `for` e irá tomando todos los valores de los índices del array. Esa variable **se salta los elementos indefinidos**, solo recorre los definidos.

```js
const notas = [5, 6, , , , 9, , , 8, , 9, , 7, 8];

for (let i in notas) {
  console.log(`La nota ${i} es ${notas[i]}`);
}
```

Resultado:

```
La nota 0 es 5
La nota 1 es 6
La nota 5 es 9
La nota 8 es 8
La nota 10 es 9
La nota 12 es 7
La nota 13 es 8
```

Se puede observar lo **limpio** que queda el código de recorrido con este bucle, evitando la comprobación manual de `undefined`.

---

## 4.3.3 BUCLE `for...of`

El estándar **ES2015** incorporó un nuevo bucle llamado `for...of`. Pensado para simplificar aún más el recorrido de arrays, es similar al anterior, pero la variable que se crea en el bucle va almacenando los **valores** del array (en lugar de los índices como hacía `for...in`):

```js
const notas = [5, 6, , , , 9, , , 8, , 9, , 7, 8];

for (let nota of notas) {
  console.log(nota);
}
```

Resultado:

```
5
6
undefined
undefined
undefined
9
undefined
undefined
8
undefined
9
undefined
7
8
```

Hay una gran diferencia: `for...of` **no se salta los elementos indefinidos**. Necesitamos usar `if` para omitirlos:

```js
for (let nota of notas) {
  if (nota !== undefined) {
    console.log(nota);
  }
}
```

Es un bucle muy simple de utilizar y se ha convertido en el bucle habitual de recorrido de arrays en JavaScript moderno.

---

### Resumen de bucles para arrays

| Bucle | Recorre | Se salta `undefined` | Uso principal |
|---|---|---|---|
| `for` clásico | Índices | No (hay que comprobarlo) | Control total del recorrido |
| `for...in` | Índices | **Sí** | Recorrer solo elementos definidos |
| `for...of` | Valores | No (hay que comprobarlo) | Recorrido simple y moderno |
