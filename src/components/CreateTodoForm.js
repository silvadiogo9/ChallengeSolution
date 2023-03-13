import React, { useState } from 'react';

function CreateTodoForm({ addTodo }) {
  const [todo, setTodo] = useState({});

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        className="taskText"
        type="text"
        placeholder="Write your new task here..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        className="submit"
        type="submit"
        onClick={() => addTodo(todo)}
      >
        Create
      </button>
    </form>
  );
}

export default CreateTodoForm;
