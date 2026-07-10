# 📦 Gestión de Inventario — Ejercicio de Arrays en JavaScript

## Descripción

Crear una aplicación web de gestión de inventario que permita agregar productos, filtrarlos por categoría, buscar por nombre, y mostrar estadísticas. El objetivo es practicar los métodos principales de arrays en JavaScript: `push`, `map`, `filter`, `reduce`, `find`, `sort`, y el uso de `Set`.

## Datos iniciales

```js
const inventario = [
  { producto: "Auriculares", categoria: "Electrónica", precio: 50,  stock: 20 },
  { producto: "Zapatillas",   categoria: "Deportes",   precio: 80,  stock: 12 },
  { producto: "Lámpara",      categoria: "Hogar",      precio: 30,  stock: 0  },
  { producto: "Remera",       categoria: "Ropa",       precio: 25,  stock: 8  },
  { producto: "Teclado",      categoria: "Electrónica", precio: 40, stock: 5  },
  { producto: "Mochila",      categoria: "Deportes",   precio: 60, stock: 0  },
  { producto: "Sartén",       categoria: "Hogar",      precio: 35, stock: 15 }
];
```

## Requisitos

### 1. Agregar producto — `push()`

- Tomar los valores de los inputs (`inputProd`, `inputCat`, `inputPrecio`, `inputStock`).
- Validar que ningún campo esté vacío.
- Crear un objeto `{ producto, categoria, precio, stock }` y agregarlo al array con `push()`.
- Actualizar la lista completa en `divLista` usando `map()` + `join()`.

### 2. Filtrar por categoría — `filter()` + `map()`

- Usar delegación de eventos sobre `divBotones`.
- Capturar el `value` del botón clickeado.
- Filtrar el array con `filter()` y mostrar los resultados en `divFiltro` usando `map()` + `join()`.

### 3. Categorías únicas — `Set` + spread `[...]`

- Extraer todas las categorías del array.
- Pasarlas por `new Set()` para obtener valores únicos.
- Mostrar en `divStats`: `"Categorías disponibles: Electrónica, Ropa, Hogar, Deportes"`

### 4. Valor total del inventario — `reduce()`

- Recorrer el array multiplicando `precio * stock` de cada producto y sumando todo.
- Mostrar en `divStats`: `"Valor total del inventario: $4200"`

### 5. Productos sin stock — `filter()`

- Filtrar productos donde `stock === 0`.
- Mostrar en `divStats`: `"Productos sin stock: Lámpara, Mochila"`
- Si no hay, mostrar `"Ninguno"`.

### 6. Buscar producto por nombre — `find()`

- Escuchar click en `btnBuscar`.
- Leer el valor de `inputBuscar`.
- Usar `find()` para buscar (comparación sin distinguir mayúsculas/minúsculas).
- Mostrar en `divStats`:
  - Si existe: `"Producto encontrado: Auriculares — $50 (stock: 20)"`
  - Si no: `"Producto no encontrado"`

### 7. Ordenar por precio — `sort()` + copia con spread

- Al cargar la página y al agregar un producto, mostrar la lista ordenada de menor a mayor precio.
- Hacer una copia del array con `[...inventario]` antes de ordenar para no mutar el original.

## Estructura HTML

El `divStats` debe mostrar la información acumulada de los pasos 3, 4, 5 y 6 (concatenada con `<br>`).

```html
<div id="divLista"><strong>Todos los productos:</strong></div>
<div id="divFiltro"><strong>Filtrados:</strong></div>
<div id="divStats"><strong>Estadísticas:</strong></div>
```

## Métodos a utilizar

| Método      | Uso |
|-------------|-----|
| `push()`    | Agregar nuevo producto al array |
| `map()`     | Transformar objetos a string HTML |
| `filter()`  | Filtrar por categoría y por stock === 0 |
| `reduce()`  | Calcular valor total del inventario |
| `find()`    | Buscar producto por nombre |
| `sort()`    | Ordenar productos por precio |
| `Set`       | Obtener categorías únicas |
| Spread `[...]` | Copiar array antes de ordenar |

