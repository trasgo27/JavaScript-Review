// js/api.js — Wrapper fetchJSON con cache + retry

const Api = (() => {
    const cache = new Map();
    const CACHE_TTL = 60000; // 60 seconds

    async function fetchJSON(url, options = {}) {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.json();
    }

    async function fetchCached(url, options = {}) {
        if (cache.has(url)) {
            const entry = cache.get(url);
            if (Date.now() - entry.ts < CACHE_TTL) {
                return entry.data;
            }
            cache.delete(url);
        }
        const data = await fetchJSON(url, options);
        cache.set(url, { data, ts: Date.now() });
        return data;
    }

    async function fetchRetry(url, options = {}, maxRetries = 3) {
        let lastError;
        for (let i = 1; i <= maxRetries; i++) {
            try {
                return await fetchJSON(url, options);
            } catch (err) {
                lastError = err;
                if (i < maxRetries) {
                    await new Promise(r => setTimeout(r, Math.pow(2, i - 1) * 500));
                }
            }
        }
        throw lastError;
    }

    function clearCache() {
        cache.clear();
    }

    return { fetchJSON, fetchCached, fetchRetry, clearCache };
})();
