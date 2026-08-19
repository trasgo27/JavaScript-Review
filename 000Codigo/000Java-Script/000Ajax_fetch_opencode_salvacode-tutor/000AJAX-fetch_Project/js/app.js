// js/app.js — Orquestador principal

const App = (() => {
    const PER_PAGE = 12;
    const API_BASE = 'https://jsonplaceholder.typicode.com';

    let currentPage = 1;
    let currentQuery = '';
    let allPosts = [];
    let isLoading = false;
    let abortController = null;

    // ─── Init ────────────────────────────────────────────────
    function init() {
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        const closeModal = document.getElementById('closeModal');

        // Búsqueda con debounce
        const debouncedSearch = debounce((query) => {
            currentQuery = query;
            currentPage = 1;
            loadMovies();
        }, 400);

        searchInput.addEventListener('input', (e) => {
            debouncedSearch(e.target.value.trim());
        });

        searchBtn.addEventListener('click', () => {
            currentQuery = searchInput.value.trim();
            currentPage = 1;
            loadMovies();
        });

        // Enter para buscar
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                currentQuery = searchInput.value.trim();
                currentPage = 1;
                loadMovies();
            }
        });

        // Cerrar modal
        closeModal.addEventListener('click', () => UI.hideDetail());
        document.getElementById('detailModal').addEventListener('click', (e) => {
            if (e.target.id === 'detailModal') UI.hideDetail();
        });

        // Escape para cerrar modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') UI.hideDetail();
        });

        // Cargar películas iniciales
        loadMovies();
    }

    // ─── Load Movies ────────────────────────────────────────
    async function loadMovies() {
        if (isLoading) return;
        isLoading = true;

        // Cancelar petición anterior
        if (abortController) abortController.abort();
        abortController = new AbortController();

        UI.renderLoading();
        const startTime = Date.now();

        try {
            if (allPosts.length === 0) {
                allPosts = await Api.fetchCached(`${API_BASE}/posts`);
            }

            // Filtrar por búsqueda
            let filtered = allPosts;
            if (currentQuery) {
                filtered = allPosts.filter(p =>
                    p.title.toLowerCase().includes(currentQuery.toLowerCase())
                );
            }

            const total = filtered.length;
            const totalPages = Math.ceil(total / PER_PAGE);

            // Ajustar página si es necesario
            if (currentPage > totalPages) currentPage = totalPages;
            if (currentPage < 1) currentPage = 1;

            // Paginar
            const start = (currentPage - 1) * PER_PAGE;
            const pageMovies = filtered.slice(start, start + PER_PAGE);

            if (pageMovies.length === 0) {
                UI.renderEmpty(currentQuery || 'sin resultados');
            } else {
                UI.renderMovies(pageMovies);
                UI.renderPagination(currentPage, totalPages, (page) => {
                    currentPage = page;
                    loadMovies();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            }

            const elapsed = Date.now() - startTime;
            UI.renderStats(total, currentPage, PER_PAGE, elapsed);

        } catch (error) {
            if (error.name !== 'AbortError') {
                UI.renderError(error.message);
            }
        } finally {
            isLoading = false;
        }
    }

    // ─── Open Movie Detail ──────────────────────────────────
    async function openMovieDetail(id) {
        UI.showDetail({ id, title: 'Cargando...', body: '', userId: 0 }, []);

        try {
            const [movie, comments] = await Promise.all([
                Api.fetchRetry(`${API_BASE}/posts/${id}`),
                Api.fetchRetry(`${API_BASE}/posts/${id}/comments`)
            ]);

            UI.showDetail(movie, comments.slice(0, 5));
        } catch (error) {
            UI.showDetail(
                { id, title: 'Error al cargar', body: error.message, userId: 0 },
                []
            );
        }
    }

    // ─── Public API ─────────────────────────────────────────
    return { init, loadMovies, openMovieDetail };
})();

// ─── Iniciar al cargar DOM ──────────────────────────────────
document.addEventListener('DOMContentLoaded', App.init);
