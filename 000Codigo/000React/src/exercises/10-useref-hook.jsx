/**
 * EXERCISE 10: useRef HOOK
 * =========================
 * 
 * OBJECTIVE: Access DOM elements and persist values without re-renders.
 * 
 * CONCEPTS:
 * - useRef returns { current: initialValue }
 * - Does NOT trigger re-render when changed
 * - Access DOM elements with ref={refObject}
 * - Persist values between renders (timers, previous values, etc.)
 */

import { useState, useRef, useEffect } from 'react';

// EXERCISE 10.1: Focus Input
function FocusInput() {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  // TODO: Focus input on button click
  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div className="focus-input">
      <input ref={inputRef} value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="Click button to focus" />
      <button onClick={handleFocus}>Focus Input</button>
      <p>Value: {inputValue}</p>
    </div>
  );
}

// EXERCISE 10.2: Previous Value
function PreviousValue() {
  const [count, setCount] = useState(0);
  const [prevCount, setPrevCount] = useState(0);
  const countRef = useRef(count);

  // TODO: Track previous value using ref
  useEffect(() => {
    countRef.current = count;
  }, [count]);

  const increment = () => {
    setPrevCount(countRef.current);
    setCount(c => c + 1);
  };

  return (
    <div className="prev-value">
      <h4>Count: {count} (Previous: {prevCount})</h4>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

// EXERCISE 10.3: Stop Watch
function StopWatch() {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // TODO: Use useRef to store interval ID
  const start = () => {
    if (isRunning) return;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setElapsed(e => e + 10);
    }, 10);
  };

  const stop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const reset = () => {
    stop();
    setElapsed(0);
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="stopwatch">
      <h4>{formatTime(elapsed)}</h4>
      <button onClick={start} disabled={isRunning}>Start</button>
      <button onClick={stop} disabled={!isRunning}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

// EXERCISE 10.4: Scroll to Element
function ScrollExample() {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  const scrollTo = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="scroll-example">
      <nav className="scroll-nav">
        <button onClick={() => scrollTo(section1Ref)}>Section 1</button>
        <button onClick={() => scrollTo(section2Ref)}>Section 2</button>
        <button onClick={() => scrollTo(section3Ref)}>Section 3</button>
      </nav>
      <div style={{ height: '200px', overflow: 'auto' }}>
        <section ref={section1Ref} style={{ height: '100px', background: '#f0f0f0', padding: '10px' }}>
          <h4>Section 1</h4>
        </section>
        <section ref={section2Ref} style={{ height: '100px', background: '#e0e0e0', padding: '10px' }}>
          <h4>Section 2</h4>
        </section>
        <section ref={section3Ref} style={{ height: '100px', background: '#d0d0d0', padding: '10px' }}>
          <h4>Section 3</h4>
        </section>
      </div>
    </div>
  );
}

export default function UseRefHook() {
  return (
    <div className="exercise">
      <h2>Exercise 10: useRef Hook</h2>
      <section>
        <h3>10.1 Focus Input</h3>
        <FocusInput />
      </section>
      <section>
        <h3>10.2 Previous Value</h3>
        <PreviousValue />
      </section>
      <section>
        <h3>10.3 Stop Watch</h3>
        <StopWatch />
      </section>
      <section>
        <h3>10.4 Scroll to Element</h3>
        <ScrollExample />
      </section>
    </div>
  );
}
