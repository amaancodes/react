# React.js Student Guide — Day 1
## Foundations of Modern React and Modern JavaScript

Welcome to Day 1! Today is where your journey into modern frontend engineering begins. 

Before diving into React, we will master the essential JavaScript concepts that React relies on every day: array transformations, immutability, asynchronous programming, and closures. Then, we will build your first React components, understand how state and the Virtual DOM work, manage side effects with `useEffect`, and assemble the foundation of our Task Management application.

---

## Day 1 Learning Roadmap

```text
[Modern JavaScript Essentials]
  - map(), filter(), find(), spread operator, destructuring
  - Asynchronous JS: Event Loop, Promises, async/await
  - Closures and Lexical Scope
               |
               v
[Component Architecture]
  - Single-page application fundamentals
  - Components as declarative functions
  - Props and one-way data flow
               |
               v
[JSX and Templating]
  - Embedding JavaScript expressions
  - Rules of JSX and Fragments
               |
               v
[State and Lifecycle]
  - Why regular variables do not trigger UI updates
  - useState and "State as a Snapshot"
  - Immutable state updates (Objects and Arrays)
               |
               v
[Hooks and Side Effects]
  - useEffect and the Dependency Array mental model
  - Effect cleanup functions
  - Rules of Hooks
               |
               v
[Event Handling & Day 1 Integration]
  - Function references vs immediate calls
  - Day 1 Task Manager Working Project
```

---

# 1. Modern JavaScript Essentials for React

React is written in modern JavaScript. If you understand these core JavaScript patterns, React becomes significantly easier.

---

### Array Methods: `map()`, `filter()`, `find()`, and `forEach()`

React applications constantly transform lists of data into UI elements.

| Method | What It Does | Returns | Mutates Original Array? | Common React Use Case |
|---|---|---|---|---|
| `map()` | Transforms every element using a callback | A new array of identical length | No | Rendering lists of JSX elements |
| `filter()` | Selects items that pass a condition | A new array with matching items | No | Deleting items or filtering search results |
| `find()` | Returns the first item matching a condition | The single item or `undefined` | No | Finding a specific task by ID |
| `forEach()` | Executes a function for each item | `undefined` | No | Logging or running side-effects (not for JSX) |

#### Mental Model: Array Transformations

```text
Input Array:    [ 1, 2, 3 ]
                     |
       map(x => x * 2)
                     v
Output Array:   [ 2, 4, 6 ]   <-- New array in memory (original remains unchanged)
```

#### Code Examples

```javascript
const tasks = [
  { id: 1, title: "Learn JavaScript", completed: true },
  { id: 2, title: "Learn React", completed: false },
  { id: 3, title: "Build Project", completed: false },
];

// 1. map(): Extract task titles or transform data
const titles = tasks.map((task) => task.title);
// Result: ["Learn JavaScript", "Learn React", "Build Project"]

// 2. filter(): Keep only pending tasks
const pendingTasks = tasks.filter((task) => !task.completed);
// Result: Array with tasks 2 and 3

// 3. find(): Retrieve task with ID 2
const activeTask = tasks.find((task) => task.id === 2);
// Result: { id: 2, title: "Learn React", completed: false }

// 4. forEach(): Run an action (does NOT return a new array)
tasks.forEach((task) => {
  console.log(`Task: ${task.title}`);
});
```

---

### Object and Array Destructuring

Destructuring extracts properties from objects or items from arrays into standalone variables.

```javascript
const task = {
  id: 101,
  title: "Review Pull Request",
  priority: "High",
};

// Without destructuring:
const titleOld = task.title;
const priorityOld = task.priority;

// With destructuring:
const { title, priority } = task;

// Renaming during destructuring:
const { title: taskTitle, priority: taskPriority } = task;

// Setting default values:
const { status = "Pending" } = task;
```

#### In React Component Props:
```javascript
// Destructuring props directly in the function signature
function TaskCard({ title, priority }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <span>Priority: {priority}</span>
    </div>
  );
}
```

---

### The Spread Operator (`...`) and Immutability

React requires **immutable updates**. Never mutate existing objects or arrays in place. Use the spread operator to create updated copies.

