import React from 'react';
import './ToDoInput.css';

interface ToDoInputProps {
    input: string;
    setInput: (text: string) => void;
    onAdd: (text: string) => void;
    onUpdate: () => void;
    editingIndex: number | null;
    onCancel: () => void;
}

export default function ToDoInput({
    input,
    setInput,
    onAdd,
    onUpdate,
    editingIndex,
    onCancel,
}: ToDoInputProps) {
    const handleAddOrUpdate = () => {
        if (editingIndex !== null) {
            onUpdate();
        } else {
            if (input.trim() !== '') {
                onAdd(input.trim());
            }
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddOrUpdate();
        } else if (e.key === 'Escape' && editingIndex !== null) {
            onCancel();
        }
    };

    return (
        <div className="todo-input-container">
            <h1 className="todo-header">To Do App</h1>
            <div className="input-wrapper">
                <input
                    type="text"
                    placeholder="Add new To-Do"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    autoFocus
                />
                <button onClick={handleAddOrUpdate}>
                    {editingIndex !== null ? 'Update' : 'Add'}
                </button>
                {editingIndex !== null && (
                    <button onClick={onCancel} className="cancel-btn">
                        Cancel
                    </button>
                )}
            </div>
        </div>
    );
}
