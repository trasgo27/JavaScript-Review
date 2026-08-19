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
const info = db.prepare('INSERT INTO users (name, email, age) VALUES (?, ?, ?)').run('Alice', 'alice@example.com', 30);
console.log('Inserted user with id:', info.lastInsertRowid);


// ─── TASK 3: Insert multiple users (transaction) ────────────
console.log('\n=== Task 3: Insert multiple users (transaction) ===');
const users = [
  { name: 'Bob',     email: 'bob@example.com',     age: 25 },
  { name: 'Charlie', email: 'charlie@example.com',  age: 35 },
  { name: 'Diana',   email: 'diana@example.com',    age: 28 },
  { name: 'Eve',     email: 'eve@example.com',      age: 22 },
  { name: 'Frank',   email: 'frank@example.com',    age: 40 },
];
const insertUNO = db.prepare(
  `INSERT INTO users(name,email,age) VALUES(?,?,?)`,
);
const insertVECTOR = db.transaction((list)=>{
  for (const u of list) insertUNO.run(u.name,u.email,u.age);
});
insertVECTOR(users);
console.log('Insertados 5 usuarios');

// ─── TASK 4: lastInsertRowid ────────────────────────────────
console.log('\n=== Task 4: Insert with lastInsertRowid ===');
const info2 = insertUNO.run('Grace', 'grace@example.com', 32);
console.log('New user ID:', info2.lastInsertRowid);


// ─── TASK 5: Handle UNIQUE violation ────────────────────────
console.log('\n=== Task 5: Handle UNIQUE violation ===');
try{ 
  insertUNO.run('Grace2', 'grace@example.com', 99);
}catch(error){
  console.log('Error Atrapado:',error.message);
}


// ─── TASK 6: Create products table ──────────────────────────
console.log('\n=== Task 6: Create products table ===');
//ojo db.exec(`CREATE TABLE()`) se ejecuta solo
db.exec(`CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,  
  name TEXT NOT NULL,
  price REAL NOT NULL,
  stock INTEGER DEFAULT 0,  
  category TEXT
)`);
 console.log('products table created');


// ─── TASK 7: Bulk insert products ───────────────────────────
console.log('\n=== Task 7: Bulk insert products (transaction) ===');
const products = [
  ['Laptop',           1200,  10, 'electronics'],
  ['Phone',             800,  25, 'electronics'],
  ['Shirt',              30, 100, 'clothing'],
  ['Jeans',              60,  50, 'clothing'],
  ['Pizza',              15, 200, 'food'],
  ['Salad',              10, 150, 'food'],
  ['JavaScript Book',    45,  30, 'books'],
  ['SQL Guide',          35,  20, 'books'],
];
const insertIndProd = db.prepare(`INSERT INTO products (name,price,stock,category) VALUES(?,?,?,?)`);
const insertBulkProd = db.transaction((lista)=>{
  //memorizar for
  //Es .run() porque ESCRIBIR y no all(),get() es lEER
  for (const p of lista) insertIndProd.run(...p);
}); 
insertBulkProd(products);
console.log('Inserted 8 products');


// ─── TASK 8: Insert with DEFAULT ────────────────────────────
console.log('\n=== Task 8: Insert with DEFAULT stock ===');
//const insert_UNO no lo puedo utilizar
const insert_UNO_PROD_DEFAULT = db.prepare(`INSERT INTO products (name,price) VALUES(?,?)`);
insert_UNO_PROD_DEFAULT.run('mouse',22.5);
const mouse = db.prepare(`SELECT * FROM products WHERE products.name = ?`)
.get(`mouse`);
//get porque es uno
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
//typo tailing comma


// ─── TASK 10: Insert orders ─────────────────────────────────
console.log('\n=== Task 10: Insert related data ===');
const orderData = [
  { user_id: 1, product_id: 1, quantity: 1 },
  { user_id: 2, product_id: 2, quantity: 2 },
  { user_id: 3, product_id: 5, quantity: 3 },
  { user_id: 4, product_id: 3, quantity: 5 },
  { user_id: 5, product_id: 7, quantity: 2 },
];
//orderData [{},{},{}]
const inOneOrder = db.prepare(`
  INSERT INTO orders (user_id, product_id, quantity) VALUES(?,?,?);
  `);
const inManyOrders = db.transaction((vector)=>{
  for(const v of vector) inOneOrder.run(v.user_id,v.product_id,v.quantity);   
});
inManyOrders(orderData);
console.log('Orders seeded');


// ─── VERIFY ─────────────────────────────────────────────────
console.log('\n=== Verify data ===');
const selectPdos = db.prepare(`SELECT * FROM orders`).all()
console.log(`Pedidos: `);
console.table(selectPdos);
console.log(`Total Pedidos`, db.prepare(`SELECT COUNT(*) AS count FROM orders`).get());
console.log(`Clientes: `);
console.table(db.prepare(`SELECT * FROM users`).all());






console.log('Users:', db.prepare('SELECT COUNT(*) AS count FROM users').get());
console.log('Products:', db.prepare('SELECT COUNT(*) AS count FROM products').get());


db.close();
console.log('\nDone. Database: 01ej.db');
