console.log('=== Ejercicio 03: Entender el objeto Response ===');

// Primero hacemos el fetch una vez para tener el objeto response
// =============================================
// TAREA 0 (ya hecha): Obtener el objeto Response
// =============================================
async function iniciar (){


const respuesta = await fetch('https://jsonplaceholder.typicode.com/posts/1');


// =============================================
// TAREA 1: Comprobar si response.ok es true
// Muestra en consola el valor de response.ok
// =============================================

/* Tu código aquí */
(respuesta.ok) ? console.log('¿OK?:', respuesta.ok) : console.log('¿OK?:', 'No!!!')
// 💡 Pista: response.ok es un booleano (true o false).
// Si la petición fue exitosa (status 200-299), será true.
//
// console.log('¿OK?:', respuesta.ok);
//


// =============================================
// TAREA 2: Mostrar response.status
// Muestra en consola el código de estado HTTP
// =============================================

console.log('Status:', respuesta.status);
/* Tu código aquí */
// 💡 Pista: response.status es un número.
// 200 = OK, 404 = No encontrado, 500 = Error servidor.
//
// console.log('Status:', respuesta.status);
//


// =============================================
// TAREA 3: Mostrar response.statusText
// Muestra en consola el texto del estado
// =============================================

/* Tu código aquí */
console.log('Status text', respuesta.status);
console.log('Status text mejorado ...', respuesta.statusText);
// 💡 Pista: response.statusText es un string con
// el texto del estado HTTP. Para un 200 será "OK".
//
// console.log('Status Text:', respuesta.statusText);
//
}
iniciar();