```javascript
const originalTask = {
  id: 1,
  title: "Draft Documentation",
  completed: false,
};

// WRONG: Direct mutation modifies the original object
// originalTask.completed = true;

// CORRECT: Immutable copy with updated property
const updatedTask = {
  ...originalTask,
  completed: true,
};

// Adding an item to an array immutably:
const tasksList = ["Task 1", "Task 2"];
const newTasksList = [...tasksList, "Task 3"];

// Removing an item immutably:
const filteredTasks = tasksList.filter((item) => item !== "Task 1");
```

---

### Asynchronous JavaScript: Event Loop, Promises, and `async/await`

JavaScript is single-threaded. It executes one command at a time using a single Call Stack. To handle long operations (like network API requests or timers) without freezing the page, JavaScript uses an **Event Loop**.

#### Mental Model: The JavaScript Concurrency Model

```text
+-----------------------+      Web APIs / Background
|      CALL STACK       |      (fetch, setTimeout)
| (Synchronous code runs| --------------> When done, pushes callback
|   line by line here)  |                 to appropriate queue
+-----------------------+
            ^
            |  (When Call Stack is completely empty)
    EVENT LOOP
            |
+-----------------------+      Microtask Queue (Promises, async/await)
|    TASK QUEUES        | <--- Higher priority! Runs before next render.
|                       |      Macrotask Queue (setTimeout, setInterval)
+-----------------------+
```

#### Code Example: API Calls with `async/await` and Error Handling

```javascript
async function fetchTasksFromBackend() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=3");
    
    // HTTP errors (like 404 or 500) do NOT reject the fetch promise automatically
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network or parsing failed:", error.message);
    throw error; // Re-throw or return fallback data
  }
}
```

---

### Closures and Lexical Scope

A **closure** is a function that remembers and retains access to variables from its outer (lexical) scope, even after that outer function has finished executing.

#### Mental Model: Closures

```text
createCounter() executes and completes
        |
        +-- Creates local variable: let count = 0
        +-- Returns inner function increment()
        |
increment() maintains a backpack (closure) referencing `count`
Every call to increment() modifies that enclosed `count`
```

#### Code Example:

```javascript
function createCounter() {
  let count = 0; // Private enclosed state

  return function increment() {
    count += 1;
    return count;
  };
}

const counterA = createCounter();
console.log(counterA()); // 1
console.log(counterA()); // 2

const counterB = createCounter(); // Independent closure
console.log(counterB()); // 1
```

#### Why Closures Matter in React:
React event handlers and Hook functions (like `useEffect` and `useState`) are closures! They capture props and state from the specific render pass in which they were created.

```javascript
function TaskItem({ task }) {
  // handleClick forms a closure over the `task` prop
  function handleClick() {
    console.log(`Clicked on task ID: ${task.id}`);
  }

  return <button onClick={handleClick}>Log ID</button>;
}
```

---

# 2. Introduction to React & Component Architecture

### What is React?
React is a declarative, component-based JavaScript library for building user interfaces.

- **Imperative (Vanilla DOM):** You tell the browser step-by-step *how* to change elements (`document.createElement`, `element.appendChild`, `element.classList.add`).
- **Declarative (React):** You tell React *what* the UI should look like for a given state, and React handles the DOM updates efficiently using its **Virtual DOM**.

---

### Project Setup with Vite

We use **Vite** for blazing-fast development:

```bash
npm create vite@latest task-manager -- --template react
cd task-manager
npm install
npm run dev
```

Project structure:
```text
task-manager/
├── index.html          # HTML entry point (contains <div id="root"></div>)
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
└── src/
    ├── main.jsx        # JavaScript entry point (mounts React to DOM)
    ├── App.jsx         # Root React component
    └── index.css       # Global styles
```

---

### Components as Reusable UI Building Blocks

In modern React, a component is simply a JavaScript function that returns JSX.

```jsx
// A modern functional component
export function Header() {
  return (
    <header className="app-header">
      <h1>Task Manager Dashboard</h1>
      <p>Stay productive today</p>
    </header>
  );
}
```

#### Legacy Class Components vs Modern Functional Components
In older codebases (prior to React 16.8), class components were required to hold state. Today, functional components combined with **Hooks** are the universal standard.

```jsx
// LEGACY Class Component (For recognition only):
import React, { Component } from "react";

class OldHeader extends Component {
  render() {
    return <h1>{this.props.title}</h1>;
  }
}

// MODERN Functional Component (What you will write):
function ModernHeader({ title }) {
  return <h1>{title}</h1>;
}
```

---

### Component Composition and the `children` Prop

