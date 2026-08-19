console.log('=== Ejercicio 04: Encadenar .then() paso a paso ===');

// =============================================
// A continuación tienes el inicio de un fetch.
// Debes completar los .then() y el .catch()
// encadenados después de fetch(...)
// =============================================

const peticion = fetch('https://jsonplaceholder.typicode.com/posts/1'); //formato de sql
  // =============================================
  // TAREA 1: Escribe el PRIMER .then()
  // que convierta "response" a JSON
  // =============================================

  /* Tu código aquí */
  peticion
  .then((response) => 
    response.json()
  )
  // 💡 Pista: El primer .then() recibe el objeto response
  // y debe devolver response.json() para convertirlo:
  //
  // .then((response) => {
  //   return response.json();
  // })
  //

  // =============================================
  // TAREA 2: Escribe el SEGUNDO .then()
  // que reciba "datos" y muestre datos.title
  // =============================================

  /* Tu código aquí */
  .then((datosJason) => {
    console.log('El titulo es:', datosJason.title);
  })
  // 💡 Pista: El segundo .then() recibe el objeto ya
  // convertido a JSON. Accede a .title:
  //
  // .then((datos) => {
  //   console.log('El título es:', datos.title);
  // })
  //

  // =============================================
  // TAREA 3: Añade .catch() al final
  // para manejar errores de la petición
  // =============================================

  /* Tu código aquí */
  .catch((err) => {
    console.error('Hubo fallo', err);
  });
// 💡 Pista: .catch() se ejecuta si algo falla.
// Recibe el error como parámetro:
//
// .catch((error) => {
//   console.log('Hubo un error:', error);
// });
//
