// js/ui.js — Renderizado DOM

const UI = (() => {
    const GENRES = ['Acción', 'Comedia', 'Drama', 'Sci-Fi', 'Thriller', 'Romance', 'Horror', 'Aventura'];
    const EMOJIS = ['🎬', '🎭', '🎪', '🎯', '🎲', '🎵', '🚀', '⚡', '🌟', '🔥', '💎', '🎸'];

    function getGenre(index) {
        return GENRES[index % GENRES.length];
    }

    function getEmoji(index) {
        return EMOJIS[index % EMOJIS.length];
    }

    function getRating(id) {
        return ((id * 7.3 + 13) % 5 + 5).toFixed(1);
    }

    function renderLoading() {
        document.getElementById('loading').style.display = 'block';
        document.getElementById('error').style.display = 'none';
        document.getElementById('empty').style.display = 'none';
        document.getElementById('movieGrid').innerHTML = '';
        document.getElementById('pagination').innerHTML = '';
    }

    function renderError(message, onRetry) {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error').style.display = 'block';
        document.getElementById('empty').style.display = 'none';
        document.getElementById('movieGrid').innerHTML = '';
        document.getElementById('pagination').innerHTML = '';

        const errorDiv = document.getElementById('error');
        errorDiv.innerHTML = `
            <p>❌ ${message}</p>
            <button onclick="(${onRetry ? onRetry.toString() : 'App.loadMovies()'})()">Reintentar</button>
        `;
    }

    function renderEmpty(query) {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error').style.display = 'none';
        document.getElementById('empty').style.display = 'block';
        document.getElementById('movieGrid').innerHTML = '';
        document.getElementById('pagination').innerHTML = '';

        document.getElementById('empty').innerHTML = `
            <div class="emoji">🔍</div>
            <p>No se encontraron resultados para "<strong>${query}</strong>"</p>
            <p style="font-size:0.85rem; margin-top:5px;">Intenta con otro término de búsqueda</p>
        `;
    }

    function renderMovies(movies, onClickMovie) {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error').style.display = 'none';
        document.getElementById('empty').style.display = 'none';

        const grid = document.getElementById('movieGrid');
        grid.innerHTML = movies.map((movie, i) => `
            <div class="movie-card" data-id="${movie.id}" onclick="App.openMovieDetail(${movie.id})">
                <div class="poster">${getEmoji(movie.id)}</div>
                <div class="info">
                    <h3>${movie.title}</h3>
                    <div class="meta">
                        <span class="rating">★ ${getRating(movie.id)}</span>
                        <span class="genre">${getGenre(movie.id)}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function renderPagination(page, totalPages, onPageChange) {
        const div = document.getElementById('pagination');
        if (totalPages <= 1) { div.innerHTML = ''; return; }

        div.innerHTML = `
            <button id="prevBtn" ${page <= 1 ? 'disabled' : ''}>← Anterior</button>
            <span class="page-info">Página ${page} de ${totalPages}</span>
            <button id="nextBtn" ${page >= totalPages ? 'disabled' : ''}>Siguiente →</button>
        `;

        document.getElementById('prevBtn').addEventListener('click', () => onPageChange(page - 1));
        document.getElementById('nextBtn').addEventListener('click', () => onPageChange(page + 1));
    }

    function renderStats(total, page, perPage, time) {
        document.getElementById('stats').innerHTML =
            `${total} películas encontradas · Página ${page} · Cargado en ${time}ms`;
    }

    function showDetail(movie, comments) {
        const modal = document.getElementById('detailModal');
        const content = document.getElementById('detailContent');

        content.innerHTML = `
            <div class="detail-header">
                <div class="detail-poster">${getEmoji(movie.id)}</div>
                <div class="detail-info">
                    <h2>${movie.title}</h2>
                    <p class="meta-row">⭐ ${getRating(movie.id)} · ${getGenre(movie.id)} · ID #${movie.id}</p>
                    <p class="meta-row">Usuario: ${movie.userId}</p>
                </div>
            </div>
            <div class="detail-body">
                <p>${movie.body}</p>
            </div>
            ${comments.length > 0 ? `
                <div class="comments-section">
                    <h3>💬 Comentarios (${comments.length})</h3>
                    ${comments.map(c => `
                        <div class="comment">
                            <div class="author">${c.email}</div>
                            <div class="body">${c.body}</div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        `;

        modal.style.display = 'flex';
    }

    function hideDetail() {
        document.getElementById('detailModal').style.display = 'none';
    }

    return {
        renderLoading, renderError, renderEmpty,
        renderMovies, renderPagination, renderStats,
        showDetail, hideDetail
    };
})();
