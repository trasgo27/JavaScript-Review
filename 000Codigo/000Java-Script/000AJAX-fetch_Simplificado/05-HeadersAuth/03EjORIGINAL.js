console.log('=== Ejercicio 03: Token de autorización básico ===');

const API = 'https://jsonplaceholder.typicode.com';

// ============================================================
// TAREA 1: Guardar token ficticio en localStorage
// ============================================================
// Crea un string con un token simulado y guárdalo

function hacerEj1() {
  console.log('\n--- Tarea 1: Guardar token ---');

  // 💡 Pista: localStorage solo almacena strings.
  // Primero crea un token simulado, luego guárdalo:
  //
  //   const tokenFicticio = 'eyJhbGciOiJIUzI1NiJ9.tokenSimulado.firma';
  //   localStorage.setItem('authToken', tokenFicticio);
  //   console.log('Token guardado:', localStorage.getItem('authToken'));

  /* Tu código aquí */
}

// ============================================================
// TAREA 2: Función getAuthHeaders()
// ============================================================
// Lee el token de localStorage y devuelve el header Authorization

function hacerEj2() {
  console.log('\n--- Tarea 2: getAuthHeaders ---');

  // 💡 Pista: La función lee localStorage y retorna un objeto headers:
  //
  //   function getAuthHeaders() {
  //     const token = localStorage.getItem('authToken');
  //     return {
  //       'Authorization': token
  //     };
  //   }
  //
  // Prueba:
  //   const headers = getAuthHeaders();
  //   console.log('Headers generados:', headers);

  /* Tu código aquí */

  // 1. Define la función getAuthHeaders()
  // 2. Llámala y muestra el resultado en consola
}

// ============================================================
// TAREA 3: Fetch con header Authorization
// ============================================================
// Usa getAuthHeaders() para autenticar una petición

async function hacerEj3() {
  console.log('\n--- Tarea 3: Fetch autenticado ---');

  // Primero asegurar que hay un token guardado
  if (!localStorage.getItem('authToken')) {
    localStorage.setItem('authToken', 'token-ficticio-abc123');
  }

  // 💡 Pista: Usa la función getAuthHeaders() con fetch:
  //
  //   function getAuthHeaders() {
  //     const token = localStorage.getItem('authToken');
  //     return { 'Authorization': token };
  //   }
  //
  //   async function hacerEj3() {
  //     const respuesta = await fetch(`${API}/posts/1`, {
  //       headers: getAuthHeaders()
  //     });
  //     const datos = await respuesta.json();
  //     console.log('Post autenticado:', datos.title);
  //   }

  /* Tu código aquí */

  // 1. Define getAuthHeaders() dentro de esta función o reutiliza la de arriba
  // 2. Haz fetch a /posts/1 con los headers de autenticación
  // 3. Muestra el título del post en consola
}

// Ejecutar todos
hacerEj1();
hacerEj2();
hacerEj3();
