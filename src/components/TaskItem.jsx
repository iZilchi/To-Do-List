import React from "react";

import '../styles/TaskItem.css';

function TaskItem ({task, completeTask, moveTaskUp, moveTaskDown, deleteTask}){


    return (
        <li>
            <button className="completed-button" onClick={() => completeTask(task.id)}>✓</button>
            <span className="text" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text}
            </span>
            <div className="button-group">
                <button className="move-button" onClick={() => moveTaskUp(task.id)}>⇧</button>
                <button className="move-button" onClick={() => moveTaskDown(task.id)}>⇩</button>
                <button className="delete-button" onClick={() => deleteTask(task.id)}>—</button>
            </div>
        </li>
    );
}

export default TaskItem;