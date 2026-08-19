console.log('=== Iniciando Ejercicio 3: Dog CEO API ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

const breedSelect = document.getElementById('breed-select');
const randomBtn = document.getElementById('random-btn');
const singleImage = document.getElementById('single-image');
const galleryGrid = document.getElementById('gallery-grid');
const loading = document.getElementById('loading');

let currentBreed = '';

function showLoading() { loading.style.display = 'block'; }
function hideLoading() { loading.style.display = 'none'; }

// ─── TASK 1: Fetch breed list ────────────────────────────────────────────────
async function fetchBreeds() {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    if (!response.ok) throw new Error('Error al obtener razas');
    const data = await response.json();
    return Object.keys(data.message);
}

// ─── TASK 2: Populate select with breeds ─────────────────────────────────────
function populateSelect(breeds) {
    breedSelect.innerHTML = '<option value="">-- Selecciona una raza --</option>';
    breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed;
        option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
        breedSelect.appendChild(option);
    });
}

// ─── TASK 3: Fetch random image for breed ────────────────────────────────────
async function fetchRandomImage(breed) {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    if (!response.ok) throw new Error(`Error al obtener imagen de ${breed}`);
    const data = await response.json();
    return data.message;
}

// ─── TASK 4: Show single image with "Otra imagen" button ────────────────────
async function showRandomImage(breed) {
    showLoading();
    try {
        const imageUrl = await fetchRandomImage(breed);
        singleImage.innerHTML = `<img src="${imageUrl}" alt="${breed}">`;
    } catch (error) {
        singleImage.innerHTML = `<p style="color: #f87171;">${error.message}</p>`;
    } finally {
        hideLoading();
    }
}

// ─── TASK 5: Gallery of 4 random images ─────────────────────────────────────
async function showBreedGallery(breed) {
    showLoading();
    try {
        const promises = Array.from({ length: 4 }, () => fetchRandomImage(breed));
        const images = await Promise.all(promises);

        galleryGrid.innerHTML = '';
        images.forEach(url => {
            const img = document.createElement('img');
            img.src = url;
            img.alt = breed;
            img.loading = 'lazy';
            galleryGrid.appendChild(img);
        });
    } catch (error) {
        galleryGrid.innerHTML = `<p style="color: #f87171;">${error.message}</p>`;
    } finally {
        hideLoading();
    }
}

// ─── Initialization ──────────────────────────────────────────────────────────
hacerEj('Cargar lista de razas', async () => {
    const breeds = await fetchBreeds();
    populateSelect(breeds);
    console.log(`Se cargaron ${breeds.length} razas`);
});

breedSelect.addEventListener('change', () => {
    currentBreed = breedSelect.value;
    if (currentBreed) {
        hacerEj(`Seleccionar raza: ${currentBreed}`, async () => {
            await showRandomImage(currentBreed);
            await showBreedGallery(currentBreed);
        });
    }
});

randomBtn.addEventListener('click', () => {
    if (currentBreed) {
        hacerEj('Otra imagen aleatoria', async () => {
            await showRandomImage(currentBreed);
        });
    }
});
