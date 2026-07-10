/*
1. Carga de libros desde JSON (1p)
Carga de forma asíncrona el archivo libros.json. Muestra los títulos de los libros al
cargar la página.
*/

// DOM Elements
const listaLibros = document.getElementById('lista-libros');
const miCategoria = document.getElementById('categoria');
const temporizador = document.getElementById('temporizador');
const miBoton = document.getElementById('reiniciar');

// Global State
let libros = [];
let contador = 0;
let cronometro = null;

/**
 * Returns HTML string representing list of books filtered by genre.
 * @param {string} filtro 
 * @returns {string}
 */
function pintar(filtro) {
    let librosFiltrados = libros;
    if (filtro && filtro !== 'todos') {
        librosFiltrados = libros.filter(libro => libro.genero === filtro);
    }
    
    return librosFiltrados.map((libro) => {
        return `<li data-id="${libro.id}" data-genero="${libro.genero}">
            <span class="book-title">${libro.titulo}</span>
            <span class="book-meta">ID: ${libro.id} | Categoría: ${libro.genero} <span class="autor"></span></span>
        </li>`;
    }).join('');
}

/**
 * Starts the reading timer updating every 100ms.
 * @returns {number} Timer interval ID
 */
function cronometrar() {
    return setInterval(() => {
        contador += 1;
        temporizador.innerText = contador;
    }, 100);
}

/**
 * Attaches hover listeners to all list items to display author names dynamically using a simulated promise.
 */
function agregarEventHoover() {
    const lis = listaLibros.querySelectorAll('li');
    lis.forEach((li) => {
        li.addEventListener('mouseenter', () => {
            const libroId = li.dataset.id;
            const libro = libros.find(l => l.id == libroId);
            const spanAutor = li.querySelector('.autor');
            
            if (spanAutor.textContent) {
                return; // Early return to avoid duplicate calls
            }
            
            spanAutor.textContent = ' • Cargando...';
            obtenerAutor(libro)
                .then(autor => {
                    spanAutor.textContent = ` • Autor: ${autor}`;
                })
                .catch(error => {
                    spanAutor.textContent = ` • Autor: ${error.message || 'Desconocido'}`;
                });
        });
    });
}

/**
 * Simulates an asynchronous call to retrieve a book's author.
 * @param {Object} libro 
 * @returns {Promise<string>}
 */
function obtenerAutor(libro) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!libro || libro.autor === 'anonimo' || !libro.autor) {
                reject(new Error('Anónimo / Desconocido'));
            } else {
                resolve(libro.autor);
            }
        }, 300);
    });
}

// Initial setup on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    fetch('libros.json')
        .then((resp) => {
            if (!resp.ok) {
                throw new Error('Error al cargar el archivo de datos');
            }
            return resp.json();
        })
        .then((vector) => {
            libros.push(...vector);
            
            // Extract and populate categories dynamically
            const generosArray = [...new Set(libros.map(libro => libro.genero))];
            const optionsHtml = generosArray.map(genero => 
                `<option value="${genero}">${genero}</option>`
            ).join('');
            miCategoria.innerHTML = `<option value="todos">Todos los géneros</option>` + optionsHtml;
            
            // Retrieve category filter state from cookies safely decoded
            const cookieMatch = document.cookie
                .split('; ')
                .find((item) => item.startsWith('genero='));
            const guardado = cookieMatch ? decodeURIComponent(cookieMatch.split('=')[1]) : "";
            
            // Apply saved filter or default to 'todos'
            if (guardado && generosArray.includes(guardado)) {
                miCategoria.value = guardado;
                listaLibros.innerHTML = pintar(guardado);
            } else {
                miCategoria.value = 'todos';
                listaLibros.innerHTML = pintar('todos');
            }
            
            // Set up event interactions
            agregarEventHoover();
            
            // Start the timer
            cronometro = cronometrar();
            
            // Handle filter selection change
            miCategoria.addEventListener('change', (e) => {
                const filtro = e.target.value;
                listaLibros.innerHTML = pintar(filtro);
                agregarEventHoover();
                document.cookie = `genero=${encodeURIComponent(filtro)}; path=/; max-age=84600;`;
            });
            
            // Handle application reset
            miBoton.addEventListener('click', () => {
                // Clear the timer
                clearInterval(cronometro);
                contador = 0;
                temporizador.innerText = contador;
                
                // Erase filtering cookie
                document.cookie = 'genero=; path=/; max-age=0;';
                
                // Reset select dropdown state and view
                miCategoria.value = 'todos';
                listaLibros.innerHTML = pintar('todos');
                agregarEventHoover();
                
                // Restart timer
                cronometro = cronometrar();
            });
        })
        .catch((err) => {
            console.error('Error inicializando la aplicación:', err);
        });
});
