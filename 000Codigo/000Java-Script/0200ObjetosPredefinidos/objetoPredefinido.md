Este documento contiene los apuntes de la **Unidad 2: Objetos predefinidos del lenguaje** para la asignatura de Desarrollo Web en Entorno Cliente (DWEC) del ciclo de 2º de Desarrollo de Aplicaciones Web (DAW).

A continuación, encontrarás un resumen estructurado del contenido del PDF seguido de una batería de preguntas para poner a prueba tus conocimientos.

---

## 📝 Resumen del Contenido

Los objetos predefinidos son elementos propios del lenguaje JavaScript que existen de forma independiente al contexto en el que se ejecutan (como el navegador o Node.js) y disponen de sus propias propiedades y métodos.

El documento analiza en detalle **cinco objetos fundamentales**:

### 1. El Objeto String 🔤

* 
**Definición**: Se utiliza para representar y operar con cadenas de texto.


* 
**Autoboxing**: En JavaScript, los strings pueden ser tipos primitivos u objetos (`new String()`). Cuando accedemos a una propiedad o método de un tipo primitivo, JavaScript crea temporalmente un objeto de la clase `String` para poder ejecutar la acción y luego lo destruye (un mecanismo conocido como *autoencapsulamiento* o *autoboxing*).


* 
**Propiedades clave**: `length` (devuelve la longitud de la cadena) y `prototype`.


* 
**Métodos principales**: `charAt()`, `includes()`, `indexOf()`, `slice()`, `split()`, `toLowerCase()`, `toUpperCase()`, y `trim()`.



### 2. El Objeto Number 🔢

* 
**Definición**: Representa números en JavaScript. En este lenguaje solo existe un tipo de datos numérico, almacenado en formato de coma flotante de 64 bits (doble precisión).


* 
**Notaciones**: Permite representar números en formato decimal, binario (`0b`), octal u hexadecimal (`0x`).


* **Valores Especiales**:
* 
`Infinity`: Representa que se ha sobrepasado la precisión máxima del lenguaje.


* 
`NaN` (*Not a Number*): Indica que un valor no representa un número (por ejemplo, al intentar multiplicar `3 * "a"`). Se puede comprobar con la función global `isNaN()`.




* 
**Métodos clave**: `isInteger()`, `toFixed(n)` (formatea los decimales devolviendo un string), `parseInt()` y `parseFloat()`.



### 3. El Objeto Math 🧮

* 
**Particularidad**: Es un objeto especial porque **no tiene constructor** (`new Math()` no existe). Se utiliza directamente invocando sus propiedades y métodos estáticos.


* 
**Propiedades**: Almacena constantes matemáticas como `Math.E` o `Math.PI`.


* 
**Métodos principales**: `abs()`, `pow(x, y)`, `sqrt()`, `random()` (genera un número aleatorio entre 0 incluido y 1 excluido) y redondeos como `round()`, `ceil()` (hacia arriba) y `floor()` (hacia abajo).



### 4. El Objeto Date 📅

* 
**Definición**: Permite trabajar con fechas y horas. Las fechas internamente se calculan midiendo los milisegundos transcurridos desde el **1 de enero de 1970**.


* 
**Métodos de obtención (Getters)**: `getFullYear()`, `getMonth()` (rango 0-11, donde 0 es enero), `getDate()` (día del mes 1-31) y `getDay()` (día de la semana 0-6, donde 0 es domingo).


* 
**Métodos de conversión**: `toLocaleDateString()` o `toTimeString()` devuelven representaciones en formato de texto adaptadas a las convenciones locales.



### 5. El Objeto RegExp 🔍

* 
**Definición**: Se utiliza para describir un patrón de caracteres (expresiones regulares) aplicados a búsquedas y reemplazos en cadenas de texto.


* 
**Sintaxis**: Se estructuran como `/patrón/modificadores` (por ejemplo, el modificador `i` hace que la búsqueda ignore mayúsculas y minúsculas).


