/**
 * Exercise 05: JOIN Two Tables
 * 
 * Instructions: Complete the tasks marked with TODO.
 * Run this file using: node 05Ej.js
 */

const Database = require('better-sqlite3');
const db = new Database('ex05.db');

// Reset database and seed data
db.exec(`
  DROP TABLE IF EXISTS orders;
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

  CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    order_date TEXT DEFAULT CURRENT_DATE,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
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

  INSERT INTO orders (user_id, product_id, quantity) VALUES
    (1, 1, 1),
    (2, 2, 2),
    (3, 5, 3),
    (4, 3, 5),
    (5, 7, 2);
`);

console.log('Database seeded successfully.');

// ─── TASK 1: Inner Join users and orders ───────────────────
console.log('\n=== Task 1: Inner Join (User Orders) ===');
// TODO: Find which users placed orders. Return order_id, user_name (u.name), quantity

// Hint: INNER JOIN orders ON orders.user_id = users.id
const userOrders = db.prepare(
  'SELECT orders.id AS id_Pedido, users.name AS nombre_Usuario, quantity AS Cantidad FROM orders INNER JOIN users ON orders.user_id = users.id;'
).all();
console.table(userOrders);


// ─── TASK 2: Left Join users and orders ───────────────────
console.log('\n=== Task 2: Left Join (All Users) ===');
// TODO: Retrieve all users (name, email) and their orders quantity. 
//       Ensure users without orders are still returned (with null/empty values).
// Hint: FROM users LEFT JOIN orders ON users.id = orders.user_id
const allUsersOrders = db.prepare('SELECT users.name AS usuario, users.email AS email, orders.quantity AS cantidad FROM users LEFT JOIN orders ON users.id = orders.user_id;').all();
console.log(allUsersOrders);
// ─── TASK 3: Joining 3 tables ──────────────────────────────
console.log('\n=== Task 3: 3-Table Join (Detailed Orders) ===');
// TODO: Connect orders, users, and products. Return order_id, user_name, product_name, quantity, and total_price (quantity * price)
// Hint: JOIN users ON ... JOIN products ON ...
const detailedOrders = db.prepare(
  'SELECT orders.id AS id_Pedido, users.name AS nombre_Us, products.name AS nombre_Prod, quantity, quantity * price AS precio_Total FROM orders INNER JOIN products ON products.id = orders.product_id INNER JOIN users ON users.id = orders.user_id;'
).all();
console.table(detailedOrders);


// ─── TASK 4: High-purchasing users ─────────────────────────
console.log('\n=== Task 4: Users who spent > $100 ===');
// TODO: Find user names and their total spending, only for users whose total spending is > 100
// Hint: GROUP BY users.id HAVING total_spent > 100
const bigSpenders = db.prepare('SELECT users.name AS usuario, SUM(products.price * orders.quantity) AS gasto_total FROM orders INNER JOIN users ON orders.user_id = users.id INNER JOIN products ON products.id = orders.product_id GROUP BY users.id HAVING gasto_total > 100;').all();
console.table(bigSpenders);

db.close();
