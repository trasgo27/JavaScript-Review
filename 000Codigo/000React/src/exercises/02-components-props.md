## Ejercicio 02: Components & Props - Debug y Sincronizacion

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

Las comillas simples `'...'` crean un string plano. `${name}` se renderiza como el texto literal "Avatar de ${name}" en todos los usuarios. Necesitas **backticks** `` `...` `` para que JavaScript interpole la variable.

---

### 2. Texto Basura Visible en DOM (Linea 123)

```jsx
// ❌ En JSX, /* ... */ NO es comentario. Se renderiza visible.
</div>  /* TODO: Display label, value, and trend indicator */}

// ✅ Eliminar la linea completamente
</div>
```

En JSX, `/* ... */` no es un comentario (necesitas `{/* ... */}`). El texto completo se renderiza como contenido **visible** en el navegador.

---

### 3. Desajuste de Idioma en Props (Lineas 107-110 vs 199-200)

| Ubicacion | Codigo | Valor |
|-----------|--------|-------|
| Componente `Stat` (L107-110) | `trend === 'positiva'` | Espanol |
| Uso en `ComponentsAndProps` (L199) | `trend="positive"` | Ingles |
| Uso en `ComponentsAndProps` (L200) | `trend="negative"` | Ingles |

Las condiciones NUNCA coinciden. Las flechas ↑↓ nunca se muestran.

**Fix — usar ingles en ambos lados:**

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

---

### 7. Espaciado Inconsistente (Linea 37)

```jsx
// ❌ Espacio extra antes de {
<img src= {avatar}

// ✅ Convencional
<img src={avatar}
```

---

## Sincronizacion JSX ↔ HTML

### La regla

**El `.jsx` es la fuente de verdad.** El `.html` es una copia adaptada.

### Diferencias entre ambos archivos

| Elemento | JSX | HTML |
|----------|-----|------|
| Imports | `import { useState }` | CDN scripts (ya incluidos) |
| Export | `export default function` | Solo `function` |
| Montaje | Lo maneja Vite | `ReactDOM.createRoot()` al final |
| Contenido | Identico | Identico |

### Pasos para sincronizar

1. Corregir todos los bugs en el `.jsx`
2. Copiar cada componente corregido al `<script type="text/babel">` del `.html`
3. Eliminar `import` y `export default` del HTML
4. Agregar `ReactDOM.createRoot(document.getElementById('root')).render(<ComponentsAndProps />)` al final
5. Verificar que contenido sea identico

### Codigo del HTML (montaje)

```jsx
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ComponentsAndProps />);
```

---

### Leccion Clave

> **Template Literals vs Strings:** En JSX, siempre usa **backticks** `` ` `` para interpolacion de variables (`${variable}`). Las comillas simples o dobles crean strings planos donde `${...}` se renderiza como texto literal.
