// js/app.js — Main application logic
// 💡 Pista: Esta función conecta todo: input → API → UI

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('searchInput');

    // Cargar todos los usuarios al inicio
    loadUsers();

    // 💡 Pista: Escucha el evento 'input' en el search:
    // input.addEventListener('input', (e) => {
    //     const query = e.target.value.trim();
    //     if (query.length === 0) { loadUsers(); return; }
    //     searchFor(query);
    // });

    /* Tu código aquí: agregar event listener */


});

async function loadUsers() {
    // 💡 Pista: 1. Muestra loading
    // UI.renderLoading();
    // 💡 Pista: 2. Obtiene usuarios de la API
    // const users = await API.fetchUsers();
    // 💡 Pista: 3. Renderiza en DOM
    // UI.renderUsers(users);

    /* Tu código aquí */

    // 💡 Pista: No olvides try/catch para errores:
    // } catch (error) { UI.renderError(error.message); }

}

async function searchFor(query) {
    // 💡 Pista: Similar a loadUsers pero con búsqueda
    // UI.renderLoading();
    // const results = await API.searchUsers(query);
    // if (results.length === 0) UI.renderEmpty();
    // else UI.renderUsers(results);

    /* Tu código aquí */

}
