# React.js Student Guide — Day 2
## Advanced React, State Architecture & Production Concepts

Welcome to Day 2! In Day 1, you learned JavaScript fundamentals, component composition, JSX, basic props, and `useState`/`useEffect`. 

Today, we transition from building isolated components to architecting a **full-featured, multi-page, production-ready web application**.

---

## Day 2 Learning Roadmap

```text
[Day 1: Component & Local State]
               ↓
[Forms & Controlled Inputs] ─── Single source of truth for user input
               ↓
[Conditional UI & Dynamic Lists] ─── Declarative rendering & reconciliation
               ↓
[Styling Approaches] ─── Scoped, dynamic, and clean UI styling
               ↓
[React Router] ─── Multi-page navigation in a Single Page App (SPA)
               ↓
[Redux Toolkit (RTK)] ─── Predictable global state management
               ↓
[Async UI & Error Handling] ─── Loading, error, empty, and retry states
               ↓
[Auth & Security Concepts] ─── JWT sessions, protected routes, and CAPTCHA
               ↓
[Production Capstone Project] ─── Task Management Dashboard
```

---

# 1. Working with Forms in React

In vanilla HTML/JavaScript, the DOM holds the state of an `<input>` element. In React, we prefer **Controlled Components**, where React state is the single source of truth.

---

### Mental Model: Controlled Inputs

```text
User types letter 'A'
         ↓
Browser fires `onChange` event
         ↓
React event handler captures `event.target.value`
         ↓
`setTitle("A")` updates state
         ↓
React re-renders the component
         ↓
`<input value={title} />` displays "A"
```

> **Key Rule:** An input does not change its displayed text on its own. React state dictates what is shown.

---

### Code Example: Basic Controlled Input

```jsx
import { useState } from "react";

export function TaskForm() {
  const [title, setTitle] = useState("");

  return (
    <div>
      <label htmlFor="task-title">Task Title:</label>
      <input
        id="task-title"
        type="text"
        placeholder="Enter task name..."
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <p>Current value in state: <strong>{title}</strong></p>
    </div>
  );
}
```

---

### Form Submission & `event.preventDefault()`

By default, an HTML `<form>` submits via HTTP POST/GET and reloads the browser. In modern Single Page Applications (SPAs), we intercept this behavior using `event.preventDefault()`.

```jsx
import { useState } from "react";

export function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault(); // Prevents browser page reload

    // 1. Validation
    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    // 2. Pass data upward to parent
    onAddTask({
      id: Date.now(),
      title: title.trim(),
      priority,
      completed: false,
    });

    // 3. Reset form state
    setTitle("");
    setPriority("Medium");
    setError("");
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError(""); // Clear error when typing
          }}
        />
        {error && <span className="error-text">{error}</span>}
      </div>

      <div>
        <label>Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <button type="submit">Add Task</button>
    </form>
  );
}
```

---

### Common Form Gotchas
1. **Passing the event handler incorrectly:**
   ```jsx
   // WRONG: setTitle receives the entire synthetic event object!
   <input onChange={setTitle} />

   // CORRECT: extract .target.value
   <input onChange={(e) => setTitle(e.target.value)} />
   ```
2. **Missing `value` attribute:**
   An input with `onChange` but no `value` is uncontrolled. Always bind both `value` and `onChange`.
3. **Button types inside `<form>`:**
   Any `<button>` inside a `<form>` defaults to `type="submit"`. If you need a cancel or clear button, explicitly specify `type="button"`.

---

# 2. Conditional Rendering

In React, you don't need template directives like `v-if` or `*ngIf`. You use standard JavaScript logic (`if`, ternary `? :`, and `&&`).

---

### Mental Model: Declarative UI Based on State

```text
[State: isLoading = true]   ─── renders ───> <Spinner />
[State: error != null]      ─── renders ───> <ErrorMessage />
[State: tasks.length === 0] ─── renders ───> <EmptyPlaceholder />
[State: tasks.length > 0]   ─── renders ───> <TaskList />
```

---

### The 4 Core Patterns

#### Pattern 1: Early Return (`if / else`)
Best for full-component switching (e.g., loading screens or error screens).

```jsx
function TaskDashboard({ loading, error, tasks }) {
  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (tasks.length === 0) return <p>No tasks found. Create one!</p>;

  return <TaskList tasks={tasks} />;
}
```

