console.log('=== Iniciando Ejercicio 5: API combinada ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

const userSelect = document.getElementById('user-select');
const postsContainer = document.getElementById('posts-container');
const loading = document.getElementById('loading');

function showLoading() { loading.style.display = 'block'; postsContainer.innerHTML = ''; }
function hideLoading() { loading.style.display = 'none'; }

// ─── TASK 1: Fetch users and populate select ─────────────────────────────────
async function fetchUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) throw new Error('Error al obtener usuarios');
    return await response.json();
}

function populateUserSelect(users) {
    userSelect.innerHTML = '<option value="">-- Selecciona un usuario --</option>';
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        userSelect.appendChild(option);
    });
}

// ─── TASK 2: Fetch posts by user ─────────────────────────────────────────────
async function fetchPosts(userId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
    if (!response.ok) throw new Error('Error al obtener posts');
    return await response.json();
}

// ─── TASK 4: Fetch comments for a post ──────────────────────────────────────
async function fetchComments(postId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    if (!response.ok) throw new Error('Error al obtener comentarios');
    return await response.json();
}

// ─── TASK 3: Create post cards ──────────────────────────────────────────────
function createPostCard(post) {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.innerHTML = `
        <div class="accordion-header">
            <h3>${post.title}</h3>
            <span class="arrow">▼</span>
        </div>
        <p>${post.body}</p>
        <div class="accordion-body" id="comments-${post.id}"></div>
    `;

    card.addEventListener('click', async () => {
        const commentsContainer = card.querySelector('.accordion-body');
        const arrow = card.querySelector('.arrow');

        if (commentsContainer.classList.contains('open')) {
            commentsContainer.classList.remove('open');
            arrow.classList.remove('open');
            return;
        }

        arrow.classList.add('open');
        commentsContainer.classList.add('open');

        if (commentsContainer.children.length === 0) {
            commentsContainer.innerHTML = '<p style="color: var(--text-muted);">Cargando comentarios...</p>';
            try {
                const comments = await fetchComments(post.id);
                commentsContainer.innerHTML = '';
                comments.forEach(comment => {
                    const commentEl = document.createElement('div');
                    commentEl.className = 'comment-item';
                    commentEl.innerHTML = `
                        <div class="author">${comment.name}</div>
                        <div class="body">${comment.body}</div>
                    `;
                    commentsContainer.appendChild(commentEl);
                });
            } catch (error) {
                commentsContainer.innerHTML = `<p style="color: #f87171;">${error.message}</p>`;
            }
        }
    });

    return card;
}

// ─── Task flow ───────────────────────────────────────────────────────────────
hacerEj('Cargar lista de usuarios', async () => {
    const users = await fetchUsers();
    populateUserSelect(users);
});

userSelect.addEventListener('change', () => {
    const userId = userSelect.value;
    if (!userId) return;

    hacerEj(`Cargar posts del usuario ${userId}`, async () => {
        showLoading();
        try {
            const posts = await fetchPosts(userId);
            postsContainer.innerHTML = '';
            posts.forEach(post => {
                postsContainer.appendChild(createPostCard(post));
            });
        } catch (error) {
            postsContainer.innerHTML = `<p style="color: #f87171; text-align: center;">${error.message}</p>`;
        } finally {
            hideLoading();
        }
    });
});
