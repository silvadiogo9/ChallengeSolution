import Todo from './Todo';

function TodoList({ todoList, hideCompleted, compareFn }) {
  return (
    <ul className="no-bullets">
      {
        todoList
          .filter((todo) => (hideCompleted ? !todo.completed : true))
          .sort(compareFn)
          .map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
            />
          ))
      }
    </ul>
  );
}

export default TodoList;
