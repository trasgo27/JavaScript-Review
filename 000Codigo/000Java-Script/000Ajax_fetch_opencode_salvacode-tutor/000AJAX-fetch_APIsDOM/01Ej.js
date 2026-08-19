console.log('=== Iniciando Ejercicio 1: API de Pokémon ===');

// ─── TASK 1: Fetch Pokémon data ──────────────────────────────────────────────
function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

async function fetchPokemon(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    if (!response.ok) throw new Error(`Pokémon no encontrado: ${name}`);
    return await response.json();
}

// ─── TASK 2: Extract data ────────────────────────────────────────────────────
function extractPokemonData(data) {
    const hp = data.stats.find(s => s.stat.name === 'hp');
    const attack = data.stats.find(s => s.stat.name === 'attack');
    const defense = data.stats.find(s => s.stat.name === 'defense');

    return {
        name: data.name,
        sprite: data.sprites.front_default,
        stats: {
            hp: hp ? hp.base_stat : 0,
            attack: attack ? attack.base_stat : 0,
            defense: defense ? defense.base_stat : 0
        }
    };
}

// ─── TASK 3: Create HTML card with image + name + stat bars ─────────────────
function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.className = 'pokemon-card';

    const statsConfig = [
        { label: 'HP', value: pokemon.stats.hp, max: 255 },
        { label: 'Attack', value: pokemon.stats.attack, max: 190 },
        { label: 'Defense', value: pokemon.stats.defense, max: 250 }
    ];

    const statsHTML = statsConfig.map(stat => `
        <div class="stat-row">
            <span class="stat-label">${stat.label}</span>
            <div class="stat-bar-bg">
                <div class="stat-bar-fill" style="width: ${(stat.value / stat.max) * 100}%"></div>
            </div>
            <span class="stat-value">${stat.value}</span>
        </div>
    `).join('');

    card.innerHTML = `
        <img src="${pokemon.sprite}" alt="${pokemon.name}">
        <h3>${pokemon.name}</h3>
        <div class="stats-container">${statsHTML}</div>
    `;

    return card;
}

// ─── TASK 4: Search input and button ─────────────────────────────────────────
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const display = document.getElementById('pokemon-display');
const loading = document.getElementById('loading');

function showLoading() { loading.style.display = 'block'; display.innerHTML = ''; }
function hideLoading() { loading.style.display = 'none'; }

async function searchAndDisplay(name) {
    if (!name.trim()) return;
    showLoading();
    try {
        const rawData = await fetchPokemon(name);
        const pokemon = extractPokemonData(rawData);
        display.innerHTML = '';
        display.appendChild(createPokemonCard(pokemon));
    } catch (error) {
        display.innerHTML = `<p style="color: #f87171; text-align:center;">${error.message}</p>`;
    } finally {
        hideLoading();
    }
}

// ─── TASK 5: Click to search and replace card ────────────────────────────────
hacerEj('Cargar Pokémon inicial (Pikachu)', async () => {
    await searchAndDisplay('pikachu');
});

searchBtn.addEventListener('click', () => {
    hacerEj('Buscar Pokémon por nombre', async () => {
        await searchAndDisplay(searchInput.value);
    });
});

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        hacerEj('Buscar Pokémon por nombre (Enter)', async () => {
            await searchAndDisplay(searchInput.value);
        });
    }
});
