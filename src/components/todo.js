function Todo({ todo, toggleCompleted, setEditingText, editingText, todoEditing, deleteTodo, setTodoEditing, editTodo }) {
    return (<li key={todo.id} style={{ marginTop: '5px' }}>
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
    </li>)
}

export default Todo