import React, { useState } from 'react';
import '../styles/TaskInfo.css';

function TaskInfo({ activeDisplay, isTaskInfoActive, setIsTaskInfoActive, task, deleteTask, setIsToEdit, setEditedTaskId }) {
    const [isFadingOut, setIsFadingOut] = useState(false);

    if (!isTaskInfoActive || !task) return null;

    const handleClose = () => {
        setIsFadingOut(true);
        setTimeout(() => {
            setIsTaskInfoActive(false);
            setIsFadingOut(false);
        }, 300);
    };

    const handleEdit = () => {
        setEditedTaskId(task.id);
        setIsToEdit(true);
        handleClose();
    };

    const handleDelete = () => {
        deleteTask(task.id);
        handleClose();
    };

    const completedClass = task.completed ? 'completed-active' : '';

    return (
        <div className={`task-info-container ${isFadingOut ? 'fade-out' : 'fade-in'} ${completedClass}`}>
            <button className="info-close-button" onClick={handleClose}>✖</button>
            <div className={`info-container ${isFadingOut ? 'fade-out' : 'fade-in'}`}>
                <ul className="info-list">
                    <li>
                        <h3 className={`info-name ${completedClass}`}>{task.text}</h3>
                        <h5 className={`info-priority ${completedClass}`}>Priority:
                            <span> </span>
                            <span style={{ color: task.importance === 1 ? "#1E3A8A" : "#18747E" }}>
                                {task.importance === 1 ? "Important" : "Not Important"}
                            </span>
                            <span> </span>
                            <span style={{ color: task.urgency === 1 ? "#6D2E6F" : "#6A0572" }}>
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
                    <div className={`edit-task ${completedClass}`} onClick={handleEdit}>
                        <img src="/src/assets/Edit.png" alt="Edit Task" />
                    </div>
                    <div className={`delete-task ${completedClass}`} onClick={handleDelete}>
                        <img src="/src/assets/Delete.png" alt="Delete Task" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskInfo;
