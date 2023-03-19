import React, { useState } from 'react';

function CreateTodoForm({ addTodo }) {
  const [todoDescription, setTodoDescription] = useState('');

  return (
    <form style={{ marginBottom: '10px' }} onSubmit={(e) => e.preventDefault()}>
      <input
        className="taskText"
        type="text"
        placeholder="Write your new task here..."
        value={todoDescription}
        onChange={(e) => setTodoDescription(e.target.value)}
      />
      <button
        className="submit"
        type="submit"
        onClick={() => {
          addTodo(todoDescription);
          setTodoDescription('');
        }}
      >
        Create
      </button>
    </form>
  );
}

export default CreateTodoForm;
