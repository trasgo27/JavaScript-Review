/**
 * EXERCISE 03: useState HOOK
 * ===========================
 * 
 * OBJECTIVE:
 * Learn to manage component state using the useState hook.
 * 
 * CONCEPTS:
 * - useState returns [state, setState]
 * - setState triggers a re-render
 * - State updates are asynchronous
 * - Always use setState to update state (never mutate directly)
 * - Functional updates when new state depends on previous state
 * 
 * INSTRUCTIONS:
 * 1. Complete each TODO section below
 * 2. Test your components by clicking buttons
 * 3. Observe how state changes trigger re-renders
 */

import { useState } from 'react';

// ============================================
// EXERCISE 3.1: Basic Counter
// ============================================
// TODO: Create a counter with increment, decrement, and reset
// Requirements:
// - Display current count
// - Button to increment by 1
// - Button to decrement by 1
// - Button to reset to 0
// - Show different colors based on count (negative=red, zero=gray, positive=green)

function Counter() {
  const [count, setCount] = useState(0);

  // TODO: Create handler functions
  const increment = () => {
    // TODO: Increment count
  };

  const decrement = () => {
    // TODO: Decrement count
  };

  const reset = () => {
    // TODO: Reset count to 0
  };

  // TODO: Determine color class based on count
  const getColorClass = () => {
    // HINT: if count < 0 return 'negative', if count === 0 return 'zero', else 'positive'
  };

  return (
    <div className="counter">
      {/* TODO: Display count with dynamic color class */}
      <h3 className={getColorClass()}>Count: </h3>
      
      {/* TODO: Add buttons with onClick handlers */}
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

// ============================================
// EXERCISE 3.2: Toggle Visibility
// ============================================
// TODO: Create a component that toggles content visibility
// Requirements:
// - Button to show/hide content
// - Smooth transition effect (optional)
// - Different text on button based on state

function ToggleContent() {
  const [isVisible, setIsVisible] = useState(false);

  const toggle = () => {
    // TODO: Toggle the isVisible state
    // HINT: Use setIsVisible with a function: prev => !prev
  };

  return (
    <div className="toggle">
      {/* TODO: Add button that toggles visibility */}
      <button onClick={toggle}>
        {/* TODO: Show "Hide" when visible, "Show" when hidden */}
      </button>
      
      {/* TODO: Conditionally render content */}
      {/* HINT: Use && operator: isVisible && <div>content</div> */}
    </div>
  );
}

// ============================================
// EXERCISE 3.3: Form Input State
// ============================================
// TODO: Create a form that tracks input values
// Requirements:
// - Track name and email inputs
// - Display submitted values
// - Clear form after submission
// - Show validation messages

function FormInput() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // TODO: Validate inputs
    // HINT: Check if name and email are not empty
    // HINT: Check if email contains @
    
    // TODO: If valid, set submitted to true
    // TODO: If invalid, set error message
  };

  const handleReset = () => {
    // TODO: Reset all state
  };

  return (
    <div className="form-input">
      <form onSubmit={handleSubmit}>
        {/* TODO: Add input for name */}
        {/* HINT: value={name} onChange={(e) => setName(e.target.value)} */}
        <input type="text" placeholder="Name" />
        
        {/* TODO: Add input for email */}
        <input type="email" placeholder="Email" />
        
        {/* TODO: Show error message if exists */}
        
        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </form>
      
      {/* TODO: Show submitted data */}
      {submitted && (
        <div className="submitted-data">
          {/* Display name and email */}
        </div>
      )}
    </div>
  );
}

// ============================================
// EXERCISE 3.4: Multiple State Values
// ============================================
// TODO: Create a profile editor with multiple state values
// Requirements:
// - Track: firstName, lastName, bio, isEditing
// - Toggle between view and edit modes
// - Save changes when submitting edit
// - Cancel to revert changes

function ProfileEditor() {
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [bio, setBio] = useState('React developer');
  const [isEditing, setIsEditing] = useState(false);
  
  // TODO: Add temporary state for edit mode
  // HINT: You might need tempFirstName, tempLastName, tempBio

  const startEditing = () => {
    // TODO: Copy current values to temp state and set isEditing to true
  };

  const saveChanges = () => {
    // TODO: Copy temp values to actual state and set isEditing to false
  };

  const cancelEditing = () => {
    // TODO: Just set isEditing to false (don't save)
  };

  return (
    <div className="profile-editor">
      {isEditing ? (
        <div className="edit-mode">
          {/* TODO: Add input fields for editing */}
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <textarea placeholder="Bio"></textarea>
          
          {/* TODO: Add Save and Cancel buttons */}
        </div>
      ) : (
        <div className="view-mode">
          {/* TODO: Display current profile data */}
          <h3></h3>
          <p></p>
          
          {/* TODO: Add Edit button */}
        </div>
      )}
    </div>
  );
}

// ============================================
// EXERCISE 3.5: Array State
// ============================================
// TODO: Create a todo list that manages array state
// Requirements:
// - Add new todos
// - Toggle todo completion
// - Delete todos
// - Display todo count

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: true },
    { id: 2, text: 'Build projects', completed: false }
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (!newTodo.trim()) return;
    
    // TODO: Add new todo to array
    // HINT: Use spread operator: [...todos, newTodo]
    // HINT: Generate unique ID: Date.now()
    
    setNewTodo(''); // Clear input
  };

  const toggleTodo = (id) => {
    // TODO: Toggle completed status of specific todo
    // HINT: Use .map() to create new array
    // HINT: If todo.id matches, toggle completed, else keep todo
  };

  const deleteTodo = (id) => {
    // TODO: Remove todo from array
    // HINT: Use .filter() to keep todos that don't match id
  };

  return (
    <div className="todo-list">
      {/* TODO: Add input and button for new todos */}
      <div className="add-todo">
        <input 
          type="text" 
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      
      {/* TODO: Display todo count */}
      <p>Total: | Completed: </p>
      
      {/* TODO: Render todo items */}
      <ul>
        {/* HINT: Use .map() to render li elements */}
        {/* HINT: Each li needs a unique key prop */}
      </ul>
    </div>
  );
}

// ============================================
// MAIN COMPONENT - Export this as default
// ============================================
export default function UseStateHook() {
  return (
    <div className="exercise">
      <h2>Exercise 03: useState Hook</h2>
      
      <section>
        <h3>3.1 Basic Counter</h3>
        <Counter />
      </section>
      
      <section>
        <h3>3.2 Toggle Visibility</h3>
        <ToggleContent />
      </section>
      
      <section>
        <h3>3.3 Form Input</h3>
        <FormInput />
      </section>
      
      <section>
        <h3>3.4 Profile Editor</h3>
        <ProfileEditor />
      </section>
      
      <section>
        <h3>3.5 Todo List (Array State)</h3>
        <TodoList />
      </section>
    </div>
  );
}
