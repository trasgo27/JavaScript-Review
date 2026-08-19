/**
 * Exercise 07: Mini CRUD App (Express + SQLite)
 * 
 * Instructions: Complete the route handlers below to build a working REST API.
 * Run this server using: node 07Ej.js
 * Then, visit http://localhost:3000/07Ej.html in your browser!
 */

const Database = require('better-sqlite3');
const express = require('express');
const path = require('path');

const app = express();
const db = new Database('web_todo.db');

// Enable parsing of JSON body and serve static files in current directory
app.use(express.json());
app.use(express.static(__dirname));

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT NOT NULL,
    completed INTEGER DEFAULT 0
  )
`);

// ─── TASK 2: GET all todos ─────────────────────────────────
app.get('/api/todos', (req, res) => {
  try {
    // TODO: Select all todos and return them as JSON
    // Hint: db.prepare('SELECT * FROM todos').all()
    const todos = db.prepare('SELECT * FROM todos').all(); // Change this line
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── TASK 3: POST a new todo ──────────────────────────────
app.post('/api/todos', (req, res) => {
  try {
    const { task } = req.body;
    if (!task) return res.status(400).json({ error: 'Task content required' });

    // TODO: Insert a new todo into the table
    // Hint: db.prepare('INSERT INTO todos (task) VALUES (?)').run(task)
    const info = db.prepare('INSERT INTO todos (task) VALUES(?)').run('Pasear Rocky'); // Change this line

    res.status(201).json({ id: info.lastInsertRowid, task, completed: 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── TASK 4: PUT (Toggle completed status) ────────────────
app.put('/api/todos/:id', (req, res) => {
  try {
    const { id } = req.params;

    // TODO: 1. Get the current status of the todo
    // Hint: db.prepare('SELECT completed FROM todos WHERE id = ?').get(id)
    const todo = db.prepare('SELECT completed FROM todos WHERE id = ?').get(1); // Change this line

    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    // TODO: 2. Toggle the completed value (if 0 make it 1, if 1 make it 0)
    // Hint: 1 - todo.completed is a clever trick in SQL or JS!
    const newStatus = 0; // Change this line

    // TODO: 3. Run the UPDATE query
    // Hint: db.prepare('UPDATE todos SET completed = ? WHERE id = ?').run(...)

    res.json({ message: 'Toggled status successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── TASK 5: DELETE a todo ────────────────────────────────
app.delete('/api/todos/:id', (req, res) => {
  try {
    const { id } = req.params;

    // TODO: Delete the todo with the given ID
    // Hint: Use info.changes to verify if the todo was found/deleted
    const info = db.prepare('DELETE id FROM todos WHERE id=?').run(id); // Change this line

    if (info.changes === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Open http://localhost:${PORT}/07Ej.html in your browser to test!`);
});
