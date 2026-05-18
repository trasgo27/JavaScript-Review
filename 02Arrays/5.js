const valores = [1, 2, 2, 3, 4, 4, 5];

// Crear un Set para eliminar duplicados
const valoresUnicos = [...new Set(valores)];

console.log(valoresUnicos); // [1, 2, 3, 4, 5]
