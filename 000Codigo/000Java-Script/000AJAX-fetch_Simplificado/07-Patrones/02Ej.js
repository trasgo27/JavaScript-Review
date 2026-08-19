console.log('=== Ejercicio 02: Retry con reintentos ===');

// ============================================================
// TAREA 1: Crear función fetchRetry
// ============================================================
// Crea una función que reintente fetch maxRetries veces

async function fetchRetry(url, maxRetries) {
  console.log(`\nIntentando fetch a: ${url} (máx ${maxRetries} intentos)`);

  // 💡 Pista: El patrón es un bucle for con await dentro:
  // for (let i = 1; i <= maxRetries; i++) {
  //   try {
  //     const res = await fetch(url);
  //     if (!res.ok) throw new Error(`HTTP ${res.status}`);
  //     return await res.json(); // Si funciona, retorna y sale del bucle
  //   } catch (error) {
  //     console.log(`Intento ${i} falló: ${error.message}`);
  //     if (i < maxRetries) {
  //       console.log(`Esperando 1 segundo antes del siguiente intento...`);
  //       await new Promise(resolve => setTimeout(resolve, 1000));
  //     }
  //   }
  // }
  // throw new Error(`Todos los ${maxRetries} intentos fallaron`);

  /* Tu código aquí */


}

// ============================================================
// TAREA 2: Crear función de delay
// ============================================================
// Crea una función helper que espere N milisegundos

function delay(ms) {
  // 💡 Pista: Retorna una Promise que se resuelve después de ms:
  // return new Promise(resolve => setTimeout(resolve, ms));

  /* Tu código aquí */


}

// ============================================================
// TAREA 3: Probar con URL que falle
// ============================================================
// Usa una URL que devuelva 404 para ver los reintentos

async function hacerEj3() {
  console.log('\n--- Tarea 3: Probar retry con URL que falla ---');

  // 💡 Pista: Una URL que falla sería:
  // 'https://jsonplaceholder.typicode.com/posts/999999'
  // Esta URL devuelve 404, así que todos los intentos fallarán.
  //
  // Prueba:
  // try {
  //   const data = await fetchRetry('https://jsonplaceholder.typicode.com/posts/999999', 3);
  //   console.log('Datos:', data);
  // } catch (error) {
  //   console.log('❌ Error final:', error.message);
  // }

  /* Tu código aquí */


}

// ============================================================
// TAREA 4: Probar con URL que funcione
// ============================================================
// Ahora prueba con una URL válida

async function hacerEj4() {
  console.log('\n--- Tarea 4: Probar retry con URL válida ---');

  // 💡 Pista: Usa una URL que funcione:
  // const data = await fetchRetry('https://jsonplaceholder.typicode.com/posts/1', 3);
  // console.log('Éxito:', data.title);

  /* Tu código aquí */


}

// Ejecutar todos
hacerEj3();
hacerEj4();
