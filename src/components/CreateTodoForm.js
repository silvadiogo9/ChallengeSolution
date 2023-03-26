import React, { useState } from 'react';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import ActionButton from './ActionButton';

function CreateTodoForm({ addTodo }) {
  const [todoDescription, setTodoDescription] = useState('');

  return (
    <form style={{ marginBottom: '10px', display: 'flex' }} onSubmit={(e) => e.preventDefault()}>
      <input
        className="taskText"
        type="text"
        placeholder="Write your new task here..."
        value={todoDescription}
        onChange={(e) => setTodoDescription(e.target.value)}
      />
      <ActionButton
        type="submit"
        action={() => {
          addTodo(todoDescription);
          setTodoDescription('');
        }}
        icon={faAdd}
        color="#292929"
      />
    </form>
  );
}

export default CreateTodoForm;
