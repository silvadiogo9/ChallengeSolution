import React, { createContext, useContext, useEffect, useState } from "react";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [todoList, setTodoList] = useState(() => {
        const jsonStorage = localStorage.getItem("todoList");
        const loadedStorage = JSON.parse(jsonStorage);
        return loadedStorage || [];
    });

  //Guardar os dados em armazenamento local
  //sempre que forem feitas alterações na dependência [todoList}, todos os steps/código dentro da função 
  //vão ser executados
  useEffect(() => {
    const jsonStorage = JSON.stringify(todoList);
    localStorage.setItem("todoList", jsonStorage);
  }, [todoList]);

//Adicionar um to-do à lista
  const addTodo = (todoDescription) => {
    if (todoDescription === "") {
      alert("Task text field must be filled!");
      return false;
    }
    const newTodo = {
      id: Math.random(),
      description: todoDescription,
      completed: false,
      creationDate: new Date(),
    };
    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
    console.log(todoList);
  }

  //Marcar as tarefas como completed
  const toggleCompleted = (todoId) => {
    const updatedTodos = [...todoList].map((todo) => {
      if (todo.id === todoId) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodoList(updatedTodos);
  }

  //Apagar um determinado elemento/to-do da lista
  const deleteTodo = (todoId) => {
    const filteredTodos = todoList.filter((todo) => todo.id !== todoId);
    setTodoList(filteredTodos);
  }

  //Editar um determinado elemento/to-do da lista
  const editTodoDescription = (todoId, todoDescription) => {
    if (todoDescription === "") {
      alert("Task description field must be filled!");
      return false;
    }
    const updatedTodos = [...todoList].map((todo) => {
      if (todo.id === todoId) {
        todo.description = todoDescription;
      }
      return todo;
    })
    setTodoList(updatedTodos);
  }

    return (
        <TodoContext.Provider
          value={{
            todoList,
            addTodo,
            deleteTodo,
            toggleCompleted,
            editTodoDescription,
          }}
        >
          {children}
        </TodoContext.Provider>
      );
    };
    
    export const useTodoContext = () => useContext(TodoContext);