#### Pattern 2: Ternary Operator (`condition ? <True /> : <False />`)
Best for inline branching between two alternative elements.

```jsx
function TaskItem({ task, onToggle }) {
  return (
    <div className={task.completed ? "task-done" : "task-pending"}>
      <span>{task.title}</span>
      <button onClick={() => onToggle(task.id)}>
        {task.completed ? "Mark Incomplete" : "Mark Complete"}
      </button>
    </div>
  );
}
```

#### Pattern 3: Logical AND (`condition && <Element />`)
Best when you want to render something or render nothing at all.

```jsx
function UserBanner({ user }) {
  return (
    <header>
      <h2>Welcome, {user.name}!</h2>
      {user.isAdmin && <button className="admin-btn">Admin Settings</button>}
    </header>
  );
}
```

---

### Critical Gotcha: The Falsy `0` Bug

In JavaScript, `0 && <Component />` evaluates to `0`, which React renders directly as the number `0` on your screen!

```jsx
// DANGEROUS: If tasks.length is 0, React prints "0" on the webpage!
{tasks.length && <TaskList tasks={tasks} />}

// SAFE FIX 1: Explicit boolean comparison
{tasks.length > 0 && <TaskList tasks={tasks} />}

// SAFE FIX 2: Boolean conversion
{Boolean(tasks.length) && <TaskList tasks={tasks} />}
```

---

# 3. Lists and Keys

To render a list of data, use JavaScript's native `.map()` method to transform an array of data into an array of JSX elements.

---

### Mental Model: Virtual DOM Reconciliation & Keys

When state changes, React compares the new Virtual DOM with the old one (Reconciliation). React needs to know **which exact item was added, removed, or moved**.

```text
Without Keys:
React re-renders the whole list or confuses DOM input states.

With Unique Keys:
Item id="101"  ─── matches ───> Item id="101" (keep DOM node, update text)
Item id="102"  ─── matches ───> Item id="102" (keep DOM node)
Item id="103"  ─── [NEW]   ───> Insert new DOM node
```

---

### Code Example: Rendering Lists

