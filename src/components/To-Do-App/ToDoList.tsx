import './ToDoList.css';


interface Todo {
    text: string;
    completed: boolean;
    date: Date;
}

interface ToDoListProps {
    todos: Todo[];
    removeTodo: (index: number) => void;
    editTodo?: (index: number) => void;
    toggleComplete?: (index: number) => void;
}

export default function ToDoList({ todos, removeTodo, editTodo, toggleComplete }: ToDoListProps) {
    if (todos.length === 0) {
        return <p className="empty-message">No tasks added yet.</p>;
    }
    const formatDate = (date: Date) => {
        const d = new Date(date);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };
        return d.toLocaleString(undefined, options);
    };

    return (
        <>
            <ul className="todo-list">
                {todos.map((todo, index) => (
                    <li key={index} className="todo-item">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleComplete && toggleComplete(index)}
                            />
                        </label>
                        <div className="todo-text-container">
                            <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                                {todo.text}
                            </span>
                        </div>
                        {!todo.completed && <div className="action-buttons">
                            <button
                                className="icon-btn edit-btn"
                                aria-label="Edit task"
                                onClick={() => editTodo && editTodo(index)}
                                title="Edit"
                                type="button"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 20h9" />
                                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                                </svg>
                            </button>

                            <button
                                className="icon-btn delete-btn"
                                aria-label="Delete task"
                                onClick={() => removeTodo(index)}
                                title="Delete"
                                type="button"
                            >
                                {/* Trash icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    viewBox="0 0 24 24"
                                >
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6l-2 14H7L5 6" />
                                    <path d="M10 11v6" />
                                    <path d="M14 11v6" />
                                    <path d="M9 6V4h6v2" />
                                </svg>
                            </button>
                        </div>}
                        <div className="todo-date">{formatDate(todo.date)}</div>
                    </li>
                ))}
            </ul>
        </>
    );
}
