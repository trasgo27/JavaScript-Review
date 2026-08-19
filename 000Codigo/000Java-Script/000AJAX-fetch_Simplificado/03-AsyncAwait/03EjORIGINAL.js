console.log('=== Ejercicio 03: try/catch con async/await ===');

// ============================================================
// TAREA 1: Envolver fetch en try/catch
// ============================================================
// Haz fetch dentro de un bloque try

async function hacerEj() {
  console.log('\n--- Tarea 1: Fetch en try ---');

  // 💡 Pista: Estructura básica:
  //   try {
  //     const respuesta = await fetch('https://jsonplaceholder.typicode.com/users/1');
  //     const datos = await respuesta.json();
  //     console.log('Éxito:', datos.name);
  //   } catch (error) {
  //     // va en tarea 2
  //   }

  /* Tu código aquí */

  // ============================================================
  // TAREA 2: Mostrar error amigable en catch
  // ============================================================
  // Captura el error y muestra su message

  console.log('\n--- Tarea 2: Error amigable ---');

  // 💡 Pista: Dentro del catch:
  //   catch (error) {
  //     console.log('Error al obtener datos:', error.message);
  //   }

  /* Tu código aquí */

  // ============================================================
  // TAREA 3: Probar con URL inválida
  // ============================================================
  // Cambia la URL a una que falle para ver el catch en acción

  console.log('\n--- Tarea 3: URL inválida ---');

  // 💡 Pista: Prueba con:
  //   try {
  //     const resp = await fetch('https://jsonplaceholder.typicode.com/esta URL NO existe');
  //     console.log('¿Llegamos aquí? No debería...');
  //   } catch (error) {
  //     console.log('¡Catch funcionó! Error:', error.message);
  //   }

  /* Tu código aquí */

  // ============================================================
  // TAREA 4: Añadir finally
  // ============================================================
  // finally siempre se ejecuta, ocurra error o no

  console.log('\n--- Tarea 4: finally ---');

  // 💡 Pista:
  //   try {
  //     const resp = await fetch('https://jsonplaceholder.typicode.com/users/1');
  //     const datos = await resp.json();
  //     console.log('Nombre:', datos.name);
  //   } catch (error) {
  //     console.log('Error:', error.message);
  //   } finally {
  //     console.log('✅ Operación finalizada (finally siempre se ejecuta)');
  //   }

  /* Tu código aquí */
}

hacerEj();
