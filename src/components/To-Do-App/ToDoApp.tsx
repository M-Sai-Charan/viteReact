import { useState } from 'react';
import ToDoInput from './ToDoInput';
import ToDoList from './ToDoList';
import './ToDoApp.css';

interface Todo {
  text: string;
  completed: boolean;
  date: Date;
}

export default function ToDoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [input, setInput] = useState('');

  const addTodo = (text: string) => {
    const newTodo: Todo = { text, completed: false, date: new Date() };
    setTodos((prev) => [newTodo, ...prev]);
    setInput('');
  };

  const removeTodo = (index: number) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
    if (editingIndex === index) cancelEdit();
  };
  const toggleComplete = (index:number) => {
     setTodos((prev) =>
      prev.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }
  const startEdit = (index: number) => {
    setEditingIndex(index);
    setInput(todos[index].text);
  };

  const updateTodo = () => {
    if (editingIndex === null) return;
    if (input.trim() === '') return;
    setTodos((prev) =>
      prev.map((todo, i) =>
        i === editingIndex ? { ...todo, text: input.trim() } : todo
      )
    );
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setInput('');
  };

  return (
    <div className="todo-app">
      <div className="todo-layout">
        <div className="todo-input-wrapper">
          <ToDoInput
            input={input}
            setInput={setInput}
            onAdd={addTodo}
            onUpdate={updateTodo}
            editingIndex={editingIndex}
            onCancel={cancelEdit}
          />
        </div>
        <div className="todo-list-wrapper">
          <ToDoList
            todos={todos}
            removeTodo={removeTodo}
            editTodo={startEdit}
            toggleComplete={toggleComplete}
          />
        </div>
      </div>
    </div>
  );
}
