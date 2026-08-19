console.log('=== Ejercicio 02: Tu primer fetch() GET ===');

// =============================================
// TAREA 1: Hacer fetch a /posts/1
// Usa await fetch() con la URL correcta de
// jsonplaceholder.typicode.com y guarda el
// resultado en una variable llamada "respuesta"
// =============================================

/* Tu código aquí */
// 💡 Pista: El patrón básico es:
// const respuesta = await fetch('https://jsonplaceholder.typicode.com/posts/1');
//
// Solo necesitas asignar el resultado a "respuesta".
const respuesta =
fetch('https://jsonplaceholder.typicode.com/posts/1');

// =============================================
// TAREA 2: Convertir la respuesta a JSON
// Usa .json() sobre la variable "respuesta"
// y guarda el resultado en "datos"
// =============================================

/* Tu código aquí */
const datos = 
await respuesta.json();

// 💡 Pista: .json() también es asíncrono, así que usa await:
// const datos = await respuesta.json();
//

// =============================================
// TAREA 3: Mostrar el título en consola
// Accede a datos.title y muéstralo con console.log
// =============================================

/* Tu código aquí */
console.log('El título es: ',datos.title);
// 💡 Pista: El objeto "datos" tiene varias propiedades.
// La que buscas es "title". Ejemplo:

// console.log('El título es:', datos.title);
//
