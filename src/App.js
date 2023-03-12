import React, { useEffect, useState } from "react";
import "./App.css";
import Todo from "./components/todo";
import { useTodoContext } from "./context/TodoContext";
import image from "./image.png";

function App() {
  const {todoList,addTodo} = useTodoContext();
  const [todo, setTodo] = useState("");
  const [sortDirection, setSortDirection] = useState("desc");
  const [sortField, setSortField] = useState("creationDate");
  const [hideCompleted, setHideCompleted] = useState(false);


  //todoA[sortField] -> aceder à propriedade dentro do sortField do todoA
  const compareFn = (todoA, todoB) => {
    if (todoA[sortField] < todoB[sortField]) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (todoA[sortField] > todoB[sortField]) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  };

  //sempre que a dependência for alterada ele vai executar as ações dentro do corpo da função


  return (
    <div>
      <div className="centerdiv">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            className="taskText"
            type="text"
            placeholder="Write your new task here..."
            value={todo}
            onChange={(e) => setTodo(e.target.value)}>
          </input>
          <button
            className="submit"
            type="submit"
            onClick={() => addTodo(todo)}>Create
          </button>
        </form>
        <label>Order By: </label>
        <select 
          onChange={(event) => {
          if (event.currentTarget.value.includes("-")){
            setSortDirection("desc");
            setSortField(event.currentTarget.value.slice(1));
          } else {
            setSortDirection("asc");
            setSortField(event.currentTarget.value);
          }
        }} >
          <option value="-creationDate">Creation Date DESC</option>
          <option value="creationDate">Creation Date ASC</option>
          <option value="description">A-Z</option>
          <option value="-description">Z-A</option>
        </select>
        <ul className="no-bullets">
              { //vai efetuar o filter e aplicar a primeira condição
              // se o hideCompleted estiver a true, ele remove os todos que estão a true no completed,
              // se o hideCompleted estiver a false, ele vai mostrar todos os todos.
              todoList
              .filter((todo) => hideCompleted ? !todo.completed : true)
              .sort(compareFn)
              .map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
            />
          ))}
        </ul>
        <p style={{color: "brown", fontWeight: "bold"}}>Hide completed
            <input
              type="checkbox"
              style={{ marginLeft: "10px", accentColor: "brown" }}
              onChange={() => setHideCompleted(!hideCompleted)
              }>
            </input>
          </p>
      </div>
      <img src={image} className="imageStyle" alt="Elecctro Logo"></img>
      </div>
  )
}
export default App


/*

<li key={todo.id} style={{ marginTop: '5px' }}>
        <input
            type="checkbox"
            checked={todo.completed}
            style={{ marginRight: '10px', accentColor: "brown"}}
            onChange={() => toggleCompleted(todo.id)}>
        </input>
        {todoEditing === todo.id ?
            (<input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
                value={editingText} />) :
            (<>{todo.text}</>)}
        <button
            className="bttnFunctional"
            onClick={() => deleteTodo(todo.id)}>Delete
        </button>
        {todoEditing === todo.id ?
            (<button className="bttnFunctional" onClick={() => editTodo(todo.id)}>Submit</button>) :
            (<button className="bttnFunctional" onClick={() => setTodoEditing(todo.id)}>Edit</button>)}
    </li>

              {todoList.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              toggleCompleted={toggleCompleted}
              setEditingText={setEditingText}
              todoEditing={todoEditing}
              editingText={editingText}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              setTodoEditing={setTodoEditing} />
          ))}
*/