import React, { useState } from "react";
import '../styles/AddTaskForm.css';

function AddTaskForm({ addTask, isAddActive, setIsAddActive }) {
    const [newTask, setNewTask] = useState("");
    const [description, setDescription] = useState("");
    const [importance, setImportance] = useState(2);
    const [urgency, setUrgency] = useState(2);
    const [showWarning, setShowWarning] = useState(false);

    const handleAddTask = () => {
        if (!newTask.trim()) {
            setShowWarning(true); 
            return; 
        }
        addTask(newTask, description, importance, urgency);
        setNewTask("");
        setDescription("");
        setImportance(2);
        setUrgency(2);
        setIsAddActive(false);
        setShowWarning(false);
    };

    const handleClose = () => {
        setNewTask("");
        setDescription("");
        setImportance(2);
        setUrgency(2);
        setIsAddActive(false);
        setShowWarning(false);
    };

    const handleImportanceClick = (value) => {
        setImportance(value);
    };

    const handleUrgencyClick = (value) => {
        setUrgency(value);
    };

    return (
        isAddActive && (
            <div className="add-pop-up">
                <h3 className="h3-add-task">Add New Task</h3>
                <div className="field">
                    <h4 className="h4-task-name">Task Name</h4>
                    <input
                        id="task-input"
                        type="text"
                        placeholder={showWarning ? "Task name is required!" : "Enter task name"}
                        className={`task-textbox ${showWarning ? "warning" : ""}`}
                        value={newTask}
                        onChange={(e) => {
                            setNewTask(e.target.value);
                            setShowWarning(false);
                        }}
                        maxLength={30}
                    />
                    <div className="option-container importance-container">
                        <h4 className="h4-importance">Importance</h4>
                        <div className="button-group">
                            <button
                                value={1}
                                className={importance === 1 ? 'active' : ''}
                                onClick={() => handleImportanceClick(1)}
                            >
                                Important
                            </button>
                            <button
                                value={2}
                                className={importance === 2 ? 'active' : ''}
                                onClick={() => handleImportanceClick(2)}
                            >
                                Not Important
                            </button>
                        </div>
                    </div>
                    <div className="option-container urgency-container">
                        <h4 className="h4-urgency">Urgency</h4>
                        <div className="button-group">
                            <button
                                value={1}
                                className={urgency === 1 ? 'active' : ''}
                                onClick={() => handleUrgencyClick(1)}
                            >
                                Urgent
                            </button>
                            <button
                                value={2}
                                className={urgency === 2 ? 'active' : ''}
                                onClick={() => handleUrgencyClick(2)}
                            >
                                Not Urgent
                            </button>
                        </div>
                    </div>
                    <h4 className="h4-task-desc">Task Description</h4>
                    <textarea
                        id="description-input"
                        className="description-textarea"
                        placeholder="Enter task description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                    />
                </div>
                <button
                    className="done-button"
                    onClick={handleAddTask}
                >
                    Done
                </button>
                <button className="back-button" onClick={handleClose}>✖</button>
            </div>
        )
    );
}

export default AddTaskForm;
