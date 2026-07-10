/**
 * Exercise 06: Build a CLI Todo List with SQLite
 * 
 * Instructions: Complete the TODOs in the functions below.
 * Run this file using: node 06Ej.js
 */

const Database = require('better-sqlite3');
const readline = require('readline');

const db = new Database('cli_todo.db');

// ─── TASK 1: Create the table ──────────────────────────────
// TODO: Create a table called 'todos' with:
// - id (INTEGER PRIMARY KEY AUTOINCREMENT)
// - task (TEXT NOT NULL)
// - completed (INTEGER DEFAULT 0) - we use 0 for false, 1 for true
db.exec(`
  CREATE TABLE IF NOT EXISTS todos(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  task TEXT NOT NULL,
  completed INTEGER DEFAULT 0
  )
`);

// ─── TASK 2: List all tasks ────────────────────────────────
function listTasks() {
  // TODO: Select all columns from 'todos'
  // Hint: Use db.prepare().all()
  const tasks = db.prepare('SELECT * FROM todos').all(); // Change this line

  if (tasks.length === 0) {
    console.log('No tasks found. Add some!');
    return;
  }

  tasks.forEach(t => {
    // Hint: Print "[x]" if completed is 1, otherwise "[ ]"
    const status = t.completed === 1 ? '[x]' : '[ ]';
    console.log(`${status} ${t.id}: ${t.task}`);
  });
}

// ─── TASK 3: Add a new task ───────────────────────────────
function addTask(taskName) {
  if (!taskName) {
    console.log('Error: Task name cannot be empty.');
    return;
  }
  // TODO: Insert a new task with the name provided
  // Hint: db.prepare('INSERT INTO todos (task) VALUES (?)').run(taskName)
  const info = db.prepare('INSERT INTO todos (task) VALUES (?)').run(taskName); // Change this line
  console.log(`Added task: "${taskName}" (ID: ${info.lastInsertRowid})`);
}

// ─── TASK 4: Complete a task ──────────────────────────────
function completeTask(id) {
  // TODO: Update the task with the given ID, setting completed = 1
  const info = db.prepare('UPDATE todos SET completed = 1 WHERE id=?').run(id); // Change this line
  if (info.changes === 0) {
    console.log(`Error: Task with ID ${id} not found.`);
  } else {
    console.log(`Task ${id} marked as completed!`);
  }
}

// ─── TASK 5: Delete a task ────────────────────────────────
function deleteTask(id) {
  // TODO: Delete the task with the given ID
  const info = db.prepare('DELETE FROM todos WHERE id = ?').run(id);

  if (info.changes === 0) {
    console.log(`Error: Task with ID ${id} not found.`);
  } else {
    console.log(`Task ${id} deleted successfully.`);
  }
}

// ─── READLINE CLI LOOP ─────────────────────────────────────
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('=== SQLite CLI Todo List ===');
console.log('Commands:');
console.log('  add <task>      - Add a new task');
console.log('  list            - List all tasks');
console.log('  complete <id>   - Mark a task as completed');
console.log('  delete <id>     - Delete a task');
console.log('  exit            - Exit application\n');

function prompt() {
  rl.question('> ', (line) => {
    const parts = line.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    switch (command) {
      case 'list':
        listTasks();
        break;
      case 'add':
        addTask(args);
        break;
      case 'complete':
        completeTask(parseInt(args, 10));
        break;
      case 'delete':
        deleteTask(parseInt(args, 10));
        break;
      case 'exit':
        db.close();
        console.log('Goodbye!');
        process.exit(0);
      default:
        console.log('Unknown command. Try list, add, complete, delete, or exit.');
    }
    prompt();
  });
}

prompt();
