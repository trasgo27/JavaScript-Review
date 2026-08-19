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
  console.log('Crear un objeto post con fetch ');
  const miPost = {
    title: 'Mi título',
    body: 'Este post ha sido creado con un fetch',
    userId: 1,
  };
  console.log('Crear objeto', miPost);
  console.log('Objeto con Table');
  console.table(miPost);

const miPostString = JSON.stringify(miPost);
console.log('Crear objeto', miPostString);
console.log('Mostrar por console.table ...');
console.table(miPostString);

}


// ============================================================
// TAREA 2: POST con Content-Type y JSON.stringify
// ============================================================
// Envía el objeto al servidor con el header correcto

async function hacerEj2() {
  console.log('\n--- Tarea 2: POST con Content-Type ---');

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
  try {
  const nuevoPost = {
    title: 'Post desde fetch de Salva',
    body: 'Salva ha creado este Post. Contenido enviado con headers correctos',
    userId: 1
  };
  const nuevoPostString = JSON.stringify(nuevoPost); // este obj si se puede enviar.
    const respuesta = await fetch(`${API}/posts`,{
      method: 'POST', 
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
    },
      body: nuevoPostString
    });

    if(!respuesta.ok){ //importante ser consistente con las variables
      throw new Error('Error en el fetch');
    }
    const datos = await respuesta.json();
    await console.log('Creado ok ...', datos);
  } catch (error) {
    console.error(error);
  }
}




// ============================================================
// TAREA 3: Mostrar la respuesta con id y title
// ============================================================
// Muestra solo el id y title del post creado

async function hacerEj3() {
  console.log('\n--- Tarea 3: Respuesta del servidor ---');



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
  const salvaPost = {
    title:'post de Salvador',
    body:'Este post ha sido creado por Salvador',
    userId:10
  }
  const salvaPostString = JSON.stringify(salvaPost);
  try {
    const respuesta = await fetch(`${API}/posts`, {
      method:'POST',
      headers:{
        'Content-type':'application/json;charset=UTF-8' // No dejar espacios
      },
      body:salvaPostString,
    });
    if(!respuesta.ok) throw new Error('El server funcionó, pero hubo otro falló');
    const datos = await respuesta.json();
    console.table(respuesta);
    await console.log(`Post creado con userID:${datos.userId} y Título:${datos.title}`); //undefined
  } catch (error) {
    console.error(error);
  }



}

// Ejecutar todos
 hacerEj1();
 hacerEj2();
 hacerEj3();


