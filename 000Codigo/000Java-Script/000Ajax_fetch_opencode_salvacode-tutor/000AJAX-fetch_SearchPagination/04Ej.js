console.log('=== Iniciando Ejercicio 4: Búsqueda + Paginación ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageInfo = document.getElementById('page-info');
const resultCount = document.getElementById('result-count');
const postsContainer = document.getElementById('posts-container');
const loading = document.getElementById('loading');

let allPosts = [];
let filteredPosts = [];
let currentPage = 1;
const postsPerPage = 5;
let totalPages = 1;

function showLoading() { loading.style.display = 'block'; postsContainer.innerHTML = ''; }
function hideLoading() { loading.style.display = 'none'; }

// ─── Fetch all posts ─────────────────────────────────────────────────────────
async function fetchAllPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) throw new Error('Error al obtener posts');
    return await response.json();
}

// ─── TASK 2: Filter by title ─────────────────────────────────────────────────
function filterPosts(query) {
    if (!query.trim()) return allPosts;
    return allPosts.filter(post =>
        post.title.toLowerCase().includes(query.toLowerCase())
    );
}

// ─── Calculate pagination ────────────────────────────────────────────────────
function calculatePagination() {
    totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));
    if (currentPage > totalPages) currentPage = totalPages;
}

// ─── Get current page posts ──────────────────────────────────────────────────
function getCurrentPagePosts() {
    const start = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(start, start + postsPerPage);
}

// ─── Render ──────────────────────────────────────────────────────────────────
function render() {
    const posts = getCurrentPagePosts();

    if (posts.length === 0) {
        postsContainer.innerHTML = '<div class="no-results">No se encontraron resultados</div>';
    } else {
        postsContainer.innerHTML = posts.map(post => `
            <div class="post-card">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            </div>
        `).join('');
    }

    resultCount.textContent = `${filteredPosts.length} posts encontrados`;
    pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage >= totalPages;
}

// ─── TASK 1, 3, 4: Search and paginate ──────────────────────────────────────
function performSearch() {
    filteredPosts = filterPosts(searchInput.value);
    currentPage = 1;
    calculatePagination();
    render();
}

function goToPage(page) {
    currentPage = page;
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── Event listeners ─────────────────────────────────────────────────────────
searchBtn.addEventListener('click', () => {
    hacerEj('Buscar posts por título', () => performSearch());
});

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        hacerEj('Buscar posts por título (Enter)', () => performSearch());
    }
});

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        hacerEj('Página anterior', () => goToPage(currentPage - 1));
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        hacerEj('Página siguiente', () => goToPage(currentPage + 1));
    }
});

// ─── Initial load ────────────────────────────────────────────────────────────
hacerEj('Cargar todos los posts', async () => {
    showLoading();
    try {
        allPosts = await fetchAllPosts();
        filteredPosts = allPosts;
        calculatePagination();
        render();
    } catch (error) {
        postsContainer.innerHTML = `<p style="color: #f87171; text-align: center;">${error.message}</p>`;
    } finally {
        hideLoading();
    }
});
