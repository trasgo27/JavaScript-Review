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
const tokenFicticio = 'eyJhbGciOiJIUzI1NiJ9.tokenSimulado.firma';
localStorage.setItem('tokenAutenticacion',tokenFicticio);
const tokenGuarda = localStorage.getItem('tokenAutenticacion');
console.log('Token guardado: ',tokenGuarda );

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
  const miToken = localStorage.getItem('tokenAutenticacion');
  console.log(miToken);

  function getAuthHeaders(string){
    const miToken = localStorage.getItem(string);
    return {Authorization:miToken}; //devuelve un objeto
  }
const miToken02 =  getAuthHeaders('tokenAutenticacion');
console.log('mi objeto token: ', miToken02);
/*
  async function otraFuncion(tokenLlave) {
    const miToken = localStorage.getItem(tokenLlave);
    const miPost = {
      userId:10,
      title:'Salva Post',
      body:'Este es el post de Salva' 
    }
    const bodyS = JSON.stringify(miPost);
    const respuesta = await fetch(`${API}/posts`, {
      method:'POST',
      headers:{
        textContent:'application/json;UTF-8',
        authentication:miToken
      },
      body:bodyS
    });
    return respuesta;
  }
    */
  // 2. Llámala y muestra el resultado en consola
  
  const miAutorizacion = getAuthHeaders('tokenAutenticacion');
  console.table(miAutorizacion);
}

// ============================================================
// TAREA 3: Fetch con header Authorization
// ============================================================
// Usa getAuthHeaders() para autenticar una petición

async function hacerEj3() {
  console.log('\n--- Tarea 3: Fetch autenticado ---');

  // Primero asegurar que hay un token guardado
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
  //asegurar token guardado

    let miToken = localStorage.getItem('tokenAutenticacion'); //comprobar si ya existe
    if (!miToken) {
      localStorage.setItem('tokenAutenticacion', 'token-ficticio-abc123');
      miToken = localStorage.getItem('tokenAutenticacion');
    }

  
  
  console.log(miToken);
//incorporar getAutHeader function
  function getAuthHeaders(string){
    const miToken = localStorage.getItem(string);
    return {Authorization:miToken}; //devuelve un objeto
  }

  async function fechear(texto,post) {
    const aut = getAuthHeaders(texto);
    const miPost ={
          title:'El titulo Salvador',
          body:'este es el men de Salvador',
          userId:10
        };
    /*const postString = JSON.stringify(miPost); *///json stringify await innecesario
    const resp = await fetch(`${API}`+post,
      {
        method:'POST',
        headers:{
        'Content-Type':'application/json;charset=UTF-8',
        ...aut //anida headers
        },
        body: JSON.stringify(miPost)
      });
    return resp;
  }
  try {
    const miRespuesta = await fechear('tokenAutenticacion','/posts');
    if(!(miRespuesta).ok){
      throw new Error(`Error en el BackEnd o Server, ${miRespuesta.status}`);
    }
    const datos = await miRespuesta.json();
    console.log(datos);
  } catch (error) {
    console.error(error);
  }
  
  
  
  

  // 1. Define getAuthHeaders() dentro de esta función o reutiliza la de arriba
  // 2. Haz fetch a /posts/1 con los headers de autenticación
  // 3. Muestra el título del post en consola



}

// Ejecutar todos
hacerEj1();
hacerEj2();
hacerEj3();