Instead of building massive components, combine small, focused components. Use the special `children` prop to create flexible wrapper components (such as cards, layouts, and modals).

```jsx
// Card wrapper component
function Card({ title, children }) {
  return (
    <div className="card-container">
      <h3 className="card-title">{title}</h3>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

// Usage:
function App() {
  return (
    <Card title="Task Overview">
      <p>You have 3 tasks pending review.</p>
      <button>View All</button>
    </Card>
  );
}
```

---

### Props: One-Way Data Flow

Data in React flows in one direction: **downwards from parent to child** via `props`.

- Props are **read-only** (immutable). A child component must never modify its received props.
- To notify a parent of user action, pass a **callback function** down from the parent to the child.

```text
Parent Component (owns state: tasks)
        |
        | Passes data down (task={item})
        | Passes callback down (onDelete={handleDelete})
        v
Child Component (TaskItem)
        |
        | User clicks button
        +---> Calls props.onDelete(task.id)  [Signal travels back up]
```

---

# 3. React Essentials (JSX, State, Effects, Events)

---

## 3.1 JSX: JavaScript XML

JSX allows us to write HTML-like markup directly inside JavaScript files. It is transpiled into standard `React.createElement()` calls behind the scenes.

### The 4 Rules of JSX:

1. **Return a single root element:**
   Adjacent elements must be wrapped in a parent tag or a React Fragment (`<> ... </>`).
   ```jsx
   // WRONG:
   // return <h1>Title</h1><p>Description</p>;

   // CORRECT:
   return (
     <>
       <h1>Title</h1>
       <p>Description</p>
     </>
   );
   ```

2. **Embed JavaScript expressions using curly braces `{}`:**
   Any valid JavaScript expression (variables, calculations, ternary checks, function calls) can be evaluated inside `{}`.
   ```jsx
   const taskCount = 5;
   return <h2>Remaining Tasks: {taskCount * 2}</h2>;
   ```

3. **Use camelCase for HTML attributes:**
   - Use `className` instead of `class` (because `class` is a reserved JavaScript keyword).
   - Use `htmlFor` instead of `for`.
   - Use `tabIndex`, `onClick`, `onChange`.

4. **Close all tags:**
   Self-closing tags are mandatory for void elements: `<img />`, `<input />`, `<br />`, `<hr />`.

---

## 3.2 State Management with `useState`

Regular variables do not trigger a UI update when modified because React does not track plain variable reassignment. React provides the `useState` hook to store data that changes over time and triggers re-renders.

```jsx
import { useState } from "react";

function Counter() {
  // Syntax: const [stateValue, setterFunction] = useState(initialValue);
  const [count, setCount] = useState(0);

  return (
    <div className="counter-box">
      <p>Current Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

---

### Mental Model: State as a Snapshot

When React renders a component, it takes a snapshot of the props and state for that specific render pass. Calling a setter function does **not** mutate the variable in the current running function execution; it schedules a future render with the new value.

```javascript
function handleIncrement() {
  setCount(count + 1);
  console.log(count); // Will still log the OLD value in this execution!
}
```

```text
Render Pass 1:
  count = 0
  handleIncrement called -> schedules count = 1
  console.log(count) prints 0

Render Pass 2 (Triggered by state update):
  count = 1
  UI displays 1
```

---

### Functional State Updates

When the next state depends directly on the previous state value, pass an updater function: `(prev) => next`. This guarantees you are calculating against the most current state value, avoiding race conditions.

```jsx
// If you call setCount three times sequentially:
function addThree() {
  // Using direct value: All three read the same snapshot value!
  // setCount(count + 1);
  // setCount(count + 1);
  // setCount(count + 1); // Result: increases by only 1!

  // Using functional updates: React queues each update in order
  setCount((prev) => prev + 1);
  setCount((prev) => prev + 1);
  setCount((prev) => prev + 1); // Result: correctly increases by 3!
}
```

---

### Updating Objects and Arrays in State Immutably

Never use `.push()`, `.pop()`, `.splice()`, or direct property assignment on React state.

#### Updating an Object in State:
```javascript
const [user, setUser] = useState({ name: "Amaan", role: "Developer" });

// Update role while preserving existing properties:
setUser((prevUser) => ({
  ...prevUser,
  role: "Lead Architect",
}));
```

#### Updating an Array in State:
```javascript
const [tasks, setTasks] = useState([
  { id: 1, title: "Initial Task", completed: false },
]);

