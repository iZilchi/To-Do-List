import React, { useState } from 'react';
import '../styles/TaskItem.css';
import TaskInfo from '../components/TaskInfo'; 

function TaskItem({ task, completeTask, moveTaskUp, moveTaskDown, deleteTask }) {
    const [isTaskInfoActive, setIsTaskInfoActive] = useState(false);

    const importanceText = task.importance === 1 ? "Important" : "Not Important";
    const urgencyText = task.urgency === 1 ? "Urgent" : "Not Urgent";

    const importanceColor = task.importance === 1 ? "#4B4B4B" : "#FFD700";
    const urgencyColor = task.urgency === 1 ? "#2C8F77" : "#F0E68C";

    return (
        <li className="task-list">
            <div className="function-button">
                <button className="completed-button" onClick={() => completeTask(task.id)}></button>
                <button className="delete-button" onClick={() => deleteTask(task.id)}>—</button>
            </div>
            <div className="task" onClick={() => setIsTaskInfoActive(prev => !prev)}>
                <h2 className="text" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                    {task.text}
                </h2>
                <h4 className="description">
                    {task.description}
                </h4>
                <h4 className="priority">
                    <strong>Priority:</strong>
                    <span> </span>
                    <span style={{ color: importanceColor }}>{importanceText}</span>
                    <span> </span>
                    <span style={{ color: urgencyColor }}>{urgencyText}</span>
                </h4>
            </div>
            <div className="move-group">
                <button className="move-button" onClick={() => moveTaskUp(task.id)}>▲</button>
                <button className="move-button" onClick={() => moveTaskDown(task.id)}>▼</button>
            </div>
            <TaskInfo 
                isTaskInfoActive={isTaskInfoActive} 
                setIsTaskInfoActive={setIsTaskInfoActive}
                task={task}
            />
        </li>
    );
}

export default TaskItem;
