console.log('=== Inciando Ejercicio 01 ===');

function hacerEj(taskName, taskFunction) {
    console.log(`\n--- Ejecutando: ${taskName} ---`);
    try {
        taskFunction();
    } catch (error) {
        console.error(`Error en ${taskName}:`, error);
    }
}

// ─── TASK 1: Fetch con query params: /posts?userId=1 ──────────────────
hacerEj('TASK 1: Fetch con query params — /posts?userId=1', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?userId=1');
    const posts = await response.json();

    console.log('URL solicitada:', response.url);
    console.log('Total de posts del usuario 1:', posts.length);
    console.log('Primeros 2 posts:');
    posts.slice(0, 2).forEach(post => {
        console.log(`  [${post.id}] ${post.title}`);
    });
});

// ─── TASK 2: Fetch con múltiples params ──────────────────
hacerEj('TASK 2: Fetch con múltiples params — /posts?userId=1&_limit=3', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?userId=1&_limit=3');
    const posts = await response.json();

    console.log('URL solicitada:', response.url);
    console.log('Posts limitados a 3:', posts.length);
    posts.forEach(post => {
        console.log(`  [${post.id}] userId: ${post.userId} — ${post.title}`);
    });

    console.log('\n--- Más combinaciones de params ---');
    const response2 = await fetch('https://jsonplaceholder.typicode.com/comments?postId=1&_limit=3');
    const comments = await response2.json();
    console.log('URL:', response2.url);
    console.log('Comentarios del post 1 (limit 3):', comments.length);
    comments.forEach(c => {
        console.log(`  ${c.name} → ${c.email}`);
    });
});

// ─── TASK 3: Crear función buildUrl(base, params) ──────────────────
hacerEj('TASK 3: Crear función buildUrl(base, params)', async () => {
    function buildUrl(base, params) {
        const url = new URL(base);
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
        return url.toString();
    }

    const url1 = buildUrl('https://jsonplaceholder.typicode.com/posts', { userId: 1 });
    console.log('URL generada:', url1);

    const url2 = buildUrl('https://jsonplaceholder.typicode.com/posts', { userId: 1, _limit: 3 });
    console.log('URL generada:', url2);

    const url3 = buildUrl('https://jsonplaceholder.typicode.com/comments', { postId: 2, _limit: 2 });
    console.log('URL generada:', url3);

    console.log('\n--- Usando buildUrl con fetch() ---');
    const response = await fetch(buildUrl('https://jsonplaceholder.typicode.com/posts', { userId: 2, _limit: 2 }));
    const posts = await response.json();
    console.log('Posts del usuario 2 (limitados a 2):');
    posts.forEach(p => console.log(`  [${p.id}] ${p.title}`));

    console.log('\n--- Alternativa moderna: URLSearchParams ---');
    const params = new URLSearchParams({ userId: 1, _limit: 2 });
    const fullUrl = `https://jsonplaceholder.typicode.com/posts?${params}`;
    console.log('URL con URLSearchParams:', fullUrl);

    const response2 = await fetch(fullUrl);
    const posts2 = await response2.json();
    console.log('Resultado:', posts2.length, 'posts');
});