// 1. Adding a new task:
function addTask(newTitle) {
  const newTask = { id: Date.now(), title: newTitle, completed: false };
  setTasks((prevTasks) => [...prevTasks, newTask]);
}

// 2. Toggling a task (immutably updating one item):
function toggleTask(taskId) {
  setTasks((prevTasks) =>
    prevTasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )
  );
}

// 3. Deleting a task:
function deleteTask(taskId) {
  setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
}
```

---

## 3.3 Component Lifecycle & `useEffect`

A React component goes through three main lifecycle phases:

```text
1. MOUNT      --> Component is created and inserted into the browser DOM
2. UPDATE     --> Props or state change, causing a re-render
3. UNMOUNT    --> Component is removed from the DOM
```

The `useEffect` hook allows functional components to synchronize with external systems (such as API data fetching, document titles, timers, or event listeners).

---

### The Dependency Array Mental Model

The second argument to `useEffect` controls when the effect runs:

```javascript
// Case 1: Empty dependency array []
// Runs EXACTLY ONCE after the initial mount
useEffect(() => {
  console.log("Component mounted into the DOM");
}, []);

// Case 2: Dependencies specified [tasks]
// Runs on mount AND whenever `tasks` changes
useEffect(() => {
  document.title = `Tasks remaining: ${tasks.length}`;
}, [tasks]);

// Case 3: No dependency array provided
// Runs after EVERY completed render (caution: dangerous for network calls!)
useEffect(() => {
  console.log("Component rendered or re-rendered");
});
```

---

### Effect Cleanup Functions

If your effect sets up a subscription, interval, or event listener, return a **cleanup function** to prevent memory leaks and duplicate listeners.

```jsx
import { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // Cleanup function: React calls this when component unmounts
    return () => {
      clearInterval(timerId);
      console.log("Timer cleaned up!");
    };
  }, []); // Run on mount, clean up on unmount

  return <p>Elapsed time: {seconds}s</p>;
}
```

#### React Strict Mode Note:
In local development (`<React.StrictMode>`), React intentionally mounts, unmounts, and re-mounts components once to verify that your effects clean up properly. If you see two console logs on load in development, this is normal and expected.

---

### Rules of Hooks

1. **Call Hooks only at the top level:** Do not call Hooks inside loops, conditions, or nested functions. This ensures Hooks execute in the exact same order every render.
2. **Call Hooks only from React functions:** Call Hooks only from React functional components or custom Hooks (not regular JavaScript functions).

---

## 3.4 Event Handling in React

React wraps native browser events in a cross-browser compatible object called `SyntheticEvent`.

### Rule 1: Pass Function References, Not Invocations
```jsx
// WRONG: Invocations execute IMMEDIATELY on render, causing infinite re-render loops!
// <button onClick={handleClick()}>Click Me</button>

// CORRECT: Pass the function reference so React calls it on click
<button onClick={handleClick}>Click Me</button>
```

### Rule 2: Passing Parameters to Handlers
To pass arguments to an event handler, wrap the call in an arrow function:

```jsx
function TaskItem({ task, onDelete }) {
  return (
    <li>
      <span>{task.title}</span>
      {/* Arrow function wraps the call with the specific parameter */}
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
}
```

---

# 4. Day 1 Project Integration: Task Manager

Here is our complete Day 1 integrated Task Manager application. It demonstrates component composition, props, immutable state updates, event callbacks, and side effects.

```jsx
// src/App.jsx
import { useState, useEffect } from "react";

// Initial sample data
const INITIAL_TASKS = [
  { id: 1, title: "Master JavaScript ES6 Array Methods", completed: true },
  { id: 2, title: "Understand Virtual DOM Reconciliation", completed: false },
  { id: 3, title: "Build Task Manager Components", completed: false },
];

// Header Component
function Header({ taskCount, completedCount }) {
  return (
    <header className="header">
      <h1>Task Manager</h1>
      <p>
        Progress: {completedCount} of {taskCount} completed
      </p>
    </header>
  );
}

// Single Task Item Component
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <span
        className="task-title"
        onClick={() => onToggle(task.id)}
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          cursor: "pointer",
        }}
      >
        {task.completed ? "[X] " : "[ ] "}
        {task.title}
      </span>
      <button
        className="delete-btn"
        onClick={() => onDelete(task.id)}
      >
        Remove
      </button>
    </li>
  );
}

