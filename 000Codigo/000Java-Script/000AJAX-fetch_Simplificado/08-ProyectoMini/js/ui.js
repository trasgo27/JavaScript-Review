// js/ui.js — DOM rendering functions
// 💡 Pista: Estas funciones modifican el DOM para mostrar usuarios

function renderUsers(users) {
    // 💡 Pista: Obtén el contenedor grid:
    // const grid = document.getElementById('grid');
    // 💡 Pista: Para cada usuario, crea un HTML como:
    // <div class="user-card">
    //   <h3>{nombre}</h3>
    //   <p>📧 {email}</p>
    //   <p>📍 {ciudad}</p>
    //   <p>🏢 {empresa}</p>
    // </div>
    // 💡 Pista: Puedes usar map() + join('') + innerHTML

    /* Tu código aquí */


}

function renderLoading() {
    // 💡 Pista: Muestra "Cargando..." en el grid
    // document.getElementById('grid').innerHTML = '<p class="status">⏳ Cargando...</p>';

    /* Tu código aquí */


}

function renderError(message) {
    // 💡 Pista: Muestra error en el grid
    // document.getElementById('grid').innerHTML = `<p class="status">❌ ${message}</p>`;

    /* Tu código aquí */


}

function renderEmpty() {
    // 💡 Pista: Muestra "No se encontraron resultados"
    // document.getElementById('grid').innerHTML = '<p class="status">🔍 No se encontraron resultados</p>';

    /* Tu código aquí */


}

window.UI = { renderUsers, renderLoading, renderError, renderEmpty };
