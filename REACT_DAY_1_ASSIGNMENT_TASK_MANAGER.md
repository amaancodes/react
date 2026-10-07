# React.js — Day 1 Assignment

## PCCOE — MCA React

> **Assignment:** Build a React-based Task Manager  
> **Covers:** JavaScript + React Fundamentals  
> **Difficulty:** Beginner → Intermediate  
> **Recommended Time:** 2–3 hours  
> **Submission:** GitHub repository + short README

---

# Objective

In Day 1, we learned how JavaScript concepts such as arrays, objects, functions, callbacks, closures, and asynchronous code connect to React concepts such as:

- Components
- Props
- JSX
- State
- Hooks
- Events
- Component composition

Your assignment is to build a **Task Manager** that demonstrates these concepts in one application.

The goal is **not** to make the application visually perfect.

The goal is to demonstrate that you understand how React works.

---

#  What You Need to Build

Build a React application called:

> **Task Manager**

The application should allow a user to:

- View tasks
- Add a new task
- Mark a task as completed
- View task status
- Filter tasks
- Display basic task statistics

---

# Technology Requirements

Use:

- React
- JavaScript
- JSX
- Vite
- CSS

You may use:

- React Hooks
- Browser DevTools
- Basic CSS

### Do NOT use

For this assignment, do not use:

- Redux
- React Router
- UI component libraries
- AI-generated complete solutions
- Backend/database

The purpose is to test your Day 1 fundamentals.

---

# Suggested Project Structure

You may organize your project like this:

```text
src/
│
├── components/
│   ├── Header.jsx
│   ├── TaskForm.jsx
│   ├── TaskList.jsx
│   ├── TaskItem.jsx
│   └── TaskStats.jsx
│
├── App.jsx
├── App.css
└── main.jsx
```

You are free to improve the structure if you can explain why you changed it.

---

# Part 1 — JavaScript Warm-up

Before building the React UI, create a file:

```text
src/data.js
```

Add at least **5 tasks**.

Example structure:

```js
export const initialTasks = [
  {
    id: 1,
    title: "Learn React",
    priority: "High",
    completed: false,
  },
  {
    id: 2,
    title: "Practice JavaScript",
    priority: "Medium",
    completed: true,
  },
];
```

You must have at least:

- 5 tasks
- At least 2 completed tasks
- At least 2 pending tasks
- At least 2 different priorities

---

# Part 2 — Task List

Create a `TaskList` component.

It should display all tasks.

Example:

```text
Task Manager

1. Learn React           High       Pending
2. Practice JavaScript   Medium     Completed
3. Build Portfolio       High       Pending
```

Use:

```js
map()
```

to generate the task list.

---

# Requirement

Every rendered task must have a meaningful and stable `key`.

Example:

```jsx
<TaskItem
  key={task.id}
  task={task}
/>
```

Do NOT use:

```jsx
key={Math.random()}
```

---

# Part 3 — Task Item Component

Create a reusable:

```text
TaskItem
```

component.

It should receive task information using props.

For example:

```jsx
<TaskItem task={task} />
```

The component should display:

- Task title
- Priority
- Completed/Pending status

---

# Think Before You Code

Why should `TaskItem` receive the task through props instead of reading the task array directly?

Write your answer in your README.

---

# Part 4 — Add Task Form

Create a:

```text
TaskForm
```

component.

The form should contain:

```text
Task Title: [______________]

Priority:   [Low ▼]

            [Add Task]
```

The user should be able to add a task.

---

# Requirements

Your form must:

- Use `useState`
- Use controlled inputs
- Use `onChange`
- Use `onSubmit`
- Use `event.preventDefault()`
- Validate that the task title is not empty
- Clear the form after successful submission

---

# Validation

If the user clicks **Add Task** without entering a title, show an error.

Example:

```text
Task title is required.
```

Do NOT allow an empty task to be added.

---

# Part 5 — State Management

The task list must be stored in React state.

Use:

```jsx
const [tasks, setTasks] = useState(...);
```

Do NOT keep the changing task list only in a normal JavaScript variable.

---

# Part 6 — Mark Task as Complete

Each task should have a button.

Example:

```text
Learn React

[Mark Complete]
```

