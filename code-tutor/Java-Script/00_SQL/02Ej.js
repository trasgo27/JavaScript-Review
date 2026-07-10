/**
 * Exercise 02: SELECT with WHERE Conditions
 * 
 * Instructions: Complete the tasks marked with TODO.
 * Run this file using: node 02Ej.js
 */

const Database = require('better-sqlite3');
const db = new Database('ex02.db');

// Reset database and seed data
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
    name TEXT,
    price REAL,
    stock INTEGER DEFAULT 0,
    category TEXT
  );

  INSERT INTO users (name, email, age) VALUES
    ('Alice', 'alice@example.com', 30),
    ('Bob', 'bob@example.com', 25),
    ('Charlie', 'charlie@gmail.com', 35),
    ('Diana', 'diana@example.com', 28),
    ('Eve', 'eve@example.com', 22),
    ('Frank', 'frank@gmail.com', 40),
    ('Grace', 'grace@example.com', 32);

  INSERT INTO products (name, price, stock, category) VALUES
    ('Laptop', 1200, 10, 'electronics'),
    ('Phone', 800, 25, 'electronics'),
    ('Shirt', 30, 100, 'clothing'),
    ('Jeans', 60, 50, 'clothing'),
    ('Pizza', 15, 200, 'food'),
    ('Salad', 10, 150, 'food'),
    ('JavaScript Book', 45, 30, 'books'),
    ('SQL Guide', 35, 20, 'books'),
    ('Mouse', 25, 0, 'electronics');
`);

console.log('Database seeded successfully.');

// ─── TASK 1: Users older than 25 ───────────────────────────
console.log('\n=== Task 1: Users older than 25 ===');
// TODO: Write a SELECT statement to retrieve all users older than 25
// Hint: Use db.prepare('SELECT ... WHERE age > ?').all(25)
const olderUsers = db.prepare('SELECT * FROM users WHERE age > ?').all(25);
console.log(olderUsers);
console.log(olderUsers);


// ─── TASK 2: Gmail users ───────────────────────────────────
console.log('\n=== Task 2: Gmail users ===');
// TODO: Retrieve the name and email of users whose email ends with '@gmail.com'
const statementMail = db.prepare("SELECT * FROM users WHERE email LIKE '%@gmail.com'");
// Hint: Use LIKE with '%@gmail.com'
const gmailUsers = statementMail.all(); // Change this line
console.log(gmailUsers);


// ─── TASK 3: Products between $20 and $100 ─────────────────
console.log('\n=== Task 3: Products between 20 and 100 ===');
// TODO: Retrieve products priced between 20 and 100
const precioMas = db.prepare('SELECT * FROM products WHERE price BETWEEN 20 AND 100');
// Hint: Use BETWEEN or comparison operators (>= and <=)
const midRangeProducts = precioMas.all(); // Change this line
console.log(midRangeProducts);


// ─── TASK 4: Wildcard product search ───────────────────────
console.log('\n=== Task 4: Wildcard product search ===');
// TODO: Find products containing 'book' or 'guide' in their names
// Hint: Use LIKE with wildcards '%book%' and '%guide%' combined with OR
const bookOrGuideProducts = db.prepare("SELECT * FROM products WHERE name LIKE '%book%' OR name LIKE '%guide%'").all(); // Change this line
console.log(bookOrGuideProducts);


// ─── TASK 5: Logical combinations ──────────────────────────
console.log('\n=== Task 5: Electronics OR price < 50 (with stock > 0) ===');
// TODO: Retrieve products that are EITHER (category = 'electronics') OR (price < 50),
//       AND have stock > 0. Make sure to use parentheses to group logic correctly!
const conditionalProducts = db.prepare("SELECT * FROM products WHERE (category = 'electronics' OR price < 50) AND stock > 0").all(); // Change this line
console.log(conditionalProducts);

db.close();
