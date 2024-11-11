import React from "react";
import TaskItem from "./TaskItem";

import '../styles/TaskList.css';

function TaskList({tasks, completeTask, deleteTask}){
    return (
        <div className="list-container">
            <ol>
                {tasks.map(task => (
                    <TaskItem 
                        key = {task.id}
                        task = {task}
                        completeTask = {completeTask}
                        deleteTask = {deleteTask}
                    />
                ))}
            </ol>
        </div>
    );
}

export default TaskList;