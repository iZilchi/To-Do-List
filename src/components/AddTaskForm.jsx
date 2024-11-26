import React, { useState } from "react";
import '../styles/AddTaskForm.css';

function AddTaskForm({ addTask, isAddActive, setIsAddActive, activeDisplay }) {
    const [newTask, setNewTask] = useState("");
    const [description, setDescription] = useState("");
    const [importance, setImportance] = useState(2);
    const [urgency, setUrgency] = useState(2);
    const [showWarning, setShowWarning] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false); // Track if fade-out is in progress

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
        setShowWarning(false);
        setIsFadingOut(true);
        
        setTimeout(() => {
            setIsAddActive(false);
            setIsFadingOut(false);
        }, 500);
    };

    const handleImportanceClick = (value) => {
        setImportance(value);
    };

    const handleUrgencyClick = (value) => {
        setUrgency(value);
    };

    return (
        isAddActive && (
            <div className={`background-opacity ${isFadingOut ? 'fade-in' : ''}`}>
                <div className="add-pop-up">
                    <h4 className={`h4-add-task ${activeDisplay === "completed" ? "completed-view" : "todo-view"}`}>Add New Task</h4>
                    <div className="field">
                        <h3 className={`h3-task-name ${activeDisplay === "completed" ? "completed-view" : "todo-view"}`}>Task Name</h3>
                        <input
                            id="task-input"
                            type="text"
                            placeholder={showWarning ? "Task name is required!" : "Enter task name"}
                            className={`task-textbox ${showWarning ? "warning" : ""} ${activeDisplay === "completed" ? "completed-view" : "todo-view"}`}
                            value={newTask}
                            onChange={(e) => {
                                setNewTask(e.target.value);
                                setShowWarning(false);
                            }}
                            maxLength={30}
                        />
                        <div className={`option-container importance-container ${activeDisplay === "completed" ? "completed-view" : "todo-view"}`}>
                            <h3 className={`h3-importance ${activeDisplay === "completed" ? "completed-view" : "todo-view"}`}>Importance</h3>
                            <div className={`button-group ${activeDisplay === "completed" ? "completed-view" : "todo-view"}`}>
                                <button
                                    value={1}
                                    className={` ${importance === 1 ? 'active' : ''} ${activeDisplay === "completed" ? "completed-view" : "todo-view"}`}
                                    onClick={() => handleImportanceClick(1)}
                                >
                                    Important
                                </button>
                                <button
                                    value={2}
                                    className={` ${importance === 2 ? 'active' : ''} ${activeDisplay === "completed" ? "completed-view" : "todo-view"}`}
                                    onClick={() => handleImportanceClick(2)}
                                >
                                    Not Important
                                </button>
                            </div>
                        </div>
                        <div className={`option-container urgency-container ${activeDisplay === "completed" ? "completed-view" : "todo-view"}`}>
                            <h3 className={`h3-urgency ${activeDisplay === "completed" ? "completed-view" : "todo-view"}`}>Urgency</h3>
                            <div className={`button-group ${activeDisplay === "completed" ? "completed-view" : "todo-view"}`}>
                                <button
                                    value={1}
                                    className={` ${urgency === 1 ? 'active' : ''} ${activeDisplay === "completed" ? "completed-view" : "todo-view"}`}
                                    onClick={() => handleUrgencyClick(1)}
                                >
                                    Urgent
                                </button>
                                <button
                                    value={2}
                                    className={` ${urgency === 2 ? 'active' : ''} ${activeDisplay === "completed" ? "completed-view" : "todo-view"}`}
                                    onClick={() => handleUrgencyClick(2)}
                                >
                                    Not Urgent
                                </button>
                            </div>
                        </div>
                        <h3 className={`h3-task-desc ${activeDisplay === "completed" ? "completed-view" : "todo-view"}`}>Task Description</h3>
                        <textarea
                            id="description-input"
                            className={`description-textarea ${activeDisplay === "completed" ? "completed-view" : "todo-view"}`}
                            placeholder="Enter task description"
                            value={description || ""} // Ensure the value is always a string
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                        />
                    </div>
                    <button
                        className={`done-button ${activeDisplay === "completed" ? "completed-view" : "todo-view"}`}
                        onClick={handleAddTask}
                    >
                        Done
                    </button>
                    <button className={`back-button ${activeDisplay === "completed" ? "completed-view" : "todo-view"}`} onClick={handleClose}>✖</button>
                </div>
            </div>
        )
    );
}

export default AddTaskForm;
