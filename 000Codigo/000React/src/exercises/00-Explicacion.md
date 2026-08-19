## Ejercicio 01: JSX Basics - Actualización y Sincronización

### Resumen de Cambios

Este documento describe las mejoras aplicadas a los archivos de ejercicios de **JSX Basics**. Cada cambio refleja buenas prácticas de desarrollo que deberás adoptar en tus proyectos reales.

---

### 1. Limpieza de Código y Formato Consistente

**Cambios realizados:**
- Eliminados todos los comentarios `TODO` y `HINT` (el ejercicio ya está resuelto)
- Formateo consistente: sin espacios alrededor de `=` en props, comas finales en objetos, saltos de línea limpios
- Removido el `import { useState }` que no se usaba

**Por qué importa:**
- Los imports no utilizados generan ruido visual y pueden confundir al revisor de código. En producción, herramientas como ESLint con `no-unused-vars` los detectan automáticamente.
- Un formato consistente facilita la lectura y el merge de cambios en equipo. Usa Prettier para automatizar esto.

---

### 2. Corrección de Errores Tipográficos y de Estructura

**Cambios realizados:**
- Corregido typo `"practicar"` en comentarios
- Eliminado `<p>Hola ... </p>` suelto y anchor duplicado en `JSXExpressions`
- Eliminado anchor duplicado en `JSXAttributes`

**Por qué importa:**
- Los typos en strings visibles al usuario afectan la experiencia. Los typos en comentarios afectan la mantenibilidad.
- Elementos duplicados en JSX suelen indicar errores de copy-paste que pueden causar bugs sutiles (como dos handlers en el mismo botón).

---

### 3. Nombres Descriptivos en Variables

**Cambios realizados:**
- Renombrado `vector` → `names` (más descriptivo)

**Por qué importa:**
- En JSX, las variables se renderizan directamente. Un nombre como `names` comunica inmediatamente qué contiene el array, mientras que `vector` es genérico y ambiguo.
- Regla práctica: si una variable se usa en el render, su nombre debe describir **qué es**, no **cómo está almacenada**.

---

### 4. Corrección de Numeración de Secciones

**Cambios realizados:**
- Renumerada sección 1.5 duplicada → 1.5 Fragments / 1.6 Fragments (React.Fragment)
- Comentarios de Fragment más claros (short vs long syntax, key prop)

**Por qué importa:**
- La numeración correcta en ejercicios facilita el seguimiento del progreso y la referencia al discutir con otros developers.
- Fragments son fundamentales: permiten agrupar elementos sin añadir nodos extra al DOM. La sintaxis corta `<>...</>` es preferida, pero `React.Fragment` permite pasar la prop `key` en listas.

---

### 5. Sincronización JSX ↔ HTML

**Cambios realizados:**
- Sincronizado completamente el archivo HTML con el JSX (antes tenían contenido diferente)
- Eliminados comentarios verbose del CDN/style/mount
- Incluido `WithFragmentsDOS` que faltaba en el HTML
- Mismas funciones, mismo contenido, misma estructura

**Por qué importa:**
- Cuando mantienes dos versiones del mismo ejercicio (JSX con bundler y HTML standalone), **deben estar sincronizadas**. Divergencias causan confusión: el estudiante prueba una cosa en JSX y otra distinta en el navegador directo.
- Los comentarios obvios (`// CDN`, `// styles`) se eliminan porque el código debe ser autoexplicativo. Si necesita un comentario para entender qué es un `<script src="...">`, hay un problema de legibilidad mayor.

---

### Conceptos Clave para Recordar

| Concepto | Aplicación |
|----------|------------|
| **Imports limpios** | Solo importa lo que uses; ESLint te ayudará |
| **Nombres descriptivos** | Variables en JSX = comunicación visual → nómbralas con claridad |
| **Sincronización de archivos** | Si mantienes versiones paralelas, mantenlas idénticas |
| **Formato consistente** | Usa Prettier + ESLint; no formatees manualmente |
| **Fragments** | `<>` para agrupar sin nodo extra; `React.Fragment key={...}` en listas |

---

## Sincronización JSX ↔ HTML

