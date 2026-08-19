console.log('=== Iniciando Ejercicio 3: Filtrado por categoría ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

const checkboxesContainer = document.getElementById('checkboxes');
const postsContainer = document.getElementById('posts-container');
const resultCount = document.getElementById('result-count');
const loading = document.getElementById('loading');

let allPosts = [];
let allUserIds = [];

function showLoading() { loading.style.display = 'block'; postsContainer.innerHTML = ''; }
function hideLoading() { loading.style.display = 'none'; }

// ─── TASK 1: Fetch all posts and extract unique userIds ──────────────────────
async function fetchAllPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) throw new Error('Error al obtener posts');
    const posts = await response.json();
    allUserIds = [...new Set(posts.map(p => p.userId))].sort((a, b) => a - b);
    allPosts = posts;
    return posts;
}

// ─── TASK 2: Create checkboxes ──────────────────────────────────────────────
function createCheckboxes(userIds) {
    checkboxesContainer.innerHTML = '';
    userIds.forEach(id => {
        const item = document.createElement('div');
        item.className = 'checkbox-item';
        item.innerHTML = `
            <input type="checkbox" id="user-${id}" value="${id}">
            <label for="user-${id}">Autor #${id}</label>
        `;
        checkboxesContainer.appendChild(item);
    });
}

// ─── TASK 4: Fetch filtered posts ────────────────────────────────────────────
async function fetchFilteredPosts(userIds) {
    const promises = userIds.map(id =>
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`).then(r => r.json())
    );
    const results = await Promise.all(promises);
    return results.flat();
}

// ─── TASK 3, 5, 6: Filter and render ────────────────────────────────────────
async function applyFilters() {
    const checked = document.querySelectorAll('.checkbox-item input:checked');
    const selectedIds = Array.from(checked).map(cb => parseInt(cb.value));

    showLoading();
    try {
        let filteredPosts;

        if (selectedIds.length === 0) {
            filteredPosts = allPosts;
        } else {
            filteredPosts = await fetchFilteredPosts(selectedIds);
        }

        resultCount.textContent = `${filteredPosts.length} posts encontrados`;

        postsContainer.innerHTML = filteredPosts.map(post => `
            <div class="post-card">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            </div>
        `).join('');
    } catch (error) {
        postsContainer.innerHTML = `<p style="color: #f87171; text-align: center;">${error.message}</p>`;
    } finally {
        hideLoading();
    }
}

// ─── Event delegation for checkboxes ─────────────────────────────────────────
checkboxesContainer.addEventListener('change', () => {
    hacerEj('Filtrar posts por categoría', async () => {
        await applyFilters();
    });
});

// ─── Initial load ────────────────────────────────────────────────────────────
hacerEj('Cargar posts y crear checkboxes', async () => {
    showLoading();
    try {
        await fetchAllPosts();
        createCheckboxes(allUserIds);
        resultCount.textContent = `${allPosts.length} posts encontrados`;
        postsContainer.innerHTML = allPosts.map(post => `
            <div class="post-card">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            </div>
        `).join('');
    } catch (error) {
        postsContainer.innerHTML = `<p style="color: #f87171; text-align: center;">${error.message}</p>`;
    } finally {
        hideLoading();
    }
});
