import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function TodoItem({ id, title, done, onToggleDone, onDelete }) {
  return (
    <div>
      <span style={{ textDecoration: done ? "line-through" : "none" }}>
        {title}
      </span>{" "}
      <button onClick={() => onToggleDone(id, !done)}>
        {done ? "Undo" : "Done"}
      </button>{" "}
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (title) => {
    const newTodo = { id: Date.now(), title, done: false };
    setTodos((todos) => [...todos, newTodo]);
  };

  const handleToggleDone = (id, done) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, done } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.elements.title.value;
          handleAddTodo(title);
          event.target.reset();
        }}
      >
        <label htmlFor="title">Title:</label>{" "}
        <input type="text" id="title" />{" "}
        <button type="submit">Add</button>
      </form>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          done={todo.done}
          onToggleDone={handleToggleDone}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default App;
