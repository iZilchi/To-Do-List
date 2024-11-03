// Ginamitan ko na nang shorthand yung mga function para malinis tingnan
import React, { useState, useEffect } from 'react';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [importance, setImportance] = useState("not-important");
    const [urgency, setUrgency] = useState("not-urgent");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [activeDisplay, setActiveDisplay] = useState("to-do");
    const [activeSort, setActiveSort] = useState(null);
    const [progress, setProgress] = useState(0);

    // Galing gpt yung calculation nung progress depende kung gaano kadami yung task
    const calculateProgress = () => {
        const completedTasks = tasks.filter(task => task.completed).length;
        return tasks.length ? (completedTasks / tasks.length) * 100 : 0;
    };

    // Pag-uupdate nung progress
    useEffect(() => {
        setProgress(calculateProgress());
    }, [tasks]);

    const displayedTasks = tasks.filter(task =>
        activeDisplay === "to-do" ? !task.completed : task.completed
    );

    const handleInputChange = (e) => setNewTask(e.target.value);
    const handleImportanceChange = (e) => setImportance(e.target.value);
    const handleUrgencyChange = (e) => setUrgency(e.target.value);
    const handleDisplayChange = (displayType) => setActiveDisplay(displayType);
    const handleSortChange = (sortType) => setActiveSort(sortType);
    const togglePopUp = () => setIsPopupOpen(prev => !prev);

    // Gumamit ng Date.now() function para mag set ng unique id sa bawat tasks since iba't iba ang timestamp ng pag-aadd ng task
    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, {
                id: Date.now(),
                text: newTask,
                completed: false,
                importance,
                urgency
            }]);
            setNewTask("");
            setImportance("not-important");
            setUrgency("not-urgent");
        }
    };

    // Pinaltan ko yung displayedTasks.map to tasks.map para maayos yung pag display nung completed tasks
    const completeTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div className="container">
            <h1 className="header">To-Do List</h1>
            <div className="container-outline">
        
                <div className="progress-bar">
                    <div
                        className="progress-bar-fill"
                        style={{ width: `${progress}%` }}
                    >
                        {Math.round(progress)}%
                    </div>
                </div>

                <div className="view-container">
                    {["to-do", "completed"].map(view => (
                        <button
                            key={view}
                            className={`${view}-view ${activeDisplay === view ? 'active' : ''}`}
                            onClick={() => handleDisplayChange(view)}
                        >
                            {view.charAt(0).toUpperCase() + view.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="list-container">
                    <ol>
                        {displayedTasks.map(task => (
                            <li key={task.id}>
                                <button className="completed-button" onClick={() => completeTask(task.id)} />
                                <span className="text" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                    {task.text}
                                </span>
                                <button className="delete-button" onClick={() => deleteTask(task.id)}>—</button>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="sort-container">
                    {["importance-urgency", "importance", "urgency"].map(sortType => (
                        <button
                            key={sortType}
                            className={`${sortType}-sort ${activeSort === sortType ? 'active' : ''}`}
                            onClick={() => handleSortChange(sortType)}
                        >
                            {sortType.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                        </button>
                    ))}
                </div>

                <button className="add-task" onClick={togglePopUp}>+</button>
            </div>

            {isPopupOpen && (
                <div className="pop-up">
                    <input
                        type="text"
                        placeholder="Enter a new task..."
                        className="task-textbox"
                        value={newTask}
                        onChange={handleInputChange}
                    />
                    <div className="pop-up-container">
                        <select className="option-container" value={importance} onChange={handleImportanceChange}>
                            <option value="important">Important</option>
                            <option value="not-important">Not Important</option>
                        </select>
                        <select className="option-container" value={urgency} onChange={handleUrgencyChange}>
                            <option value="urgent">Urgent</option>
                            <option value="not-urgent">Not Urgent</option>
                        </select>
                        <button className="add-button" onClick={addTask}>+</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ToDoList;
