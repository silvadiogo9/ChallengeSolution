import React, { useState } from 'react';
import { useTodoContext } from '../context/TodoContext';
import ActionButton from './ActionButton';

function Todo({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(todo.description);
  const { deleteTodo, toggleCompleted, editTodoDescription } = useTodoContext();

  return (
    <li style={{
      background: todo.completed ? '#f9a035' : 'none',
    }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        className="checked"
        onChange={() => toggleCompleted(todo.id)}
      />
      {isEditing
        ? (
          <>
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <ActionButton
              action={() => {
                editTodoDescription(todo.id, todo.description);
                setDescription(todo.description);
                setIsEditing(false);
              }}
              text="Cancel"
            />
            <ActionButton
              action={() => {
                editTodoDescription(todo.id, description);
                setIsEditing(false);
              }}
              text="Submit"
            />
          </>
        )
        : (
          <>
            {todo.description}
            <ActionButton
              action={() => deleteTodo(todo.id)}
              text="Delete"
            />
            <ActionButton
              action={() => setIsEditing(true)}
              text="Edit"
            />
          </>
        )}
    </li>
  );
}

export default Todo;
