/**
 * Exercise 04: ORDER BY, LIMIT, and Aggregates
 * 
 * Instructions: Complete the tasks marked with TODO.
 * Run this file using: node 04Ej.js
 */

const Database = require('better-sqlite3');
const db = new Database('ex04.db');

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

// ─── TASK 1: Top 3 most expensive products ──────────────────
console.log('\n=== Task 1: Top 3 most expensive products ===');
// TODO: Retrieve the name and price of the top 3 most expensive products
// Hint: ORDER BY price DESC LIMIT 3
const expensiveProducts = db.prepare('SELECT name AS producto, price AS precio FROM products ORDER BY price DESC LIMIT 3').all(); // Change this line
console.table(expensiveProducts);


// ─── TASK 2: Total counts ──────────────────────────────────
console.log('\n=== Task 2: Total counts ===');
// TODO: Get total users count and total sum of stock across all products
// Hint: Use SELECT COUNT(*) AS userCount FROM users AND SELECT SUM(stock) AS totalStock FROM products
const userCountRes = db.prepare('SELECT COUNT(*) AS userCount FROM users').get(); // Change this line
const totalStockRes = db.prepare('SELECT SUM(stock) AS totalStock FROM products').get(); // Change this line
console.log(`Total users: ${userCountRes.userCount}`);
console.log(`Total stock available: ${totalStockRes.totalStock}`);


// ─── TASK 3: Youngest user ──────────────────────────────────
console.log('\n=== Task 3: Youngest user ===');
// TODO: Retrieve the single youngest user (name and age)
// Hint: ORDER BY age ASC LIMIT 1. Use .get() to retrieve a single row object.
const youngestUser = db.prepare('SELECT * FROM users ORDER BY age ASC LIMIT 1' ).get(); // Change this line
console.log(`Youngest user: ${youngestUser.name} (${youngestUser.age} years old)`);


// ─── TASK 4: Average price per category ─────────────────────
console.log('\n=== Task 4: Average price per category ===');
// TODO: Get category, average price (alias avg_price), and total products (alias total_items) grouped by category
// Hint: GROUP BY category
const categoryStats = db.prepare('SELECT category, AVG(price) AS avg_price, COUNT(*) AS total_items FROM products GROUP BY category').all(); // Change this line
console.table(categoryStats);


// ─── TASK 5: High value categories ──────────────────────────
console.log('\n=== Task 5: High value categories ===');
// TODO: Filter grouped categories to only show those where the average price is greater than 50
// Hint: Use GROUP BY category HAVING avg_price > 50 (or AVG(price) > 50)
const highValueCategories = db.prepare('SELECT category, AVG(price) AS avg_price FROM products GROUP BY category HAVING AVG(price) > 50').all(); // Change this line
console.table(highValueCategories);

db.close();
