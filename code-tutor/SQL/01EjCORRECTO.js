/**
 * Exercise 01: CREATE TABLE & INSERT
 *
 * Instructions: Complete the tasks marked with TODO.
 * Run this file using: node 01Ej.js
 */

const Database = require('better-sqlite3');
const db = new Database('01ej.db');

// Enable foreign key enforcement
db.pragma('foreign_keys = ON');

// ─── RESET ─────────────────────────────────────────────────
console.log('=== Reset database ===');
db.exec('DROP TABLE IF EXISTS orders');
db.exec('DROP TABLE IF EXISTS products');
db.exec('DROP TABLE IF EXISTS users');

// ─── TASK 1: Create users table ────────────────────────────
console.log('=== Task 1: Create users table ===');
db.exec(`CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  age INTEGER
)`);
console.log('users table created');

// ─── TASK 2: Insert single user ────────────────────────────
console.log('\n=== Task 2: Insert single user ===');
const info = db
  .prepare('INSERT INTO users (name, email, age) VALUES (?, ?, ?)')
  .run('Alice', 'alice@example.com', 30);
console.log('Inserted user with id:', info.lastInsertRowid);

// ─── TASK 3: Insert multiple users (transaction) ────────────
console.log('\n=== Task 3: Insert multiple users (transaction) ===');
const users = [
  { name: 'Bob', email: 'bob@example.com', age: 25 },
  { name: 'Charlie', email: 'charlie@example.com', age: 35 },
  { name: 'Diana', email: 'diana@example.com', age: 28 },
  { name: 'Eve', email: 'eve@example.com', age: 22 },
  { name: 'Frank', email: 'frank@example.com', age: 40 },
];
const insertUser = db.prepare(
  'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
);
const insertManyUsers = db.transaction((list) => {
  for (const u of list) insertUser.run(u.name, u.email, u.age);
});
insertManyUsers(users);
console.log('Inserted 5 users');

// ─── TASK 4: lastInsertRowid ────────────────────────────────
console.log('\n=== Task 4: Insert with lastInsertRowid ===');
const info2 = insertUser.run('Grace', 'grace@example.com', 32);
console.log('New user ID:', info2.lastInsertRowid);

// ─── TASK 5: Handle UNIQUE violation ────────────────────────
console.log('\n=== Task 5: Handle UNIQUE violation ===');
try {
  insertUser.run('Alice Dup', 'alice@example.com', 99);
} catch (err) {
  console.log('Caught error:', err.message);
}

// ─── TASK 6: Create products table ──────────────────────────
console.log('\n=== Task 6: Create products table ===');
db.exec(`CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  price REAL,
  stock INTEGER DEFAULT 0,
  category TEXT
)`);
console.log('products table created');

// ─── TASK 7: Bulk insert products ───────────────────────────
console.log('\n=== Task 7: Bulk insert products (transaction) ===');
const products = [
  ['Laptop', 1200, 10, 'electronics'],
  ['Phone', 800, 25, 'electronics'],
  ['Shirt', 30, 100, 'clothing'],
  ['Jeans', 60, 50, 'clothing'],
  ['Pizza', 15, 200, 'food'],
  ['Salad', 10, 150, 'food'],
  ['JavaScript Book', 45, 30, 'books'],
  ['SQL Guide', 35, 20, 'books'],
];
const insertProduct = db.prepare(
  'INSERT INTO products (name, price, stock, category) VALUES (?, ?, ?, ?)',
);
const insertManyProducts = db.transaction((list) => {
  for (const p of list) insertProduct.run(...p);
});
insertManyProducts(products);
console.log('Inserted 8 products');

// ─── TASK 8: Insert with DEFAULT ────────────────────────────
console.log('\n=== Task 8: Insert with DEFAULT stock ===');
db.prepare('INSERT INTO products (name, price) VALUES (?, ?)').run('Mouse', 25);
const mouse = db
  .prepare('SELECT stock FROM products WHERE name = ?')
  .get('Mouse');
console.log('Mouse stock (should be 0):', mouse.stock);

// ─── TASK 9: Create orders table ────────────────────────────
console.log('\n=== Task 9: Create orders table with foreign keys ===');
db.exec(`CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  order_date TEXT DEFAULT CURRENT_DATE,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
)`);
console.log('orders table created');

// ─── TASK 10: Insert orders ─────────────────────────────────
console.log('\n=== Task 10: Insert related data ===');
const orderData = [
  { user_id: 1, product_id: 1, quantity: 1 },
  { user_id: 2, product_id: 2, quantity: 2 },
  { user_id: 3, product_id: 5, quantity: 3 },
  { user_id: 4, product_id: 3, quantity: 5 },
  { user_id: 5, product_id: 7, quantity: 2 },
];
const insertOrder = db.prepare(
  'INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)',
);
const insertManyOrders = db.transaction((list) => {
  for (const o of list) insertOrder.run(o.user_id, o.product_id, o.quantity);
});
try {
  insertManyOrders(orderData);
  console.log('Inserted 5 orders');
} catch (err) {
  console.log('Foreign key violation:', err.message);
}

// ─── VERIFY ─────────────────────────────────────────────────
console.log('\n=== Verify data ===');
console.log('Users:', db.prepare('SELECT COUNT(*) AS count FROM users').get());
console.log(
  'Products:',
  db.prepare('SELECT COUNT(*) AS count FROM products').get(),
);
console.log(
  'Orders:',
  db.prepare('SELECT COUNT(*) AS count FROM orders').get(),
);

db.close();
console.log('\nDone. Database: 01ej.db');