// Task List Component
function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty-message">No tasks available. You are all caught up!</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

// Main Application Component
export default function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  // Synchronize document title with pending tasks
  useEffect(() => {
    const pendingCount = tasks.filter((t) => !t.completed).length;
    document.title = `Task Manager (${pendingCount} pending)`;
  }, [tasks]);

  // Toggle task completed status immutably
  function handleToggleTask(taskId) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  // Remove task from state immutably
  function handleDeleteTask(taskId) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <main className="container">
      <Header taskCount={tasks.length} completedCount={completedCount} />
      <TaskList
        tasks={tasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
      />
    </main>
  );
}
```

---

# 5. Day 1 Gotchas Wall

Here are the 10 most common mistakes junior developers make on Day 1, along with the correct fix:

1. **Mutating State Directly:**
   - *Problem:* `tasks.push(newTask)` or `task.completed = true`.
   - *Fix:* Always return a new array or object using `[...tasks, newTask]` or `{ ...task, completed: true }`.

2. **Immediate Function Execution in Event Handlers:**
   - *Problem:* `onClick={deleteTask(task.id)}` deletes the item immediately during render.
   - *Fix:* Wrap in an arrow function: `onClick={() => deleteTask(task.id)}`.

3. **Treating State Updates as Synchronous:**
   - *Problem:* Reading state immediately after calling `setCount(count + 1)` expecting the updated value.
   - *Fix:* State updates are scheduled. Use `useEffect` or functional updates if you need to derive logic.

4. **Missing Dependency in `useEffect`:**
   - *Problem:* Reading props or state inside an effect without listing them in the dependency array.
   - *Fix:* Include all reactive values used inside the effect in the dependency array.

5. **Using `class` Instead of `className`:**
   - *Problem:* `<div class="card">` produces JSX warnings.
   - *Fix:* Always use `className` in JSX.

6. **Forgetting Return Statements in `.map()`:**
   - *Problem:* `tasks.map(task => { <TaskItem /> })` renders a blank screen because curly braces without `return` return `undefined`.
   - *Fix:* Use implicit return `tasks.map(task => (<TaskItem />))` or explicit return `return <TaskItem />;`.

7. **Missing Unique `key` Prop in Lists:**
   - *Problem:* Rendering list items without unique keys causes inefficient re-renders and UI state bugs.
   - *Fix:* Always provide a unique stable identifier: `<TaskItem key={task.id} />`.

8. **Calling Hooks Conditionally:**
   - *Problem:* `if (isLoggedIn) { useState(...) }`.
   - *Fix:* Hooks must always be declared unconditionally at the very top of your component.

9. **Infinite Loops with `useEffect`:**
   - *Problem:* Calling a state updater inside `useEffect` without a dependency array.
   - *Fix:* Always provide an appropriate dependency array so the effect only runs when needed.

10. **Modifying Props in Child Components:**
    - *Problem:* A child component attempting `props.task.title = "New"`.
    - *Fix:* Props are read-only. Emit a callback prop to request the parent update the state.

---

# 6. Top Day 1 Interview Questions & Answers

### Q1: What is the Virtual DOM and how does React use it?
**Answer:** The Virtual DOM is a lightweight JavaScript object representation of the real DOM kept in memory. When state changes, React creates a new Virtual DOM tree, compares it with the previous one (a process called Reconciliation / Diffing), calculates the minimal required changes, and batch-updates the real browser DOM.

### Q2: What is the difference between Props and State?
**Answer:** Props are inputs passed down from a parent component; they are external and immutable from the child's perspective. State is internal data managed within the component that can change over time via its setter function to trigger re-renders.

### Q3: Why can't we update state directly in React?
**Answer:** Directly modifying state (e.g., `state.count = 5`) does not notify React that data has changed, so React will not schedule a re-render. State setters (like `setCount`) notify React to re-render and guarantee that component updates remain predictable and immutable.

### Q4: When does `useEffect` run with an empty dependency array `[]` vs no array at all?
**Answer:** With an empty array `[]`, the effect runs exactly once after the initial render (mount). With no array provided at all, the effect runs after every single render and re-render of the component.

### Q5: What is a closure in JavaScript and where does React use it?
**Answer:** A closure is a function that retains access to variables from its outer lexical scope even after that outer function has returned. In React, event handlers and effects are closures that capture props and state from the specific render pass in which they were created.

