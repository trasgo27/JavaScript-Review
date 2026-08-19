console.log('=== Ejercicio 02: Content-Type y body JSON ===');

const API = 'https://jsonplaceholder.typicode.com';

// ============================================================
// TAREA 1: Crear objeto con datos del post
// ============================================================
// Crea un objeto con title, body y userId

function hacerEj1() {
  console.log('\n--- Tarea 1: Crear objeto ---');

  // 💡 Pista: Crea un objeto literal con estos campos:
  //
  //   const nuevoPost = {
  //     title: 'Mi primer POST',
  //     body: 'Este es el contenido del post creado con fetch',
  //     userId: 1
  //   };
  //   console.log('Objeto creado:', nuevoPost);

  /* Tu código aquí */
}

// ============================================================
// TAREA 2: POST con Content-Type y JSON.stringify
// ============================================================
// Envía el objeto al servidor con el header correcto

async function hacerEj2() {
  console.log('\n--- Tarea 2: POST con Content-Type ---');

  const nuevoPost = {
    title: 'Post desde fetch',
    body: 'Contenido enviado con headers correctos',
    userId: 1,
  };

  // 💡 Pista: Para enviar JSON, necesitas DOS cosas:
  //   1. Header Content-Type indicando JSON
  //   2. Body convertido con JSON.stringify()
  //
  //   const respuesta = await fetch(`${API}/posts`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-type': 'application/json; charset=UTF-8'
  //     },
  //     body: JSON.stringify(nuevoPost)
  //   });
  //   const datos = await respuesta.json();
  //   console.log('Creado:', datos);

  /* Tu código aquí */
}

// ============================================================
// TAREA 3: Mostrar la respuesta con id y title
// ============================================================
// Muestra solo el id y title del post creado

async function hacerEj3() {
  console.log('\n--- Tarea 3: Respuesta del servidor ---');

  const nuevoPost = {
    title: 'Post con respuesta',
    body: 'Mostrando solo id y title',
    userId: 2,
  };

  // 💡 Pista: Después de hacer el POST, extrae solo id y title:
  //
  //   const respuesta = await fetch(`${API}/posts`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-type': 'application/json; charset=UTF-8'
  //     },
  //     body: JSON.stringify(nuevoPost)
  //   });
  //   const datos = await respuesta.json();
  //   console.log(`Post creado — ID: ${datos.id}, Título: ${datos.title}`);

  /* Tu código aquí */
}

// Ejecutar todos
hacerEj1();
hacerEj2();
hacerEj3();
