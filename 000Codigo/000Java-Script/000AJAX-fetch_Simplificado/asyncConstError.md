# async const — Errores de Sintaxis

## Error 1: async antes de variable

```javascript
// ❌ Inválido — async const no existe
async const respuesta = ...
async let x = ...
async var x = ...
```

**¿Por qué?**

`async` es un modificador que **solo puede usarse antes de funciones**, nunca antes de variables (`const`, `let`, `var`).

### Corrección

```javascript
// ❌ Tu código
async const respuesta = 
  try { await fetch(...) } catch (error) { }

// ✅ Correcto
try {
  const respuesta = await fetch('https://dominio.com/api');
} catch (error) {
  console.error(error.message);
}
```

---

## Error 2: Falta const y async en arrow function

```javascript
// ❌ Inválido — falta const y async
async miFuncion = ()=>{
  try {
    await fetch('https://dominio-que-no-existe-xyz123.com/api')
  } catch (error) {
    
  }
}
```

**Problemas:**
1. Falta `const`/`let`/`var` antes de `miFuncion`
2. La arrow function no tiene `async`, entonces `await` no funciona dentroero

### Corrección

```javascript
// ❌ Tu código
async miFuncion = ()=>{ await fetch(...) }

// ✅ Correcto — con const y async
const miFuncion = async () => {
  try {
    const respuesta = await fetch('https://dominio-que-no-existe-xyz123.com/api');
  } catch (error) {
    console.error(error.message);
  }
}
```

## Resumen

| Expresión | Válido | Razón |
|-----------|--------|-------|
| `async function` | ✅ | `async` modifica a la función |
| `async () =>` | ✅ | `async` modifica a la función |
| `const fn = async () =>` | ✅ | `async` + `const` juntos |
| `async const` | ❌ | `async` no modifica variables |
| `async miFuncion =` | ❌ | Falta `const` y la función no tiene `async` |

## Usos válidos de async

```javascript
// ✅ Función asíncrona con nombre
async function miFuncion() { }

// ✅ Función asíncrona anónima (arrow)
const miFuncion = async () => { }

// ✅ Función asíncrona anónima (tradicional)
const miFuncion = async function() { }
```

## Regla visual

```
await solo funciona dentro de:
├── async function() { }
├── const fn = async () => { }
└── try/catch (a nivel superior)
```
