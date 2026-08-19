console.log('=== Iniciando Ejercicio 2: Paginación con botones ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const prevBtnB = document.getElementById('prev-btn-b');
const nextBtnB = document.getElementById('next-btn-b');
const pageInfo = document.getElementById('page-info');
const pageInfoB = document.getElementById('page-info-b');
const postsContainer = document.getElementById('posts-container');
const loading = document.getElementById('loading');

// ─── TASK 5: Mutable state ──────────────────────────────────────────────────
let currentPage = 1;
const totalPages = 20;
const limit = 5;

function showLoading() { loading.style.display = 'block'; postsContainer.innerHTML = ''; }
function hideLoading() { loading.style.display = 'none'; }

// ─── TASK 1: Fetch posts by page ─────────────────────────────────────────────
async function fetchPosts(page) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`);
    if (!response.ok) throw new Error('Error al obtener posts');
    return await response.json();
}

// ─── TASK 2: Render posts and page info ─────────────────────────────────────
function renderPosts(posts) {
    postsContainer.innerHTML = posts.map(post => `
        <div class="post-card">
            <h3>${post.title}</h3>
            <p>${post.body}</p>
        </div>
    `).join('');
}

function updatePageInfo() {
    const text = `Página ${currentPage} de ${totalPages}`;
    pageInfo.textContent = text;
    pageInfoB.textContent = text;
}

// ─── TASK 3 & 4: Button states ──────────────────────────────────────────────
function updateButtons() {
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    prevBtnB.disabled = currentPage === 1;
    nextBtnB.disabled = currentPage === totalPages;
}

// ─── TASK 6: Load page with loading state ────────────────────────────────────
async function loadPage(page) {
    showLoading();
    try {
        const posts = await fetchPosts(page);
        renderPosts(posts);
        updatePageInfo();
        updateButtons();
    } catch (error) {
        postsContainer.innerHTML = `<p style="color: #f87171; text-align: center;">${error.message}</p>`;
    } finally {
        hideLoading();
    }
}

// ─── Event listeners ─────────────────────────────────────────────────────────
function goToPage(page) {
    currentPage = page;
    loadPage(currentPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

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

prevBtnB.addEventListener('click', () => {
    if (currentPage > 1) {
        hacerEj('Página anterior (bottom)', () => goToPage(currentPage - 1));
    }
});

nextBtnB.addEventListener('click', () => {
    if (currentPage < totalPages) {
        hacerEj('Página siguiente (bottom)', () => goToPage(currentPage + 1));
    }
});

// ─── Initial load ────────────────────────────────────────────────────────────
hacerEj('Cargar página inicial', async () => {
    updateButtons();
    await loadPage(currentPage);
});
