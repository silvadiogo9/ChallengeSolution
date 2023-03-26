import React, { useState } from 'react';
import './App.css';
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

  return (
    <div>
      <h1>To-do List</h1>
      <div className="centerdiv">
        <CreateTodoForm
          addTodo={addTodo}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '50px',
          marginBottom: '50px',
          alignItems: 'center',
        }}
        >
          <span className="spanstyle">Order by:</span>
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
        </div>
        <div className="scroll">
          <TodoList
            todoList={todoList}
            hideCompleted={hideCompleted}
            compareFn={compareFn}
          />
        </div>
        <p>
          Hide completed
          <input
            type="checkbox"
            style={{ marginLeft: '10px', accentColor: '#4d4f4a', cursor: 'pointer' }}
            onChange={() => setHideCompleted(!hideCompleted)}
          />
        </p>
      </div>
    </div>
  );
}
export default App;