* **Métodos de contraste**:
* `test(cadena)`: Método propio de la expresión regular. Devuelve `true` o `false`.


* `match(regexp)`: Método propio de los *Strings*. Devuelve un array con las coincidencias o `null`.




* 
**Metacaracteres**: Permite usar anclas como `^` (inicio de línea), `$` (fin de línea) o cuantificadores como `*` (0 o más apariciones) y rangos entre corchetes `[0-9]`.



---

## ❓ Batería de Preguntas de Autoevaluación

### Bloque 1: String y Autoboxing

1. ¿Cuál es la diferencia entre declarar `let c = 'Hola'` y `let c = new String('Hola')` al evaluarlos con el operador de igualdad estricta (`===`)? 

Don't worry, this is one of the classic traps in JavaScript! It looks like you are declaring the exact same text, but under the hood, JavaScript is treating them as two completely different species.

First, just a quick reminder: you can't declare the same variable name `c` twice in the same scope using `let`, so let's call them `cad1` and `cad2` just like your PDF notes do.

Here is exactly what is going on:

---

### 1. `let cad1 = 'Hola';` ➡️ The Primitive String

This creates a **primitive value**.

* It is **just pure data** sitting in memory.
* It is lightweight, fast, and does not have properties or methods of its own.

* If you check its type using `typeof`, it will tell you exactly what it is: **`"string"`**.

### 2. `let cad2 = new String('Hola');` ➡️ The Object String

By using the `new` keyword, you are forcing JavaScript to call a **constructor function**.

* This creates a full-blown **Object wrapper** around that text.

* Instead of just storing the text, memory allocates a complex object structure with internal properties (like key-value pairs representing indices).
* If you check its type using `typeof`, it will tell you: **`"object"`**.

---

### 🥊 The Showdown: `==` vs `===`

Because of how they are built in memory, they behave differently when you compare them:

```javascript
console.log(cad1 == cad2);  // true
console.log(cad1 === cad2); // false

```

* **`cad1 == cad2` is `true`**: The loose equality operator (`==`) forces **type coercion**. It strips away the object wrapper from `cad2`, extracts the primitive value inside (`'Hola'`), and compares the text directly. Since `'Hola'` equals `'Hola'`, it returns `true`.

* **`cad1 === cad2` is `false`**: The strict equality operator (`===`) does **not** allow type coercion. It checks both the value *and* the data type. Since a primitive `"string"` type is not the same thing as an `"object"` type, it instantly fails and returns `false`.

---

### 💡 Why do we care? (The Autoboxing connection)

You might ask: *"If `cad1` is a primitive and has no methods, why can I do `cad1.toUpperCase()` without it crashing?"*

That is because of **autoboxing** (or autoencapsulamiento), which is explained on page 5 of your PDF. Every time you call a method on your primitive string `cad1`, JavaScript temporarily wraps it in a `new String('Hola')` object on the fly, executes the method, and immediately throws the object away so your memory stays clean!

> **Rule of thumb:** In modern JavaScript, **never** use `new String()`. Always use primitive strings (`'Hola'`) because they are faster, use less memory, and JavaScript will automatically handle the object methods for you when needed.

Does this distinction between a primitive value and an object wrapper make sense now?

2. Explica brevemente qué ocurre en la memoria del ordenador cuando JavaScript ejecuta la línea `console.log("texto".length);`. 

When you run `"texto".length`, something very interesting happens behind the scenes.

As we just established, `"texto"` is a **primitive string**. It is pure data, not an object, which means it technically shouldn't have any properties or methods of its own. Yet, JavaScript doesn't crash; it smoothly returns the number `5`.

This works thanks to the mechanism called **Autoboxing** (or *autoencapsulamiento*).

---

### ⚙️ What Happens in Memory (Step-by-Step)

