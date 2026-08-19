# Arrays Log — Errores y Soluciones

Registro específico de problemas con arrays, métodos de array y operaciones comunes.

---

## 1. Array.push() retorna la LONGITUD, no el array

### Error
```javascript
const arr = [];
const resultado = arr.push(1);  // ❌ resultado es 1, no [1]
console.log(resultado);  // 1
```

### Por qué ocurre
`push()` modifica el array en su lugar (mutación) y retorna la nueva longitud como confirmación.

### El bug con reduce
```javascript
const numeros = [1, 2, 3];
const dobles = numeros.reduce((acc, num) => {
  return acc.push(num * 2);  // ❌ Retorna largo (1, 2, 3)
}, []);
// dobles es 3 (un número), no [2, 4, 6]
```

### La corrección
```javascript
const dobles = numeros.reduce((acc, num) => {
  acc.push(num * 2);  // ✅ push sin return
  return acc;          // ✅ Retorna el array
}, []);
// dobles es [2, 4, 6]
```

### Alternativa más limpia
```javascript
const dobles = numeros.map(num => num * 2);  // [2, 4, 6]
```

---

## 2. Métodos que retornan vs modifican

| Método | ¿Retorna array? | ¿Modifica original? | Ejemplo retorno |
|--------|-----------------|---------------------|-----------------|
| `push()` | ❌ Retorna largo | Sí | `arr.push(1)` → largo |
| `pop()` | ❌ Retorna elemento | Sí | `arr.pop()` → elemento |
| `shift()` | ❌ Retorna elemento | Sí | `arr.shift()` → elemento |
| `unshift()` | ❌ Retorna largo | Sí | `arr.unshift(1)` → largo |
| `splice()` | ✅ Retorna array | Sí | `arr.splice(0,1)` → elementos |
| `slice()` | ✅ Retorna array | No | `arr.slice(0,1)` → copia |
| `filter()` | ✅ Retorna array | No | `arr.filter(x => x > 1)` → nuevo array |
| `map()` | ✅ Retorna array | No | `arr.map(x => x * 2)` → nuevo array |
| `concat()` | ✅ Retorna array | No | `arr.concat([1])` → nuevo array |
| `flat()` | ✅ Retorna array | No | `arr.flat()` → nuevo array |
| `reduce()` | ❌ Retorna valor | No | `arr.reduce(...)` → cualquier valor |

---

## 3. .filter() no modifica el array original

```javascript
const numeros = [1, 2, 3, 4, 5];
const pares = numeros.filter(n => n % 2 === 0);
console.log(pares);      // [2, 4]
console.log(numeros);    // [1, 2, 3, 4, 5] — sin cambios
```

---

## 4. .map() retorna nuevo array

```javascript
const numeros = [1, 2, 3];
const dobles = numeros.map(n => n * 2);
console.log(dobles);  // [2, 4, 6]
console.log(numeros); // [1, 2, 3] — sin cambios
```

---

## 5. .reduce() — Errores comunes

### Error 1: push() en reduce
```javascript
// ❌ Retorna largo, no array
const resultado = [1, 2, 3].reduce((acc, num) => {
  return acc.push(num);
}, []);

// ✅ push sin return
const resultado = [1, 2, 3].reduce((acc, num) => {
  acc.push(num);
  return acc;
}, []);
```

### Error 2: Olvidar return
```javascript
// ❌ Retorna undefined
const resultado = [1, 2, 3].reduce((acc, num) => {
  acc.push(num);
  // Falta return acc
});

// ✅ Con return
const resultado = [1, 2, 3].reduce((acc, num) => {
  acc.push(num);
  return acc;  // ✅
}, []);
```

### Error 3: Acumulador incorrecto
```javascript
// ❌ acc se convierte en número
const resultado = [1, 2, 3].reduce((acc, num) => {
  return acc + num;  // acc es 0, luego 1, luego 3, luego 6
}, 0);
// resultado es 6 (un número, no un array)
```

---

## 6. Arrow functions con return

### Error
```javascript
// ❌ Sin return — retorna undefined
const dobles = numeros.map((n) => { n * 2 });
```

### Corrección
```javascript
// ✅ Return implícito (sin llaves)
const dobles = numeros.map((n) => n * 2);

// ✅ Return explícito (con llaves)
const dobles = numeros.map((n) => { return n * 2 });
```

---

## 7. Desestructuración de arrays

```javascript
const numeros = [1, 2, 3, 4, 5];

// Extraer primeros valores
const [primero, segundo, ...resto] = numeros;
console.log(primero);  // 1
console.log(resto);    // [3, 4, 5]

// Ignorar valores
const [,, tercero] = numeros;
console.log(tercero);  // 3
```

---

## 8. Spread operator

```javascript
// Copiar array
const original = [1, 2, 3];
const copia = [...original];

// Combinar arrays
const arr1 = [1, 2];
const arr2 = [3, 4];
const combinado = [...arr1, ...arr2];  // [1, 2, 3, 4]

// Agregar elemento
const numeros = [1, 2, 3];
const conNuevo = [...numeros, 4];  // [1, 2, 3, 4]
```

---

## 9. .find() vs .filter()

```javascript
const usuarios = [
  { id: 1, nombre: 'Ana' },
  { id: 2, nombre: 'Luis' },
  { id: 3, nombre: 'María' }
];

// .find() — Retorna PRIMERA coincidencia
const usuario = usuarios.find(u => u.id === 2);
console.log(usuario);  // { id: 2, nombre: 'Luis' }

// .filter() — Retorna TODAS las coincidencias
const filtrados = usuarios.filter(u => u.id > 1);
console.log(filtrados);  // [{id:2}, {id:3}]
```

---

## 10. .some() vs .every()

```javascript
const numeros = [1, 2, 3, 4, 5];

// .some() — ¿ALGUNO cumple?
numeros.some(n => n > 3);  // true

// .every() — ¿TODOS cumplen?
numeros.every(n => n > 3);  // false
```

---

## 11. Checklist de debugging arrays

Cuando veas un error con arrays:

- [ ] ¿`push()` retorna largo, no array?
- [ ] ¿Usaste `return acc` en `reduce`?
- [ ] ¿Las arrow functions con `{}` tienen `return`?
- [ ] ¿`filter()` y `map()` retornan nuevo array?
- [ ] ¿`find()` retorna elemento, no array?
- [ ] ¿`reduce()` puede retornar cualquier tipo de valor?

---

*Última actualización: 2026-07-15*
