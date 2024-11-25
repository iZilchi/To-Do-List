import React, { useState } from 'react';
import '../styles/TaskInfo.css';

function TaskInfo({ activeDisplay, isTaskInfoActive, setIsTaskInfoActive, task, deleteTask }) {
    const [isSlidingOut, setIsSlidingOut] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);

    if (!isTaskInfoActive || !task) return null;

    const handleDelete = () => {
        deleteTask(task.id);  // Call the deleteTask function passed from ToDoList
        handleClose();  // Optionally close the task info after deleting
    };

    const handleClose = () => {
        setIsSlidingOut(true);
        setIsFadingOut(true);
        setTimeout(() => {
            setIsTaskInfoActive(false);
            setIsSlidingOut(false);
            setIsFadingOut(false);
        }, 300);
    };

    const completedClass = task.completed ? 'completed-active' : ''; // Adds 'completed-active' class if task is completed
    
    return (
        <div className={`background-opacity ${isFadingOut ? 'fade-out' : ''}`}>
            <div className={`task-info-container ${isSlidingOut ? 'slide-out' : ''} ${completedClass}`}>
                <button className="info-close-button" onClick={handleClose}>✖</button>
                <div className="info-container">
                    <ul className="info-list">
                        <li>
                            <h3 className={`info-name ${completedClass}`}>{task.text}</h3>
                            <h5 className={`info-priority ${completedClass}`}>Priority:
                                <span> </span>
                                <span style={{ color: task.importance === 1 ? "#4B4B4B" : "#FFD700" }}>
                                    {task.importance === 1 ? "Important" : "Not Important"}
                                </span>
                                <span> </span>
                                <span style={{ color: task.urgency === 1 ? "#2C8F77" : "#F0E68C" }}>
                                    {task.urgency === 1 ? "Urgent" : "Not Urgent"}
                                </span>
                            </h5>
                            <h5 className={`info-status ${completedClass}`}>Status:
                                <span> </span>
                                <span style={{ color: task.completed ? "#28A745" : "#FF6347" }}>
                                    {task.completed ? "Completed" : "To-Do"}
                                </span>
                            </h5>
                            <p className="info-description">{task.description}</p>
                        </li>
                    </ul>
                    <div className="button-container">
                        <div className={`edit-task ${completedClass}`}>
                            <img src="/src/assets/Edit.png" alt="Edit Task" />
                        </div>
                        <div className={`delete-task ${completedClass}`} onClick={handleDelete}>
                            <img src="/src/assets/Delete.png" alt="Delete Task" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskInfo;
