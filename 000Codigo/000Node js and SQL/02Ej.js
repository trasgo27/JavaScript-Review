/**
 * Exercise 02: SELECT with WHERE Conditions
 *
 * Instructions: Complete the tasks marked with TODO.
 * Run this file using: node 02Ej.js
 */
//importar librerias Database object 
//no acceder db before initializing
const Database = require('better-sqlite3');
//crear el Objeto con el nombre y la extension
const db = new Database('02Ej.db');
//db.exec eliminar duplicados
db.exec(`
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS products;

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
    ('Francisco', 'francisco@gmail.es',      40),
    ('Franchesco','frankit@gmail.it',      40),
    ('FrankUSA',  'frank@gmail.us',      40),
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
//Mostrar Relleno
console.log('Database seeded.');
console.log('Users ...');
const usersT = db.prepare(`SELECT * FROM users`).all();
//const usersT = db.prepare(`SELECT * FROM users`).get(); //right one
console.table(usersT);
//all() returns an array of objects select count(*) is a row
const numeroUsersV = db.prepare(`SELECT COUNT(*) AS vcValor FROM users`).all();
const numeroUsers = db.prepare(`SELECT COUNT(*) AS valor FROM users`).get();
console.log('Total Users con .get(): ', numeroUsers.valor);
console.log('Total Users con .get(): ', numeroUsers);
console.log('Total Users con .all(): ', numeroUsersV);
//Mostrar Product
console.log('Products ...');
const prodT = db.prepare(`SELECT * FROM products`).all();
console.table(prodT);
const numeroProd = db.prepare(`SELECT COUNT(*) AS valor FROM products`).get();
console.log('Total Productos: ', numeroProd.valor);

// ─── TASK 1: Users older than 25 ───────────────────────────
console.log('\n=== Task 1: Users older than 25 ===');
// TODO: Select all users where age > 25
// Hint: db.prepare('SELECT * FROM users WHERE age > ?').all(25)
const olderUsers = db.prepare('SELECT * FROM users WHERE users.age > 25').all(); // replace with your query
console.log('Usuarios Mayores ...');
console.table(olderUsers);



// ─── TASK 2: Gmail users ───────────────────────────────────
console.log('\n=== Task 2: Gmail users ===');
// TODO: Select name and email of users whose email ends with '@gmail.com'
// Hint: LIKE '%@gmail.com'
//comparar TEXT like '%gmail'
const gmailUsers = db.prepare(`SELECT name,email AS usuariosGM FROM users WHERE email LIKE '%gmail%'`).all(); // replace with your query
console.table(gmailUsers);


// ─── TASK 3: Products between $20 and $100 ─────────────────
console.log('\n=== Task 3: Products between $20 and $100 ===');
// TODO: Select products with price BETWEEN 20 AND 100











const midRangeProducts = db.prepare(`SELECT name AS nombre,price AS precioMedio FROM products WHERE price BETWEEN 20 AND 100`).all(); // replace with your query
console.log(midRangeProducts);
console.table(midRangeProducts);


// ─── TASK 4: Wildcard product search ───────────────────────
console.log('\n=== Task 4: Wildcard product search ===');
// TODO: Find products whose name contains 'book' OR 'guide' (case-insensitive LIKE)
//No admite double quotes " "
const bookOrGuide = db.prepare(`SELECT name AS nombre FROM products WHERE name LIKE '%book%' OR name LIKE '%guide%'`).all(); // replace with your query
console.log('Contains book or guide');
console.log(bookOrGuide);
console.table(bookOrGuide);


// ─── TASK 5: Logical combinations ──────────────────────────
console.log('\n=== Task 5: Electronics OR price < 50 (with stock > 0) ===');
// TODO: (category = 'electronics' OR price < 50) AND stock > 0
// Remember to wrap OR conditions in parentheses!
const conditionalProducts = db.prepare(`SELECT name AS nombre, category AS categoria, price AS precio, stock FROM products WHERE (price < 50 OR  category LIKE 'electronics') AND stock > 0`).all(); // replace with your query
console.log(conditionalProducts);
console.table(conditionalProducts);
db.close();