After clicking:

```text
Learn React

[Completed]
```

Clicking again should toggle it back to pending.

---

# Important Requirement

Update the array **immutably**.

You should use a pattern involving:

```js
map()
```

and:

```js
spread syntax
```

Do NOT directly mutate the state like:

```js
task.completed = true;
```

---

# Think Before You Code

Explain in your README:

> Why is directly changing `task.completed` not the preferred way to update React state?

---

# Part 7 — Filter Tasks

Add a filter control:

```text
[ All ▼ ]
```

Options:

```text
All
Pending
Completed
```

Expected behavior:

### All

Show every task.

### Pending

Show only incomplete tasks.

### Completed

Show only completed tasks.

---

# JavaScript Requirement

Use:

```js
filter()
```

to derive the visible tasks.

---

# Important

Do NOT create a second state variable such as:

```js
const [visibleTasks, setVisibleTasks] = useState(...)
```

when `visibleTasks` can be calculated from:

```text
tasks + filter
```

Instead, derive it:

```js
const visibleTasks = ...
```

---

# Part 8 — Task Statistics

Create a:

```text
TaskStats
```

component.

Display:

```text
Total Tasks: 5
Completed: 2
Pending: 3
```

The values must be calculated from the task state.

For example:

```js
tasks.length
```

and suitable array methods.

---

# Important

Do not manually maintain separate state for:

```text
total
completed
pending
```

These values can be derived from the task array.

---

# Part 9 — Component Composition

Your application should contain at least:

```text
App
│
├── Header
├── TaskForm
├── TaskStats
└── TaskList
    └── TaskItem
```

You should pass data/functions through props where appropriate.

---

# Expected Data Flow

Your application should roughly follow:

```text
                 App
                  │
        ┌─────────┼─────────┐
        ↓         ↓         ↓
   TaskForm   TaskStats  TaskList
                           │
                           ↓
                       TaskItem
```

For events:

```text
Child
  │
  │ callback
  ↓
Parent
  │
  │ updates state
  ↓
UI updates
```

---

# Part 10 — useEffect

Add one useful `useEffect()` feature.

### Requirement

Update the browser tab title based on the number of tasks.

Example:

```text
Tasks: 5
```

If the number of tasks changes:

```text
Tasks: 6
```

the document title should update.

---

# Think About This

Ask yourself:

> Is calculating the task count itself something that requires `useEffect`?

You should distinguish between:

```text
Derived data
```

and:

```text
Synchronization with an external system
```

Write a short explanation in your README.

---

# Part 11 — Async JavaScript Challenge

Create a small mock API function in:

```text
src/api.js
```

Example behavior:

```text
fetchTasks()
    ↓
wait 1 second
    ↓
return task data
```

You can simulate this using:

```js
setTimeout()
Promise
async/await
```

Your application should initially show:

```text
Loading tasks...
```

before the mock data is available.

---

# Example Concept

```js
function fetchTasks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(initialTasks);
    }, 1000);
  });
}
```

You may implement it differently.

The important requirement is that you demonstrate:

- Promise
- `async`
- `await`
- React state
- `useEffect`

---

# Part 12 — Error Handling Challenge

Modify your mock API so that it can fail.

For example, you can randomly succeed/fail.

Your UI should be able to show:

```text
Loading tasks...
```

or:

```text
Failed to load tasks.
```

or:

```text
Task list
```

---

# Final UI States

Your app should demonstrate at least these states:

```text
Loading
Success
Error
Empty
```

For example:

### Loading

```text
Loading tasks...
```

### Error

```text
Unable to load tasks.

[Try Again]
```

### Empty

```text
No tasks found.
```

### Success

```text
Task list...
```

---

# Part 13 — Event Handling

Your application must demonstrate React event handling for:

```text
onClick
onChange
onSubmit
```

At minimum:

```jsx
<button onClick={...}>
```

```jsx
<input onChange={...} />
```

```jsx
<form onSubmit={...}>
```

---

# Part 14 — Styling

Your application should be reasonably readable.

You do NOT need a professional UI.

At minimum:

```text
[ ] Good spacing
[ ] Readable typography
[ ] Buttons are distinguishable
[ ] Task status is visually understandable
[ ] Completed tasks look different from pending tasks
[ ] Form is easy to use
```