Tienes **dos versiones** del mismo ejercicio. Es normal, y tiene una razón de ser. Pero si no las mantienes al día, te vuelve loco.

### Las dos versiones

| Archivo | Entorno | Cómo corre |
|---------|---------|------------|
| `01-jsx-basics.jsx` | Vite / bundler | Node compila, hot reload, imports reales |
| `01-jsx-basics.html` | Navegador directo | Babel standalone transpila en tiempo real |

### ¿Por qué existen los dos?

- **JSX** es para cuando usas un bundler (Vite, CRA). Tiene `import`, `export default`, y se integra con el router del proyecto.
- **HTML** es para abrirlo con doble-click y verlo sin instalar nada. Carga React desde CDN y Babel transpila el JSX en el navegador.

### ¿Qué significa "sincronizar"?

Que **ambos archivos tengan el mismo contenido**. Si cambias un `<li>` en el JSX, tiene que estar igual en el HTML.

### ¿Qué pasaba antes (desincronizado)?

```
JSX:  vector = ["Salva","Gasco",...]
HTML: name = "React Developer"

JSX:  tiene WithFragmentsDOS
HTML: no lo tiene

JSX:  anchor con target="_blank"
HTML: anchor sin target
```

El estudiante abría el HTML y veía cosas distintas al JSX. Confusión garantizada.

### La regla

**El JSX es la fuente de verdad.** El HTML es una copia adaptada (sin `import`/`export`, con CDN en vez de bundler). Cuando editas uno, actualizas el otro.

### Adaptación necesaria

No es copia-pegar literal. El HTML necesita:

- Sin `import { useState }` (ya viene de CDN)
- Sin `export default` (el script es inline)
- `ReactDOM.createRoot()` al final para montar
- Las funciones van directas, sin wrappers de módulo

---

## Charla: Por que el .jsx es la fuente de verdad

### La analogia de la receta

Imagina que tenes un **plato de receta original** (eso es tu archivo `.jsx`). Es el documento que escribiste vos, con todos los pasos bien detallados, los ingredientes exactos, las cantidades.

Ahora, alguien te pide una **copia de esa receta** para pegarla en la pared de la cocina (eso es el `.html`). La copia tiene que ser identica, pero el formato cambia: la original esta en un cuaderno, la copia esta en un papel grande y pegado.

### Por que el .jsx gana

Porque **es el que realmente corre la aplicacion**:

- Tu `.jsx` se ejecuta con **Vite**. Tiene `import`/`export`, usa modulos ES modernos, y es lo que el framework entiende.
- El `.html` es una **adaptacion manual**. Usa CDN, Babel standalone, esencialmente una "traduccion" del JSX original para que funcione sin bundler.

```
.jsx → lo usa Vite/bundler → es el "cerebro" del proyecto
.html → es una copia standalone → para probar sin herramientas
```

Si modificas el `.html` y no actualizas el `.jsx`, el bundler **no sabe de esos cambios**. Vite sigue leyendo el `.jsx` original, y tu aplicacion se queda desactualizada. Es como si cambiaras la receta en la pared pero nunca tocaras el cuaderno — la proxima vez que cocinas, usas la version vieja.

### Que toco cuando agrego un componente nuevo

Tocas **dos archivos**:

1. **El `.jsx`** — escribis el componente ahi (la fuente original)
2. **El `.html`** — copias el mismo componente al final, dentro del `<script type="text/babel">`, y lo agregas al render

```jsx
// .jsx → creas el componente + lo exportas
function ComponenteNuevo() {
  return <p>Hola Mundo</p>;
}

// .html → lo pegas de nuevo + lo renderizas
function ComponenteNuevo() {
  return <p>Hola Mundo</p>;
}
```

**Punto.** Si solo tocas uno de los dos, quedas desincronizado.

### Regla de oro

> Cada vez que modifiques un `.jsx`, abri el `.html` y pega exactamente lo mismo. Copia y pega, no intentes reescribirlo de memoria. Eso es lo que te va a salvar de bugs raros.

---

## Agente: SalvaCode-Tutor

### Ubicacion

```
C:\Users\User\.config\opencode\agents\salvacode-tutor.md
```

