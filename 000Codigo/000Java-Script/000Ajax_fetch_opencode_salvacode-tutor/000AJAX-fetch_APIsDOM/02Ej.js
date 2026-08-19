console.log('=== Iniciando Ejercicio 2: API de Random User ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more');
const loading = document.getElementById('loading');

// ─── TASK 1: Fetch 6 random users ────────────────────────────────────────────
async function fetchUsers(count = 6) {
    const response = await fetch(`https://randomuser.me/api/?results=${count}`);
    if (!response.ok) throw new Error('Error al obtener usuarios');
    const data = await response.json();
    return data.results;
}

// ─── TASK 2: Create user card ────────────────────────────────────────────────
function createUserCard(user, delay) {
    const card = document.createElement('div');
    card.className = 'user-card';
    card.style.animationDelay = `${delay}ms`;

    const fullName = `${user.name.first} ${user.name.last}`;
    const location = `${user.location.city}, ${user.location.country}`;

    card.innerHTML = `
        <img src="${user.picture.medium}" alt="${fullName}">
        <h3>${fullName}</h3>
        <div class="email">${user.email}</div>
        <div class="location">${location}</div>
    `;

    return card;
}

// ─── TASK 3: Load more users ─────────────────────────────────────────────────
let loadingInProgress = false;

async function loadUsers() {
    if (loadingInProgress) return;
    loadingInProgress = true;
    loading.style.display = 'block';
    loadMoreBtn.disabled = true;

    try {
        const users = await fetchUsers(6);
        const fragment = document.createDocumentFragment();

        users.forEach((user, index) => {
            const card = createUserCard(user, index * 100);
            fragment.appendChild(card);
        });

        gallery.appendChild(fragment);
    } catch (error) {
        console.error('Error cargando usuarios:', error);
    } finally {
        loadingInProgress = false;
        loading.style.display = 'none';
        loadMoreBtn.disabled = false;
    }
}

// ─── TASK 4: Fade-in animation (CSS) + Event listeners ──────────────────────
hacerEj('Cargar usuarios iniciales', async () => {
    await loadUsers();
});

loadMoreBtn.addEventListener('click', () => {
    hacerEj('Cargar más usuarios', async () => {
        await loadUsers();
    });
});
