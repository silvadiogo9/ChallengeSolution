import React, { useEffect, useState} from "react";
import { useTodoContext } from "../context/TodoContext";

function Todo({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(todo.description);
  const {deleteTodo, toggleCompleted, editTodoDescription} = useTodoContext();

    return (<li style={{ marginTop: '5px' }}>
        <input
            type="checkbox"
            checked={todo.completed}
            style={{ marginRight: '10px', accentColor: "brown"}}
            onChange={() => toggleCompleted(todo.id)}>
        </input>
        {isEditing ?
            (<input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description} />) :
            (<>{todo.description}</>)}
        <button
            className="bttnFunctional"
            onClick={() => deleteTodo(todo.id)}>Delete
        </button>
        {isEditing ?
            (<button className="bttnFunctional" onClick={() => {
                editTodoDescription(todo.id, description);
                setIsEditing(false);
            }} > Submit</button>) :
            (<button className="bttnFunctional" onClick={() => setIsEditing(true)}>Edit</button>)}
    </li>)
}

export default Todo