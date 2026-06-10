// Helper to get specialized CSS classes for continent badges
function getContinentBadgeClass(continent) {
    const norm = continent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // removes accents
    if (norm.includes("europa")) return "badge-europa";
    if (norm.includes("asia")) return "badge-asia";
    if (norm.includes("africa") || norm.includes("afria")) return "badge-africa";
    if (norm.includes("oceania")) return "badge-oceania";
    if (norm.includes("norte america") || norm.includes("norteamerica")) return "badge-norteamerica";
    if (norm.includes("sudamerica") || norm.includes("suramerica")) return "badge-sudamerica";
    return "badge-default";
}

// Render empty state placeholder when no items match
function renderEmptyState(donde, message) {
    donde.innerHTML = `
        <div class="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>${message}</span>
        </div>
    `;
}

// Display/Toast Notifications
let alertTimeout;
function showAlert(message, type) {
    if (!alertBox) return;
    
    alertBox.textContent = message;
    alertBox.className = `alert-box ${type}`;
    
    // Add premium icon based on status type
    const iconSvg = type === 'success' 
        ? `<svg style="width: 16px; height: 16px; min-width: 16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`
        : `<svg style="width: 16px; height: 16px; min-width: 16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
    
    alertBox.innerHTML = iconSvg + ` <span>${message}</span>`;
    
    clearTimeout(alertTimeout);
    alertTimeout = setTimeout(() => {
        alertBox.className = 'alert-box';
    }, 4000);
}

// Main rendering function
function mostrar(que, donde) {
    if (!que || que.length === 0) {
        renderEmptyState(donde, "No hay destinos registrados");
        return;
    }

    const arrayOfLi = que.map((d, i) => {
        const li = document.createElement('li');
        li.dataset.indice = i;

        // Content flex wrapper
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'li-content';

        // Index badge
        const indexBadge = document.createElement('div');
        indexBadge.className = 'li-index';
        indexBadge.textContent = i + 1;
        contentWrapper.appendChild(indexBadge);

        // Text elements
        const textWrapper = document.createElement('div');
        textWrapper.className = 'li-text';

        const destSpan = document.createElement('span');
        destSpan.className = 'li-destination';
        destSpan.textContent = d.destino;
        textWrapper.appendChild(destSpan);

        const contSpan = document.createElement('span');
        contSpan.className = 'li-continent';
        contSpan.textContent = 'Continente: ';
        
        const badge = document.createElement('span');
        badge.className = `badge ${getContinentBadgeClass(d.continente)}`;
        badge.textContent = d.continente;
        
        contSpan.appendChild(badge);
        textWrapper.appendChild(contSpan);
        contentWrapper.appendChild(textWrapper);
        li.appendChild(contentWrapper);

        // Interactive Delete button (SVG Trash icon)
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete';
        deleteBtn.title = 'Eliminar destino';
        deleteBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
        `;

        // Handle item deletion with precise indexing on main dataset
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Find in main catalog
            const catalogIdx = catalogo.findIndex(item => 
                item.destino.toLowerCase().trim() === d.destino.toLowerCase().trim() && 
                item.continente.toLowerCase().trim() === d.continente.toLowerCase().trim()
            );

            if (catalogIdx !== -1) {
                const deletedName = catalogo[catalogIdx].destino;
                catalogo.splice(catalogIdx, 1);
                showAlert(`¡"${deletedName}" ha sido eliminado!`, 'success');
                
                // Refresh views
                mostrar(catalogo, ul1);
                updateFilteredList();
            }
        });

        li.appendChild(deleteBtn);
        return li;
    });

    donde.replaceChildren(...arrayOfLi);
}

// Unified wrapper to maintain original API compatibility
function mostrar2(que, donde) {
    mostrar(que, donde);
}

// Active continent filter tracker
let activeContinent = null;

// Update filtered list (ul2)
function updateFilteredList() {
    if (!activeContinent) {
        renderEmptyState(ul2, "Selecciona un continente a la izquierda para ver destinos filtrados.");
        return;
    }
    
    const filtered = catalogo.filter(d => 
        d.continente.toLowerCase().trim() === activeContinent.toLowerCase().trim()
    );
    
    if (filtered.length === 0) {
        renderEmptyState(ul2, `No hay destinos registrados en ${activeContinent}`);
    } else {
        mostrar2(filtered, ul2);
    }
}

// Event Listener: Form Submission
bEnviar.addEventListener('click', (e) => {
    const destino = iDestino.value.trim();
    const continente = iContinente.value.trim();
    
    const valido = destino !== "" && continente !== "";
    
    if (!valido) {
        showAlert("Por favor, introduce un destino y un continente válidos.", "error");
        return;
    }
    
    const repetido = catalogo.some(d =>
        d.destino.toLowerCase() === destino.toLowerCase() &&
        d.continente.toLowerCase() === continente.toLowerCase()
    );
    
    if (repetido) {
        showAlert("Este destino ya existe en este continente.", "error");
        return;
    }
    
    // Valid and unique -> Add to catalogo
    catalogo.push({ destino, continente });
    showAlert(`¡"${destino}" añadido correctamente!`, "success");
    
    // Reset inputs
    iDestino.value = "";
    iContinente.value = "";
    
    // Re-render lists
    mostrar(catalogo, ul1);
    updateFilteredList();
});

// Event Listener: Continent Filter Buttons
dBotones.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    
    const clickedContinent = btn.value;
    
    // If clicking the already active continent, toggle it off
    if (activeContinent === clickedContinent) {
        activeContinent = null;
        btn.classList.remove('active');
        showAlert("Filtro desactivado", "success");
    } else {
        // Clear previous active states
        const activeBtn = dBotones.querySelector('button.active');
        if (activeBtn) {
            activeBtn.classList.remove('active');
        }
        
        activeContinent = clickedContinent;
        btn.classList.add('active');
        showAlert(`Mostrando destinos de: ${clickedContinent}`, "success");
    }
    
    updateFilteredList();
});

// Initial Setup
mostrar(catalogo, ul1);
updateFilteredList();
console.table(catalogo);
