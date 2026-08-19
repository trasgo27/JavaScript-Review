/**
 * EXERCISE 12: useReducer HOOK
 * =============================
 * 
 * OBJECTIVE: Manage complex state with a reducer pattern.
 * 
 * CONCEPTS:
 * - useReducer: alternative to useState for complex state
 * - Dispatch actions to update state
 * - Reducer function: (state, action) => newState
 * - Similar to Redux pattern
 * - Good for: complex objects, multiple sub-values, next state depends on previous
 */

import { useReducer, useState } from 'react';

// ============================================
// EXERCISE 12.1: Counter with useReducer
// ============================================
const counterInitial = { count: 0 };

function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return counterInitial;
    case 'SET':
      return { count: action.payload };
    default:
      return state;
  }
}

function CounterWithReducer() {
  const [state, dispatch] = useReducer(counterReducer, counterInitial);

  return (
    <div className="counter-reducer">
      <h4>Count: {state.count}</h4>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      <button onClick={() => dispatch({ type: 'SET', payload: 100 })}>Set to 100</button>
    </div>
  );
}

// ============================================
// EXERCISE 12.2: Todo List with useReducer
// ============================================
const todosInitial = {
  items: [
    { id: 1, text: 'Learn useReducer', completed: false },
    { id: 2, text: 'Build a project', completed: false }
  ],
  filter: 'all'
};

function todosReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        items: [...state.items, { id: Date.now(), text: action.payload, completed: false }]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload ? { ...item, completed: !item.completed } : item
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

function TodoListWithReducer() {
  const [state, dispatch] = useReducer(todosReducer, todosInitial);
  const [newTodo, setNewTodo] = useState('');

  const filteredTodos = state.items.filter(todo => {
    if (state.filter === 'active') return !todo.completed;
    if (state.filter === 'completed') return todo.completed;
    return true;
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch({ type: 'ADD_TODO', payload: newTodo });
      setNewTodo('');
    }
  };

  return (
    <div className="todo-reducer">
      <form onSubmit={handleAdd}>
        <input value={newTodo} onChange={e => setNewTodo(e.target.value)} placeholder="Add todo" />
        <button type="submit">Add</button>
      </form>
      
      <div className="filters">
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'all' })} className={state.filter === 'all' ? 'active' : ''}>All</button>
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'active' })} className={state.filter === 'active' ? 'active' : ''}>Active</button>
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'completed' })} className={state.filter === 'completed' ? 'active' : ''}>Completed</button>
      </div>

      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <span onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}>
              {todo.completed ? '[x]' : '[ ]'} {todo.text}
            </span>
            <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ============================================
// EXERCISE 12.3: Shopping Cart
// ============================================
const cartInitial = { items: [], total: 0 };

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
          total: state.total + action.payload.price
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        total: state.total + action.payload.price
      };
    }
    case 'REMOVE_ITEM': {
      const item = state.items.find(i => i.id === action.payload);
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.payload),
        total: state.total - (item ? item.price * item.quantity : 0)
      };
    }
    case 'CLEAR_CART':
      return cartInitial;
    default:
      return state;
  }
}

function ShoppingCart() {
  const [cart, dispatch] = useReducer(cartReducer, cartInitial);
  
  const products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Phone', price: 699 },
    { id: 3, name: 'Tablet', price: 499 }
  ];

  return (
    <div className="shopping-cart">
      <h4>Products</h4>
      {products.map(p => (
        <div key={p.id}>
          {p.name} - ${p.price}
          <button onClick={() => dispatch({ type: 'ADD_ITEM', payload: p })}>Add</button>
        </div>
      ))}
      
      <h4>Cart ({cart.items.length} items)</h4>
      {cart.items.map(item => (
        <div key={item.id}>
          {item.name} x{item.quantity}
          <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}>Remove</button>
        </div>
      ))}
      <p>Total: ${cart.total}</p>
      <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>Clear Cart</button>
    </div>
  );
}

export default function UseReducerHook() {
  return (
    <div className="exercise">
      <h2>Exercise 12: useReducer Hook</h2>
      <section>
        <h3>12.1 Counter Reducer</h3>
        <CounterWithReducer />
      </section>
      <section>
        <h3>12.2 Todo List Reducer</h3>
        <TodoListWithReducer />
      </section>
      <section>
        <h3>12.3 Shopping Cart</h3>
        <ShoppingCart />
      </section>
    </div>
  );
}
