/**
 * EXERCISE 09: useContext HOOK
 * =============================
 * 
 * OBJECTIVE: Share data between components without prop drilling.
 * 
 * CONCEPTS:
 * - Context provides data to entire component tree
 * - Create context with createContext()
 * - Provide context with Context.Provider
 * - Consume context with useContext() hook
 * - Avoid overusing context (causes re-renders)
 */

import { useState, useContext, createContext } from 'react';

// ============================================
// THEME CONTEXT
// ============================================
// TODO: Create a theme context
const ThemeContext = createContext();

// TODO: Create a ThemeProvider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // TODO: Provide theme and toggleTheme to children
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// TODO: Create a custom hook for using theme
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// ============================================
// EXERCISE 9.1: Theme Toggle
// ============================================
function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`header-${theme}`}>
      <h3>Current Theme: {theme}</h3>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </header>
  );
}

function Content() {
  const { theme } = useTheme();
  return (
    <div className={`content-${theme}`}>
      <p>This content changes with the theme!</p>
    </div>
  );
}

// ============================================
// USER CONTEXT (More Complex Example)
// ============================================
const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setNotifications([]);
  };

  const addNotification = (message) => {
    setNotifications(prev => [...prev, { id: Date.now(), message }]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, notifications, addNotification, removeNotification }}>
      {children}
    </UserContext.Provider>
  );
}

// EXERCISE 9.2: User Login/Logout
function LoginForm() {
  const { login, user } = useUser();
  const [username, setUsername] = useState('');

  if (user) return null; // Don't show if logged in

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name: username, role: 'user' });
    setUsername('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <button type="submit">Login</button>
    </form>
  );
}

function UserProfile() {
  const { user, logout, notifications } = useUser();
  if (!user) return <p>Please log in</p>;

  return (
    <div className="user-profile">
      <h4>Welcome, {user.name}!</h4>
      <p>Role: {user.role}</p>
      <p>Notifications: {notifications.length}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

// EXERCISE 9.3: Nested Context Consumers
function NotificationBell() {
  const { notifications } = useUser();
  return <span>🔔 {notifications.length}</span>;
}

function NotificationList() {
  const { notifications, removeNotification } = useUser();
  return (
    <ul>
      {notifications.map(n => (
        <li key={n.id}>
          {n.message}
          <button onClick={() => removeNotification(n.id)}>X</button>
        </li>
      ))}
    </ul>
  );
}

function useUser() {
  return useContext(UserContext);
}

export default function UseContextHook() {
  return (
    <div className="exercise">
      <h2>Exercise 09: useContext Hook</h2>
      
      <ThemeProvider>
        <section>
          <h3>9.1 Theme Context</h3>
          <Header />
          <Content />
        </section>
      </ThemeProvider>

      <UserProvider>
        <section>
          <h3>9.2 User Context</h3>
          <LoginForm />
          <UserProfile />
        </section>
        <section>
          <h3>9.3 Notifications</h3>
          <NotificationBell />
          <NotificationList />
        </section>
      </UserProvider>
    </div>
  );
}
