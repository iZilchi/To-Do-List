import React, { useState } from 'react';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [importance, setImportance] = useState("not-important");           {/*array for importance*/}
    const [urgency, setUrgency] = useState("not-urgent");                    {/*array for urgency*/}
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [activeDisplay, setActiveDisplay] = useState("todo");             {/*array for display buttons: todo and Completed*/}
    const [activeSort, setActiveSort] = useState(null);                     {/*array for sort buttons: urgencyimportance, importance, urgency*/}

    const displayedTasks = tasks.filter(task =>
        activeDisplay === "todo" ? !task.completed : task.completed         /*filter function para sa todo at completed display*/
    );

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function handleImportanceChange(event){
        setImportance(event.target.value);
    }

    function handleUrgencyChange(event){
        setUrgency(event.target.value);
    }

    function handleDisplayChange(buttonType) {                              {/*for getting the value of display buttons*/}
        setActiveDisplay(buttonType);
    }

    function handleSortChange(buttonType){                                  {/*for getting the value of sort buttons*/}
        setActiveSort(buttonType);
    }

    function addTask() {                                                    {/*updated: di magcclose yung task creation window hanggang di pinipindot yung + button*/}
        if (setIsPopupOpen === 'true'){
            setIsPopupOpen(false);
        }else{
            if (newTask.trim() !== "") {
                setTasks(t => [...t, { text: newTask, completed: false, importance, urgency }]);        {/*Additional importance and urgency value to add to task*/}
                setNewTask("");
                setImportance("not-important");                                 
                setUrgency("not-urgent");

            }
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function completeTask(index) {
        const updatedTasks = displayedTasks.map((task, i) => 
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    }

    function togglePopUp() {
        setIsPopupOpen(prev => !prev);
    }


    return (
        <div className="container">
            <h1 className="header">To-Do List</h1>
            <div className="container-outline">             {/*classname*/}
                <div className="progress-bar">0%</div>
                <div className="view-container">            {/*classname*/}
                    <button
                        className={`to-do-view ${activeDisplay === 'todo' ? 'active' : ''}`}     /*classname*/
                        onClick={() => handleDisplayChange('todo')}
                    >
                        To-Do
                    </button>
                    <button
                        className={`completed-view ${activeDisplay === 'completed' ? 'active' : ''}`}    /*classname*/
                        onClick={() => handleDisplayChange('completed')}
                    >
                        Completed
                    </button>    
                </div>
                <div className="list-container">
                    <ol>
                        {displayedTasks.map((task, index) =>                /*changed tasks to displayedTasks*/
                            <li key={index}>
                                <button className="completed-button" onClick={() => completeTask(index)}>
                                </button>
                                <span className="text" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                    {task.text}
                                </span>
                                <button className="delete-button" onClick={() => deleteTask(index)}>
                                    —
                                </button>
                            </li>
                        )}
                    </ol>
                </div>   
                <div className="sort-container">            {/*classname*/}
                    <button
                        className={`importance-urgency-sort ${activeSort === 'importance-urgency' ? 'active' : ''}`}
                        onClick={() => handleSortChange('importance-urgency')}
                    >
                        Importance Urgency
                    </button>
                    <button
                        className={`importance-sort ${activeSort === 'importance' ? 'active' : ''}`}
                        onClick={() => handleSortChange('importance')}
                    >
                        Importance
                    </button>
                    <button
                        className={`urgency-sort ${activeSort === 'urgency' ? 'active' : ''}`}
                        onClick={() => handleSortChange('urgency')}
                    >
                        Urgency
                    </button>    
                </div>   
                <button className="add-task" onClick={togglePopUp}>
                    +
                </button>  
            </div>
            
            {isPopupOpen && (
                <div className={`pop-up ${isPopupOpen ? 'open' : ''}`}>
                    <input
                        type="text"
                        placeholder="Enter a new task..."
                        className="task-textbox"
                        value={newTask}
                        onChange={handleInputChange}
                    />
                    <div className="pop-up-container">
                        <select className="option-container" value={importance} onChange={handleImportanceChange}>
                            <option className="option-button" value="important">Important</option>
                            <option className="option-button" value="not-important">Not Important</option>
                        </select>
                        <select className="option-container" value={urgency} onChange={handleUrgencyChange}>
                            <option className="option-button" value="urgent">Urgent</option>
                            <option className="option-button" value="not-urgent">Not Urgent</option>
                        </select>
                        <button className="add-button" onClick={addTask}>
                            +
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default ToDoList;
