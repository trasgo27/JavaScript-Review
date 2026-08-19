/**
 * REACT EXERCISES NAVIGATOR
 * ==========================
 * 
 * This is the main App component that lets you navigate between exercises.
 * 
 * HOW TO USE:
 * 1. Uncomment the exercise you want to work on
 * 2. Comment out the others
 * 3. Run: npm run dev
 * 4. Complete the TODO sections in each exercise file
 */

import { useState } from 'react';

// ============================================
// EXERCISE IMPORTS - Uncomment one at a time
// ============================================
// TODO: Uncomment the exercise you want to work on
import JSXBasics from './exercises/01-jsx-basics.jsx';
import ComponentsAndProps from './exercises/02-components-props.jsx';
import UseStateHook from './exercises/03-usestate-hook.jsx';
import EventHandling from './exercises/04-event-handling.jsx';
import ConditionalRendering from './exercises/05-conditional-rendering.jsx';
import ListsAndKeys from './exercises/06-lists-keys.jsx';
import FormsExercise from './exercises/07-forms.jsx';
import UseEffectHook from './exercises/08-useeffect-hook.jsx';
import UseContextHook from './exercises/09-usecontext-hook.jsx';
import UseRefHook from './exercises/10-useref-hook.jsx';
import CustomHooks from './exercises/11-custom-hooks.jsx';
import UseReducerHook from './exercises/12-usereducer-hook.jsx';
import PerformanceOptimization from './exercises/13-performance.jsx';
import ErrorBoundaries from './exercises/14-error-boundaries.jsx';

// ============================================
// EXERCISE LIST
// ============================================
const exercises = [
  { id: 1, name: 'JSX Basics', component: JSXBasics, level: 'Basic' },
  { id: 2, name: 'Components & Props', component: ComponentsAndProps, level: 'Basic' },
  { id: 3, name: 'useState Hook', component: UseStateHook, level: 'Basic' },
  { id: 4, name: 'Event Handling', component: EventHandling, level: 'Basic' },
  { id: 5, name: 'Conditional Rendering', component: ConditionalRendering, level: 'Intermediate' },
  { id: 6, name: 'Lists & Keys', component: ListsAndKeys, level: 'Intermediate' },
  { id: 7, name: 'Forms', component: FormsExercise, level: 'Intermediate' },
  { id: 8, name: 'useEffect Hook', component: UseEffectHook, level: 'Intermediate' },
  { id: 9, name: 'useContext Hook', component: UseContextHook, level: 'Intermediate' },
  { id: 10, name: 'useRef Hook', component: UseRefHook, level: 'Advanced' },
  { id: 11, name: 'Custom Hooks', component: CustomHooks, level: 'Advanced' },
  { id: 12, name: 'useReducer Hook', component: UseReducerHook, level: 'Advanced' },
  { id: 13, name: 'Performance', component: PerformanceOptimization, level: 'Advanced' },
  { id: 14, name: 'Error Boundaries', component: ErrorBoundaries, level: 'Advanced' }
];

const levelColors = {
  Basic: '#4caf50',
  Intermediate: '#ff9800',
  Advanced: '#f44336'
};

// ============================================
// MAIN APP
// ============================================
function App() {
  const [selectedExercise, setSelectedExercise] = useState(null);

  const SelectedComponent = selectedExercise?.component;

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#1a1a2e' }}>React Exercises</h1>
        <p style={{ color: '#666' }}>14 exercises to master React fundamentals</p>
      </header>

      {/* Navigation */}
      <nav style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px', marginBottom: '30px' }}>
        {exercises.map(exercise => (
          <button
            key={exercise.id}
            onClick={() => setSelectedExercise(exercise)}
            style={{
              padding: '10px 15px',
              border: selectedExercise?.id === exercise.id ? '2px solid #61dafb' : '1px solid #ddd',
              borderRadius: '8px',
              background: selectedExercise?.id === exercise.id ? '#e3f2fd' : 'white',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s'
            }}
          >
            <span style={{ display: 'block', fontWeight: '600' }}>{exercise.id}. {exercise.name}</span>
            <span style={{ 
              display: 'inline-block', 
              fontSize: '0.75em', 
              padding: '2px 6px', 
              borderRadius: '4px', 
              background: levelColors[exercise.level],
              color: 'white',
              marginTop: '4px'
            }}>
              {exercise.level}
            </span>
          </button>
        ))}
      </nav>

      {/* Exercise Content */}
      {SelectedComponent ? (
        <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <button 
            onClick={() => setSelectedExercise(null)}
            style={{ marginBottom: '20px', padding: '8px 16px', border: 'none', borderRadius: '6px', background: '#f0f0f0', cursor: 'pointer' }}
          >
            ← Back to List
          </button>
          <SelectedComponent />
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: '#666' }}>Select an exercise to begin</h2>
          <p style={{ color: '#999' }}>Click any exercise above to view and complete it</p>
        </div>
      )}
    </div>
  );
}

export default App;
