console.log('=== Iniciando Ejercicio 4: GitHub API ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

const usernameInput = document.getElementById('username-input');
const searchBtn = document.getElementById('search-btn');
const results = document.getElementById('results');
const loading = document.getElementById('loading');

function showLoading() { loading.style.display = 'block'; results.innerHTML = ''; }
function hideLoading() { loading.style.display = 'none'; }

// ─── TASK 2: Fetch GitHub user ───────────────────────────────────────────────
async function fetchUser(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) throw new Error(`Usuario no encontrado: ${username}`);
    return await response.json();
}

// ─── TASK 4: Fetch top repos ─────────────────────────────────────────────────
async function fetchTopRepos(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&_limit=5`);
    if (!response.ok) throw new Error('Error al obtener repositorios');
    const repos = await response.json();
    return repos.slice(0, 5);
}

// ─── TASK 3: Create profile card ─────────────────────────────────────────────
function createProfileCard(user) {
    const card = document.createElement('div');
    card.className = 'user-profile';

    card.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}">
        <div class="user-info">
            <h2>${user.name || user.login}</h2>
            <div class="bio">${user.bio || 'Sin biografía disponible'}</div>
            <div class="user-stats">
                <span>Seguidores: ${user.followers}</span>
                <span>Repos: ${user.public_repos}</span>
            </div>
        </div>
    `;

    return card;
}

// ─── TASK 5: Create repo cards ───────────────────────────────────────────────
function createRepoCards(repos) {
    const container = document.createElement('div');

    if (repos.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted); text-align: center;">No hay repositorios públicos</p>';
        return container;
    }

    repos.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'repo-card';
        card.innerHTML = `
            <h3>${repo.name}</h3>
            <div class="description">${repo.description || 'Sin descripción'}</div>
            <div class="stars">⭐ ${repo.stargazers_count}</div>
        `;
        container.appendChild(card);
    });

    return container;
}

// ─── TASK 1, 3, 5: Main search flow ─────────────────────────────────────────
async function searchGitHubUser(username) {
    if (!username.trim()) return;

    showLoading();
    try {
        const [user, repos] = await Promise.all([
            fetchUser(username),
            fetchTopRepos(username)
        ]);

        results.appendChild(createProfileCard(user));
        results.appendChild(createRepoCards(repos));
    } catch (error) {
        results.innerHTML = `<p style="color: #f87171; text-align: center;">${error.message}</p>`;
    } finally {
        hideLoading();
    }
}

searchBtn.addEventListener('click', () => {
    hacerEj('Buscar usuario GitHub', async () => {
        await searchGitHubUser(usernameInput.value);
    });
});

usernameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        hacerEj('Buscar usuario GitHub (Enter)', async () => {
            await searchGitHubUser(usernameInput.value);
        });
    }
});
