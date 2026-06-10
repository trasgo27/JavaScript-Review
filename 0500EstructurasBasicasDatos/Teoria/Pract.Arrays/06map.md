A `Map` is a collection of key-value pairs where keys can be **any type** (objects, functions, primitives — not just strings like regular objects).

```js
const usuarios = new Map();

// set, get, has, delete
usuarios.set("Ana", 35);
usuarios.set("Nacho", 40);

console.log(usuarios.get("Ana")); // 35
console.log(usuarios.has("Ana")); // true
console.log(usuarios.size);       // 2
```

### Map vs Regular Object

| | Object | Map |
|---|---|---|
| Key types | Strings/Symbols only | Any type |
| Iteration | `for...in` (includes prototype) | `forEach`, `for...of` (direct) |
| Size | Manual count | `.size` property |
| Performance | General purpose | Optimized for frequent add/delete |

Unlike `Set` (unique values), `Map` stores **pairs** and remembers insertion order.
