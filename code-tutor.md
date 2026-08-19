# Structure of `index.html`

**Purpose:** A catalog/table-of-contents page that links to all JavaScript exercises organized by topic.

## Layout

1. **Head:** Standard HTML5 boilerplate (`lang="en"`, charset UTF-8, viewport meta), title "JavaScript Exercises Index", and an embedded `<style>` block with minimal CSS (Arial font, margin 20px, line-height 1.6, styled headings, list links in `#007acc` blue).

2. **Body:** A single `<h1>` title followed by multiple `<div class="section">` blocks, one per topic/category.

## Section pattern

Each section follows this exact template:

```html
<div class="section">
  <h2>Category Name</h2>
  <ul>
    <li><a href="file:///D:/00_JavaScript_Review/code-tutor/Java-Script/FOLDER/FILE.html">Label</a></li>
    ...
  </ul>
</div>
```

Some sections also include an `<h3>` sub-heading (e.g., "Array Groups", "Challenge Sub-projects") followed by a second `<ul>` of links.

## Key details

- **All links use `file:///` protocol** with absolute Windows paths (e.g., `file:///D:/00_JavaScript_Review/code-tutor/Java-Script/...`).
- **Link labels** follow the format `"Number — Short Description"` or just `"Short Description"` for non-numbered items.
- **CSS classes used:** only `.section` on wrapper divs; everything else uses element selectors.
- **Sections present (in order):** 00_SQL, 00Basic, 00ConditionalStatementsLoops, 02Arrays (with sub-group "Array Groups"), 00DOM, 03Functions, 04Events, 05Promise/Asynchronous, 06Objects, 0700LocalStorage/Cookies, 00CHALLENGE (with sub-group "Challenge Sub-projects"), Apis, 0200ObjetosPredefinidos, 0000FilmTarjetas, 0000Libreria, 0500EstructurasBasicasDatos, MovieDataBaseApp, Exams, 00Apendar, MaterialClase — **20 sections total**.
- **No JavaScript** is used; the page is purely static HTML with inline CSS.
- **Total size:** 271 lines.

Aquí tienes una versión optimizada del prompt diseñada específicamente para **Big Pickle**.

Esta mejora aprovecha las directrices de calidad de documentos e instrucciones estructuradas de Big Pickle, asegurando que la IA genere un código limpio, profundo y perfectamente organizado sin omitir ningún tema.

---

### Prompt Optimizado para Big Pickle

> **Rol:** Actúa como un instructor experto en Angular y un desarrollador web front-end de nivel senior.
> **Tarea:** Tu objetivo es crear un sistema de aprendizaje estructurado compuesto por un archivo índice principal y múltiples archivos HTML de destino interconectados mediante hipervínculos válidos.
> **Referencias de contexto:**
> * Usa la estructura descrita en `@contextScopeItemMention` para diseñar la arquitectura del archivo principal.
> * Consulta los detalles de diseño adicionales en `@contextScopeItemMention` y `@contextScopeItemMention`.
> 
> 
> **Instrucciones de los entregables:**
> 1. **Archivo `index.html` (Índice Principal):**
> * Crea un menú principal limpio, profesional y altamente intuitivo.
> * Debe contener una tabla HTML (`<table>`) o una lista estructurada (`<ul>`) que organice y enlace claramente a cada uno de los archivos de destino usando rutas relativas correctas (ej. `href="basico-componentes.html"`).
> 
> 
> 2. **Archivos HTML de Destino:**
> * Genera los archivos HTML individuales para cada tema.
> * Cada archivo debe representar un módulo específico y contener un grupo de ejercicios prácticos estructurados y ordenados **estrictamente de menor a mayor dificultad**.
> * Cada ejercicio dentro del HTML debe incluir: Título del reto, descripción detallada del problema, código base/instrucciones y una sección clara para la solución.
> 
> 
> 
> 
> **Bloques Temáticos Obligatorios a Cubrir:**
> * **Bloque 1: Básico**
> * Componentes e Interpolación.
> * Property Binding y Event Binding.
> * Directivas estructurales del nuevo Control Flow (`@if`, `@for`) y directivas de atributos (`ngClass`, `ngStyle`).
> 
> 
> * **Bloque 2: Intermedio**
> * Reactividad moderna con Señales (`Signals`).
> * Comunicación entre componentes mediante `Input` y `Output`.
> * Formularios en Angular (Reactivos y basados en plantillas / Template-driven).
> * Ciclos de vida del componente (`ngOnInit`, `ngOnDestroy`, etc.).
> 
> 
> * **Bloque 3: Avanzado**
> * Servicios e Inyección de Dependencias (`Dependency Injection`).
> * Sistema de enrutamiento moderno (`Routing` y `Guards`).
> * Consumo de APIs y peticiones asíncronas con `HttpClient`.
> * Programación reactiva y manejo de estado básico con `RxJS`.
> 
> 
> 
> 
> **Requisitos técnicos y de formato:**
> * Utiliza HTML5 semántico y limpio.
> * Evita código redundante o excesivamente comprimido; proporciona explicaciones y estructuras claras para maximizar el valor educativo del documento.
> 
> 

---

### 💡 ¿Por qué funciona mejor este prompt en Big Pickle?

1. **Define un Rol Claro:** Establece que la IA debe responder como un instructor senior, lo que eleva el tono técnico de las explicaciones y la calidad del código.
2. **Separa los Entregables:** Divide explícitamente las instrucciones para el `index.html` y las páginas de ejercicios para que Big Pickle entienda la jerarquía de archivos que debe construir.
3. **Estructura limpia:** Transforma el texto plano de los bloques temáticos en una lista con viñetas claras, reduciendo la probabilidad de que la IA olvide incluir temas clave como *Signals* o *RxJS*.