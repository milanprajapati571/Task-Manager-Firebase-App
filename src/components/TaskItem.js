import React from 'react';

function TaskItem({ task, onToggle, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = React.useState(false);
    const [editText, setEditText] = React.useState(task.text);

    const handleSave = () => {
        onEdit(task.id, editText);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditText(task.text);
        setIsEditing(false);
    };

    return (
        <li className={`flex items-center justify-between p-3 rounded-lg transition duration-300 ${task.completed ? 'bg-green-50 text-gray-500 dark:bg-green-900/50 dark:text-gray-400' : 'bg-white shadow-sm dark:bg-gray-800'}`}>
            <div className="flex items-center gap-3 flex-grow">
                 <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task.id, task.completed)}
                    className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer dark:bg-gray-700 dark:border-gray-600 flex-shrink-0"
                />
                {isEditing ? (
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                        className="flex-grow bg-gray-100 dark:bg-gray-700 border border-indigo-300 dark:border-indigo-500 rounded-md px-2 py-1 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        autoFocus
                    />
                ) : (
                    <span className={`flex-1 dark:text-gray-200 ${task.completed ? 'line-through' : ''}`}>
                        {task.text}
                    </span>
                )}
            </div>

            {/* --- ACTION BUTTONS --- */}
            <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                {isEditing ? (
                    <>
                        <button onClick={handleSave} className="text-green-500 hover:text-green-700 dark:hover:text-green-400" aria-label="Save task">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <button onClick={handleCancel} className="text-red-500 hover:text-red-700 dark:hover:text-red-400" aria-label="Cancel edit">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setIsEditing(true)} className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400" aria-label="Edit task">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
                            </svg>
                        </button>
                        <button onClick={() => onDelete(task.id)} className="text-gray-400 hover:text-red-600 dark:hover:text-red-400" aria-label="Delete task">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </>
                )}
            </div>
        </li>
    );
}

export default TaskItem;