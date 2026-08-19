console.log('=== Ejercicio 04: DELETE — eliminar recurso ===');

// =============================================
// TAREA 1: DELETE a /posts/1
// Envía una petición DELETE para eliminar el post
// =============================================

/* Tu código aquí */
const pidoBorrar = await fetch('https://jsonplaceholder.typicode.com/posts/1', {method:'DELETE'});
const respBorrar = await pidoBorrar.json(); //el formato de browser si no es obj o vector
(pidoBorrar.status === 200)?console.log('Borrado Correcto ...'):console.log('No borrado ...');
console.log(pidoBorrar.ok);
console.log(pidoBorrar.status);
console.log(pidoBorrar.statusText);
// 💡 Pista: DELETE no necesita body, solo el method:
//
// const respuestaDelete = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
//   method: 'DELETE'
// });
//


// =============================================
// TAREA 2: Verificar la respuesta
// Comprueba response.ok y response.status
// =============================================

/* Tu código aquí */
// 💡 Pista: Un DELETE exitoso devuelve status 200:
//
// console.log('¿Eliminado correctamente?:', respuestaDelete.ok);
// console.log('Status:', respuestaDelete.status);
// console.log('Status Text:', respuestaDelete.statusText);
//


// =============================================
// TAREA 3: Confirmar con GET
// Haz un GET a /posts/1 para ver qué devuelve
// la API después de eliminarlo
// =============================================

/* Tu código aquí */
// 💡 Pista: En jsonplaceholder, el GET después de DELETE
// puede devolver un objeto vacío o el mismo objeto.
// Lo importante es practicar el patrón de verificar:
//
// const confirmacion = await fetch('https://jsonplaceholder.typicode.com/posts/1');
// const datosConfirmacion = await confirmacion.json();
// console.log('¿Existe todavía?:', datosConfirmacion);
// console.log('Status al buscar:', confirmacion.status);
//

