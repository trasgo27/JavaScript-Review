**Destructuring** is a JS syntax that unpacks values from arrays or properties from objects into distinct variables.

### Array destructuring
```js
const numeros = [10, 20, 30, 40, 50, 60];
const [a, b, ...resto] = numeros;
// a = 10, b = 20, resto = [30, 40, 50, 60]
```

### Object destructuring
```js
const persona = { name: "Ana", age: 35, telephone: "911223344" };
const { name, age } = persona;
// name = "Ana", age = 35
```

Your exercise 4 uses array destructuring to grab the first two numbers into individual variables and collect the rest with `...resto`.
