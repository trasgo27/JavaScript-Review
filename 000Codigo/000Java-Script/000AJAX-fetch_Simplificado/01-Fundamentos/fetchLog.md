# Fetch Log — Errores y Soluciones

Registro específico de problemas con fetch() y el objeto Response.

---

## 1. fetch() retorna Response, no JSON

### Error
```javascript
const datos = await fetch('https://api/users/1');
console.log(datos.name);  // undefined — datos es Response, no JSON
```

### Corrección
```javascript
const res = await fetch('https://api/users/1');
const datos = await res.json();  // ✅ Necesitas .json()
console.log(datos.name);         // "Leanne Graham"
```

### Estructura del Response
```javascript
{
  ok: true,          // ¿HTTP exitoso?
  status: 200,       // Código HTTP
  statusText: 'OK',
  headers: Headers,
  body: ReadableStream,  // ← Solo se lee 1 vez
  url: 'https://...',
  type: 'basic'
}
```

---

## 2. Response body solo se puede leer una vez

### Error
```javascript
const res = await fetch(url);
await res.json();  // ✅ Primera lectura
await res.json();  // ❌ Body is unusable
```

### Solución 1: Clonar
```javascript
const res = await fetch(url);
const clone = res.clone();
const datos1 = await res.json();
const datos2 = await clone.json();  // ✅ OK
```

### Solución 2: Re-fetch
```javascript
const datos1 = await fetch(url).then(r => r.json());
const datos2 = await fetch(url).then(r => r.json());  // ✅ OK
```

---

## 3. fetch() no lanza error en HTTP 4xx/5xx

### Error
```javascript
const res = await fetch('https://api/users/999');
// res.ok = false, res.status = 404
// PERO NO LANZA EXCEPCIÓN — el código continúa
```

### Corrección
```javascript
const res = await fetch('https://api/users/999');
if (!res.ok) {
  throw new Error('HTTP ' + res.status + ': ' + res.statusText);
}
const datos = await res.json();
```

### Patrón con try/catch
```javascript
try {
  const res = await fetch('https://api/users/999');
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const datos = await res.json();
} catch (error) {
  console.error('Error:', error.message);
}
```

---

## 4. .json() retorna Promise

### Error
```javascript
const res = await fetch(url);
const datos = res.json();  // ❌ datos es Promise, no objeto
console.log(datos.name);   // undefined
```

### Corrección
```javascript
const res = await fetch(url);
const datos = await res.json();  // ✅ Await para resolver
console.log(datos.name);         // "Leanne Graham"
```

---

## 5. Fetch con POST

### Error común
```javascript
// ❌ Falta headers y body
const res = await fetch('https://api/users', {
  method: 'POST'
});
```

### Corrección
```javascript
const res = await fetch('https://api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Juan',
    email: 'juan@email.com'
  })
});
const datos = await res.json();
```

---

## 6. Fetch con query params

### Error
```javascript
// ❌ URL mal formada
const res = await fetch('https://api/users?userId=' + userId);
```

### Mejor práctica
```javascript
const params = new URLSearchParams({
  userId: 1,
  _limit: 10
});
const res = await fetch(`https://api/users?${params}`);
```

---

## 7. Timeout con AbortController

```javascript
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 5000); // 5 segundos

try {
  const res = await fetch(url, { signal: controller.signal });
  clearTimeout(timeout);
  const datos = await res.json();
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Timeout: la petición tardó demasiado');
  }
}
```

---

## 8. Retry con reintentos

```javascript
async function fetchConReintentos(url, maxReintentos = 3) {
  for (let intento = 1; intento <= maxReintentos; intento++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return await res.json();
    } catch (error) {
      console.log(`Intento ${intento} falló:`, error.message);
      if (intento === maxReintentos) throw error;
    }
  }
}
```

---

## 9. Checklist de debugging fetch

Cuando veas un error con fetch:

- [ ] ¿Usaste `await res.json()` para obtener los datos?
- [ ] ¿Leíste el body solo una vez?
- [ ] ¿Verificaste `res.ok` para errores HTTP?
- [ ] ¿Usaste `try/catch` para manejar errores?
- [ ] ¿Enviaste `Content-Type` en requests POST?
- [ ] ¿Usaste `JSON.stringify()` para el body?
- [ ] ¿Manejaste timeouts con AbortController?

---

*Última actualización: 2026-07-15*
