import React, { useState } from 'react';
import { useTodoContext } from '../context/TodoContext';
import ActionButton from './ActionButton';

function Todo({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(todo.description);
  const { deleteTodo, toggleCompleted, editTodoDescription } = useTodoContext();

  return (
    <li style={{
      marginTop: '5px',
      background: todo.completed ? '#ffbb00' : 'none',
      wordWrap: 'break-word',
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
          [
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />,
            <ActionButton
              action={() => {
                editTodoDescription(todo.id, todo.description);
                setDescription(todo.description);
                setIsEditing(false);
              }}
              text="Cancel"
            />,
            <ActionButton
              action={() => {
                editTodoDescription(todo.id, description);
                setIsEditing(false);
              }}
              text="Submit"
            />,
          ]
        )
        : (
          [
            <>
              {
            }
              {' '}
              {todo.description}
            </>,
            <ActionButton
              action={() => deleteTodo(todo.id)}
              text="Delete"
            />,
            <ActionButton
              action={() => setIsEditing(true)}
              text="Edit"
            />,
          ]
        )}
    </li>
  );
}

export default Todo;

/* Warning: Each child in a list should have a unique "key" prop.

Check the render method of `Todo`. See https://reactjs.org/link/warning-keys for more information.
    at Todo (http://localhost:3000/static/js/bundle.js:409:5)
    at ul
    at TodoList (http://localhost:3000/static/js/bundle.js:546:5)
    at div
    at div
    at App (http://localhost:3000/static/js/bundle.js:40:75)
    at TodoProvider (http://localhost:3000/static/js/bundle.js:639:5) */
