import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import Swal from 'sweetalert2';

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todoList, setTodoList] = useState(() => {
    const jsonStorage = localStorage.getItem('todoList');
    const loadedStorage = JSON.parse(jsonStorage)
      .map((todo) => ({ ...todo, creationDate: new Date(todo.creationDate) }));
    return loadedStorage || [];
  });
  const todoWarning = () => Swal.fire({
    icon: 'error',
    title: 'Task text field must be filled!',
    heightAuto: false,
  });
  const todoSucessfull = () => Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'New task as been added!',
    width: 250,
    height: 100,
    showConfirmButton: false,
    timer: 1500,
    heightAuto: false,
  });

  useEffect(() => {
    const jsonStorage = JSON.stringify(todoList);
    localStorage.setItem('todoList', jsonStorage);
  }, [todoList]);

  // Adicionar um to-do à lista
  const addTodo = (todoDescription) => {
    if (todoDescription === '') {
      todoWarning();
      return;
    }
    const newTodo = {
      id: Math.random(),
      description: todoDescription,
      completed: false,
      creationDate: new Date(),
    };
    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
    todoSucessfull();
  };

  // Marcar as tarefas como completed
  const toggleCompleted = (todoId) => {
    const updatedTodos = [...todoList].map((todo) => {
      if (todo.id === todoId) {
        // todo.completed = !todo.completed;
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodoList(updatedTodos);
  };

  // Apagar um determinado elemento/to-do da lista
  const deleteTodo = (todoId) => {
    const filteredTodos = todoList.filter((todo) => todo.id !== todoId);
    setTodoList(filteredTodos);
  };

  // Editar um determinado elemento/to-do da lista
  const editTodoDescription = (todoId, todoDescription) => {
    if (todoDescription === '') {
      todoWarning();
      return;
    }
    const updatedTodos = [...todoList].map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, description: todoDescription };
      }
      return todo;
    });
    setTodoList(updatedTodos);
  };

  const value = useMemo(() => ({
    todoList,
    addTodo,
    deleteTodo,
    toggleCompleted,
    editTodoDescription,
  }), [todoList, addTodo, deleteTodo, toggleCompleted, editTodoDescription]);

  return (
    <TodoContext.Provider
      value={value}
    >
      {children}
    </TodoContext.Provider>
  );
}

export const useTodoContext = () => useContext(TodoContext);
