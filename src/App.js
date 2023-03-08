import React, { useEffect, useState } from "react";
import "./App.css";
import Todo from "./components/todo";
import image from "./image.png";

function App() {
  const [todoList, setTodoList] = useState(() => {
    const jsonStorage = localStorage.getItem("todoList");
    const loadedStorage = JSON.parse(jsonStorage);
    return loadedStorage || []
  });
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [currentSort, setCurrentSort] = useState("default");
  const [hideCompleted, setHideCompleted] = useState(false);
  const [backupList, setBackupList] = useState([...todoList]);

  const compareFn = (todoA, todoB) => {
    if (todoA.text < todoB.text) {
      return -1;
    }
    if (todoA.text > todoB.text) {
      return 1;
    }
    return 0;
  };

  //Guardar os dados em armazenamento local
  //sempre que forem feitas alterações na dependência [backupList}, todos os steps/código dentro da função 
  //vão ser executados
  useEffect(() => {
    const jsonStorage = JSON.stringify(backupList);
    localStorage.setItem("todoList", jsonStorage);
  }, [backupList]);

  useEffect(() => {
    let newTodoList = [...backupList];
    if (hideCompleted) {
      newTodoList = newTodoList.filter((todo) => !todo.completed);
    }
    newTodoList.sort(compareFn);
    if (currentSort === 'default' || currentSort === 'up') {
      newTodoList.reverse();
    }
    setTodoList(newTodoList);
  }, [backupList, hideCompleted, currentSort]);

  //sempre que a dependência for alterada ele vai executar as ações dentro do corpo da função

  //Adicionar um to-do à lista
  const addTodo = (todo) => {
    if (todo === "") {
      alert("Task text field must be filled!");
      return false;
    }
    const newTodo = {
      id: Math.random(),
      text: todo,
      completed: false,
    };
    const newTodoList = [...backupList, newTodo];
    setBackupList(newTodoList);
    setTodo("");
    console.log(todoList);
  }

  //Marcar as tarefas como completed
  const toggleCompleted = (id) => {
    const updatedTodos = [...backupList].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setBackupList(updatedTodos);
  }

  //Apagar um determinado elemento/to-do da lista
  const deleteTodo = (id) => {
    const filteredTodos = backupList.filter((todo) => todo.id !== id);
    setBackupList(filteredTodos);
  }

  //Editar um determinado elemento/to-do da lista
  const editTodo = (id) => {
    if (editingText === "") {
      alert("Task text field must be filled!");
      return false;
    }
    const updatedTodos = [...backupList].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    })
    setBackupList(updatedTodos);
    setTodoEditing(null);
    setEditingText("");
  }

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
        <button 
          className="taskListButton"
          onClick={() => {
          if (currentSort === "down") {
            setCurrentSort("up")
          } else {
            setCurrentSort("down")
          }
        }}>Task List:</button>
        <ul className="no-bullets">
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
          <p style={{color: "brown", fontWeight: "bold"}}>Hide completed
            <input
              type="checkbox"
              style={{ marginLeft: '10px', accentColor: "brown" }}
              onChange={() => setHideCompleted(!hideCompleted)
              }>
            </input>
          </p>
        </ul>
      </div>
      <img src={image} className="imageStyle" alt="Elecctro Logo"></img>
      </div>
  )
}
export default App