---

# JavaScript Knowledge Requirements

Your code should demonstrate that you understand:

```text
[ ] map()
[ ] filter()
[ ] find() OR another useful array method
[ ] object spread
[ ] destructuring
[ ] functions
[ ] callbacks
[ ] Promise
[ ] async/await
```

You don't need to force every method into the UI.

Use them where they make sense.

---

# React Knowledge Requirements

Your project should demonstrate:

```text
[ ] Functional components
[ ] JSX
[ ] Props
[ ] Component composition
[ ] useState
[ ] useEffect
[ ] Event handling
[ ] Controlled form
[ ] Conditional rendering
[ ] Lists
[ ] Keys
[ ] Immutable state updates
```

---

# Bonus Challenges

These are optional.

---

## Bonus 1 — Search

Add:

```text
Search tasks: [____________]
```

Filter tasks by title.

Example:

```text
Search: react
```

shows:

```text
Learn React
React Router
React Project
```

---

## Bonus 2 — Delete Task

Add:

```text
[Delete]
```

to every task.

Use immutable state updates.

---

## Bonus 3 — Priority Filter

Add:

```text
High
Medium
Low
```

and allow filtering by priority.

---

## Bonus 4 — Task Counter

Display:

```text
You have 3 pending tasks
```

Use derived data.

---

## Bonus 5 — Local Storage

Persist tasks in:

```text
localStorage
```

If you attempt this, explain why `localStorage` is an external browser API and why `useEffect` may be relevant.

---

# Required Debugging Exercise

Before submitting, intentionally introduce and then fix these mistakes in your own code:

## Bug 1

```jsx
onClick={handleClick()}
```

Understand why it is wrong.

---

## Bug 2

```jsx
tasks.map((task) => {
  <TaskItem task={task} />;
})
```

Understand why no UI is returned.

---

## Bug 3

```jsx
task.completed = true;
```

Understand why this is not the preferred React state update pattern.

---

# Viva Preparation

You may be asked any of these during evaluation.

## JavaScript

1. Difference between `map()` and `forEach()`?
2. Difference between `filter()` and `find()`?
3. What is a callback?
4. What is a closure?
5. What is a Promise?
6. Why use `async/await`?
7. What does object spread do?
8. Is object spread a deep clone?

---

## React

9. What is a component?
10. What are props?
11. What is state?
12. Props vs state?
13. Why doesn't a normal variable update the React UI?
14. Why use `useState()`?
15. What is JSX?
16. What is `useEffect()`?
17. Why can't Hooks be called conditionally?
18. Why does a list need a key?
19. Why can array index be a problematic key?
20. What is a controlled input?
21. Why use `event.preventDefault()`?
22. How does data move from parent to child?
23. How can a child communicate an event to a parent?
24. Why should React state be updated immutably?
25. What causes a React component to render again?

---

# Written Questions

Add a section called:

```text
## My Understanding
```

to your README and answer these in your own words.

### Q1

Why does React need state instead of ordinary JavaScript variables?

### Q2

Explain:

```text
State update
 ↓
Render
 ↓
UI update
```

### Q3

Explain why this works:

```jsx
setTasks((prevTasks) =>
  prevTasks.map((task) =>
    task.id === id
      ? { ...task, completed: !task.completed }
      : task
  )
);
```

### Q4

What problem do components solve?

### Q5

Why is `useEffect` appropriate for synchronizing `document.title`?

### Q6

Why should `visibleTasks` normally be derived from `tasks` and `filter` rather than stored separately?

---

# Expected Application Flow

Your application should roughly work like this:

```text
Open Application
      ↓
Loading...
      ↓
Tasks Loaded
      ↓
Display Task List
      ↓
User Adds Task
      ↓
State Updates
      ↓
Task Appears
      ↓
User Marks Task Complete
      ↓
State Updates
      ↓
UI Updates
      ↓
User Filters Tasks
      ↓
Visible Tasks Change
```

---

# Submission Checklist

Before submitting, verify:

