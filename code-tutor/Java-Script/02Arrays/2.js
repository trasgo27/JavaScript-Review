let letras = [];

// Insertar al principio
letras.unshift('A', 'B', 'C');
console.log(letras); // ['A', 'B', 'C']

// Insertar al final
letras.push('D', 'E');
console.log(letras); // ['A', 'B', 'C', 'D', 'E']

// Eliminar el primero y el último
letras.shift();
letras.pop();
console.log(letras); // ['B', 'C', 'D']
