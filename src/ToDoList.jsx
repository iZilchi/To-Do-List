import React, { useState } from 'react';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [activeButton, setActiveButton] = useState(null);

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

    function handleButtonClick(buttonType) {
        setActiveButton(buttonType);
    }

    return (
        <div className="container">
            <h1 className="header">To-Do List</h1>
            <div className="box">
                <div className="progress-bar">0%</div>
                <div className="sort-container">
                    <button
                        className={`to-do-sort ${activeButton === 'todo' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('todo')}
                    >
                        To-Do
                    </button>
                    <button
                        className={`completed-sort ${activeButton === 'completed' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('completed')}
                    >
                        Completed
                    </button>    
                </div>
                <div className="list-container">
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
                </div>   
                <div className="eisenhower-container">
                    <button
                        className={`importance-urgency-sort ${activeButton === 'importance-urgency' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('importance-urgency')}
                    >
                        Importance Urgency
                    </button>
                    <button
                        className={`importance-sort ${activeButton === 'importance' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('importance')}
                    >
                        Importance
                    </button>
                    <button
                        className={`urgency-sort ${activeButton === 'urgency' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('urgency')}
                    >
                        Urgency
                    </button>    
                </div>   
                <button className="add-task" onClick={togglePopUp}>
                    +
                </button>  
            </div>
            
            {isPopupOpen && (
                <div className={`pop-up ${isPopupOpen ? 'open' : ''}`}>
                    <input
                        type="text"
                        placeholder="Enter a new task..."
                        className="task-textbox"
                        value={newTask}
                        onChange={handleInputChange}
                    />
                    <div className="pop-up-container">
                        <select className="option-container">
                            <option className="option-button" value="important">Important</option>
                            <option className="option-button" value="not-important">Not Important</option>
                        </select>
                        <select className="option-container">
                            <option className="option-button" value="urgent">Urgent</option>
                            <option className="option-button" value="not-urgent">Not Urgent</option>
                        </select>
                        <button className="add-button" onClick={addTask}>
                            +
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default ToDoList;
