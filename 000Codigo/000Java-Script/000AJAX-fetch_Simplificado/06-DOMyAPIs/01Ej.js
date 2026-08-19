console.log('=== Ejercicio 01: Fetch + renderizar en DOM ===');

const API = 'https://jsonplaceholder.typicode.com';

// ============================================================
// TAREA 1: Fetch de 5 usuarios
// ============================================================
// Obtiene los primeros 5 usuarios de la API

async function hacerEj1() {
  console.log('\n--- Tarea 1: Fetch de usuarios ---');

  // 💡 Pista: Usa el parámetro _limit para limitar resultados:
  //
  //   const respuesta = await fetch(`${API}/users?_limit=5`);
  //   const usuarios = await respuesta.json();
  //   console.log('Usuarios obtenidos:', usuarios);

  /* Tu código aquí */
  const API2 = 'https://jsonplaceholder.typicode.com/';
  try {   
  const  respuesta =
    await fetch(`${API2}/users?_limit=5`);
    if(!respuesta.ok){
      throw new Error('Error Server ...');
    };
  const datos =  
    await respuesta.json(); //De texto a json
  } catch (error) {
   console.error(error); 
  }




}

// ============================================================
// TAREA 2 + 3 + 4: Crear HTML, insertar y contar
// ============================================================
// Obtén usuarios, crea HTML por cada uno, insértalos en #output

async function hacerEj2() {
  console.log('\n--- Tarea 2+3+4: Renderizar en DOM ---');

  const miOutput = document.getElementById('output');
  miOutput.innerHTML = '<p>Cargando usuarios...</p>';

  // 💡 Pista completa — sigue estos pasos:
  //
  //   1. Fetch los usuarios:
  //      const respuesta = await fetch(`${API}/users?_limit=5`);
  //      const usuarios = await respuesta.json();
  //
  //   2. Para cada usuario, crea un div con nombre y email.
  //      Puedes usar map() para generar strings HTML:
  //      const html = usuarios.map(u => `
  //        <div style="padding:8px;border-bottom:1px solid #333;">
  //          <strong>${u.name}</strong><br>
  //          <span>${u.email}</span>
  //        </div>
  //      `).join('');
  //
  //   3. Inserta el HTML en el contenedor:
  //      output.innerHTML = html;
  //
  //   4. Muestra el contador:
  //      console.log(`Cargados ${usuarios.length} usuarios`);

  /* Tu código aquí */
  // 1. Fetch /users?_limit=5
  const API2 = 'https://jsonplaceholder.typicode.com/';
  try {   
  const  respuesta =
    await fetch(`${API2}/users?_limit=5`);
    if(!respuesta.ok){
      throw new Error('Error en el Server ...');
    };
  const datos =  
    await respuesta.json(); //De texto a json
    console.log(datos); //[{},{}]
    datos.map(()=>{

    });
    
  } catch (error) {
   console.error(error); 
  }

  // 2. Crea un HTML string con map() usando template literals

  // 3. Inserta en output.innerHTML
  // 4. console.log con el contador



}

// Ejecutar todos
hacerEj1();
hacerEj2();
