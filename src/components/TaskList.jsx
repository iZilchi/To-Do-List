import TaskItem from "./TaskItem";
import React, { useState } from 'react';


import '../styles/TaskList.css';

function TaskList({tasks, completeTask, moveTaskUp, moveTaskDown, deleteTask, setIsToEdit, setEditedTaskId }){
    const [activeTaskId, setActiveTaskId] = useState(null);

    const handleSetActiveTask = (taskId) => {
        setActiveTaskId(prevTaskId => (prevTaskId === taskId ? null : taskId));
    };

    return (
        <div className="list-container">
            <ol>
                {tasks.map(task => (
                    <TaskItem 
                        key = {task.id}
                        task = {task}
                        completeTask = {completeTask}
                        moveTaskUp={moveTaskUp}
                        moveTaskDown={moveTaskDown}
                        deleteTask = {deleteTask}
                        setIsToEdit = {setIsToEdit}
                        setEditedTaskId={setEditedTaskId}
                        activeTaskId={activeTaskId}
                        setActiveTaskId={handleSetActiveTask}
                    />
                ))}
            </ol>
        </div>
    );
}

export default TaskList;