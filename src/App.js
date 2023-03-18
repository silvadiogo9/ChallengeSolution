import React, { useState } from 'react';
import './App.css';
import image from './image.png';
import TodoList from './components/TodoList';
import CreateTodoForm from './components/CreateTodoForm';
import { useTodoContext } from './context/TodoContext';

function App() {
  const { todoList, addTodo } = useTodoContext();
  const [sortDirection, setSortDirection] = useState('desc');
  const [sortField, setSortField] = useState('creationDate');
  const [hideCompleted, setHideCompleted] = useState(false);

  // todoA[sortField] -> aceder à propriedade dentro do sortField do todoA
  const compareFn = (todoA, todoB) => {
    if (todoA[sortField] < todoB[sortField]) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (todoA[sortField] > todoB[sortField]) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  };

  // sempre que a dependência for alterada ele vai executar as ações dentro do corpo da função

  return (
    <div>
      <img src={image} className="logo" alt="Elecctro Logo" />
      <h1 style={{ textAlign: 'center' }}>React Challenge</h1>
      <div className="centerdiv">
        <CreateTodoForm
          addTodo={addTodo}
        />
        <span>Order By: </span>
        <select
          onChange={(event) => {
            if (event.currentTarget.value.includes('-')) {
              setSortDirection('desc');
              setSortField(event.currentTarget.value.slice(1));
            } else {
              setSortDirection('asc');
              setSortField(event.currentTarget.value);
            }
          }}
        >
          <option value="-creationDate">Creation Date DESC</option>
          <option value="creationDate">Creation Date ASC</option>
          <option value="description">A-Z</option>
          <option value="-description">Z-A</option>
        </select>
        <TodoList
          todoList={todoList}
          hideCompleted={hideCompleted}
          compareFn={compareFn}
        />
        <p style={{ color: 'brown', fontWeight: 'bold' }}>
          Hide completed
          <input
            type="checkbox"
            style={{ marginLeft: '10px', accentColor: 'brown' }}
            onChange={() => setHideCompleted(!hideCompleted)}
          />
        </p>
      </div>
    </div>
  );
}
export default App;
