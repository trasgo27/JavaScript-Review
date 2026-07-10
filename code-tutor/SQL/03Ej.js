/**
 * Exercise 03: UPDATE and DELETE Records
 *
 * Instructions: Complete the tasks marked with TODO.
 * Run this file using: node 03Ej.js
 */

const Database = require('better-sqlite3');
const db = new Database('ex03.db');

// Seed data — do not modify
db.exec(`
  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS users;

  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, age INTEGER
  );
  CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, price REAL, stock INTEGER DEFAULT 0, category TEXT
  );

  INSERT INTO users (name, email, age) VALUES
    ('Alice',   'alice@example.com',   30),
    ('Bob',     'bob@example.com',     25),
    ('Charlie', 'charlie@example.com', 35),
    ('Diana',   'diana@example.com',   28),
    ('Eve',     'eve@example.com',     22);

  INSERT INTO products (name, price, stock, category) VALUES
    ('Laptop', 1200, 10, 'electronics'),
    ('Phone',   800, 25, 'electronics'),
    ('Mouse',    25,  0, 'electronics'),
    ('Shirt',    30, 100, 'clothing'),
    ('Jeans',    60,  50, 'clothing');
`);

console.log('Database seeded.');

// ─── TASK 1: Update Bob's email ────────────────────────────
console.log('\n=== Task 1: Update Bob\'s email ===');
// TODO: Update Bob's email to 'bob.smith@example.com'
// Hint: db.prepare('UPDATE users SET email = ? WHERE name = ?').run('bob.smith@example.com', 'Bob')
// Log: console.log("Bob's email updated. Changes:", info.changes)


// ─── TASK 2: Price increase (10%) ──────────────────────────
console.log('\n=== Task 2: Increase electronics prices by 10% ===');
// TODO: UPDATE products SET price = price * 1.1 WHERE category = 'electronics'
// Log the number of affected rows


// ─── TASK 3: Restock Jeans ──────────────────────────────────
console.log('\n=== Task 3: Restock Jeans ===');
// TODO: Add 15 to the stock of Jeans
// Hint: SET stock = stock + ? WHERE name = 'Jeans'


// ─── TASK 4: Delete users under 25 ─────────────────────────
console.log('\n=== Task 4: Delete users under 25 ===');
// TODO: DELETE FROM users WHERE age < 25
// Log: console.log('Deleted users. Count:', info.changes)


// ─── TASK 5: Delete out-of-stock products ───────────────────
console.log('\n=== Task 5: Delete out-of-stock products ===');
// TODO: DELETE FROM products WHERE stock = 0
// Log: console.log('Deleted products. Count:', info.changes)


db.close();
