# SQLite + JS practice notes

## Can I practice AJAX / fetch here?

It depends on what's in this folder.

- If you have a **backend server** (Node/Express, PHP, Python, etc.) that serves data from SQL → **yes**, this is the ideal place. You do `fetch()` from the frontend to your own API endpoints that query the database.

- If it's just a **SQL file + a `.js` file** with no HTTP server → you'll need to add one (e.g., a simple Express server) so `fetch()` has something to talk to. `fetch()` requires an HTTP server to send requests to — it won't work against a plain SQL connection directly from the browser.

**TL;DR:** The folder is the right place if you add a server layer between JS and SQL. Without a server, you can only practice `fetch()` against public APIs (JSONPlaceholder, etc.), which is still useful but doesn't involve your SQL.

---

## Using fetch / AJAX with SQLite and JS

### The problem

SQLite runs on the **server** (Node.js). `fetch()` and AJAX run in the **browser**. They can't talk directly — you need an **HTTP server** in between.

### Architecture

```
Browser (fetch/AJAX)  →  HTTP Server (Express)  →  SQLite (better-sqlite3)
```

### Step 1: Install Express

```powershell
npm install express
```

### Step 2: Create a simple API server

```js
// server.js
const Database = require('better-sqlite3');
const express = require('express');

const app = express();
const db = new Database('ex01.db');

app.use(express.json()); // para leer JSON del body

// GET — obtener todos los usuarios
app.get('/api/users', (req, res) => {
  const users = db.prepare('SELECT * FROM users').all();
  res.json(users);
});

// GET — obtener un usuario por ID
app.get('/api/users/:id', (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// POST — crear un usuario
app.post('/api/users', (req, res) => {
  const { name, email, age } = req.body;
  const info = db.prepare('INSERT INTO users (name, email, age) VALUES (?, ?, ?)').run(name, email, age);
  res.status(201).json({ id: info.lastInsertRowid, name, email, age });
});

// PUT — actualizar un usuario
app.put('/api/users/:id', (req, res) => {
  const { name, email, age } = req.body;
  const info = db.prepare('UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?').run(name, email, age, req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: 'User not found' });
  res.json({ message: 'Updated' });
});

// DELETE — eliminar un usuario
app.delete('/api/users/:id', (req, res) => {
  const info = db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: 'User not found' });
  res.json({ message: 'Deleted' });
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
```

### Step 3: Start the server

```powershell
node server.js
# Server running at http://localhost:3000
```

### Step 4: Call the API from the browser with fetch

```html
<!-- index.html — abrir en el navegador -->
<!DOCTYPE html>
<html>
<body>
  <h1>Users</h1>
  <ul id="userList"></ul>

  <script>
    fetch('http://localhost:3000/api/users')
      .then(res => res.json())
      .then(users => {
        const list = document.getElementById('userList');
        users.forEach(u => {
          const li = document.createElement('li');
          li.textContent = `${u.name} (${u.email})`;
          list.appendChild(li);
        });
      });
  </script>
</body>
</html>
```

### Step 5: POST with fetch (crear un usuario)

```js
fetch('http://localhost:3000/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Nuevo', email: 'nuevo@mail.com', age: 25 })
})
  .then(res => res.json())
  .then(data => console.log('Created:', data));
```

### AJAX con XMLHttpRequest (the old way)

```js
const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/api/users');
xhr.onload = () => {
  const users = JSON.parse(xhr.responseText);
  console.log(users);
};
xhr.send();
```

### Fetch with async/await (modern way)

```js
async function loadUsers() {
  const res = await fetch('http://localhost:3000/api/users');
  const users = await res.json();
  console.table(users);
}
loadUsers();
```

### Complete example with error handling

```js
async function getUsers() {
  try {
    const res = await fetch('http://localhost:3000/api/users');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const users = await res.json();
    console.table(users);
  } catch (err) {
    console.error('Failed to fetch users:', err.message);
  }
}
```

### Frameworks that combine SQLite + fetch

| Framework | Description |
|-----------|-------------|
| **Express.js** | Minimal Node.js server — shown above |
| **Fastify** | Faster alternative to Express |
| **Next.js** | Full-stack React framework with API routes |
| **SvelteKit** | Svelte-based full-stack framework |
| **Nuxt.js** | Vue-based full-stack framework |
| **Remix** | React-based full-stack with server-side focus |

All of these let you create API endpoints that query SQLite and return JSON for `fetch()` to consume.

### Key takeaway

**SQLite + `fetch()` = you need a server in between.** The browser can't connect to SQLite directly. But once you add Express (or any framework), you have a full-stack app: database ↔ API ↔ frontend.

## Framework Recommendations

**For simple API + SQLite:** **Express.js** — minimal, most popular, excellent for learning.

**For full-stack (frontend + API + DB in one framework):**

| Framework | Best for |
|-----------|----------|
| **Next.js** (React) | Industry standard, file-based API routes, huge ecosystem |
| **SvelteKit** (Svelte) | Simpler syntax, less boilerplate, great for learning |
| **Nuxt.js** (Vue) | If you prefer Vue over React |
| **Remix** (React) | Focus on web standards, good forms handling |

**Recommendation for learning:** start with **Express** (most straightforward, just API endpoints), then try **SvelteKit** or **Next.js** once you want the frontend + backend combined in one project.
