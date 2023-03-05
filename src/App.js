import React, {useEffect, useState} from "react";
import "./App.css";

function App(){
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const jsonStorage = localStorage.getItem("todoList");
    const loadedStorage = JSON.parse(jsonStorage);
    if(loadedStorage) {
      setTodoList(loadedStorage);
    }
  }, [])

  //Guardar os dados em armazenamento local
  useEffect(() => {
    const jsonStorage = JSON.stringify(todoList);
    localStorage.setItem("todoList", jsonStorage);
  }, [todoList])
  
  //Evitar que o form ao fazer-se submit perca os dados inseridos -- form preventDefault

  //Adicionar um to-do à lista
  const addTodo = (todo) => {
    if(todo === ""){
      alert("Task text field must be filled!");
      return false;
    }
    const newTodo = {
      id: Math.random(),
      text: todo,
      completed: false,
    };
    setTodoList([...todoList, newTodo]);
    setTodo("");
    console.log(todoList);
  }

  //Marcar as tarefas como completed
  const toggleCompleted = (id) => {
    const updatedTodos = [...todoList].map((todo) => {
    if (todo.id === id){
      todo.completed = !todo.completed;
    }
    return todo;
    })

  }
  //vai retornar o array de todos, mas modificar o elemento com o id primeiro

  //Apagar um determinado elemento/to-do da lista
  const deleteTodo = (id) => {
    const filteredTodos = todoList.filter((todo) => todo.id !== id);
    setTodoList(filteredTodos);
  }

  //Editar um determinado elemento/to-do da lista
  const editTodo = (id) => {
    if(editingText === ""){
      alert("Task text field must be filled!");
      return false;
    }
    const updatedTodos = [...todoList].map((todo) => {
      if (todo.id === id){
        todo.text = editingText;
      }
      return todo;
    })
    setTodoList(updatedTodos);
    setTodoEditing(null);
    setEditingText("");
  }

  return (
    <div className="row" style={{padding:"1em"}}>
      <div className="column" style={{backgroundColor:"lightgray"}}>
        <form onSubmit = {(e) => e.preventDefault()}>
        <input 
          style={{width:"80%", height:"30px", }} 
          type="text" 
          placeholder="Write your new task here..." 
          value={todo} 
          onChange={(e) => setTodo(e.target.value)}>
        </input>
        <button 
          type="submit"
          style={{height:"30px", marginLeft: "20px", float: "right"}} 
          onClick={() => addTodo(todo)}>Create
        </button>
        </form>
        <p>Task List:</p>
        <ul className="no-bullets">
          {todoList.map((todo) => (
            <li key={todo.id} style={{marginTop: '5px'}}>
              <input 
                type="checkbox" 
                style={{marginRight: '10px'}} 
                onChange={() => toggleCompleted(todo.id)} 
                checked={todoList.completed}>
              </input>
              {todoEditing === todo.id ? 
              (<input 
                type="text" 
                onChange={(e) => setEditingText(e.target.value)} 
                value={editingText} />) : 
              (<>{todo.text}</>)}              
              <button 
              style={{float:"right"}}
              onClick={() => deleteTodo(todo.id)}>Delete
              </button>
              {todoEditing === todo.id ? 
              (<button style={{float:"right", marginRight: '5px'}} onClick={() => editTodo(todo.id)}>Submit</button>):
              (<button style={{float:"right", marginRight: '5px'}} onClick={() => setTodoEditing(todo.id)}>Edit</button>)}
            </li>

          ))}
        </ul>
      </div>
    </div>
  )
}
export default App

/*
                {todoList.map((todo) => (
        <div key={todo.id} className="todo">
          <div className="todo-text">
            <input
              type="checkbox"
              id="completed"
              checked={todoList.completed}
              onChange={() => toggleCompleted(todo.id)}
            />
            {todo.id === todoEditing ? 
            (<input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <div>{todo.text}</div>
            )}
          </div>
          <div className="todo-actions">
            {todo.id === todoEditing ? 
            (<button onClick={() => editTodo(todo.id)}>Submit Edits</button>
            ) : 
            (<button onClick={() => setTodoEditing(todo.id)}>Edit</button>
            )}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </div>
      ))}

      //testar ver se o form altera o comportamento do localstorage, mas sem resultado
      ordenar A-Z e Z-A
      Remover to-dos com check mark
*/