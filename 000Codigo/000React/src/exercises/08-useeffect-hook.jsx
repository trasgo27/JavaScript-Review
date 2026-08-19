/**
 * EXERCISE 08: useEffect HOOK
 * ============================
 * 
 * OBJECTIVE: Manage side effects in functional components.
 * 
 * CONCEPTS:
 * - useEffect runs after render
 * - Dependency array controls when effect runs
 * - Empty array [] = run once on mount
 * - No array = run after every render
 * - Cleanup function returns from useEffect
 * - Common: API calls, subscriptions, timers, DOM manipulation
 */

import { useState, useEffect } from 'react';

// EXERCISE 8.1: Basic Effect
function BasicEffect() {
  const [count, setCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(null);

  // TODO: Log count changes to console
  useEffect(() => {
    console.log('Count changed to:', count);
    // Note: In real apps, derive state from props/state instead of calling setState in effects
    setLastUpdated(new Date().toLocaleTimeString());
  }, [count]); // Only re-run when count changes

  return (
    <div className="basic-effect">
      <h4>Count: {count}</h4>
      <p>Last updated: {lastUpdated}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}

// EXERCISE 8.2: Fetching Data
function DataFetching() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO: Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Simulate API call
        await new Promise(r => setTimeout(r, 1000));
        setUsers([
          { id: 1, name: 'Alice', email: 'alice@example.com' },
          { id: 2, name: 'Bob', email: 'bob@example.com' },
          { id: 3, name: 'Charlie', email: 'charlie@example.com' }
        ]);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []); // Empty array = run once on mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="data-fetching">
      <h4>Users</h4>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

// EXERCISE 8.3: Timer with Cleanup
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // TODO: Set up interval that cleans up properly
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // TODO: Return cleanup function
    return () => clearInterval(interval);
  }, [isRunning]);

  const reset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <div className="timer">
      <h4>Timer: {seconds}s</h4>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

// EXERCISE 8.4: Window Event Listener
function WindowEvents() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // TODO: Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // TODO: Track window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="window-events">
      <p>Mouse: ({mousePos.x}, {mousePos.y})</p>
      <p>Window: {windowSize.width} x {windowSize.height}</p>
    </div>
  );
}

// EXERCISE 8.5: Document Title Effect
function DocumentTitle() {
  const [count, setCount] = useState(0);

  // TODO: Update document title when count changes
  useEffect(() => {
    document.title = `Count: ${count}`;
    // Optional cleanup: restore original title
    return () => { document.title = 'React App'; };
  }, [count]);

  return (
    <div className="doc-title">
      <h4>Document Title: {count}</h4>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}

export default function UseEffectHook() {
  return (
    <div className="exercise">
      <h2>Exercise 08: useEffect Hook</h2>
      <section>
        <h3>8.1 Basic Effect</h3>
        <BasicEffect />
      </section>
      <section>
        <h3>8.2 Data Fetching</h3>
        <DataFetching />
      </section>
      <section>
        <h3>8.3 Timer with Cleanup</h3>
        <Timer />
      </section>
      <section>
        <h3>8.4 Window Events</h3>
        <WindowEvents />
      </section>
      <section>
        <h3>8.5 Document Title</h3>
        <DocumentTitle />
      </section>
    </div>
  );
}
