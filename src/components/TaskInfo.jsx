import React from 'react';
import '../styles/TaskInfo.css';
import EditIcon from '../assets/Edit.png';
import DeleteIcon from '../assets/Delete.png';

function TaskInfo({ isTaskInfoActive, setIsTaskInfoActive, task }) {
    if (!isTaskInfoActive || !task) return null;

    const importanceText = task.importance === 1 ? "Important" : "Not Important";
    const urgencyText = task.urgency === 1 ? "Urgent" : "Not Urgent";
    const importanceColor = task.importance === 1 ? "#4B4B4B" : "#FFD700";
    const urgencyColor = task.urgency === 1 ? "#2C8F77" : "#F0E68C";
    const statusColor = task.completed ? "#28A745" : "#FF6347";

    return (
        <div className="task-info-container">
            <button className="info-close-button" onClick={() => setIsTaskInfoActive(false)}>✖</button>
            <div className="info-container">
                <ul className="info-list">
                    <li>
                        <h3 className="info-name">{task.text}</h3>
                        <h5 className="info-priority">Priority:
                            <span> </span>
                            <span style={{ color: importanceColor }}>{importanceText}</span> 
                            <span> </span>
                            <span style={{ color: urgencyColor }}>{urgencyText}</span>
                        </h5>
                        <h5 className="info-status">Status:
                            <span> </span>
                            <span style={{ color: statusColor }}>
                                {task.completed ? "Completed" : "To-Do"}
                            </span>
                        </h5>
                        <p className="info-description">{task.description}</p>
                    </li>
                </ul>
                <div className="button-container">
                    <div className="edit-task">
                        <img src="/src/assets/Edit.png" alt="Edit Task"/>
                    </div>
                    <div className="delete-task">
                        <img src="/src/assets/Delete.png" alt="Delete Task"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskInfo;