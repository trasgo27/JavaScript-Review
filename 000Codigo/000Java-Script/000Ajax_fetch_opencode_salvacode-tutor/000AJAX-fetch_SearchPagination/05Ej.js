console.log('=== Iniciando Ejercicio 5: Loading, Empty y Error States ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

const stateContainer = document.getElementById('state-container');
const btnSuccess = document.getElementById('btn-success');
const btnEmpty = document.getElementById('btn-empty');
const btnError = document.getElementById('btn-error');
const btnReal = document.getElementById('btn-real');

// ─── TASK 1: Component builders ──────────────────────────────────────────────
function LoadingSpinner() {
    const div = document.createElement('div');
    div.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:3rem;">
            <div style="width:50px;height:50px;border:4px solid rgba(56,189,248,0.2);border-top-color:#38bdf8;border-radius:50%;animation:spin 0.8s linear infinite;"></div>
            <p style="color:#94a3b8;margin-top:1rem;font-style:italic;">Cargando datos...</p>
        </div>
        <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
    `;
    return div;
}

function EmptyState(message = 'No hay resultados') {
    const div = document.createElement('div');
    div.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:3rem;">
            <div style="font-size:3rem;margin-bottom:1rem;opacity:0.3;">📭</div>
            <p style="color:#94a3b8;font-size:1.1rem;">${message}</p>
            <p style="color:#64748b;font-size:0.85rem;margin-top:0.5rem;">Intenta con otros parámetros de búsqueda</p>
        </div>
    `;
    return div;
}

function ErrorState(message = 'Algo salió mal', onRetry = null) {
    const div = document.createElement('div');
    div.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:3rem;">
            <div style="font-size:3rem;margin-bottom:1rem;opacity:0.5;">⚠️</div>
            <p style="color:#f87171;font-size:1.1rem;margin-bottom:0.5rem;">${message}</p>
            <p style="color:#64748b;font-size:0.85rem;margin-bottom:1rem;">Verifica tu conexión e intenta de nuevo</p>
            ${onRetry ? '<button id="retry-btn" style="padding:0.6rem 1.5rem;border-radius:8px;border:none;background:#38bdf8;color:#0b0f19;font-weight:700;cursor:pointer;">Reintentar</button>' : ''}
        </div>
    `;
    if (onRetry) {
        setTimeout(() => {
            const retryBtn = div.querySelector('#retry-btn');
            if (retryBtn) retryBtn.addEventListener('click', onRetry);
        }, 0);
    }
    return div;
}

function PostCard(post) {
    const div = document.createElement('div');
    div.className = 'post-card';
    div.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
    `;
    return div;
}

// ─── TASK 2: State manager ──────────────────────────────────────────────────
function showState(state, data = null, onRetry = null) {
    stateContainer.innerHTML = '';

    switch (state) {
        case 'loading':
            stateContainer.appendChild(LoadingSpinner());
            break;
        case 'empty':
            stateContainer.appendChild(EmptyState());
            break;
        case 'error':
            stateContainer.appendChild(ErrorState(
                data || 'Error al cargar los datos',
                onRetry
            ));
            break;
        case 'success':
            if (data && data.length > 0) {
                data.forEach(item => {
                    stateContainer.appendChild(PostCard(item));
                });
            } else {
                stateContainer.appendChild(EmptyState('La respuesta está vacía'));
            }
            break;
    }
}

// ─── TASK 3, 4, 5, 6: Demo buttons ──────────────────────────────────────────
async function fetchRealPosts() {
    showState('loading');

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const posts = await response.json();

        if (posts.length === 0) {
            showState('empty');
        } else {
            showState('success', posts);
        }
    } catch (error) {
        showState('error', error.message, () => {
            hacerEj('Reintentar fetch real', async () => {
                await fetchRealPosts();
            });
        });
    }
}

hacerEj('Configurar demo de estados', () => {
    btnSuccess.addEventListener('click', () => {
        hacerEj('Demo: éxito con datos', () => {
            showState('loading');
            setTimeout(() => {
                showState('success', [
                    { title: 'Post de ejemplo 1', body: 'Este es el contenido del primer post.' },
                    { title: 'Post de ejemplo 2', body: 'Este es el contenido del segundo post.' },
                    { title: 'Post de ejemplo 3', body: 'Este es el contenido del tercer post.' }
                ]);
            }, 1000);
        });
    });

    btnEmpty.addEventListener('click', () => {
        hacerEj('Demo: estado vacío', () => {
            showState('loading');
            setTimeout(() => {
                showState('empty');
            }, 1000);
        });
    });

    btnError.addEventListener('click', () => {
        hacerEj('Demo: estado de error', () => {
            showState('loading');
            setTimeout(() => {
                showState('error', 'No se pudieron cargar los datos del servidor.', () => {
                    hacerEj('Reintentar desde demo error', () => {
                        showState('loading');
                        setTimeout(() => {
                            showState('success', [
                                { title: 'Dato recuperado', body: '¡La reintentación funcionó!' }
                            ]);
                        }, 1000);
                    });
                });
            }, 1000);
        });
    });

    btnReal.addEventListener('click', () => {
        hacerEj('Fetch real de posts', async () => {
            await fetchRealPosts();
        });
    });
});
