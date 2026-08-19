console.log('=== Ejercicio 02: await encadenado: fetch → fetch ===');

// ============================================================
// TAREA 1: Obtener usuario
// ============================================================
// Fetch el usuario con id=1

async function hacerEj() {
  console.log('\n--- Tarea 1: Obtener usuario ---');

  // 💡 Pista:
  //const respuesta = await fetch('https://jsonplaceholder.typicode.com/users/1');
  //const usuario = await respuesta.json();

  /* Tu código aquí */
  const respJson01 = async ()=>{
    const resp = (await fetch('https://jsonplaceholder.typicode.com/users/1'));
    //await fetch('https://jsonplaceholder.typicode.com/userid/1');
    return await resp.json();    
  }

  respJson01()
  .then((datos)=>{
    console.log('Mostrar Usuario 1: ');
    console.table(datos);
  })
  .catch((err)=>{
    console.error('Ha habido un error',err);
  });
  
  



  // ============================================================
  // TAREA 2: Obtener posts del usuario
  // ============================================================
  // Usa usuario.id para buscar sus posts

  console.log('\n--- Tarea 2: Obtener posts del usuario ---');

  // 💡 Pista:
  //   const postsResp = await fetch('https://jsonplaceholder.typicode.com/posts?userId=' + usuario.id);
  //   const posts = await postsResp.json();

  /* Tu código aquí */
  const usuario = async ()=>{
    const inter = await fetch('https://jsonplaceholder.typicode.com/users/1');
    return await inter.json();
  } 
  usuario()
  .then((usu)=>{
    console.log('He conseguido el objeto usuario 1');
    console.table(usu);
    //He obtenido el usuario, obtengo sus posts
    const postsResp = async()=>{ //vector con posts [{},{}]
      const inter = await fetch('https://jsonplaceholder.typicode.com/posts?userId='+usu.id);
      return vectorFinal = await inter.json();
    }
    const postsUs1 = postsResp()
    .then((resp)=>{
      const respDOS = resp;//puedo igualar vectores
      console.log('Los posts son: ');
      console.table(respDOS)
      //Mostrar titulos
      console.log('Mostrar Titulos: ');
      respDOS.forEach(post => {
        console.log(post.title);
      });
    })
    .catch((err)=>{
      console.error(err);
    });
    ;

  })
  .catch((err)=>{
    console.error(err);
  });
  
  // ============================================================
  // TAREA 3: Mostrar los posts
  // ============================================================
  // Recorre los posts y muestra título de cada uno

  console.log('\n--- Tarea 3: Mostrar posts ---');
  // 💡 Pista:
  //   console.log('El usuario ' + usuario.name + ' tiene ' + posts.length + ' posts:');
  //   posts.forEach(post => console.log('  -', post.title));

  /* Tu código aquí */



}

hacerEj();
