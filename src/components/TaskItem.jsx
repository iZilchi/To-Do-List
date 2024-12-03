import React, { useState } from 'react';
import '../styles/TaskItem.css';
import TaskInfo from '../components/TaskInfo'; 

function TaskItem({ task, completeTask, moveTaskUp, moveTaskDown, deleteTask, setIsToEdit, setEditedTaskId, activeTaskId, setActiveTaskId }) {
    const [isTaskInfoActive, setIsTaskInfoActive] = useState(false);
    const [isCompleted, setIsCompleted] = useState(task.completed);
    const [isDeleted, setIsDeleted] = useState(false);

    const importanceText = task.importance === 1 ? "Important" : "Not Important";
    const urgencyText = task.urgency === 1 ? "Urgent" : "Not Urgent";

    const importanceColor = task.importance === 1 ? "#1E3A8A" : "#18747E";
    const urgencyColor = task.urgency === 1 ? "#6D2E6F" : "#6A0572";

    const handleCompleteTask = () => {
        setIsCompleted(prev => !prev);
        completeTask(task.id);

        if (!isCompleted) {
            setIsDeleted(true);
        }
    };

    const handleDeleteTask = () => {
        setIsDeleted(true);
        const taskItem = document.getElementById(task.id);
        taskItem.addEventListener('animationend', () => {
            deleteTask(task.id);
        });
    };

    return (
        <>
            <TaskInfo 
                isTaskInfoActive={activeTaskId === task.id} 
                setIsTaskInfoActive={() => setActiveTaskId(task.id)}
                task={task}
                deleteTask={deleteTask}
                setIsToEdit={setIsToEdit}
                setEditedTaskId={setEditedTaskId}
            />
            <li 
                id={task.id}
                className={`task-list ${isCompleted ? 'green-bg' : ''} ${isDeleted ? 'slide-out' : ''}`}
            >
                <div className="function-button">
                    <button 
                        className={`completed-button ${isCompleted ? 'clicked' : ''}`} 
                        onClick={handleCompleteTask}
                    ></button>
                    <button className="delete-button" onClick={handleDeleteTask}>—</button>
                </div>
                <div className="task" onClick={() => setActiveTaskId(task.id)}>
                    <h2 className="text" style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
                        {task.text}
                    </h2>
                    <h4 className="description">{task.description}</h4>
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
            </li>
        </>
    );
}

export default TaskItem;
