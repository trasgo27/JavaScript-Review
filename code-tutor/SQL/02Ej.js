/**
 * Exercise 02: SELECT with WHERE Conditions
 *
 * Instructions: Complete the tasks marked with TODO.
 * Run this file using: node 02Ej.js
 */

const Database = require('better-sqlite3');
const db = new Database('ex02.db');

// Seed data — do not modify
db.exec(`
  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS users;

  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    age INTEGER
  );
  CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, price REAL, stock INTEGER DEFAULT 0, category TEXT
  );

  INSERT INTO users (name, email, age) VALUES
    ('Alice',   'alice@example.com',    30),
    ('Bob',     'bob@example.com',      25),
    ('Charlie', 'charlie@gmail.com',    35),
    ('Diana',   'diana@example.com',    28),
    ('Eve',     'eve@example.com',      22),
    ('Frank',   'frank@gmail.com',      40),
    ('Grace',   'grace@example.com',    32);

  INSERT INTO products (name, price, stock, category) VALUES
    ('Laptop',           1200,  10, 'electronics'),
    ('Phone',             800,  25, 'electronics'),
    ('Shirt',              30, 100, 'clothing'),
    ('Jeans',              60,  50, 'clothing'),
    ('Pizza',              15, 200, 'food'),
    ('Salad',              10, 150, 'food'),
    ('JavaScript Book',    45,  30, 'books'),
    ('SQL Guide',          35,  20, 'books'),
    ('Mouse',              25,   0, 'electronics');
`);

console.log('Database seeded.');

// ─── TASK 1: Users older than 25 ───────────────────────────
console.log('\n=== Task 1: Users older than 25 ===');
// TODO: Select all users where age > 25
// Hint: db.prepare('SELECT * FROM users WHERE age > ?').all(25)
const olderUsers = null; // replace with your query
console.log(olderUsers);


// ─── TASK 2: Gmail users ───────────────────────────────────
console.log('\n=== Task 2: Gmail users ===');
// TODO: Select name and email of users whose email ends with '@gmail.com'
// Hint: LIKE '%@gmail.com'
const gmailUsers = null; // replace with your query
console.log(gmailUsers);


// ─── TASK 3: Products between $20 and $100 ─────────────────
console.log('\n=== Task 3: Products between $20 and $100 ===');
// TODO: Select products with price BETWEEN 20 AND 100
const midRangeProducts = null; // replace with your query
console.log(midRangeProducts);


// ─── TASK 4: Wildcard product search ───────────────────────
console.log('\n=== Task 4: Wildcard product search ===');
// TODO: Find products whose name contains 'book' OR 'guide' (case-insensitive LIKE)
const bookOrGuide = null; // replace with your query
console.log(bookOrGuide);


// ─── TASK 5: Logical combinations ──────────────────────────
console.log('\n=== Task 5: Electronics OR price < 50 (with stock > 0) ===');
// TODO: (category = 'electronics' OR price < 50) AND stock > 0
// Remember to wrap OR conditions in parentheses!
const conditionalProducts = null; // replace with your query
console.log(conditionalProducts);


db.close();
