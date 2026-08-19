/**
 * EXERCISE 14: ERROR BOUNDARIES
 * ===============================
 * 
 * OBJECTIVE: Handle errors gracefully in React components.
 * 
 * CONCEPTS:
 * - Error Boundaries catch JavaScript errors in child components
 * - They prevent the entire app from crashing
 * - Must be class components (no hook equivalent yet)
 * - Use getDerivedStateFromError and componentDidCatch
 * - Place them strategically in your component tree
 */

import React from 'react';

// ============================================
// ERROR BOUNDARY COMPONENT
// ============================================
// TODO: Create an ErrorBoundary class component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // TODO: Update state when error is caught
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // TODO: Log error to reporting service
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  // TODO: Provide reset functionality
  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-fallback">
          <h3>Something went wrong!</h3>
          <p>{this.state.error?.message}</p>
          <button onClick={this.resetError}>Try Again</button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ============================================
// COMPONENTS THAT MIGHT ERROR
// ============================================
function BuggyCounter() {
  const [count, setCount] = React.useState(0);

  if (count === 3) {
    throw new Error('Counter crashed at 3!');
  }

  return (
    <div className="buggy-counter">
      <h4>Counter: {count}</h4>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}

function BuggyProfile() {
  const [shouldError, setShouldError] = React.useState(false);

  if (shouldError) {
    throw new Error('Profile component error!');
  }

  return (
    <div className="buggy-profile">
      <h4>Profile Component</h4>
      <button onClick={() => setShouldError(true)}>Trigger Error</button>
    </div>
  );
}

function WorkingComponent() {
  return (
    <div className="working-component">
      <h4>This component works fine!</h4>
      <p>No errors here.</p>
    </div>
  );
}

// ============================================
// USAGE EXAMPLE
// ============================================
export default function ErrorBoundaries() {
  return (
    <div className="exercise">
      <h2>Exercise 14: Error Boundaries</h2>
      
      <section>
        <h3>14.1 Isolated Error Handling</h3>
        {/* TODO: Wrap each component in its own ErrorBoundary */}
        {/* This way, one crashing component doesn't affect others */}
        <ErrorBoundary>
          <BuggyCounter />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <BuggyProfile />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <WorkingComponent />
        </ErrorBoundary>
      </section>

      <section>
        <h3>14.2 Nested Error Boundaries</h3>
        <ErrorBoundary>
          <div>
            <h4>Parent Container</h4>
            <ErrorBoundary>
              <BuggyCounter />
            </ErrorBoundary>
            <ErrorBoundary>
              <BuggyProfile />
            </ErrorBoundary>
          </div>
        </ErrorBoundary>
      </section>
    </div>
  );
}
