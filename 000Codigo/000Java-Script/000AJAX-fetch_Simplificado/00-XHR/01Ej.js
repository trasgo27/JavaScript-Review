// 01Ej.js
// Ejercicio 01: Tu primer XMLHttpRequest

console.log('=== Ejercicio 01: Tu primer XHR ===');

// ─── TASK 1: Crear un XMLHttpRequest ────────────────────────
// 💡 Pista: El patrón básico es:
//   1. Crear:     const xhr = new XMLHttpRequest();
hacerEj('TASK 1: Crear un XMLHttpRequest', () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/1');
    xhr.onload = () => {
        if (xhr.status === 200) {
            const datos = JSON.parse(xhr.responseText);
            console.log('Respuesta recibida:', datos);
        } else {
            console.error('Error HTTP:', xhr.status, xhr.statusText);
        }
    };
    xhr.send();
});

// ─── TASK 2: Mostrar solo el título ─────────────────────────
// 💡 Pista: Después de JSON.parse, los datos son un objeto normal.
//   Accede al título con datos.title

hacerEj('TASK 2: Mostrar el título del post', () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/1');

    xhr.onload = function() {
        const datos = JSON.parse(xhr.responseText);
        // Cuales son las propiedades de xhr
        // 💡 Pista: El objeto datos tiene estas propiedades:
        //   datos.userId  → número (1)
        //   datos.id      → número (1)
        //   datos.title   → string ("sunt aut facere...")
        //   datos.body    → string (larger text)
        // Muestra SOLO el título:
        /* Tu código aquí */
        console.log(datos.title);

    };

    xhr.send();

});

// ─── TASK 3: Manejar errores de red ─────────────────────────
// 💡 Pista: xhr.onerror se ejecuta si falla la conexión de red.
//   xhr.status tiene el código HTTP (200, 404, 500, etc.)

hacerEj('TASK 3: Manejar errores', () => {

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/invalid-url-que-no-existe');

    xhr.onload = function() {
        // 💡 Pista: Verifica si el status es 200 (OK)
        if ( xhr.status === 200) {
            console.log('Éxito:', JSON.parse(xhr.responseText));
            //xhr responseText 
        } else {
            console.log('Error HTTP, status:', xhr.status);
        }
    };

    xhr.onerror = function() {
        // 💡 Pista: Esto se ejecuta si no hay conexión a internet
        //   o si la URL es completamente inválida
        console.log('Error de red: no se pudo conectar');
    };

    xhr.send();

});

// ─── Función helper hacerEj ─────────────────────────────────
function hacerEj(taskName, taskFunction) {
    console.log(`\n--- ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}
