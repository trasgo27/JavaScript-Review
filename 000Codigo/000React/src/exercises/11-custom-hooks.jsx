/**
 * EXERCISE 11: CUSTOM HOOKS
 * ===========================
 * 
 * OBJECTIVE: Extract reusable logic into custom hooks.
 * 
 * CONCEPTS:
 * - Custom hooks are functions that use other hooks
 * - Name must start with "use"
 * - Can return any values/functions
 * - Encapsulate complex logic
 * - Share logic between components
 */

import { useState, useEffect, useCallback } from 'react';

// ============================================
// CUSTOM HOOK: useLocalStorage
// ============================================
// TODO: Create a hook that persists state in localStorage
function useLocalStorage(key, initialValue) {
  // TODO: Initialize state from localStorage or initialValue
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // TODO: Update localStorage when value changes
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// ============================================
// CUSTOM HOOK: useToggle
// ============================================
// TODO: Create a toggle hook
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  
  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);

  return [value, toggle];
}

// ============================================
// CUSTOM HOOK: useFetch
// ============================================
// TODO: Create a data fetching hook
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(r => setTimeout(r, 1000));
        // In real app: const response = await fetch(url, { signal: controller.signal });
        // In real app: const json = await response.json();
        setData({ message: 'Data loaded from ' + url });
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

// ============================================
// CUSTOM HOOK: useWindowSize
// ============================================
function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// ============================================
// USAGE EXAMPLES
// ============================================

// EXERCISE 11.1: useLocalStorage
function LocalStorageExample() {
  const [name, setName] = useLocalStorage('name', '');
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <div className="local-storage-example">
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter name (persists)" />
      <p>Hello, {name || 'stranger'}!</p>
      <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
        Theme: {theme}
      </button>
    </div>
  );
}

// EXERCISE 11.2: useToggle
function ToggleExample() {
  const [showModal, toggleModal] = useToggle(false);
  const [isActive, toggleActive] = useToggle(false);

  return (
    <div className="toggle-example">
      <button onClick={toggleActive}>
        {isActive ? 'Active' : 'Inactive'}
      </button>
      <button onClick={toggleModal}>
        {showModal ? 'Close' : 'Open'} Modal
      </button>
      {showModal && (
        <div className="modal">
          <p>Modal Content</p>
          <button onClick={toggleModal}>Close</button>
        </div>
      )}
    </div>
  );
}

// EXERCISE 11.3: useFetch
function FetchExample() {
  const { data, loading, error } = useFetch('https://api.example.com/users');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default function CustomHooks() {
  return (
    <div className="exercise">
      <h2>Exercise 11: Custom Hooks</h2>
      <section>
        <h3>11.1 useLocalStorage</h3>
        <LocalStorageExample />
      </section>
      <section>
        <h3>11.2 useToggle</h3>
        <ToggleExample />
      </section>
      <section>
        <h3>11.3 useFetch</h3>
        <FetchExample />
      </section>
    </div>
  );
}