```text
## JavaScript

[ ] I used map()
[ ] I used filter()
[ ] I used object spread
[ ] I used destructuring
[ ] I understand callbacks
[ ] I implemented a Promise
[ ] I used async/await

## React

[ ] I created multiple components
[ ] I passed props
[ ] I used JSX
[ ] I used useState
[ ] I used useEffect
[ ] I handled events
[ ] I built a controlled form
[ ] I used conditional rendering
[ ] I rendered a list with stable keys
[ ] I updated state immutably

## Application

[ ] Add task works
[ ] Toggle task works
[ ] Filter works
[ ] Stats work
[ ] Loading state works
[ ] Error state works
[ ] Empty state works
[ ] UI is readable

## Documentation

[ ] README included
[ ] Screenshots included
[ ] Questions answered
[ ] GitHub repository works
```

---

# Submission Format

## 1. GitHub Repository

Your repository should contain:

```text
README.md
src/
package.json
```

Do not upload:

```text
node_modules/
```

---

## 2. README

Your README must include:

```text
# Task Manager

## Features

## Tech Stack

## How to Run

## Screenshots

## What I Learned

## My Understanding

## Challenges I Faced
```

---

## 3. Screenshots

Include at least:

```text
1. Main task list
2. Add task form
3. Filtered task list
4. Loading/error/empty state
```

---

# Suggested Git Workflow

Create at least these commits:

```text
Initial React setup
Add task list
Add task form
Add task state
Add task filtering
Add async loading/error states
Add styling
```

This is not mandatory, but it is strongly recommended.

---


# Important Rules

## 1. Understand Your Code

You must be able to explain every major part of your submission.

If you copy code from:

- ChatGPT
- Gemini
- Claude
- GitHub
- Stack Overflow
- Tutorials

you are still responsible for understanding it.

---

## 2. AI Is Allowed — Understanding Is Required

You may use AI tools as learning assistants.

However, during evaluation you may be asked:

> Why did you write this?

> What would happen if we removed this dependency?

> Why did you use `map()` here?

> What happens if state is mutated directly?

> Why do we need `key`?

> Why is this input controlled?

If you cannot explain your implementation, marks may be deducted.

---

## 3. No Backend Required

This assignment focuses on Day 1 React and JavaScript.

Use mock data / simulated APIs.

---

# Expected Final Result

A simple but functional application similar to:

```text
┌───────────────────────────────────────────────┐
│                 TASK MANAGER                  │
├───────────────────────────────────────────────┤
│                                               │
│  Total: 5   Completed: 2   Pending: 3         │
│                                               │
│  Add Task                                     │
│  ┌─────────────────────┐                      │
│  │ Task title          │ [High ▼] [Add Task] │
│  └─────────────────────┘                      │
│                                               │
│  Filter: [All ▼]                              │
│                                               │
│  ┌─────────────────────────────────────────┐  │
│  │ Learn React        High    Pending       │  │
│  │                        [Complete]         │  │
│  ├─────────────────────────────────────────┤  │
│  │ Practice JS         Medium Completed     │  │
│  │                        [Undo]             │  │
│  ├─────────────────────────────────────────┤  │
│  │ Build Portfolio     High    Pending       │  │
│  │                        [Complete]         │  │
│  └─────────────────────────────────────────┘  │
│                                               │
└───────────────────────────────────────────────┘
```

Your design does not need to look exactly like this.

---

# What This Assignment Is Actually Testing

This assignment is not primarily testing:

```text
CSS
UI design
number of features
```

It is testing whether you understand:

```text
JavaScript
    ↓
Data
    ↓
Components
    ↓
Props
    ↓
State
    ↓
Events
    ↓
State update
    ↓
React renders
    ↓
UI changes
```

If you understand that flow, you have understood the most important foundation from Day 1.

---

# Final Challenge

Before you submit, close your AI tools and try to explain this application to a classmate without looking at your code.

You should be able to answer:

> Where does the task data live?

> Which component owns the state?

> How does `TaskForm` communicate with `App`?

> How does `TaskItem` trigger a task update?

> Why is `map()` used?

> Why is `filter()` used?

> Why does every task need a key?

> Why are we using `useEffect()`?

> Why shouldn't we directly mutate a task?

> What happens from the moment a user clicks "Complete" until the UI changes?

If you can explain all of those clearly, you are ready for Day 2.
