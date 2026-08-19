/**
 * EXERCISE 04: EVENT HANDLING
 * ============================
 * 
 * OBJECTIVE: Learn to handle user interactions in React.
 * 
 * CONCEPTS:
 * - Event handlers are functions that run on user actions
 * - Use camelCase: onClick, onChange, onSubmit
 * - Pass functions, not calls: onClick={fn} NOT onClick={fn()}
 * - Synthetic events wrap native browser events
 */

import { useState } from 'react';

// EXERCISE 4.1: Click Events
function ClickEvents() {
  const [clickCount, setClickCount] = useState(0);
  const [doubleClickCount, setDoubleClickCount] = useState(0);

  // TODO: Increment clickCount when button is clicked
  const handleClick = () => {
    // HINT: setClickCount(prev => prev + 1)
  };

  // TODO: Increment doubleClickCount on double-click
  const handleDoubleClick = () => {
    // HINT: setDoubleClickCount(prev => prev + 1)
  };

  // TODO: Prevent context menu on right-click
  const handleContextMenu = (e) => {
    // HINT: e.preventDefault()
  };

  return (
    <div className="click-events">
      <button onClick={handleClick}>Clicks: {clickCount}</button>
      <button onDoubleClick={handleDoubleClick}>Double-clicks: {doubleClickCount}</button>
      <button onContextMenu={handleContextMenu}>Right-click me</button>
    </div>
  );
}

// EXERCISE 4.2: Form Events
function FormEvents() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault(); // TODO: Always prevent default form submission
    // TODO: Process form data
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="form-events">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          onFocus={() => setFocusedField('username')}
          onBlur={() => setFocusedField(null)}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      <p>Focused: {focusedField || 'none'}</p>
    </div>
  );
}

// EXERCISE 4.3: Keyboard Events
function KeyboardEvents() {
  const [inputValue, setInputValue] = useState('');
  const [lastKey, setLastKey] = useState('');

  const handleKeyDown = (e) => {
    setLastKey(e.key);
    // TODO: Add Enter to submit, Escape to clear
    if (e.key === 'Enter') {
      // Submit logic
    }
    if (e.key === 'Escape') {
      setInputValue('');
    }
  };

  return (
    <div className="keyboard-events">
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type and press Enter..."
      />
      <p>Last key: {lastKey}</p>
    </div>
  );
}

export default function EventHandling() {
  return (
    <div className="exercise">
      <h2>Exercise 04: Event Handling</h2>
      <section>
        <h3>4.1 Click Events</h3>
        <ClickEvents />
      </section>
      <section>
        <h3>4.2 Form Events</h3>
        <FormEvents />
      </section>
      <section>
        <h3>4.3 Keyboard Events</h3>
        <KeyboardEvents />
      </section>
    </div>
  );
}
