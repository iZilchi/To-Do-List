import React from "react";
import TaskItem from "./TaskItem";

import '../styles/TaskList.css';

function TaskList({tasks, completeTask, moveTaskUp, moveTaskDown, deleteTask, setIsToEdit, setEditedTaskId }){
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
                    />
                ))}
            </ol>
        </div>
    );
}

export default TaskList;