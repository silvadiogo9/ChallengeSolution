import Todo from './Todo';

function TodoList({ todoList, hideCompleted, compareFn }) {
  return (
    <ul className="no-bullets">
      { // vai efetuar o filter e aplicar a primeira condição
        // se o hideCompleted estiver a true, ele remove os todos que estão a true no completed,
        // se o hideCompleted estiver a false, ele vai mostrar todos os todos.
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
