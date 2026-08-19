/**
 * EXERCISE 06: LISTS & KEYS
 * ===========================
 * 
 * OBJECTIVE: Render dynamic lists of data efficiently.
 * 
 * CONCEPTS:
 * - Use .map() to transform arrays into JSX
 * - Each list item MUST have a unique "key" prop
 * - Keys help React identify which items changed
 * - Use index as key only as a last resort
 */

import { useState } from 'react';

// EXERCISE 6.1: Simple List
function SimpleList() {
  const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

  // TODO: Render the list of fruits as <li> elements
  // Remember to add a unique key to each <li>
  return (
    <div className="simple-list">
      <h4>Fruit List</h4>
      <ul>
        {/* TODO: Use fruits.map() to render list items */}
      </ul>
    </div>
  );
}

// EXERCISE 6.2: List with Index
function ListWithIndex() {
  const colors = ['Red', 'Green', 'Blue', 'Yellow'];

  // TODO: Render list with index number
  // HINT: .map((color, index) => ...)
  return (
    <div className="list-with-index">
      <h4>Numbered Colors</h4>
      <ol>
        {/* TODO: Render numbered list */}
      </ol>
    </div>
  );
}

// EXERCISE 6.3: Filterable List
function FilterableList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const todos = [
    { id: 1, text: 'Learn React', category: 'study', done: false },
    { id: 2, text: 'Build project', category: 'work', done: true },
    { id: 3, text: 'Exercise', category: 'health', done: false },
    { id: 4, text: 'Read book', category: 'study', done: true },
    { id: 5, text: 'Cook dinner', category: 'personal', done: false }
  ];

  // TODO: Filter todos based on searchTerm and filterType
  const filteredTodos = todos.filter(todo => {
    // HINT: Check if text includes searchTerm (case insensitive)
    // HINT: Check if category matches filterType (or 'all')
  });

  return (
    <div className="filterable-list">
      <input
        type="text"
        placeholder="Search todos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
        <option value="all">All Categories</option>
        <option value="study">Study</option>
        <option value="work">Work</option>
        <option value="health">Health</option>
        <option value="personal">Personal</option>
      </select>
      <ul>
        {/* TODO: Render filteredTodos with proper keys */}
      </ul>
    </div>
  );
}

// EXERCISE 6.4: Grid Layout
function GridLayout() {
  const products = [
    { id: 1, name: 'Laptop', price: 999, image: '💻' },
    { id: 2, name: 'Phone', price: 699, image: '📱' },
    { id: 3, name: 'Tablet', price: 499, image: '📱' },
    { id: 4, name: 'Watch', price: 299, image: '⌚' },
    { id: 5, name: 'Headphones', price: 199, image: '🎧' },
    { id: 6, name: 'Camera', price: 899, image: '📷' }
  ];

  // TODO: Render products in a grid
  // Each card should show image, name, and price
  // Use CSS grid or flexbox for layout
  return (
    <div className="grid-layout">
      <h4>Product Grid</h4>
      <div className="product-grid">
        {/* TODO: Map products to product cards */}
      </div>
    </div>
  );
}

// EXERCISE 6.5: Nested Lists
function NestedLists() {
  const categories = [
    {
      id: 1,
      name: 'Electronics',
      items: ['Laptop', 'Phone', 'Tablet']
    },
    {
      id: 2,
      name: 'Clothing',
      items: ['Shirt', 'Pants', 'Jacket']
    },
    {
      id: 3,
      name: 'Books',
      items: ['Fiction', 'Non-Fiction', 'Technical']
    }
  ];

  // TODO: Render nested lists (categories with items)
  // Remember: Both categories AND items need unique keys
  return (
    <div className="nested-lists">
      <h4>Categories</h4>
      {/* TODO: Render categories with their items */}
    </div>
  );
}

export default function ListsAndKeys() {
  return (
    <div className="exercise">
      <h2>Exercise 06: Lists & Keys</h2>
      <section>
        <h3>6.1 Simple List</h3>
        <SimpleList />
      </section>
      <section>
        <h3>6.2 List with Index</h3>
        <ListWithIndex />
      </section>
      <section>
        <h3>6.3 Filterable List</h3>
        <FilterableList />
      </section>
      <section>
        <h3>6.4 Grid Layout</h3>
        <GridLayout />
      </section>
      <section>
        <h3>6.5 Nested Lists</h3>
        <NestedLists />
      </section>
    </div>
  );
}
