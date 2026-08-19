/**
 * EXERCISE 02: COMPONENTS & PROPS
 * ================================
 * 
 * OBJECTIVE:
 * Learn to create reusable components and pass data via props.
 * 
 * CONCEPTS:
 * - Components are reusable UI pieces (functions that return JSX)
 * - Props are like function parameters - they pass data to components
 * - Props are read-only (components should never modify their props)
 * - Destructuring props makes code cleaner
 * - children prop is special - it contains nested content
 * 
 * INSTRUCTIONS:
 * 1. Complete each TODO section below
 * 2. Pass props from parent to child components
 * 3. Use destructuring to access props
 */

// ============================================
// EXERCISE 2.1: Creating Components
// ============================================
// TODO: Create a simple component that displays a user card
// Requirements:
// - Component accepts name, email, and avatar props
// - Displays the information in a card layout
// - Use semantic HTML
// - Export the component

function UserCard({ name, email, avatar }) {
  // TODO: Return JSX with the user information
  // HINT: Use a div with className="user-card"
  // HINT: Include an img for avatar, h3 for name, p for email
  return (
    <div className="user-card">
      <img src={avatar} alt={`Avatar de ${name}`} />
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
}

// ============================================
// EXERCISE 2.2: Props with Default Values
// ============================================
// TODO: Create a button component with default props
// Requirements:
// - Component accepts variant, size, onClick, and children props
// - Default variant should be "primary"
// - Default size should be "medium"
// - Apply different classes based on variant and size

function Button({ variant = 'primary', size = 'medium', onClick, children }) {
  // TODO: Create className based on props
  // HINT: Use template literals: `btn btn-${variant} btn-${size}`
  // TODO: Return a button element with the className and onClick
  const className = `btn btn-${variant} btn-${size}`;  
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

// ============================================
// EXERCISE 2.3: Passing Children
// ============================================
// TODO: Create a Card component that wraps content
// Requirements:
// - Component accepts title and children props
// - Renders a card with a header (title) and body (children)
// - Style it nicely

function Card({ title, children }) {
  // TODO: Create a card structure
  // HINT: The children prop contains whatever is between <Card> and </Card>

  return (
    <div className="card">
      <div className="card-header">
        <h3 style={{margin:0}}>
          {title}
        </h3>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

// ============================================
// EXERCISE 2.4: Props Validation
// ============================================
// TODO: Create a component that handles different prop types
// Requirements:
// - Create a Stat component that displays a statistic
// - Accept label, value, and trend props
// - Show an arrow (↑ or ↓) based on trend (positive/negative)
// - Handle missing trend prop gracefully

function Stat({ label, value, trend }) {
  // TODO: Determine if trend is positive, negative, or neutral
  // HINT: Use conditional logic to check trend value
  const trendClass =
    trend === 'positive'
      ? 'trend-positive'
      : trend === 'negative'
        ? 'trend-negative'
        : '';
  const flecha =
    trendClass === 'trend-positive'
      ? '↑'
      : trendClass === 'trend-negative'
        ? '↓'
        : '';
  return (
    <div className="stat">
      <div className="stat-label">{label}</div>
      <div className="stat-value">
        {value}
        <span className={trendClass}>{flecha}</span>
      </div>
    </div>
  );
}

// ============================================
// EXERCISE 2.5: Composition Pattern
// ============================================
// TODO: Create a component composition example
// Requirements:
// - Create a Sidebar component that contains MenuItems
// - Create a MenuItem component with icon and text props
// - Demonstrate how to compose components together

function MenuItem({ icon, text, isActive = false }) {
  return (
    <div className={`menu-item${isActive ? ' active' : ''}`}>
      <span className="menu-icon">{icon}</span>
      <span className="menu-text">{text}</span>
    </div>
  );
}

function Sidebar({ children }) {
  return (
    <nav className="sidebar">
      {children}
    </nav>
  );
}

// ============================================
// MAIN COMPONENT - Export this as default
// ============================================
export default function ComponentsAndProps() {
  // Sample data for components
  const users = [
    { name: "Alice Johnson", email: "alice@example.com", avatar: "https://i.pravatar.cc/150?img=1" },
    { name: "Bob Smith", email: "bob@example.com", avatar: "https://i.pravatar.cc/150?img=2" },
    { name: "Carol White", email: "carol@example.com", avatar: "https://i.pravatar.cc/150?img=3" }
  ];

  return (
    <div className="exercise">
      <h2>Exercise 02: Components & Props</h2>
      
      <section>
        <h3>2.1 User Cards</h3>
        {users.map((user, index) => (
          <UserCard
            key={index}
            name={user.name}
            email={user.email}
            avatar={user.avatar}
          />
        ))}
      </section>
      
      <section>
        <h3>2.2 Button Variants</h3>
        {/* TODO: Render Button components with different props */}
        <Button>Primary Button</Button>
        <Button variant="secondary">Secondary</Button>
        <Button size="large">Large Button</Button>
        <Button variant="danger" size="small">Delete</Button>
      </section>
      
      <section>
        <h3>2.3 Card Composition</h3>
        {/* TODO: Create Card components with nested content */}
        <Card title="Welcome">
          <p>This is the card body content.</p>
          <button>Click me</button>
        </Card>
      </section>
      
      <section>
        <h3>2.4 Statistics</h3>
        {/* TODO: Render Stat components with different trends */}
        <Stat label="Revenue" value="$12,345" trend="positive" />
        <Stat label="Users" value="1,234" trend="negative" />
        <Stat label="Orders" value="567" />
      </section>
      
      <section>
        <h3>2.5 Sidebar Composition</h3>
        {/* TODO: Compose Sidebar with MenuItems */}
        <Sidebar>
          <MenuItem icon="🏠" text="Home" isActive={true} />
          <MenuItem icon="📊" text="Dashboard" />
          <MenuItem icon="⚙️" text="Settings" />
        </Sidebar>
      </section>
    </div>
  );
}
