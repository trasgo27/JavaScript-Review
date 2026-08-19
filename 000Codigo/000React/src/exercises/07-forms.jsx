/**
 * EXERCISE 07: FORMS (CONTROLLED COMPONENTS)
 * =============================================
 * 
 * OBJECTIVE: Build forms with React controlled components.
 * 
 * CONCEPTS:
 * - Controlled: React state controls input value
 * - value + onChange = controlled component
 * - Always use preventDefault() on form submit
 * - Handle multiple inputs with single handler
 * - Form validation with error messages
 */

import { useState } from 'react';

// EXERCISE 7.1: Basic Form
function BasicForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Process form data (log it, send to API, etc.)
    console.log('Form submitted:', formData);
  };

  return (
    <div className="basic-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          {/* TODO: Connect input to state */}
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Message:</label>
          <textarea name="message" value={formData.message} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
}

// EXERCISE 7.2: Form with Validation
function ValidatedForm() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = () => {
    const newErrors = {};
    // TODO: Validate username (min 3 chars)
    if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    // TODO: Validate email (must contain @)
    if (!formData.email.includes('@')) {
      newErrors.email = 'Email must be valid';
    }
    // TODO: Validate password (min 6 chars)
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(validate());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log('Valid form:', formData);
    }
  };

  return (
    <div className="validated-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} onBlur={handleBlur} />
          {/* TODO: Show error message if touched and error exists */}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} onBlur={handleBlur} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

// EXERCISE 7.3: Multiple Input Types
function MultipleInputTypes() {
  const [settings, setSettings] = useState({
    username: '',
    age: '',
    bio: '',
    newsletter: true,
    theme: 'light',
    role: 'user'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="multiple-inputs">
      <form>
        <input type="text" name="username" value={settings.username} onChange={handleChange} placeholder="Username" />
        <input type="number" name="age" value={settings.age} onChange={handleChange} placeholder="Age" />
        <textarea name="bio" value={settings.bio} onChange={handleChange} placeholder="Bio" />
        <label>
          <input type="checkbox" name="newsletter" checked={settings.newsletter} onChange={handleChange} />
          Subscribe to newsletter
        </label>
        <select name="theme" value={settings.theme} onChange={handleChange}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <select name="role" value={settings.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
        </select>
      </form>
      <pre>{JSON.stringify(settings, null, 2)}</pre>
    </div>
  );
}

// EXERCISE 7.4: Dynamic Form Fields
function DynamicForm() {
  const [fields, setFields] = useState([{ id: 1, value: '' }]);

  const addField = () => {
    // TODO: Add a new field to the array
    // HINT: Generate unique ID with Date.now()
  };

  const removeField = (id) => {
    // TODO: Remove field with matching id
    // HINT: Use .filter()
  };

  const updateField = (id, value) => {
    // TODO: Update specific field's value
    // HINT: Use .map() and check id
  };

  return (
    <div className="dynamic-form">
      <h4>Dynamic Fields</h4>
      {/* TODO: Render fields with remove button each */}
      <button onClick={addField}>Add Field</button>
      <pre>{JSON.stringify(fields, null, 2)}</pre>
    </div>
  );
}

export default function FormsExercise() {
  return (
    <div className="exercise">
      <h2>Exercise 07: Forms</h2>
      <section>
        <h3>7.1 Basic Form</h3>
        <BasicForm />
      </section>
      <section>
        <h3>7.2 Validated Form</h3>
        <ValidatedForm />
      </section>
      <section>
        <h3>7.3 Multiple Input Types</h3>
        <MultipleInputTypes />
      </section>
      <section>
        <h3>7.4 Dynamic Form Fields</h3>
        <DynamicForm />
      </section>
    </div>
  );
}