```jsx
function TaskList({ tasks, onDeleteTask }) {
  if (tasks.length === 0) {
    return <p className="empty-message">No tasks to display.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className="task-item">
          <span>{task.title}</span>
          <span className={`badge badge-${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
          <button onClick={() => onDeleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

---

### Rules for Keys

| Type | Example | Status | Reason |
|---|---|---|---|
| **Database / Unique ID** | `key={task.id}` | **Best** | Stable, unique, survives reordering |
| **UUID / Timestamp on creation** | `key={task.uuid}` | **Good** | Remains constant across renders |
| **Array Index** | `key={index}` | **Risky** | Breaks input focus and animations if list is sorted, filtered, or items are deleted |
| **Random Number** | `key={Math.random()}` | **Avoid** | Generates a new key every render, destroying and recreating DOM nodes every time |

---

# 4. Styling in React

React gives you several ways to style components. Here are the three most common:

### 1. External / Module CSS (Recommended for standard apps)
```css
/* TaskItem.css */
.task-item {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  border-bottom: 1px solid #e2e8f0;
}
.completed {
  text-decoration: line-through;
  opacity: 0.6;
}
```

```jsx
import "./TaskItem.css";

function TaskItem({ task }) {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      {task.title}
    </div>
  );
}
```

### 2. Inline Styles (JavaScript Objects)
In JSX, inline styles are JavaScript objects. Property names use **camelCase**, and string values must be quoted.

```jsx
function StatusBadge({ priority }) {
  const badgeStyle = {
    padding: "4px 8px",
    borderRadius: "4px",
    fontWeight: "bold",
    backgroundColor: priority === "High" ? "#fee2e2" : "#e0f2fe",
    color: priority === "High" ? "#991b1b" : "#0369a1",
  };

  return <span style={badgeStyle}>{priority}</span>;
}
```

---

# 5. Client-Side Routing with React Router

In traditional websites (Multi-Page Applications), clicking a link causes the browser to request a new HTML file from the server, causing a blank screen flash and reload.

In a **Single Page Application (SPA)**, React stays loaded in memory. **React Router** intercepts URL changes and renders the matching component instantly without refreshing the page.

---

### Mental Model: URL to Component Mapping

```text
Browser URL: "/tasks/101"
          ↓
<BrowserRouter> listens to history API
          ↓
<Routes> compares path against child <Route> elements
          ↓
Matches: <Route path="/tasks/:id" element={<TaskDetails />} />
          ↓
Mounts <TaskDetails /> into the page
```

---

### Installation & Setup

```bash
npm install react-router
```

In `main.jsx`:
```jsx
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

---

### Core Building Blocks

#### 1. Defining Routes in `App.jsx`
```jsx
import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import TasksPage from "./pages/TasksPage";
import TaskDetails from "./pages/TaskDetails";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/tasks/:taskId" element={<TaskDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
```

#### 2. Declarative Links: `<Link>` vs `<NavLink>`
Never use `<a href="/tasks">` for internal links—it triggers a full page refresh!

```jsx
import { Link, NavLink } from "react-router";

// Link: Standard navigation
<Link to="/tasks">View All Tasks</Link>

// NavLink: Automatically provides `isActive` state for styling active tabs
<NavLink
  to="/tasks"
  className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
>
  Tasks
</NavLink>
```

#### 3. Reading Dynamic Route Parameters (`useParams`)
When a route is defined with a dynamic segment (`/tasks/:taskId`), use `useParams()` to read the value from the URL.

```jsx
import { useParams, useNavigate } from "react-router";

export function TaskDetails() {
  const { taskId } = useParams(); // Extracts taskId from URL
  const navigate = useNavigate();

  return (
    <div className="card">
      <h2>Task Details</h2>
      <p>Viewing task ID: <strong>{taskId}</strong></p>

      {/* Programmatic navigation */}
      <button onClick={() => navigate("/tasks")}>Back to Tasks</button>
    </div>
  );
}
```

#### 4. Nested Routes and Layouts (`<Outlet />`)
Nested routes allow parent layouts (e.g., sidebars, dashboards) to remain mounted while child views swap in and out.

```jsx
import { Routes, Route, Outlet } from "react-router";

function AppLayout() {
  return (
    <div className="layout">
      <aside className="sidebar">Sidebar Links</aside>
      <div className="content">
        {/* The matched child route renders right here */}
        <Outlet />
      </div>
    </div>
  );
}

// In route configuration:
<Routes>
  <Route path="/" element={<AppLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="tasks" element={<TasksPage />} />
    <Route path="settings" element={<SettingsPage />} />
  </Route>
</Routes>
```

---

# 6. Global State Management with Redux Toolkit (RTK)

As your React app grows, passing props down through many levels of components (**Prop Drilling**) becomes messy and difficult to maintain.

---

### Mental Model: The Prop-Drilling Problem vs Global Store

```text
Prop Drilling (Without Redux):
App (state: tasks)
  └── Dashboard
        └── MainContent
              └── TaskList
                    └── TaskItem (needs tasks!)

Global Store (With Redux Toolkit):
┌──────────────────────────────────────────────┐
│           Redux Store (tasks)                │
└──────────────────────────────────────────────┘
       ▲                                 │
       │ dispatch(taskAdded)             │ useSelector
       │                                 ▼
   TaskForm                          TaskItem
```

---

### The Redux Unidirectional Flow

```text
1. User clicks "Add Task"
        ↓
2. Component calls `dispatch(taskAdded(newTask))`
        ↓
3. Redux matches action to the Slice Reducer
        ↓
4. Reducer produces the updated state
        ↓
5. Components subscribed with `useSelector` re-render with new data
```

---

### Implementation with Redux Toolkit

Install required packages:
```bash
npm install @reduxjs/toolkit react-redux
```

#### Step 1: Create a Slice (`src/features/tasks/tasksSlice.js`)
A "slice" contains the state and the reducer functions for a single domain of your app.

```javascript
import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, title: "Learn React Basics", completed: true },
  { id: 2, title: "Master Redux Toolkit", completed: false },
];

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    taskAdded: (state, action) => {
      // RTK uses Immer internally: mutating syntax is converted to immutable updates!
      state.push(action.payload);
    },
    taskDeleted: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
    taskToggled: (state, action) => {
      const task = state.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
});

// Export action creators generated by createSlice
export const { taskAdded, taskDeleted, taskToggled } = tasksSlice.actions;

