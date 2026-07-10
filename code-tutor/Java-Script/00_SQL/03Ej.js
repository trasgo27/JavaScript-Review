/**
 * Exercise 03: UPDATE and DELETE Records
 * 
 * Instructions: Complete the tasks marked with TODO.
 * Run this file using: node 03Ej.js
 */

const Database = require('better-sqlite3');
const db = new Database('ex03.db');

//const Database2 = require('better-sqlite3');
const db2 = new Database('ex03_2.db');

//Reset tables
//backticks with DROP, CREATE
//Create tables
//INTEGER typo, NOT NULL for required, default 0
//INTEGER vs REAL
//Seed tables
db2.exec(`
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
('sandra', 'sandra@gmail.com',54),
('salva','salva@gmail.com',40);

  INSERT INTO products (name, price, stock, category) VALUES
('Legion',400.5,3,'Electronics'),
('El Pendulo Foncalt', 20.3,10,'Books')
  `);


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

console.log(`Database ${db.name} seeded successfully.`);
console.log(`Database ${db2.name} seeded successfully.`);

// ─── TASK 1: Update Bob's email ────────────────────────────
console.log('\n=== Task 1: Update Bob\'s email ===');
// TODO: Update the email of the user named 'Bob' to 'bob.smith@example.com'
const task1Info = db.prepare('UPDATE users SET email = ? WHERE name = ? ;').run('bob.smith@example.com','Bob');
// Hint: Use db.prepare('UPDATE ... SET email = ? WHERE name = ?').run(newEmail, name)
//task1Info = { changes: 0 }; // Change this to run the update and store result
console.log(`Bob's email updated. Changes: ${task1Info.changes}`);


// ─── TASK 2: Increase electronics prices by 10% ─────────────
console.log('\n=== Task 2: Increase electronics prices by 10% ===');
// TODO: Update all products in the 'electronics' category to increase their price by 10%
const task2Info = db.prepare("UPDATE products SET price = price * 1.1 WHERE category = 'electronics'").run();
// Hint: price = price * 1.1
//const task2Info = { changes: 0 }; // Change this to run the update and store result
console.log(`Prices increased. Affected items: ${task2Info.changes}`);


// ─── TASK 3: Restock Jeans ──────────────────────────────────
console.log('\n=== Task 3: Restock Jeans ===');
// TODO: Add 15 to the stock of 'Jeans'
// Hint: SET stock = stock + ?
const task3Info = db.prepare("UPDATE products SET stock = stock + ? WHERE name = 'Jeans'").run(15);
//const task3Info = { changes: 0 }; // Change this to run the update and store result
console.log(`Jeans restocked. Affected items: ${task3Info.changes}`);


// ─── TASK 4: Delete users under 25 ──────────────────────────
console.log('\n=== Task 4: Delete users under 25 ===');
// TODO: Delete users whose age is strictly less than 25
const task4Info = db.prepare("DELETE FROM users WHERE age < 25").run();
//const task4Info = { changes: 0 }; // Change this to run the delete and store result
console.log(`Deleted users. Count: ${task4Info.changes}`);


// ─── TASK 5: Delete out-of-stock products ───────────────────
console.log('\n=== Task 5: Delete out-of-stock products ===');
// TODO: Delete products where stock is 0
const task5Info = db.prepare("DELETE FROM products WHERE stock = ?").run(0);
//const task5Info = { changes: 0 }; // Change this to run the delete and store result
console.log(`Deleted products. Count: ${task5Info.changes}`);

db.close();
db2.close();
