import React from "react";

import '../styles/TaskItem.css';

function TaskItem ({task, completeTask, deleteTask}){
    return (
        <li>
            <button className="completed-button" onClick={() => completeTask(task.id)}>✓</button>
            <span className="text" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text}
            </span>
            <button className="delete-button" onClick={() => deleteTask(task.id)}>—</button>
        </li>
    );
}

export default TaskItem;