// Export reducer for store configuration
export default tasksSlice.reducer;
```

#### Step 2: Configure the Store (`src/app/store.js`)
```javascript
import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasks/tasksSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});
```

#### Step 3: Provide the Store to React (`src/main.jsx`)
```jsx
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

#### Step 4: Use Redux in Components (`useSelector` & `useDispatch`)

```jsx
import { useSelector, useDispatch } from "react-redux";
import { taskToggled, taskDeleted } from "../features/tasks/tasksSlice";

export function TaskList() {
  // Read state from Redux
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <span
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
            onClick={() => dispatch(taskToggled(task.id))}
          >
            {task.title}
          </span>
          <button onClick={() => dispatch(taskDeleted(task.id))}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

---

### When to Use `useState` vs Redux

| Use Local State (`useState`) | Use Global State (Redux Toolkit) |
|---|---|
| Form input text while typing | Authenticated user profile |
| Modal open / close toggle | Shared task / cart data needed across routes |
| Hover / dropdown animations | Theme preferences (Dark / Light mode) |
| Component-specific temporary values | Data cached from backend APIs |

---

# 7. Async UI States & Robust Error Handling

Real-world web apps deal with network requests, loading spinners, and unexpected errors. Never leave the user looking at a frozen blank screen.

---

### Mental Model: The 4 UI States

```text
[IDLE] ─── user initiates action ───> [LOADING]
                                          │
                        ┌─────────────────┴─────────────────┐
                        ▼                                   ▼
                   [SUCCESS]                             [ERROR]
               Render fresh data                   Show retry button
```

---

### Complete Async Pattern in React

```jsx
import { useState, useEffect } from "react";

export function TaskManagerApiView() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchTasks() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  // 1. Loading State
  if (loading) {
    return <div className="spinner">Loading your tasks...</div>;
  }

  // 2. Error State with Retry
  if (error) {
    return (
      <div className="error-box">
        <p className="error-text">Error: {error}</p>
        <button onClick={fetchTasks}>Retry Request</button>
      </div>
    );
  }

  // 3. Empty State
  if (tasks.length === 0) {
    return <p>No tasks found.</p>;
  }

  // 4. Success State
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  );
}
```

---

# 8. Authentication & Security Fundamentals (JWT & CAPTCHA)

Understanding security boundaries is critical for software engineers.

---

### JSON Web Tokens (JWT)

A **JSON Web Token (JWT)** is a compact, URL-safe token used to transmit identity between parties.

Structure:
```text
header.payload.signature
  ↑       ↑        ↑
Base64  Base64   HMACSHA256 signature
```

#### Mental Model: The Hotel Key Card Analogy
1. You check into a hotel and show your ID (Login with credentials).
2. The front desk verifies you and hands you an encoded key card (Backend issues JWT).
3. Every time you enter a room or gym, you tap the card (Frontend passes JWT with requests).
4. The door lock verifies the card signature instantly without calling the manager (Backend verifies signature statelessly).

#### Critical Security Rules for JWT:
- **Payload is NOT encrypted:** Anyone can decode Base64 and view the payload. **Never put passwords or private API keys in a JWT payload!**
- **Where to store tokens:**
  - **HttpOnly Cookies (Recommended):** Inaccessible to JavaScript, defending against Cross-Site Scripting (XSS) attacks.
  - **LocalStorage:** Easier for prototypes, but vulnerable if your site has an XSS vulnerability.
- **Frontend vs Backend Security:**
  Hiding a button in React (`{!user && <AdminPanel />}`) is only a **user experience** convenience. The **backend must enforce real authorization** on every single API request.

---

### Protected Routes Pattern in React Router

Redirect unauthorized users away from private pages:

```jsx
import { Navigate, Outlet } from "react-router";

export function ProtectedRoute({ isAuthenticated }) {
  if (!isAuthenticated) {
    // Redirect to login page
    return <Navigate to="/login" replace />;
  }

  // Render the protected child page
  return <Outlet />;
}

