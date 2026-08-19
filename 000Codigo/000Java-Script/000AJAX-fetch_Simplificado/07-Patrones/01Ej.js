console.log('=== Ejercicio 01: Cancelar con AbortController ===');

// ============================================================
// TAREA 1: Crear AbortController
// ============================================================
// Crea un AbortController que nos permita cancelar peticiones

function hacerEj1() {
  console.log('\n--- Tarea 1: Crear AbortController ---');

  // 💡 Pista: El patrón es crear un AbortController:
  // const controller = new AbortController();
  // const signal = controller.signal;
  // console.log('Controller creado:', controller);
  // console.log('Signal:', signal);

  /* Tu código aquí */


}

// ============================================================
// TAREA 2: Pasar signal al fetch
// ============================================================
// Haz fetch pasando el signal como segundo argumento

function hacerEj2() {
  console.log('\n--- Tarea 2: Pasar signal al fetch ---');

  const controller = new AbortController();
  const signal = controller.signal;

  // 💡 Pista: El patrón para pasar signal es:
  // const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
  //   signal: controller.signal
  // });
  // const data = await res.json();
  // console.log('Datos:', data);

  /* Tu código aquí */


}

// ============================================================
// TAREA 3: Botón Cancelar ejecuta controller.abort()
// ============================================================
// Conecta el botón Cancelar para abortar la petición

function hacerEj3() {
  console.log('\n--- Tarea 3: Botón Cancelar ---');

  const output = document.getElementById('output');
  const fetchBtn = document.getElementById('fetchBtn');
  const cancelBtn = document.getElementById('cancelBtn');

  // 💡 Pista: Crea el controller fuera del listener para que ambos botones lo usen:
  // let controller;
  //
  // fetchBtn.addEventListener('click', async () => {
  //   controller = new AbortController();
  //   output.textContent = 'Cargando...';
  //   try {
  //     const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
  //       signal: controller.signal
  //     });
  //     const data = await res.json();
  //     output.textContent = 'Título: ' + data.title;
  //   } catch (error) { ... }
  // });
  //
  // cancelBtn.addEventListener('click', () => {
  //   controller.abort();
  //   output.textContent = 'Petición cancelada';
  // });

  /* Tu código aquí */


}

// ============================================================
// TAREA 4: Capturar AbortError en catch
// ============================================================
// Dentro del catch, verifica si es un AbortError

function hacerEj4() {
  console.log('\n--- Tarea 4: Capturar AbortError ---');

  const controller = new AbortController();

  // 💡 Pista: Cuando abortas, el error tiene name === 'AbortError':
  // try {
  //   controller.abort(); // Abortamos inmediatamente
  //   const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
  //     signal: controller.signal
  //   });
  // } catch (error) {
  //   if (error.name === 'AbortError') {
  //     console.log('⚠️ Petición cancelada por el usuario');
  //   } else {
  //     console.log('❌ Otro error:', error.message);
  //   }
  // }

  /* Tu código aquí */


}

// Ejecutar todos
hacerEj1();
hacerEj2();
hacerEj3();
hacerEj4();
