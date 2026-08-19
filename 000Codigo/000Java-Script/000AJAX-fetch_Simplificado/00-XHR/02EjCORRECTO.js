// 02Ej.js
// Ejercicio 02: GET con manejo de eventos

console.log('=== Ejercicio 02: GET con eventos ===');

// ─── TASK 1: onreadystatechange ─────────────────────────────
// 💡 Pista: onreadystatechange se ejecuta en CADA cambio de estado.
//   Necesitas verificar DOS condiciones:
//     - readyState === 4 (la petición terminó)
//     - status === 200 (el servidor respondió OK)
//
//   readyState values:
//     0 = UNSENT         (no se ha abierto)
//     1 = OPENED         (open() fue llamado)
//     2 = HEADERS_RECVD  (se recibieron los headers)
//     3 = LOADING        (se están recibiendo datos)
//     4 = DONE           (terminó)

hacerEj('TASK 1: Usar onreadystatechange', () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/1');

  // 💡 Pista: En vez de onload, usa onreadystatechange:
  // xhr.onreadystatechange = function() {
  //     if (xhr.readyState === 4 && xhr.status === 200) {
  //         const datos = JSON.parse(xhr.responseText);
  //         console.log(datos);
  //     }
  // };
  /* Tu código aquí */

  xhr.send();
});

// ─── TASK 2: Listar posts con for ───────────────────────────
// 💡 Pista: xhr.responseText será un ARRAY de posts (no un solo post).
//   Usa JSON.parse() y luego un bucle for para recorrer cada post.

hacerEj('TASK 2: Listar 5 posts', () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts?_limit=5');

  xhr.onload = function () {
    const posts = JSON.parse(xhr.responseText);

    console.log(`Recibidos ${posts.length} posts:`);

    // 💡 Pista: Recorre el array con for:
    // for (let i = 0; i < posts.length; i++) {
    //     console.log(posts[i].title);
    // }
    /* Tu código aquí */
  };

  xhr.send();
});

// ─── TASK 3: Mostrar en el DOM ──────────────────────────────
// 💡 Pista: Construye un string HTML con <ul> y <li>.
//   Luego ponlo en el DOM con document.getElementById('output').innerHTML = html;

hacerEj('TASK 3: Renderizar en el DOM', () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts?_limit=5');

  xhr.onload = function () {
    const posts = JSON.parse(xhr.responseText);

    // 💡 Pista: Construye HTML así:
    //   let html = '<ul>';
    //   for (const post of posts) {
    //       html += `<li>${post.title}</li>`;
    //   }
    //   html += '</ul>';
    //
    //   Luego inserta:
    //   document.getElementById('output').innerHTML = html;

    /* Tu código aquí */
  };

  xhr.send();
});

function hacerEj(taskName, taskFunction) {
  console.log(`\n--- ${taskName} ---`);
  try {
    taskFunction();
  } catch (error) {
    console.error(`Error:`, error);
  }
}
