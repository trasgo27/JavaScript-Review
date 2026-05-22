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
