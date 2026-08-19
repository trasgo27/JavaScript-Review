console.log('=== Ejercicio 02: Input de búsqueda + resultados ===');

const API = 'https://jsonplaceholder.typicode.com';

// ============================================================
// TAREA 1 + 2 + 3 + 4: Búsqueda en tiempo real
// ============================================================
// Escucha el input, filtra usuarios y renderiza resultados

async function hacerEj() {
  console.log('Configurando búsqueda de usuarios...');

  const inputBusqueda = document.getElementById('search');
  const resultados = document.getElementById('results');

  // 💡 Pista: Escucha el evento 'input' en el campo de búsqueda.
  // Cada vez que cambie, fetch los usuarios y filtra:
  //
  //   inputBusqueda.addEventListener('input', async function() {
  //     const texto = this.value.toLowerCase().trim();
  //
  //     // Si el campo está vacío, limpiar resultados
  //     if (texto === '') {
  //       resultados.innerHTML = '';
  //       return;
  //     }
  //
  //     // Fetch todos los usuarios
  //     const respuesta = await fetch(`${API}/users`);
  //     const usuarios = await respuesta.json();
  //
  //     // Filtrar por nombre (case-insensitive)
  //     const filtrados = usuarios.filter(u =>
  //       u.name.toLowerCase().includes(texto)
  //     );
  //
  //     // Renderizar o mostrar "No encontrado"
  //     if (filtrados.length === 0) {
  //       resultados.innerHTML = '<p>No encontrado</p>';
  //     } else {
  //       resultados.innerHTML = filtrados.map(u => `
  //         <div style="padding:8px;border-bottom:1px solid #333;">
  //           <strong>${u.name}</strong><br>
  //           <span>${u.email}</span>
  //         </div>
  //       `).join('');
  //     }
  //
  //     console.log(`Resultados para "${texto}":`, filtrados.length);
  //   });

  /* Tu código aquí */

  // 1. Añade event listener 'input' al input
  // 2. Dentro del listener: fetch /users
  // 3. Filtra con .filter() usando .includes() en el nombre
  // 4. Renderiza en #results con innerHTML o crea elementos
  // 5. Si no hay coincidencias, muestra "No encontrado"
}

// Ejecutar
hacerEj();
