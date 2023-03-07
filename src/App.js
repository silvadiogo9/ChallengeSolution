import React, { useEffect, useState } from "react";
import "./App.css";
import Todo from "./components/todo";

//functional component
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

  //useEffect que vai trigar o evento onSortChange() sempre que houverem alterações no estado do currentSort

  //Guardar os dados em armazenamento local
  useEffect(() => {
    const jsonStorage = JSON.stringify(backupList);
    localStorage.setItem("todoList", jsonStorage);
    console.log(todoList);
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

  //Evitar que o form ao fazer-se submit perca os dados inseridos -- form preventDefault

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


  // const removedTodos = () => {
  //   let completedTodos = [...todoList];
  //   setBackupList(completedTodos);
  //   completedTodos = todoList.filter((todo) => !todo.completed);
  //   setTodoList(completedTodos);
  // }

  //vai retornar o array de todos, mas modificar o elemento com o id primeiro

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
    <div className="row" style={{ padding: "1em" }}>
      <div className="column" style={{ backgroundColor: "lightgray" }}>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            style={{ width: "80%", height: "30px", }}
            type="text"
            placeholder="Write your new task here..."
            value={todo}
            onChange={(e) => setTodo(e.target.value)}>
          </input>
          <button
            type="submit"
            style={{ height: "30px", marginLeft: "20px", float: "right" }}
            onClick={() => addTodo(todo)}>Create
          </button>
        </form>
        <p onClick={() => {
          if (currentSort === "down") {
            setCurrentSort("up")
          } else {
            setCurrentSort("down")
          }
        }}>Task List:</p>
        <ul className="no-bullets">
          {todoList.map((todo) => (
            //
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
          <p>Hide completed
            <input
              type="checkbox"
              style={{ marginLeft: '10px' }}
              onChange={() => setHideCompleted(!hideCompleted)
              }>
            </input>
          </p>
        </ul>
      </div>
    </div>
  )
}
export default App

//context useEffect