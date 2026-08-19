/**
 * EXERCISE 13: PERFORMANCE OPTIMIZATION
 * =======================================
 * 
 * OBJECTIVE: Prevent unnecessary re-renders and optimize performance.
 * 
 * CONCEPTS:
 * - React.memo: memoize component (skip re-render if props unchanged)
 * - useMemo: memoize expensive calculations
 * - useCallback: memoize functions (prevent child re-renders)
 * - Virtualization: render only visible items
 */

import { useState, useMemo, useCallback, memo } from 'react';

// ============================================
// EXERCISE 13.1: React.memo
// ============================================
// TODO: Memoize ExpensiveChild to prevent re-renders
const ExpensiveChild = memo(function ExpensiveChild({ data, onClick }) {
  console.log('ExpensiveChild rendered');
  
  return (
    <div className="expensive-child">
      <p>Data: {data}</p>
      <button onClick={onClick}>Click me</button>
    </div>
  );
});

function MemoExample() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  const handleClick = useCallback(() => {
    console.log('Clicked!');
  }, []);

  return (
    <div className="memo-example">
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Type here..." />
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      {/* This child won't re-render when count changes (only when data changes) */}
      <ExpensiveChild data={text} onClick={handleClick} />
    </div>
  );
}

// ============================================
// EXERCISE 13.2: useMemo
// ============================================
function ExpensiveCalculation() {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);
  const [multiplier, setMultiplier] = useState(2);
  const [count, setCount] = useState(0);

  // TODO: Use useMemo to avoid recalculating on every render
  const expensiveResult = useMemo(() => {
    console.log('Calculating...');
    // Simulate expensive computation
    return numbers.reduce((acc, num) => acc + num * multiplier, 0);
  }, [numbers, multiplier]); // Only recalculate when these change

  return (
    <div className="usememo-example">
      <p>Numbers: {numbers.join(', ')}</p>
      <p>Multiplier: {multiplier}</p>
      <p>Result: {expensiveResult}</p>
      <button onClick={() => setMultiplier(m => m + 1)}>Increase Multiplier</button>
      <button onClick={() => setNumbers(n => [...n, n.length + 1])}>Add Number</button>
      <button onClick={() => setCount(c => c + 1)}>Unrelated State: {count}</button>
    </div>
  );
}

// ============================================
// EXERCISE 13.3: useCallback
// ============================================
const Button = memo(function Button({ onClick, children }) {
  console.log(`Button "${children}" rendered`);
  return <button onClick={onClick}>{children}</button>;
});

function CallbackExample() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  // TODO: Use useCallback to memoize handlers
  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount(c => c - 1);
  }, []);

  return (
    <div className="usecallback-example">
      <p>Count: {count}</p>
      {/* These buttons won't re-render when 'other' changes */}
      <Button onClick={increment}>+</Button>
      <Button onClick={decrement}>-</Button>
      <button onClick={() => setOther(o => o + 1)}>Other: {other}</button>
    </div>
  );
}

export default function PerformanceOptimization() {
  return (
    <div className="exercise">
      <h2>Exercise 13: Performance Optimization</h2>
      <section>
        <h3>13.1 React.memo</h3>
        <MemoExample />
      </section>
      <section>
        <h3>13.2 useMemo</h3>
        <ExpensiveCalculation />
      </section>
      <section>
        <h3>13.3 useCallback</h3>
        <CallbackExample />
      </section>
    </div>
  );
}
