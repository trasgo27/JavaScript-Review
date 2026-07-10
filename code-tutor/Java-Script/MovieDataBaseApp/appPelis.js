const movies = [
    { id: 1, title: "Inception", genre: "Sci-Fi" },
    { id: 2, title: "The Conjuring", genre: "Horror" },
    { id: 3, title: "Pulp Fiction", genre: "Crime" },
    { id: 4, title: "It", genre: "Horror" }
];

// DOM elements
const listado = document.getElementById('listado');

/**
 * Simulates an asynchronous call to retrieve the director.
 * Rejects for Horror genre films, resolves for other genres.
 */
function fetchDirector(movie) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (movie.genre !== "Horror") {
                resolve("Christopher Nolan");
            } else {
                reject(new Error("Director CONFIDENCIAL"));
            }
        }, 800);
    });
}

/**
 * Renders the movie list using modern card templates and registers event handlers.
 */
function pintar() {
    listado.innerHTML = ""; // Clear existing elements

    movies.forEach((movie) => {
        // 1. Create main card container (li)
        const card = document.createElement('li');
        card.className = 'movie-card';
        
        // CRITICAL REQUIREMENT: Store the object reference directly on the DOM element
        card.movie = movie;

        // 2. Create card header (ID & Genre badge)
        const header = document.createElement('div');
        header.className = 'movie-header';

        const idBadge = document.createElement('span');
        idBadge.className = 'movie-id';
        idBadge.textContent = `#${String(movie.id).padStart(2, '0')}`;

        const genreBadge = document.createElement('span');
        genreBadge.className = 'movie-genre';
        genreBadge.textContent = movie.genre;

        header.appendChild(idBadge);
        header.appendChild(genreBadge);

        // 3. Create card title
        const title = document.createElement('h2');
        title.className = 'movie-title';
        title.textContent = movie.title;

        // 4. Create card footer (Director status)
        const footer = document.createElement('div');
        footer.className = 'director-container';

        const infoSpan = document.createElement('span');
        infoSpan.className = 'director';
        infoSpan.textContent = "Hover to reveal director";

        footer.appendChild(infoSpan);

        // Assemble the card
        card.appendChild(header);
        card.appendChild(title);
        card.appendChild(footer);

        // Flag to prevent multiple concurrent fetches
        let isLoading = false;
        let fetchSuccessful = false;

        // Register interactive events
        card.addEventListener('mouseenter', () => {
            if (isLoading || fetchSuccessful) return;

            isLoading = true;
            // Set loading spinner and status text
            infoSpan.innerHTML = `
                <span class="loading">
                    <span class="loading-spinner"></span>
                    Fetching...
                </span>
            `;
            infoSpan.className = 'director';

            // Fetch the director using the movie object reference directly from the closure
            fetchDirector(movie)
                .then((directorName) => {
                    if (!isLoading) return; // Mouse left before promise resolved
                    infoSpan.innerHTML = `Director: <span class="director-success">${directorName}</span>`;
                    fetchSuccessful = true;
                })
                .catch((err) => {
                    if (!isLoading) return; // Mouse left before promise resolved
                    const errorMsg = err.message || err;
                    infoSpan.innerHTML = `<span class="director-error">⚠️ ${errorMsg}</span>`;
                })
                .finally(() => {
                    isLoading = false;
                });
        });

        card.addEventListener('mouseleave', () => {
            // Reset state and text when mouse leaves
            isLoading = false;
            fetchSuccessful = false;
            infoSpan.textContent = "Hover to reveal director";
            infoSpan.className = 'director';
        });

        // Append card to list
        listado.appendChild(card);
    });
}

// Initialize on DOM ready (safeguarded against post-load script execution)
if (document.readyState === "loading") {
    document.addEventListener('DOMContentLoaded', () => {
        pintar();
    });
} else {
    pintar();
}

