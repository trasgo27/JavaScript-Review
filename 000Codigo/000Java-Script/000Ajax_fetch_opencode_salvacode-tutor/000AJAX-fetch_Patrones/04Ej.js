// 04Ej.js
// Ejercicio 4: Wrapper completo — Cache + Retry + Abort

console.log('=== Inciando Ejercicio 4 ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

// ─── Estado global ──────────────────────────────────────────
const cache = new Map();
let currentController = null;
const historial = [];

// ─── TASK 1: fetchAdvanced() ───────────────────────────────
async function fetchAdvanced(url, options = {}, { useCache = true, maxRetries = 3, ttlMs = 30000 } = {}) {
    const startTime = Date.now();
    let fromCache = false;
    let retries = 0;

    // 1. Verificar cache
    if (useCache && cache.has(url)) {
        const entry = cache.get(url);
        if (Date.now() - entry.timestamp < ttlMs) {
            console.log(`✅ CACHE HIT: ${url}`);
            fromCache = true;
            const result = {
                data: entry.data,
                time: Date.now() - startTime,
                fromCache: true,
                retries: 0
            };
            historial.push({ url, ...result, timestamp: new Date().toLocaleTimeString() });
            return result;
        } else {
            cache.delete(url);
        }
    }

    // 2. Cancelar petición anterior
    if (currentController) currentController.abort();
    currentController = new AbortController();

    // 3. Retry con backoff
    let lastError;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            retries = attempt;
            console.log(`Intento ${attempt}/${maxRetries}: ${url}`);

            const response = await fetch(url, {
                ...options,
                signal: currentController.signal
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();

            // Guardar en cache
            if (useCache) {
                cache.set(url, { data, timestamp: Date.now() });
            }

            const result = {
                data,
                time: Date.now() - startTime,
                fromCache: false,
                retries: attempt
            };

            historial.push({ url, ...result, timestamp: new Date().toLocaleTimeString() });
            currentController = null;
            return result;

        } catch (error) {
            lastError = error;

            if (error.name === 'AbortError') {
                currentController = null;
                throw new Error('Petición cancelada');
            }

            if (attempt < maxRetries) {
                const delay = Math.pow(2, attempt - 1) * 1000;
                console.log(`⏳ Reintentando en ${delay / 1000}s...`);
                await new Promise(r => setTimeout(r, delay));
            }
        }
    }

    currentController = null;
    throw new Error(`Falló después de ${maxRetries} intentos: ${lastError.message}`);
}

// ─── TASK 2-4: UI ──────────────────────────────────────────
hacerEj('Task 2-4: UI completa', () => {
    const fetchBtn = document.getElementById('fetchAdvancedBtn');
    const cancelBtn = document.getElementById('cancelAdvancedBtn');
    const urlInput = document.getElementById('urlInput');
    const output = document.getElementById('output');
    const historyDiv = document.getElementById('history');

    if (fetchBtn) {
        fetchBtn.addEventListener('click', async () => {
            const url = urlInput.value.trim();
            if (!url) return;

            if (output) output.innerHTML = '<p style="color:#38bdf8;">⏳ Fetching...</p>';

            try {
                const result = await fetchAdvanced(url);

                if (output) {
                    output.innerHTML = `
                        <h4>Resultado</h4>
                        <p>⏱ Tiempo: <strong>${result.time}ms</strong></p>
                        <p>💾 Cache: <strong>${result.fromCache ? 'SÍ' : 'NO'}</strong></p>
                        <p>🔄 Reintentos: <strong>${result.retries}</strong></p>
                        <pre style="max-height:200px; overflow:auto;">${JSON.stringify(result.data, null, 2).substring(0, 500)}</pre>
                    `;
                }

                // Actualizar historial
                if (historyDiv) {
                    historyDiv.innerHTML = `
                        <h4>Historial (${historial.length} peticiones)</h4>
                        <table style="width:100%; font-size:0.85em; border-collapse:collapse;">
                            <tr style="border-bottom:1px solid #ccc;">
                                <th style="text-align:left; padding:4px;">Hora</th>
                                <th style="text-align:left; padding:4px;">URL</th>
                                <th style="text-align:left; padding:4px;">Tiempo</th>
                                <th style="text-align:left; padding:4px;">Cache</th>
                                <th style="text-align:left; padding:4px;">Reintentos</th>
                            </tr>
                            ${historial.map(h => `
                                <tr style="border-bottom:1px solid #eee;">
                                    <td style="padding:4px;">${h.timestamp}</td>
                                    <td style="padding:4px;">${h.url.substring(0, 40)}...</td>
                                    <td style="padding:4px;">${h.time}ms</td>
                                    <td style="padding:4px;">${h.fromCache ? '✅' : '❌'}</td>
                                    <td style="padding:4px;">${h.retries}</td>
                                </tr>
                            `).join('')}
                        </table>
                    `;
                }
            } catch (error) {
                if (output) {
                    output.innerHTML = `<p style="color:#ff6b6b;">❌ ${error.message}</p>`;
                }
            }
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            if (currentController) {
                currentController.abort();
            }
        });
    }
});