## Pistas

- Usá `e.target.value` en el contenedor de botones para capturar la categoría.
- Usá `toLowerCase()` en la búsqueda para ignorar mayúsculas.
- `sort()` compara números: `a.precio - b.precio` para orden ascendente.
- Para `reduce`, el acumulador inicial es `0`.

---

## Debug de errores comunes

A continuación se analiza un intento real de resolver el ejercicio, con errores típicos de quien está aprendiendo arrays en JavaScript.

### Código analizado

```js
btnAgregar.addEventListener('click', () => {
  if (inputProd.value != null &&
      inputCat.value != null  &&
      inputPrecio > 0         &&
      inputStock  > 0
  ) {
    agregar();
  } else {
    alert('Valores NO validos ...');
  }
});

function agregar() {
  let linea = { producto: "", categoria: "", precio: 0, stock: 0 };
  if (inventario.includes(inputProd.value)) {
    // sumar stock //recalcular precio
  } else {
    linea.producto  = inputProd.value;
    linea.categoria = inputCat.value;
    linea.precio    = inputPrecio.value;
    linea.stock     = inputStock.value;
    inventario.push(linea);
  }
  console.table(`inventario`);
  divLista.innerHTML = "Hola";
}
```

### Errores y bugs

| # | Error | Línea | Explicación | Corrección |
|---|-------|-------|-------------|------------|
| 1 | `inputPrecio > 0` y `inputStock > 0` comparan el elemento del DOM, no su valor | 4-5 | `inputPrecio` es un `HTMLInputElement`, no un número. La comparación coerciona el objeto a `NaN`, y `NaN > 0` es `false`. Además obliga a que stock sea > 0, pero los datos iniciales incluyen productos con stock === 0 (Lámpara, Mochila), que deberían ser válidos. | `Number(inputPrecio.value) > 0 && Number(inputStock.value) >= 0` |
| 2 | `inputProd.value != null` nunca es `false` | 2 | `.value` de un input siempre devuelve un string (vacío `""` si no se escribió nada). Nunca es `null`. | `inputProd.value.trim() !== ""` |
| 3 | `inventario.includes(inputProd.value)` no detecta duplicados | 12 | `includes()` compara por identidad de referencia (===). Un string jamás será igual a un objeto. Esta condición **siempre es `false`**, el `if` nunca se ejecuta y el intento de manejar duplicados está muerto. | Usar `inventario.find(p => p.producto.toLowerCase() === inputProd.value.trim().toLowerCase())` |
| 4 | `linea.precio = inputPrecio.value` guarda string, no número | 17 | `inputPrecio.value` devuelve `"50"` (string), no `50` (number). El array mezclará tipos. | Convertir con `Number(...)` o `parseFloat(...)` |
| 5 | `linea.stock = inputStock.value` idem | 18 | Mismo problema que #4. | `Number(inputStock.value)` |
| 6 | `console.table("inventario")` muestra el string literal, no el array | 21 | Las comillas convierten el argumento en un string. Muestra `"inventario"` en la consola, no la tabla del array. | `console.table(inventario)` (sin comillas) |
| 7 | `divLista.innerHTML = "Hola"` no usa `map()` + `join()` | 22 | No cumple el requisito 1. No renderiza el array actualizado. | `divLista.innerHTML = inventario.map(p => \`...\`).join("<br>")` |
| 8 | Objeto `linea` pre-inicializado con valores vacíos | 11 | Se crea un objeto innecesario que se sobrescribe inmediatamente en el `else`. En el `if` de duplicado (muerto) el objeto queda sin usar. | Crear el objeto directamente en el `else` o al hacer `push`. |

### Problemas de enseñanza (teaching targets)

