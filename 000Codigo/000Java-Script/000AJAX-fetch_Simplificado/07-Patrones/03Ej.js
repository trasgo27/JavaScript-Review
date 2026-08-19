console.log('=== Ejercicio 03: Cache simple con Map ===');

// ============================================================
// TAREA 1: Crear el Map de caché
// ============================================================
// Crea un Map para almacenar resultados de fetch

function hacerEj1() {
  console.log('\n--- Tarea 1: Crear Map de caché ---');

  // 💡 Pista: El patrón es:
  // const cache = new Map();
  // console.log('Cache creado:', cache);
  // console.log('Tamaño:', cache.size);

  /* Tu código aquí */


}

// ============================================================
// TAREA 2: Crear función fetchConCache
// ============================================================
// Crea una función que verifique el cache antes de hacer fetch

async function fetchConCache(url) {
  console.log(`\nBuscando: ${url}`);

  // 💡 Pista: El patrón completo es:
  // 1. Verificar si la URL está en el cache:
  //    if (cache.has(url)) {
  //      console.log('📦 Desde cache!');
  //      return cache.get(url);
  //    }
  //
  // 2. Si no está, hacer fetch:
  //    console.log('🌐 Desde la red...');
  //    const res = await fetch(url);
  //    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  //    const data = await res.json();
  //
  // 3. Guardar en el cache antes de retornar:
  //    cache.set(url, data);
  //    return data;

  /* Tu código aquí */


}

// ============================================================
// TAREA 3: Crear el Map como variable global para usar entre funciones
// ============================================================
// Define el cache fuera de la función para que persista

// 💡 Pista: La línea debe ir aquí, antes de las funciones:
// const cache = new Map();

/* Tu código aquí */


// ============================================================
// TAREA 4: Probar la cache
// ============================================================
// Llama dos veces con la misma URL

async function hacerEj4() {
  console.log('\n--- Tarea 4: Probar cache ---');

  // 💡 Pista: Llama dos veces a fetchConCache con la misma URL:
  // console.log('--- Primera llamada (debe ir a la red) ---');
  // const data1 = await fetchConCache('https://jsonplaceholder.typicode.com/posts/1');
  // console.log('Título:', data1.title);
  //
  // console.log('\n--- Segunda llamada (debe venir del cache) ---');
  // const data2 = await fetchConCache('https://jsonplaceholder.typicode.com/posts/1');
  // console.log('Título:', data2.title);
  //
  // console.log('\n--- Misma referencia? ---');
  // console.log(data1 === data2); // Debe ser true

  /* Tu código aquí */


}

// Ejecutar todos
hacerEj1();
hacerEj4();
