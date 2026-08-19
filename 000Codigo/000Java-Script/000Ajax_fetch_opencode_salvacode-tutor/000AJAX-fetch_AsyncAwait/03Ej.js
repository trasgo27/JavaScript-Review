console.log('=== Inciando Ejercicio 03 ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

// ─── TASK 1: Obtener /users y /posts en SECUENCIA ──────────────────
hacerEj('TASK 1: Fetch en SECUENCIA con dos await', async () => {
    const inicio = performance.now();

    const usersRes = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await usersRes.json();

    const postsRes = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await postsRes.json();

    const fin = performance.now();
    const tiempoSecuencial = (fin - inicio).toFixed(2);

    console.log(`Secuencial — Users: ${users.length}, Posts: ${posts.length}`);
    console.log(`Tiempo secuencial: ${tiempoSecuencial}ms`);

    window._tiempoSecuencial = tiempoSecuencial;
    window._usersCount = users.length;
    window._postsCount = posts.length;
});

// ─── TASK 2: Obtener los mismos EN PARALELO con Promise.all ──────────────────
hacerEj('TASK 2: Fetch EN PARALELO con Promise.all', async () => {
    const inicio = performance.now();

    const [usersRes, postsRes] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users'),
        fetch('https://jsonplaceholder.typicode.com/posts')
    ]);

    const [users, posts] = await Promise.all([
        usersRes.json(),
        postsRes.json()
    ]);

    const fin = performance.now();
    const tiempoParalelo = (fin - inicio).toFixed(2);

    console.log(`Paralelo — Users: ${users.length}, Posts: ${posts.length}`);
    console.log(`Tiempo paralelo: ${tiempoParalelo}ms`);

    window._tiempoParalelo = tiempoParalelo;
});

// ─── TASK 3: Comparar tiempos en consola y DOM ──────────────────
hacerEj('TASK 3: Comparar tiempos en consola y DOM', async () => {
    const comparacion = document.getElementById('comparacion');

    const inicioSec = performance.now();
    await fetch('https://jsonplaceholder.typicode.com/users');
    await fetch('https://jsonplaceholder.typicode.com/posts');
    const finSec = performance.now();
    const tiempoSec = (finSec - inicioSec).toFixed(2);

    const inicioPar = performance.now();
    await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users'),
        fetch('https://jsonplaceholder.typicode.com/posts')
    ]);
    const finPar = performance.now();
    const tiempoPar = (finPar - inicioPar).toFixed(2);

    const ganancia = ((1 - tiempoPar / tiempoSec) * 100).toFixed(1);

    const salida = `
=== COMPARACION DE TIEMPOS ===

SECUENCIAL (await uno despues de otro):
  await fetch('/users')  →  espera completa
  await fetch('/posts')  →  espera completa
  Total: ${tiempoSec}ms

PARALELO (Promise.all):
  Promise.all([fetch('/users'), fetch('/posts')])  →  ambos al mismo tiempo
  Total: ${tiempoPar}ms

GANANCIA: ${ganancia}% mas rapido en paralelo

LECCION:
  await secuencial BLOQUEA cada peticion.
  Promise.all lanza todas y espera que terminen juntas.
`.trim();

    console.log(salida);

    comparacion.textContent = salida;
    comparacion.style.background = 'rgba(74,222,128,0.08)';
    comparacion.style.borderColor = 'rgba(74,222,128,0.3)';
});

// ─── TASK 4: Leccion: await secuencial bloquea, Promise.all no ──────────────────
hacerEj('TASK 4: Leccion — await secuencial bloquea, Promise.all no', async () => {
    console.log('=== LECCION: Secuencial vs Paralelo ===');
    console.log('');
    console.log('SECUENCIAL — codigo:');
    console.log('  const a = await fetch(url1);  // espera 500ms');
    console.log('  const b = await fetch(url2);  // espera 500ms DESPUES de url1');
    console.log('  // Total: ~1000ms');
    console.log('');
    console.log('PARALELO — codigo:');
    console.log('  const [a, b] = await Promise.all([');
    console.log('    fetch(url1),  // inicia ahora');
    console.log('    fetch(url2)   // inicia ahora (en paralelo)');
    console.log('  ]);');
    console.log('  // Total: ~500ms (el mas lento de los dos)');
    console.log('');
    console('CUANDO USAR CADA UNO:');
    console.log('  Secuencial: cuando el segundo request DEPENDE del primero');
    console.log('    Ej: buscar usuario → usar su ID → buscar sus posts');
    console.log('');
    console.log('  Paralelo: cuando los requests son INDEPENDIENTES');
    console.log('    Ej: buscar users Y posts Y comentarios al mismo tiempo');
    console.log('');

    const inicioIndependientes = performance.now();
    const [users, posts, comments] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json()),
        fetch('https://jsonplaceholder.typicode.com/posts').then(r => r.json()),
        fetch('https://jsonplaceholder.typicode.com/comments').then(r => r.json())
    ]);
    const finIndependientes = performance.now();

    console.log(`3 requests independientes en paralelo: ${(finIndependientes - inicioIndependientes).toFixed(2)}ms`);
    console.log(`  Users: ${users.length}, Posts: ${posts.length}, Comments: ${comments.length}`);

    const inicioDependientes = performance.now();
    const userRes = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const user = await userRes.json();
    const postsRes = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
    const userPosts = await postsRes.json();
    const finDependientes = performance.now();

    console.log(`2 requests dependientes en secuencial: ${(finDependientes - inicioDependientes).toFixed(2)}ms`);
    console.log(`  User: ${user.name}, Posts: ${userPosts.length}`);
});