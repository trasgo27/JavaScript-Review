console.log('=== Iniciando Ejercicio 1: Búsqueda con debounce ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results');
const indicator = document.getElementById('indicator');

let currentController = null;

// ─── TASK 1: Implement debounce from scratch ─────────────────────────────────
function debounce(fn, delay) {
    let timeoutId = null;
    return function (...args) {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
            timeoutId = null;
        }, delay);
    };
}

// ─── TASK 4 & 6: Fetch with AbortController ─────────────────────────────────
async function searchUsers(query) {
    if (!query.trim()) {
        resultsContainer.innerHTML = '';
        indicator.textContent = '';
        return;
    }

    // Cancel previous request
    if (currentController) {
        currentController.abort();
    }

    currentController = new AbortController();

    indicator.textContent = 'Buscando...';

    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users?name_like=${encodeURIComponent(query)}`,
            { signal: currentController.signal }
        );

        if (!response.ok) throw new Error('Error en la búsqueda');

        const users = await response.json();
        renderResults(users);
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Petición cancelada');
            return;
        }
        resultsContainer.innerHTML = `<p class="no-results">Error: ${error.message}</p>`;
    } finally {
        indicator.textContent = '';
        currentController = null;
    }
}

// ─── TASK 5: Render results ──────────────────────────────────────────────────
function renderResults(users) {
    if (users.length === 0) {
        resultsContainer.innerHTML = '<p class="no-results">No se encontraron resultados</p>';
        return;
    }

    resultsContainer.innerHTML = users.map(user => `
        <div class="result-item">
            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=38bdf8&color=0b0f19" alt="${user.name}">
            <div>
                <div class="name">${user.name}</div>
                <div class="email">${user.email}</div>
            </div>
        </div>
    `).join('');
}

// ─── TASK 2 & 3: Connect debounce to input ──────────────────────────────────
const debouncedSearch = debounce(searchUsers, 300);

hacerEj('Configurar búsqueda con debounce', () => {
    searchInput.addEventListener('input', (e) => {
        debouncedSearch(e.target.value);
    });
});