| # | Problema | Explicación |
|---|----------|-------------|
| A | `null` vs `""` | El estudiante confunde `null` con "vacío". Los inputs devuelven `""` (string vacío), no `null`. Este error es muy común en principiantes. |
| B | `includes()` en arrays de objetos | Creen que `includes()` compara por valor de propiedades. Es un error conceptual frecuente. La enseñanza debe reforzar que `includes()` usa `===` (referencia). Para objetos se usa `find()`, `some()`, o `findIndex()`. |
| C | `.value` siempre es string | Incluso con `<input type="number">`, el DOM devuelve string. El estudiante no aplicó `Number()`. |
| D | `>` coercion silenciosa | `objeto > 0` no da error, da `false`. El estudiante no recibe feedback, el bug pasa desapercibido. |
| E | `console.table` con string | Demuestra que no se entiende la diferencia entre un identificador (variable) y un string literal. |
| F | `map()` + `join()` no implementado | El estudiante usó un placeholder `"Hola"` en vez de transformar el array. No logró conectar `push()` con la renderización. |
| G | Manejo de duplicados incompleto | La intención de "sumar stock / recalcular precio" estaba en comentarios pero jamás se implementó. El `if` nunca se ejecuta por el error #3. |

### Recomendaciones pedagógicas

1. **Enseñar tipos primero**: Antes de `map/filter`, asegurarse de que el estudiante distingue `null`, `undefined`, `""`, `0`, `NaN` y sabe que `.value` siempre es `string`.
2. **`includes()` vs `find()`**: Dedicar un ejercicio específico a mostrar que `includes()` compara por referencia y `find()` por condición.
3. **`console.table` sin comillas**: Corregir en el momento para que vean la diferencia.
4. **Conversión numérica**: Insistir en `Number(valor)` al leer inputs numéricos.
5. **Renderizar con `map()`**: El placeholder `"Hola"` muestra que no hubo comprensión de cómo transformar un array a HTML. Reforzar con ejemplos mínimos antes del ejercicio.
6. **Validar vacío**: Usar `valor.trim() === ""` en vez de `!= null`.

---

### Segundo intento analizado — `renderLista()` con errores de sintaxis

```js
function renderLista() {
//let ordenadoMap = [];  
const ordenado = [...inventario].sort((a,b){a-b});
ordenadoMap = ordenado.map((p,i)=>{
   let texto = "";
texto = ´Lista Productos<br>${i+1} - ${p.producto} ${p.precio} ${p.categoria} ${p.stock}´;
return texto;
});
divLista.innerHTML = ordenadoMap.join(`<br>`);
}
```

#### Errores y bugs

| # | Error | Explicación | Corrección |
|---|-------|-------------|------------|
| 1 | `(a,b){a-b}` falta `=>` | Las arrow functions requieren `=>`. `(a,b){a-b}` lanza **SyntaxError** y detiene el script. | `(a, b) => a.precio - b.precio` |
| 2 | `a-b` resta objetos, no `.precio` | Restar objetos da `NaN`. `sort()` con `NaN` no ordena. | `a.precio - b.precio` |
| 3 | Acute accent `´` en vez de backtick | Solo el backtick `` ` `` (U+0060) delimita template literals. `´` lanza SyntaxError. | Usar `` ` `` (backtick) |
| 4 | `ordenadoMap` sin declaración | `let ordenadoMap` está comentado → la asignación crea variable global o da error. | `const ordenadoMap = ...` |
| 5 | `"Lista Productos<br>"` dentro de `map()` | El string se repite al inicio de cada producto en vez de una vez como encabezado. | Mover el encabezado fuera del `map()` |
| 6 | `divLista` no definido en el snippet | Si `divLista` no existe en el ámbito padre, arroja ReferenceError. | `const divLista = document.getElementById("divLista")` |

#### Código corregido

```js
function renderLista() {
  const ordenado = [...inventario].sort((a, b) => a.precio - b.precio);
  const html = ordenado.map((p, i) =>
    `${i+1} - ${p.producto} $${p.precio} ${p.categoria} (stock: ${p.stock})`
  ).join("<br>");
  divLista.innerHTML = "<strong>Lista Productos</strong><br>" + html;
}
```
