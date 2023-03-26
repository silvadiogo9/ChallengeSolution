import React, { useState } from 'react';
import {
  faCheck, faFloppyDisk, faPencil, faTrash, faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useTodoContext } from '../context/TodoContext';
import ActionButton from './ActionButton';

function Todo({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(todo.description);
  const { deleteTodo, toggleCompleted, editTodoDescription } = useTodoContext();

  return (
    <li className={todo.completed ? 'completed' : null}>
      {isEditing
        ? (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <input
              className="taskText"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ActionButton
                action={() => {
                  editTodoDescription(todo.id, todo.description);
                  setDescription(todo.description);
                  setIsEditing(false);
                }}
                icon={faXmark}
                color="#292929"
              />
              <ActionButton
                action={() => {
                  editTodoDescription(todo.id, description);
                  setIsEditing(false);
                }}
                icon={faFloppyDisk}
                color="#292929"
              />
            </div>

          </div>
        )
        : (
          <>
            {todo.description}
            <ActionButton
              action={() => deleteTodo(todo.id)}
              icon={faTrash}
              color="#941b1b"
            />
            <ActionButton
              action={() => toggleCompleted(todo.id)}
              icon={faCheck}
              color="green"
            />
            <ActionButton
              action={() => setIsEditing(true)}
              icon={faPencil}
              color="#292929"
            />
          </>
        )}
    </li>
  );
}

export default Todo;
