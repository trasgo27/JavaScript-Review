/**
 * EXERCISE 01: JSX BASICS
 * ========================
 *
 * OBJECTIVE:
 * Learn the fundamentals of JSX syntax, expressions, and attributes.
 *
 * CONCEPTS:
 * - JSX is a syntax extension for JavaScript that looks similar to HTML
 * - JSX expressions are wrapped in curly braces {}
 * - JSX must return a single root element (use fragments <> </> for multiple)
 * - className is used instead of class for CSS
 * - camelCase for most attributes (onClick, htmlFor, etc.)
 *
 * INSTRUCTIONS:
 * 1. Complete each TODO section below
 * 2. Run the app to see your changes
 * 3. Experiment with different JSX patterns
 */

// ============================================
// EXERCISE 1.1: Basic JSX Elements
// ============================================
// Create a component that renders basic HTML elements.
// Requirements:
// - An h1 element with your name
// - A paragraph describing yourself
// - A list with 3 of your hobbies
// - Use semantic HTML elements

function BasicElements() {
  return (
    <div>
      <h1>Salvador</h1>
      <p>Un pringaiyo</p>
      <ul>
        <li>Comer Carne de Ternera</li>
        <li>Estar con Ritmo Cardiaco Bueno</li>
        <li>Ver bien y praticar la vista</li>
      </ul>
    </div>
  );
}

// ============================================
// EXERCISE 1.2: JSX Expressions
// ============================================
// Complete the component to use JavaScript expressions in JSX.
// Requirements:
// - Calculate and display the current year
// - Display the result of a random number + 2
// - Use a ternary operator to show "Even" or "Odd"
// - Use template literals to create a greeting

function JSXExpressions() {
  const currentYear = new Date().getFullYear();
  const number = Math.floor(Math.random() * 5) + 1;
  const names = ["Salva", "Gasco", "Mezquita", "Gomis", "Hugo", "Sandra"];
  const name = names[number - 1];

  return (
    <div>
      <p>The current year is: {currentYear}</p>
      <p>{`${number} + 2 = ${number + 2}`}</p>
      <p>{`Number ${number} is: ${number % 2 === 0 ? "even" : "odd"}`}</p>
      <p>{`Hola ${name}`}</p>
      <a href="https://www.w3schools.com/react/default.asp">
        Presionar
      </a>
    </div>
  );
}

// ============================================
// EXERCISE 1.3: JSX Attributes
// ============================================
// Add proper attributes to JSX elements.
// Requirements:
// - Create an img tag with src, alt, and width attributes
// - Create an input with placeholder, type, and maxLength
// - Create an anchor tag with href and target="_blank"
// - Create a button with disabled attribute

function JSXAttributes() {
  return (
    <div>
      <img
        src="https://picsum.photos/200"
        alt="Random Image Placeholder"
        width={200}
      />

      <input
        placeholder="Escribe tu nombre"
        type="text"
        maxLength={50}
      />

      <a
        href="https://www.w3schools.com/react/default.asp"
        target="_blank"
        rel="noopener noreferrer"
      >
        W3Schools React
      </a>

      <button type="button" disabled={true}>
        Enviar
      </button>
    </div>
  );
}

// ============================================
// EXERCISE 1.4: Inline Styles
// ============================================
// Apply inline styles to elements.
// Requirements:
// - Create a div with background, white text, padding
// - Create a heading with custom font size and color
// - Note: Styles use camelCase in React (backgroundColor, fontSize)
// - Styles are objects, not strings

function InlineStyles() {
  const containerStyle = {
    backgroundColor: "blue",
    color: "white",
    padding: "5px",
    borderRadius: "5px",
  };

  const headingStyle = {
    fontSize: "30px",
    color: "black",
    marginBottom: "10px",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Titulo con Estilo en Linea</h2>
      <p>This content has inline styles!</p>
    </div>
  );
}

// ============================================
// EXERCISE 1.5: Fragments
// ============================================
// Use fragments to return multiple elements.
// Requirements:
// - Return multiple elements without a wrapper div
// - Use both <></> and <React.Fragment> syntax
// - Fragments let you group elements without adding extra DOM nodes

function WithFragments() {
  return (
    <>
      <h3>Fragment Short Syntax</h3>
      <p>This allows you to add elements without adding new divs.</p>
      <p>Fragments are great for lists and tables.</p>
    </>
  );
}

function WithFragmentsDOS() {
  return (
    <React.Fragment>
      <h3>Fragment Long Syntax</h3>
      <p>Same result as the short syntax above.</p>
      <p>Useful when you need to pass a key prop.</p>
    </React.Fragment>
  );
}

// ============================================
// MAIN COMPONENT - Export this as default
// ============================================
export default function JSXBasics() {
  return (
    <div className="exercise">
      <h2>Exercise 01: JSX Basics</h2>

      <section>
        <h3>1.1 Basic Elements</h3>
        <BasicElements />
      </section>

      <section>
        <h3>1.2 JSX Expressions</h3>
        <JSXExpressions />
      </section>

      <section>
        <h3>1.3 JSX Attributes</h3>
        <JSXAttributes />
      </section>

      <section>
        <h3>1.4 Inline Styles</h3>
        <InlineStyles />
      </section>

      <section>
        <h3>1.5 Fragments</h3>
        <WithFragments />
      </section>

      <section>
        <h3>1.6 Fragments (React.Fragment)</h3>
        <WithFragmentsDOS />
      </section>
    </div>
  );
}