// In App.jsx routes:
<Routes>
  <Route path="/login" element={<Login />} />

  {/* Protected route wrapper */}
  <Route element={<ProtectedRoute isAuthenticated={userLoggedIn} />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/tasks" element={<TasksPage />} />
  </Route>
</Routes>
```

---

### CAPTCHA & Human Verification

Systems like **Google reCAPTCHA** or **Cloudflare Turnstile** protect applications from bots, brute-force login attempts, and automated spam.

#### Mental Model: Server-Side Token Verification

```text
User fills out form
        ↓
Verification widget executes in browser
        ↓
Widget generates temporary `captchaToken`
        ↓
Frontend submits `captchaToken` along with form data to YOUR backend
        ↓
YOUR Backend sends `captchaToken` + secretKey to Provider API (Cloudflare / Google)
        ↓
Provider returns { success: true }
        ↓
Backend saves data and responds to user
```

> **The Golden Security Rule:** 
> Never verify CAPTCHA solely on the frontend! An attacker can bypass client JavaScript. The secret key must **never** be included in your React code—it must remain strictly on the backend server.

---

# 9. Capstone Architecture: Task Management Dashboard

Here is how all Day 2 concepts assemble into a production-grade application:

### Recommended Project Structure
```text
src/
├── app/
│   └── store.js                # Redux Toolkit store setup
├── features/
│   ├── auth/
│   │   └── authSlice.js        # Auth state (user, token, status)
│   └── tasks/
│       └── tasksSlice.js       # Task management slice (add, toggle, delete)
├── components/
│   ├── Navbar.jsx              # NavLinks for navigation
│   ├── ProtectedRoute.jsx      # Route guard
│   ├── TaskForm.jsx            # Controlled form with validation
│   ├── TaskList.jsx            # List rendering with keys
│   └── ErrorAlert.jsx          # Reusable error badge
├── pages/
│   ├── LoginPage.jsx           # Form submission & auth dispatch
│   ├── DashboardPage.jsx       # Overview & metrics
│   ├── TasksPage.jsx           # Task management
│   ├── TaskDetailPage.jsx      # Dynamic route (:id) with useParams
│   └── NotFoundPage.jsx        # 404 handler
├── App.jsx                     # Route definitions
└── main.jsx                    # Provider & BrowserRouter mounts
```

---

# 10. Student Quick Reference & Gotchas Wall

### 10 Gotchas to Avoid in Your Code

1. **Direct state mutation:**
   ```javascript
   // WRONG in React useState:
   tasks.push(newTask);
   // CORRECT:
   setTasks([...tasks, newTask]);
   ```
2. **Forgetting `event.preventDefault()`:** Always call it in form `onSubmit` handlers.
3. **Using array indices as keys** on dynamic lists that can be reordered or filtered.
4. **The `0` render bug:** Use `tasks.length > 0 && <List />` instead of `tasks.length && <List />`.
5. **Using `<a>` tags instead of `<Link>` or `<NavLink>`:** Standard anchor tags force full page reloads.
6. **Storing sensitive secrets in React code:** Everything in frontend code is public.
7. **Mutating state outside Redux Toolkit slices:** Immer only works inside `createSlice` reducers.
8. **Overusing Redux for simple form inputs:** Keep temporary typing state inside `useState`.
9. **Relying on client-side authentication alone:** The server must always validate tokens.
10. **Forgetting loading and error UI:** Always provide visual feedback during async operations.

---

# 11. Top Interview Questions & Answers

### Q1: What is the difference between controlled and uncontrolled components?
**Answer:** A controlled component's input value is managed directly by React state via `value` and `onChange`. In an uncontrolled component, the DOM handles the form data internally, which is accessed using a React ref (`useRef`).

### Q2: Why are `key` props necessary when rendering lists?
**Answer:** Keys provide a persistent identity for items in the Virtual DOM. During reconciliation, React uses keys to determine which elements have been inserted, reordered, or deleted, ensuring efficient DOM updates and preserving component internal state.

### Q3: When should you use Redux instead of React's built-in `useState`?
**Answer:** Use `useState` for local, component-specific state (like form inputs or UI toggles). Use Redux for global application state that is accessed and modified by many components across different routes (like authenticated user info or shared data collections).

### Q4: How does React Router differ from traditional browser navigation?
**Answer:** Traditional navigation makes a new HTTP request to the server for every URL, reloading the page. React Router intercepts URL changes on the client side and conditionally renders components using JavaScript without triggering page reloads.

### Q5: Can we trust frontend validation and CAPTCHA checks for security?
**Answer:** No. Frontend validation and UI checks provide user experience and immediate feedback, but can easily be bypassed by tools like Postman or `curl`. Real security boundaries and token validations must always be enforced on the backend server.

