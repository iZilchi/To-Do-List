import React, {useState} from "react";

import '../styles/AddTaskForm.css';

function AddTaskForm({addTask, isActive, setisActive}){
    const [newTask, setNewTask] = useState("");
    const [importance, setImportance] = useState(2);
    const [urgency, setUrgency] = useState(2);

    const handleAddTask = () => {
        addTask(newTask, importance, urgency);
        setNewTask("");
        setImportance(2);
        setUrgency(2);
        setisActive(false);
    }

    return (
        isActive && (
            <div className="pop-up">
                <input id="task-input" type="text" placeholder="Enter a new task..." className="task-textbox" value={newTask} onChange={e => setNewTask(e.target.value)} />
                <div className="pop-up-container">
                    <select className="option-container" value={importance} onChange={e => setImportance(Number(e.target.value))}>
                        <option value={1}>Important</option>
                        <option value={2}>Not Important</option>
                    </select>
                    <select className="option-container" value={urgency} onChange={e => setUrgency(Number(e.target.value))}>
                        <option value={1}>Urgent</option>
                        <option value={2}>Not Urgent</option>
                    </select>
                    <button className="add-button" onClick={handleAddTask}>+</button>
                </div>
            </div>
        )
    );
}

export default AddTaskForm;