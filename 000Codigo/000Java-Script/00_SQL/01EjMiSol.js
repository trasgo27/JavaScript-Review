const Database = require('better-sqlite3');
const db = new Database('01ej.db');

db.exec(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  name TEXT NOT NULL, 
  email TEXT NOT NULL UNIQUE, 
  age INTEGER
)`); //backticks

// Crea una sentencia preparada con 3 placeholders (?)
// Los placeholders evitan SQL injection y separan SQL de datos
const insert = db.prepare('INSERT INTO users (name, email, age) VALUES (?, ?, ?)');

// Ejecuta la sentencia sustituyendo cada ? por un valor en orden
// .run() devuelve { changes: 1, lastInsertRowid: nuevoId }
insert.run('Salvador Garcia', 'salva@gmail.com', 54);
insert.run('Hugo', 'hugo@gmail.com', 9);
insert.run('David', 'david@gmail.com', 64);
insert.run('Carlos', 'carlos@outlook.com', 74);

console.log('4 users inserted successfully');

// .all() ejecuta la SELECT y devuelve TODAS las filas como un array de objetos
const usuarios = db.prepare('SELECT * FROM users').all();
// console.table() muestra el array en formato de tabla en la terminal
console.table(usuarios);
//Insert multiple users
// ❌ I used parentheses (a, b, c) instead of objects {name, email, age}
//    In JS, (a, b, c) evaluates to ONLY the last value 'c' (comma operator)
//    So the array became [54, 45, 50, 35, 30] instead of user data
// ✅ Correct: use objects with named properties: { name: 'Sandra', email: '...', age: 54 }
//    Or arrays inside the outer array: ['Sandra', 'sandra@mail.com', 54]
const multipleU =[('Sandra', 'sandra@outlook.com', 54),('Rocio', 'rocio@outlook.com', 45),('DareDevil', 'DareDevil@outlook.com', 50),('Spiderman', 'spiderman@outlook.com', 35),('Peter Parker', 'peterparker@outlook.com', 30)]
console.log('Introducir varios usuarios');
// ❌ I wrote db.transaction(()) — empty parentheses is a syntax error
//    db.transaction() expects a FUNCTION as argument
// ✅ Correct: db.transaction((items) => { for (const item of items) { ... } })
// ❌ Mismo error: (a, b, c) se evalúa como solo el último valor
//    Usa objetos: { name: '...', email: '...', age: N }
const multipleU2 = [
    ('IronMan', 'IronMan@outlook.com', 54),
    ('Ramon', 'Ramon@outlook.com', 5),
    ('DareDevil', 'DareDevil@outlook.com', 50),
    ('Batman', 'batman@outlook.com', 135),
    ('Bruce Wayne', 'brucewayne@outlook.com', 135)
]

// TRANSACTION: agrupa operaciones en una unidad atómica
// - Todo funciona → todas se guardan (COMMIT automático)
// - Algo falla → todas se deshacen (ROLLBACK automático)
// - También es 10x más rápido que inserts individuales

const insertMany = db.transaction((items) => {
    for (const item of items) {
        // insert.run(item.name, item.email, item.age);
        // Necesitas pasar cada valor al prepared statement
    }
});
// Para ejecutar: insertMany(multipleU2);


