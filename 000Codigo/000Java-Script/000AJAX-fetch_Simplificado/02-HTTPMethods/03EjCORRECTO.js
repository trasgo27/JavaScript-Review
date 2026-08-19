console.log('=== Ejercicio 03: PUT vs PATCH ===');

// =============================================
// TAREA 1: PUT a /posts/1 — reemplazo COMPLETO
// Envía TODOS los campos del recurso
// =============================================

/* Tu código aquí */
// 💡 Pista: PUT reemplaza el recurso entero, así que
// debes enviar TODOS los campos:
//
// const putBody = {
//   id: 1,
//   title: 'Título actualizado con PUT',
//   body: 'Este cuerpo reemplaza al anterior completamente.',
//   userId: 1
// };
//
// const respuestaPut = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
//   method: 'PUT',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify(putBody)
// });
//
// const datosPut = await respuestaPut.json();
// console.log('PUT resultado:', datosPut);
//

// =============================================
// TAREA 2: PATCH a /posts/1 — actualización PARCIAL
// Envía SOLO el campo que quieres cambiar
// =============================================

/* Tu código aquí */
// 💡 Pista: PATCH solo modifica lo que envías,
// el resto queda igual:
//
// const patchBody = {
//   title: 'Título actualizado con PATCH'
// };
//
// const respuestaPatch = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
//   method: 'PATCH',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify(patchBody)
// });
//
// const datosPatch = await respuestaPatch.json();
// console.log('PATCH resultado:', datosPatch);
//

// =============================================
// TAREA 3: Comparar ambos resultados
// Muestra un resumen comparativo
// =============================================

/* Tu código aquí */
// 💡 Pista: Imprime ambos para compararlos visualmente:
//
// console.log('--- COMPARACIÓN PUT vs PATCH ---');
// console.log('PUT  → envía objeto completo:', datosPut);
// console.log('PATCH → envía solo lo que cambias:', datosPatch);
//
