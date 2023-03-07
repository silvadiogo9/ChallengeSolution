function Todo({ todo, toggleCompleted, setEditingText, editingText, todoEditing, deleteTodo, setTodoEditing, editTodo }) {
    return (<li key={todo.id} style={{ marginTop: '5px' }}>
        <input
            type="checkbox"
            checked={todo.completed}
            style={{ marginRight: '10px' }}
            onChange={() => toggleCompleted(todo.id)}>
        </input>
        {todoEditing === todo.id ?
            (<input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
                value={editingText} />) :
            (<>{todo.text}</>)}
        <button
            style={{ float: "right" }}
            onClick={() => deleteTodo(todo.id)}>Delete
        </button>
        {todoEditing === todo.id ?
            (<button style={{ float: "right", marginRight: '5px' }} onClick={() => editTodo(todo.id)}>Submit</button>) :
            (<button style={{ float: "right", marginRight: '5px' }} onClick={() => setTodoEditing(todo.id)}>Edit</button>)}
    </li>)
}

export default Todo