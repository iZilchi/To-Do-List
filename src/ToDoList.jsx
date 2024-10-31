import React, { useState } from 'react';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, { text: newTask, completed: false }]);
            setNewTask("");
            setIsPopupOpen(false);
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function completeTask(index) {
        const updatedTasks = tasks.map((task, i) => 
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    }

    function togglePopUp() {
        setIsPopupOpen(prev => !prev);
    }

    return (
        <div className="container">
            <h1 className="header">To-Do List</h1>
            <div className="box">   
                <ul>
                    {tasks.map((task, index) =>
                        <li key={index}>
                            <button className="completed-button" onClick={() => completeTask(index)}>
                                
                            </button>
                            <span className="text" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                {task.text}
                            </span>
                            <button className="delete-button" onClick={() => deleteTask(index)}>
                                —
                            </button>
                        </li>
                    )}
                </ul>
                <button className="add-task" onClick={togglePopUp}>
                    +
                </button>  
            </div>
            
            {isPopupOpen && (
                <div className="pop-up">
                    <input
                        type="text"
                        placeholder="Enter a new task..."
                        value={newTask}
                        onChange={handleInputChange}
                    />
                    <button className="add-button" onClick={addTask}>
                        +
                    </button>
                </div>
            )}
        </div>
    );
}

export default ToDoList;
