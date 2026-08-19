## Ejercicio 02: Components & Props - Reporte de Debug

### Resumen de Errores

| # | Severidad | Linea | Problema |
|---|-----------|-------|----------|
| 1 | ❌ | 37 | Template literal roto — comillas simples en vez de backticks |
| 2 | ❌ | 123 | Texto basura visible + `}` suelta que renderiza en el DOM |
| 3 | ❌ | 107-110 vs 199-200 | Desajuste de idioma: componente espera espanol, uso pasa ingles |
| 4 | ❌ | 140-144 | `MenuItem` vacio — no renderiza icon ni texto |
| 5 | ❌ | 149-153 | `Sidebar` vacio — no renderiza children |
| 6 | ❌ | 171-176 | Seccion de UserCards completamente vacia |
| 7 | 🟡 | 37 | Espaciado inconsistente en `src= {avatar}` |

---

### 1. Template Literal Roto (Linea 37)

```jsx
// ❌ COMILLAS SIMPLES = string plano, ${name} se renderiza literal
<img src={avatar} alt={'Avatar de ${name}'}/>

// ✅ BACKTICKS = interpola la variable
<img src={avatar} alt={`Avatar de ${name}`}/>
```

Las comillas simples `'...'` crean un string plano. `${name}` se renderiza como el texto literal "Avatar de ${name}" en todos los usuarios, en vez de "Avatar de Alice Johnson", etc. Necesitas **backticks** `` `...` `` para que JavaScript interpole la variable.

---

### 2. Texto Basura Visible en DOM (Linea 123)

```jsx
// ❌ En JSX, /* ... */ NO es comentario. Se renderiza visible.
</div>  /* TODO: Display label, value, and trend indicator */}

// ✅ Eliminar la linea completamente
</div>
```

En JSX, `/* ... */` no es un comentario (necesitas `{/* ... */}`). El texto completo se renderiza como contenido **visible** en el navegador. La `}` sobrante es basura sintactica.

---

### 3. Desajuste de Idioma en Props (Lineas 107-110 vs 199-200)

| Ubicacion | Codigo | Valor |
|-----------|--------|-------|
| Componente `Stat` (L107-110) | `trend === 'positiva'` | Espanol |
| Uso en `ComponentsAndProps` (L199) | `trend="positive"` | Ingles |
| Uso en `ComponentsAndProps` (L200) | `trend="negative"` | Ingles |

Las condiciones NUNCA coinciden. `trend="positive"` no iguala `'positiva'`, asi que la flecha `↑` nunca se muestra.

**Fix — elegir un idioma y ser consistente:**

```jsx
const trendClass =
  trend === 'positive'
    ? 'trend-positive'
    : trend === 'negative'
      ? 'trend-negative'
      : '';
```

---

### 4. MenuItem Vacio (Lineas 140-144)

```jsx
// ❌ No renderiza NADA de las props
function MenuItem({ icon, text, isActive = false }) {
  return (
    <div className="menu-item">
      {/* TODO: Add content */}
    </div>
  );
}

// ✅ Completado
function MenuItem({ icon, text, isActive = false }) {
  return (
    <div className={`menu-item${isActive ? ' active' : ''}`}>
      <span className="menu-icon">{icon}</span>
      <span className="menu-text">{text}</span>
    </div>
  );
}
```

Los `<MenuItem>` en la seccion 2.5 se renderizan vacios. El usuario nunca ve los iconos ni los textos.

---

### 5. Sidebar Vacio (Lineas 149-153)

```jsx
// ❌ Los children nunca se renderizan
function Sidebar({ children }) {
  return (
    <nav className="sidebar">
      {/* TODO: Render children */}
    </nav>
  );
}

// ✅ Completado
function Sidebar({ children }) {
  return (
    <nav className="sidebar">
      {children}
    </nav>
  );
}
```

El `<Sidebar>` descarta todos sus children. La barra lateral se renderiza vacia.

---

### 6. Seccion de UserCards Vacia (Lineas 171-176)

```jsx
// ❌ El array `users` existe pero nunca se renderiza
<section>
  <h3>2.1 User Cards</h3>
</section>

// ✅ Completado
<section>
  <h3>2.1 User Cards</h3>
  {users.map((user, index) => (
    <UserCard
      key={index}
      name={user.name}
      email={user.email}
      avatar={user.avatar}
    />
  ))}
</section>
```

El array `users` con 3 usuarios existe pero nunca se usa con `.map()`. La seccion 2.1 aparece completamente vacia.

---

### 7. Espaciado Inconsistente (Linea 37)

```jsx
// ❌ Espacio extra antes de {
<img src= {avatar}

// ✅ Convencional
<img src={avatar}
```

No causa error, pero rompe la convencion de formateo de JSX.

---

### Leccion Clave

> **Template Literals vs Strings:** En JSX, siempre usa **backticks** `` ` `` para interpolacion de variables (`${variable}`). Las comillas simples o dobles crean strings planos donde `${...}` se renderiza como texto literal. Este es uno de los bugs mas silenciosos porque el codigo *parece* correcto — simplemente muestra el texto equivocado.

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

### HAZME EJ / CREA SILABUS — Detalle

Genera un syllabus de aprendizaje modular y multi-nivel, dividido en micro-pasos.

**Archivos que crea:**

| Archivo | Contenido |
|---------|-----------|
| `index.html` | Homepage limpio con CSS moderno, funciona como tabla de contenidos. Si el tema es vasto, crea indexs anidados por modulos. Cada destino debe estar linkeado aqui. |
| `01Ej.html` | Titulo claro del tema (ej: `reduce()`), explicacion conceptual breve, y lista ordenada de micro-tareas de dificultad creciente. |
| `01Ej.js` | Boilerplate o placeholders para cada tarea. Comentarios detallados de instruccion como referencia si el estudiante se traba. |

**Flujo de creacion:**

```
HAZME EJ JavaScript
  │
  ├── index.html          ← tabla de contenidos con links
  ├── 01Ej.html           ← tema 1: titulo + explicacion + micro-tareas
  ├── 01Ej.js             ← boilerplate del tema 1
  ├── 02Ej.html           ← tema 2
  ├── 02Ej.js             ← boilerplate del tema 2
  └── ...                 ← escala segun el tema
```

**Estructura de cada micro-tarea en el HTML:**

```html
<ol>
  <li>Tarea basica (nivel 1)</li>
  <li>Tarea intermedia (nivel 2)</li>
  <li>Tarea avanzada (nivel 3)</li>
</ol>
```

**Estructura del JS con comentarios de guia:**

```js
// TAREA 1: Crear una funcion que reciba un array y devuelva la suma
// HINT: Usa reduce() con un acumulador
// HINT: El acumulador empieza en 0

function sumarArray(arr) {
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
