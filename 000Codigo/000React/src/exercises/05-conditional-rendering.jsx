/**
 * EXERCISE 05: CONDITIONAL RENDERING
 * =====================================
 * 
 * OBJECTIVE: Render different UI based on conditions.
 * 
 * CONCEPTS:
 * - if/else statements (before return)
 * - Ternary operator (inside JSX)
 * - && operator (short-circuit)
 * - Early return pattern
 */

import { useState } from 'react';

// EXERCISE 5.1: Login Status
function LoginStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: 'Alice', role: 'admin' });

  // TODO: Complete the toggleLogin function
  const toggleLogin = () => {
    // HINT: setIsLoggedIn(prev => !prev)
  };

  // TODO: Render different UI based on login state
  // Use if/else BEFORE return for complex logic
  // Use ternary INSIDE JSX for simple alternatives
  return (
    <div className="login-status">
      {/* TODO: If logged in, show welcome message and logout button */}
      {/* TODO: If not logged in, show login button */}
      <button onClick={toggleLogin}>
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>
    </div>
  );
}

// EXERCISE 5.2: Access Control
function AccessControl() {
  const [role, setRole] = useState('guest');

  // TODO: Render content based on role
  // guest: "Please log in"
  // user: Show user dashboard
  // admin: Show admin panel with extra options
  // Use switch or if/else chains

  return (
    <div className="access-control">
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="guest">Guest</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      {/* TODO: Conditionally render based on role */}
    </div>
  );
}

// EXERCISE 5.3: Loading States
function LoadingStates() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(r => setTimeout(r, 1500));
      setData({ items: ['Item 1', 'Item 2', 'Item 3'] });
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: Use && operator for conditional rendering
  return (
    <div className="loading-states">
      <button onClick={fetchData} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Fetch Data'}
      </button>
      {/* TODO: Show loading spinner when isLoading is true */}
      {/* TODO: Show error message when error exists */}
      {/* TODO: Show data when data exists */}
    </div>
  );
}

// EXERCISE 5.4: Feature Flags
function FeatureFlags() {
  const [features, setFeatures] = useState({
    darkMode: false,
    notifications: true,
    betaFeatures: false
  });

  const toggleFeature = (feature) => {
    setFeatures(prev => ({ ...prev, [feature]: !prev[feature] }));
  };

  return (
    <div className="feature-flags">
      <h4>Feature Toggles</h4>
      {Object.entries(features).map(([feature, enabled]) => (
        <label key={feature}>
          <input
            type="checkbox"
            checked={enabled}
            onChange={() => toggleFeature(feature)}
          />
          {feature}
        </label>
      ))}
      {/* TODO: Show different UI based on enabled features */}
    </div>
  );
}

export default function ConditionalRendering() {
  return (
    <div className="exercise">
      <h2>Exercise 05: Conditional Rendering</h2>
      <section>
        <h3>5.1 Login Status</h3>
        <LoginStatus />
      </section>
      <section>
        <h3>5.2 Access Control</h3>
        <AccessControl />
      </section>
      <section>
        <h3>5.3 Loading States</h3>
        <LoadingStates />
      </section>
      <section>
        <h3>5.4 Feature Flags</h3>
        <FeatureFlags />
      </section>
    </div>
  );
}
