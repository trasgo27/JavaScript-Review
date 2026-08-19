console.log('=== Ejercicio 01: De .then() a async/await ===');

// ============================================================
// TAREA 1: Versión con .then()
// ============================================================
// Usa fetch con cadena .then() para obtener el usuario 1

function hacerEj1() {
  console.log('\n--- Tarea 1: Con .then() ---');

  // 💡 Pista: La cadena completa es:
  //   fetch('https://jsonplaceholder.typicode.com/users/1')
  //     .then(respuesta => respuesta.json())
  //     .then(datos => console.log('Usuario:', datos));

  /* Tu código aquí */
    const cadena = fetch('https://jsonplaceholder.typicode.com/users/1')
  .then((resp)=>{
    return resp.json();
  })
  .then((respJSON)=>{
    console.log('Usuario Recuperado ...');
    console.table(respJSON);
  })
  .catch((err)=>{
    console.error('Ha habido errores ...',err);
  })




}

// ============================================================
// TAREA 2: Reescribir con async/await
// ============================================================
// Escribe la misma lógica pero con async/await

async function hacerEj2() {
  console.log('\n--- Tarea 2: Con async/await ---');

  // 💡 Pista: Paso a paso:
  //   1. Crea una variable respuesta con await fetch(...)
  //   2. Crea una variable datos con await respuesta.json()
  //   3. Haz console.log con los datos

  /* Tu código aquí */

  const pedido2 = async ()=>{
    await fetch('https://jsonplaceholder.typicode.com/users/1')
  }
  const pedJson2 = async ()=>{
    await pedido2.json();
    
  }
  console.log('Usuario Recuperado ASYNC, AWAIT...');
  console.table(pedJson2);
}

// ============================================================
// TAREA 3: Comparar ambos estilos
// ============================================================
// Ejecuta ambos y compara resultados

function hacerEj3() {
  console.log('\n--- Tarea 3: Comparación ---');
  console.log('Ambos métodos producen el mismo resultado.');
  console.log('.then() usa encadenamiento de promesas.');
  console.log('async/await usa sintaxis más parecida al código síncrono.');
}

// Ejecutar todos
hacerEj1();
hacerEj2();
hacerEj3();