The moment your code evaluates `"texto".length`, JavaScript temporarily changes the rules of the game:

1. **The Temporary Wrap:** JavaScript looks at the primitive string `"texto"` and automatically wraps it in a temporary object wrapper using the `String` constructor. It secretly does something like:

   ```javascript
   new String("texto")
   ```

2. **The Read:** Now that the string is temporarily an object, it has access to all the built-in properties of the `String` object. JavaScript looks up the `length` property on this temporary object and finds `5`.

3. **The Cleanup:** JavaScript hands you the number `5` and immediately **destroys** the temporary object from memory.

The primitive string remains a primitive string. If you check `typeof "texto"`, it is still `"string"`.

---

### 📝 To put it simply:

JavaScript is being smart and helpful. It lets you write clean code using lightweight primitive strings, but when you need to check their size or modify them, it temporarily gives them "object superpowers" for a fraction of a millisecond.

This exact same process happens when you call methods like `"texto".toUpperCase()` or `"texto".trim()`.

3. Si tenemos la cadena `const d = "1/5/2016"`, ¿qué método de String usarías y con qué argumento para transformarla en el array `["1", "5", "2016"]`? 



### Bloque 2: Number y Math

4. ¿Por qué el resultado de `3 * "a"` devuelve `NaN` mientras que `3 + "a"` devuelve `"3a"`? 


5. ¿Qué diferencia de comportamiento existe entre los métodos `Math.ceil(x)`, `Math.floor(x)` y `Math.round(x)`? 

¡Casi lo tienes perfecto! Has clavado los dos más difíciles, pero en uno te ha traicionado la intuición. Vamos a ver por qué:

* **`Math.round(4.5)` ➡️ El resultado real es `5`** (Tú pusiste `4`).

  *¿Por qué?* El método `.round()` hace el redondeo clásico que nos enseñan en el colegio 😄: si la parte decimal es **`.5` o superior**, empuja el número hacia el entero **más cercano hacia arriba**. Por eso $4.5$ se convierte en $5$. Si hubiera sido $4.4$, sí habría bajado a $4$.

* **`Math.ceil(4.5)` ➡️ `5`** (¡Exacto! ✅).

  *¿Por qué?* Viene de *ceiling* (techo). No importa lo pequeño que sea el decimal (aunque sea $4.1$), este método siempre empuja el número hacia el entero **más cercano hacia arriba**.

* **`Math.floor(4.5)` ➡️ `4`** (¡Exacto! ✅).

  *¿Por qué?* Viene de *floor* (suelo). Corta por lo sano y empuja el número hacia el entero **más cercano hacia abajo**, ignorando por completo los decimales.

6. ¿Qué objeto predefinido de los estudiados en el PDF carece por completo de un constructor y por qué? 



### 📅 Bloque 3: Cerremos con Date y RegExp

Para terminar el repaso de tu PDF, vamos con las últimas tres preguntas del cuestionario:

**7. Los meses en Date:**
Al trabajar con el objeto `Date`, si ejecutas el método `.getMonth()` y te devuelve el número `4`, ¿a qué **mes del año** se está refiriendo exactamente? (Pista: Ten en cuenta desde qué número empieza a contar JavaScript 🙃).

**8. Comprobación rápida de expresiones regulares:**
Si quieres verificar de manera rápida si una cadena de texto cumple con una expresión regular y solo te interesa saber si es verdadero o falso (`true`/`false`) 🤔, ¿qué método utilizas y a qué objeto pertenece?

**9. Los símbolos del patrón:**
En una expresión regular, ¿qué significan exactamente los metacaracteres **`^`** y **`$`** colocados en los extremos de un patrón? (Ejemplo: `/^serpi$/`).

¿Qué opinas de estas tres últimas? 



---

¿Quieres que revisemos las respuestas de alguna sección en específico o prefieres hacer algún ejercicio práctico basado en estos objetos del PDF?