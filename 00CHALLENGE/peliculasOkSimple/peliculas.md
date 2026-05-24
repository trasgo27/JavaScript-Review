# 🎬 Catálogo de Películas — Ejercicio de Arrays en JavaScript

## Descripción

Crear una aplicación web de catálogo de películas que permita agregar nuevos films, filtrarlos por género, y mostrar listados. El objetivo es practicar los métodos `push`, `map` y `filter` sobre arrays de objetos, además de validación de formularios y delegación de eventos.

## Datos iniciales

```js
const catalogo = [
  { titulo: "Inception",                genero: "Ciencia Ficción", anio: 2010 },
  { titulo: "Superbad",                 genero: "Comedia",         anio: 2007 },
  { titulo: "The Shawshank Redemption", genero: "Drama",           anio: 1994 },
  { titulo: "Mad Max: Fury Road",       genero: "Acción",          anio: 2015 },
  { titulo: "Get Out",                  genero: "Terror",          anio: 2017 },
  { titulo: "The Matrix",               genero: "Ciencia Ficción", anio: 1999 },
  { titulo: "The Dark Knight",          genero: "Acción",          anio: 2008 },
  { titulo: "The Shining",              genero: "Terror",          anio: 1980 }
];
```

## Requisitos

### 1. Agregar película — `push()`

- Tomar los valores de los inputs (`inputTitulo`, `inputGenero`, `inputAnio`).
- Validar que ningún campo esté vacío.
- Crear un objeto `{ titulo, genero, anio }` y agregarlo al array con `push()`.
- Actualizar la lista completa en `divLista` usando `map()` + `join()`.

### 2. Filtrar por género — `filter()` + `map()`

- Usar delegación de eventos sobre `divBotones`.
- Capturar el `value` del botón clickeado.
- Filtrar el array con `filter()` y mostrar los resultados en `divFiltro` usando `map()` + `join()`.

## Estructura HTML

```html
<div id="divLista"><strong>Todas las películas:</strong></div>
<div id="divFiltro"><strong>Filtradas:</strong></div>
```

## Métodos a utilizar

| Método     | Uso |
|------------|-----|
| `push()`   | Agregar nueva película al array |
| `map()`    | Transformar objetos a string HTML |
| `filter()` | Filtrar películas por género |

## Pistas

- Usá `e.target.value` en el contenedor de botones para capturar el género clickeado.
- Usá `trim()` en los valores de los inputs para evitar espacios en blanco.
- Para mostrar en los divs, usá `innerHTML` con el resultado de `join("<br>")`.
