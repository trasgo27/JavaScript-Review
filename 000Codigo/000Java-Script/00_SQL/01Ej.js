// Cargar la librería better-sqlite3 (instalada con npm)
const Database = require('better-sqlite3');
// Conectar/crear base de datos SQLite en el archivo 'ex01.db'
const db = new Database('ex01.db');

// TIP FOR BEGINNERS: By default, SQLite does NOT enforce FOREIGN KEY constraints!
// If you don't enable it, you could insert invalid user_ids or product_ids into the orders table.
// We must explicitly enable it using:
db.pragma('foreign_keys = ON');


// ─── LIMPIEZA INICIAL ───────────────────────────────────
// DROP TABLE IF EXISTS borra la tabla SOLO si existe
// Así podemos ejecutar el script varias veces sin errores
console.log('=== Reset database ===');
db.exec('DROP TABLE IF EXISTS orders');
db.exec('DROP TABLE IF EXISTS products');
db.exec('DROP TABLE IF EXISTS users');

// ─── TASK 1: CREATE TABLE ──────────────────────────────
// db.exec() ejecuta SQL directamente (sin placeholders)
// Las backticks `` permiten strings multi-línea
console.log('=== Task 1: Create users table ===');
db.exec(`
  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    age INTEGER
  )
`);
console.log('users table created');

// ─── TASK 2: INSERT SINGLE USER ────────────────────────
// db.prepare() crea una sentencia preparada con placeholders ?
// Los ? evitan SQL injection — los valores se pasan aparte
console.log('\n=== Task 2: Insert single user ===');
const insertUser = db.prepare('INSERT INTO users (name, email, age) VALUES (?, ?, ?)');
// .run() ejecuta y devuelve { changes: N, lastInsertRowid: ID }
const info = insertUser.run('Alice', 'alice@example.com', 30);
console.log('Inserted user with id:', info.lastInsertRowid);

// ─── TASK 3: INSERT MULTIPLE (TRANSACTION) ─────────────
// Un array de objetos — cada objeto es un usuario
console.log('\n=== Task 3: Insert multiple users (transaction) ===');
const users = [
  { name: 'Bob', email: 'bob@example.com', age: 25 },
  { name: 'Charlie', email: 'charlie@example.com', age: 35 },
  { name: 'Diana', email: 'diana@example.com', age: 28 },
  { name: 'Eve', email: 'eve@example.com', age: 22 },
  { name: 'Frank', email: 'frank@example.com', age: 40 },
];
// db.transaction() agrupa todo en una operación atómica:
// - Todo bien → COMMIT (se guarda todo)
// - Algo falla → ROLLBACK (se deshace todo)
// MISTAKE / TIP FOR BEGINNERS: Avoid variable shadowing.
// The callback parameter was named 'users', shadowing the outer 'users' array variable.
// This can lead to bugs and is confusing. Let's rename the parameter to 'usersList'.
const insertUsers = db.transaction((usersList) => {
  for (const u of usersList) {
    insertUser.run(u.name, u.email, u.age);
  }
});
insertUsers(users);  // Ejecutar la transacción
console.log('Inserted', users.length, 'users');

// ─── TASK 4: lastInsertRowid ───────────────────────────
// lastInsertRowid devuelve el ID autogenerado del último INSERT
console.log('\n=== Task 4: Insert with lastInsertRowid ===');
const info2 = insertUser.run('Grace', 'grace@example.com', 32);
console.log('New user ID:', info2.lastInsertRowid);

// ─── TASK 5: HANDLE UNIQUE VIOLATION ───────────────────
// email tiene UNIQUE constraint — duplicados lanzan error
// try/catch atrapa el error sin que el script se detenga
console.log('\n=== Task 5: Handle UNIQUE violation ===');
try {
  insertUser.run('Alice Clone', 'alice@example.com', 99);
} catch (err) {
  console.log('Caught error:', err.message);
}

// ─── TASK 6: CREATE PRODUCTS TABLE ─────────────────────
// stock tiene DEFAULT 0 — si no se da valor, usa 0
console.log('\n=== Task 6: Create products table ===');
db.exec(`
  CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price REAL,
    stock INTEGER DEFAULT 0,
    category TEXT
  )
`);
console.log('products table created');

// ─── TASK 7: BULK INSERT PRODUCTS ─────────────────────
// Array de arrays (cada sub-array son los valores en orden)
console.log('\n=== Task 7: Bulk insert products (transaction) ===');
const insertProduct = db.prepare('INSERT INTO products (name, price, stock, category) VALUES (?, ?, ?, ?)');
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
// spread operator ...p expande el array en argumentos individuales
// Ej: insertProduct.run('Laptop', 1200, 10, 'electronics')
// MISTAKE / TIP FOR BEGINNERS: Avoid variable shadowing.
// Rename 'products' parameter in the callback to 'productsList' to avoid shadowing the outer 'products' array.
const insertProducts = db.transaction((productsList) => {
  for (const p of productsList) {
    insertProduct.run(...p);
  }
});
insertProducts(products);
console.log('Inserted', products.length, 'products');

// ─── TASK 8: INSERT WITH DEFAULT ───────────────────────
// Se pasa stock=0 explícitamente (aunque DEFAULT ya es 0)
// .get() devuelve la PRIMERA fila que cumple la condición
console.log('\n=== Task 8: Insert with DEFAULT stock ===');
insertProduct.run('Mouse', 25, 0, 'electronics');
const mouse = db.prepare('SELECT * FROM products WHERE name = ?').get('Mouse');
console.log('Mouse stock (should be 0):', mouse.stock);

// ─── TASK 9: CREATE ORDERS TABLE ──────────────────────
// FOREIGN KEY enforcement: user_id debe existir en users(id)
console.log('\n=== Task 9: Create orders table with foreign keys ===');
db.exec(`
  CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    order_date TEXT DEFAULT CURRENT_DATE,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  )
`);
console.log('orders table created');

// ─── TASK 10: INSERT ORDERS ───────────────────────────
// Relaciona usuarios con productos a través de orders
console.log('\n=== Task 10: Insert related data ===');
const insertOrder = db.prepare('INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)');
const insertOrders = db.transaction((orders) => {
  for (const o of orders) {
    insertOrder.run(o.user_id, o.product_id, o.quantity);
  }
});
insertOrders([
  { user_id: 1, product_id: 1, quantity: 1 },
  { user_id: 2, product_id: 2, quantity: 2 },
  { user_id: 3, product_id: 5, quantity: 3 },
  { user_id: 4, product_id: 3, quantity: 5 },
  { user_id: 5, product_id: 7, quantity: 2 },
]);
console.log('Inserted 5 orders');

// ─── VERIFY ────────────────────────────────────────────
// COUNT(*) cuenta filas — .all() devuelve array, .get() devuelve un objeto
console.log('\n=== Verify data ===');
console.log('Users:', db.prepare('SELECT COUNT(*) AS count FROM users').get());
console.log('Products:', db.prepare('SELECT COUNT(*) AS count FROM products').get());
console.log('Orders:', db.prepare('SELECT COUNT(*) AS count FROM orders').get());

// Cerrar conexión — buena práctica liberar recursos
db.close();
console.log('\nDone. Database: ex01.db');