### Configuracion

| Campo | Valor |
|-------|-------|
| Modo | `subagent` |
| Temperature | `0.3` |
| Permisos | bash: deny, edit: deny, webfetch: allow |

### Comandos Disponibles

| Comando | Ejemplo | Funcion |
|---------|---------|---------|
| `HAZME EJ` / `CREA SILABUS` | `HAZME EJ JavaScript`, `CREA SILABUS JavaScript` | Genera ejercicios praticos (ver detalle abajo) |
| `CORREGIR [File]` | `CORREGIR 01Ej.js` | Analiza y califica con ✅🟡❌, genera reporte .md |
| `REPORTAR [File]` | `REPORTAR 01Ej.js` | Diagnostico profundo con anotaciones inline, sin cambiar estado |
| `CHARLAR [File]` | `CHARLAR 01Ej.js` | Conversacion sobre teoria/codigo, sin reescribir |
| `FORMATEAR()` | `FORMATEAR()` | Reorganiza estructura de archivos y links |
| `FACILITAR [File]` | `FACILITAR 01task` | Agrega scaffolding (hints, pseudo-codigo) a ejercicios dificiles |

### HAZME EJ / CREA SILABUS — Estructura Real

Genera un syllabus de aprendizaje modular y multi-nivel, dividido en micro-pasos.

**Archivos que crea:**

| Archivo | Contenido |
|---------|-----------|
| `index.html` | Homepage limpio con CSS moderno, funciona como tabla de contenidos. Si el tema es vasto, crea indexs anidados por modulos. Cada destino debe estar linkeado aqui. |
| `01Ej.html` | Titulo claro del tema (ej: `reduce()`), explicacion conceptual breve, y lista ordenada `<ol>` de micro-tareas de dificultad creciente. |
| `01Ej.js` | Boilerplate o placeholders para TODAS las tareas del tema. Comentarios detallados de instruccion como referencia si el estudiante se traba. |

**Estructura de archivos:**

```
HAZME EJ JavaScript
  │
  ├── index.html              ← tabla de contenidos → linkea 01Ej.html, 02Ej.html, etc.
  │
  ├── 01Ej.html               ← tema 1: titulo + explicacion + <ol> con micro-tareas
  ├── 01Ej.js                 ← UN archivo con boilerplate de todas las tareas del tema 1
  │
  ├── 02Ej.html               ← tema 2
  ├── 02Ej.js
  │
  └── ...                     ← escala segun el tema
```

**Lo que NO es (error comun):**

```
❌ index.html → 01Ej.html → 01EjTask01.js, 01EjTask02.js, 01EjTask03.js
✅ index.html → 01Ej.html + 01Ej.js (un solo JS por tema)
```

**Estructura del HTML (micro-tareas):**

```html
<h2>reduce()</h2>
<p>Explicacion conceptual breve...</p>
<ol>
  <li>Tarea basica (nivel 1)</li>
  <li>Tarea intermedia (nivel 2)</li>
  <li>Tarea avanzada (nivel 3)</li>
</ol>
```

**Estructura del JS (boilerplate + comentarios):**

```js
// TAREA 1: Crear una funcion que reciba un array y devuelva la suma
// HINT: Usa reduce() con un acumulador
// HINT: El acumulador empieza en 0
function sumarArray(arr) {
  // Tu codigo aqui
}

// TAREA 2: Crear una funcion que busque el elemento mas grande
// HINT: Compara acumulador con elemento actual
function maximo(arr) {
  // Tu codigo aqui
}
```

### Filosofia

> "Ensenar a pescar" en vez de dar respuestas. Tono tecnico, directo, entre pares. Valida el progreso del estudiante, senala anti-patrones con honestidad, y adapta la complejidad al nivel actual.

### Flujo de Diagnostico

1. **Diagnostico:** Identifica errores de sintaxis, bugs logicos, memory leaks, race conditions
2. **El "Por que":** Explica el mecanismo subyacente (event loop, scope binding, type coercion)
3. **El Refactor:** Presenta codigo limpio y optimizado con explicaciones
4. **La Leccion:** Resume un modelo mental reutilizable para evitar el problema en el futuro
