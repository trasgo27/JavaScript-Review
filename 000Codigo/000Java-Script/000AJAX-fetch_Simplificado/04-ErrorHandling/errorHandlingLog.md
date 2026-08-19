# Error Handling Log — Error Constructor y Fetch Errors

## Identificar tipo de error con `constructor.name`

Cada objeto tiene un `constructor` que es la función que lo creó. Accediendo a `.constructor.name` obtenemos el tipo como string:

```javascript
const error = new TypeError("Algo falló");
console.log(error.constructor);        // → [Function: TypeError]
console.log(error.constructor.name);   // → "TypeError"
```

**¿Por qué usar `constructor.name` en vez de `instanceof`?**

```javascript
// instanceof puede fallar entre contextos (iframes, workers)
error instanceof TypeError  // ❌ A veces falla

// constructor.name siempre funciona
error.constructor.name === 'TypeError'  // ✅ Siempre
```

---

## Ejemplo: Error de red con fetch

Cuando `fetch` intenta acceder a un dominio que no existe, lanza un error:

```javascript
try {
    const resp = await fetch('https://dominio-que-no-existe.com/api');
    console.log('Did we arrived here? We shouldnt');  // ⛔ NUNCA llega aquí
} catch (error) {
    // ✅ El error de red se atrapa aquí
    console.log('🔴 Error de RED detectado');
    console.log('Tipo:', error.constructor.name);  // → "TypeError"
    console.log('Mensaje:', error.message);        // → "Failed to fetch"
}
```

**El tipo varía según entorno:**

| Entorno | `error.constructor.name` |
|---------|--------------------------|
| Chrome/Edge | `TypeError` |
| Firefox | `TypeError` |
| Node.js 18+ | `TypeError` o `FetchError` |

**Lo que siempre funciona:**
1. El error SÍ se atrapa (el programa no se detiene)
2. Siempre es un error de red (no de sintaxis)
3. Siempre puedes acceder a `.message`
4. Siempre `.constructor.name` te da ALGÚN nombre válido

---

## Propiedades del Objeto Error

| Propiedad | Contenido | Ejemplo |
|-----------|-----------|---------|
| `.message` | Descripción del error | `"Algo salió mal"` |
| `.name` | Tipo de error | `"TypeError"` |
| `.stack` | Pila de llamadas | `at funcionB (script.js:6)` |
| `.cause` | Error original (ES2022) | Error encapsulado |

---

## Tipos de Error

| Error | Cuándo usarlo | Ejemplo |
|-------|---------------|---------|
| `Error` | Error general, genérico | `throw new Error('Algo falló')` |
| `TypeError` | Tipo incorrecto | `null.propiedad` |
| `ReferenceError` | Variable no definida | `console.log(x)` sin declarar `x` |
| `SyntaxError` | Sintaxis mala | `JSON.parse('basura')` |
| `RangeError` | Fuera de rango | `new Array(-1)` |
| `AbortError` | Cancelación | `AbortController.abort()` |

---

## Manejo por tipo de error

```javascript
catch (error) {
  if (error instanceof TypeError) {
    console.log('Tipo incorrecto:', error.message);
  } else if (error instanceof ReferenceError) {
    console.log('Variable no definida:', error.message);
  } else {
    console.log('Error:', error.message);
  }
}
```
