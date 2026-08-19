console.log('=== Ejercicio 02: POST — crear un recurso ===');

// =============================================
// TAREA 1: Crear un objeto con los datos
// a enviar. Debe tener: title, body, userId
// =============================================

/* Tu código aquí */
// 💡 Pista: Crea un objeto normal de JavaScript:
//
// const nuevoPost = {
//   title: 'Mi primer post',
//   body: 'Este es el contenido de mi post.',
//   userId: 1
// };
//


// =============================================
// TAREA 2: Hacer fetch POST con method, headers y body
// Envía el objeto a /posts con el método POST
// =============================================

/* Tu código aquí */
// 💡 Pista: Para POST necesitas 3 cosas extra en fetch:
//
// const respuesta = await fetch('https://jsonplaceholder.typicode.com/posts', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(nuevoPost)
// });
//
// method: indica que es POST
// headers: le dice al servidor que envías JSON
// body: convierte tu objeto a string con JSON.stringify()


// =============================================
// TAREA 3: Leer la respuesta
// Convierte a JSON y muestra el id creado
// =============================================

/* Tu código aquí */
// 💡 Pista: La API te devuelve el objeto creado con un id:
//
// const datos = await respuesta.json();
// console.log('Recurso creado:', datos);
// console.log('ID del nuevo post:', datos.id);
//

