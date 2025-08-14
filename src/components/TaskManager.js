import React from 'react';
import { db } from '../firebase';
import { collection, addDoc, query, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import TaskItem from './TaskItem';

function TaskManager({ user }) {
    const [tasks, setTasks] = React.useState([]);
    const [newTask, setNewTask] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const userId = user.uid;

    React.useEffect(() => {
        if (!userId) return;
        const tasksCollectionPath = `users/${userId}/tasks`;
        const q = query(collection(db, tasksCollectionPath));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const tasksData = [];
            querySnapshot.forEach((doc) => {
                tasksData.push({ id: doc.id, ...doc.data() });
            });
            setTasks(tasksData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching tasks: ", error);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [userId]);

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (newTask.trim() === '') return;
        const tasksCollectionPath = `users/${userId}/tasks`;
        try {
            await addDoc(collection(db, tasksCollectionPath), {
                text: newTask,
                completed: false,
                createdAt: new Date()
            });
            setNewTask('');
        } catch (error) {
            console.error("Error adding task: ", error);
        }
    };

    const toggleTaskCompletion = async (taskId, completed) => {
        const taskDocPath = `users/${userId}/tasks/${taskId}`;
        try {
            await updateDoc(doc(db, taskDocPath), { completed: !completed });
        } catch (error) {
            console.error("Error updating task: ", error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        const taskDocPath = `users/${userId}/tasks/${taskId}`;
        try {
            await deleteDoc(doc(db, taskDocPath));
        } catch (error) {
            console.error("Error deleting task: ", error);
        }
    };

    const handleEditTask = async (taskId, newText) => {
        if (!newText || newText.trim() === '') return;
        const taskDocPath = `users/${userId}/tasks/${taskId}`;
        try {
            await updateDoc(doc(db, taskDocPath), { text: newText });
        } catch (error) {
            console.error("Error editing task: ", error);
        }
    };
    
    return (
        <div className="max-w-2xl mx-auto mt-4 md:mt-8">
            <div className="bg-white p-6 rounded-xl shadow-lg dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Your Tasks</h2>
                <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="What needs to be done?"
                        className="flex-grow px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    />
                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                        Add Task
                    </button>
                </form>
                {loading ? (
                    <p className="dark:text-gray-300">Loading tasks...</p>
                ) : (
                    <ul className="space-y-3">
                        {tasks.length > 0 ? tasks.map(task => (
                            <TaskItem 
                                key={task.id} 
                                task={task} 
                                onToggle={toggleTaskCompletion} 
                                onDelete={handleDeleteTask}
                                onEdit={handleEditTask} 
                            />
                        )) : (
                            <p className="text-center text-gray-500 dark:text-gray-400 py-4">You have no tasks yet. Add one above!</p>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
}
export default TaskManager;