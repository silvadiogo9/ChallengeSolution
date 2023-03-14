import React, { useState } from 'react';
import { useTodoContext } from '../context/TodoContext';
import ActionButton from './ActionButton';

function Todo({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(todo.description);
  const { deleteTodo, toggleCompleted, editTodoDescription } = useTodoContext();

  return (
    <li style={{ marginTop: '5px' }}>
      <input
        type="checkbox"
        checked={todo.completed}
        style={{ marginRight: '10px', accentColor: 'brown' }}
        onChange={() => toggleCompleted(todo.id)}
      />
      {isEditing
        ? (
          <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        )
        : (
          <>
            {
            // verificar!!! estava sem o {' '}
            }
            {' '}
            {todo.description}
          </>
        )}
      <ActionButton
        action={() => deleteTodo(todo.id)}
        text="Delete"
      />
      {isEditing
        ? (
          <ActionButton
            action={() => {
              editTodoDescription(todo.id, description);
              setIsEditing(false);
            }}
            text="Submit"
          />
        )
        : (
          <ActionButton
            action={() => setIsEditing(true)}
            text="Edit"
          />
        )}
    </li>
  );
}

export default Todo;
