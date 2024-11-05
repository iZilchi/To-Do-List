import React, { useState, useEffect } from 'react';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

     //ginawa kong number yung value ng importance at urgency
    const [importance, setImportance] = useState(2);
    const [urgency, setUrgency] = useState(2);

    const [isActive, setisActive] = useState(false);
    const [activeDisplay, setActiveDisplay] = useState("to-do");
    const [activeSort, setActiveSort] = useState(null);
    const [progress, setProgress] = useState(0);
    
    

    const handleInputChange = (e) => setNewTask(e.target.value);

    //Niconvert ko yung value ng importance at urgency sa number
    const handleImportanceChange = (e) => setImportance(Number(e.target.value));
    const handleUrgencyChange = (e) => setUrgency(Number(e.target.value));

    const handleDisplayChange = (displayType) => setActiveDisplay(displayType);

    //Minodify ko para madeselect. Nilagyan ko ng condition na nagseset ng null pag active tas pinindot uli.
    const handleSortChange = (sortType) => setActiveSort(prev => (prev === sortType ? null : sortType));

    //Pinaltan ko yung togglePopUp ng pangalan para sa naming convention since ginamit din to dun sa sort buttons.
    const toggleActive = () => setisActive(prev => !prev);

    const calculateProgress = () => {
        const completedTasks = tasks.filter(task => task.completed).length;
        return tasks.length ? (completedTasks / tasks.length) * 100 : 0;
    };

    useEffect(() => {
        setProgress(calculateProgress());
    }, [tasks]);

    //Eisen Sort: Importance and Urgency, Importance, Urgency, default yung return 0
    function eisenSort(tasks, activeSort){
        return tasks.slice().sort((a,b) => {
            if (activeSort === "importance-urgency") {
                return (a.scale - b.scale);
            } else if (activeSort === "importance") {
                return (a.importance - b.importance);
            } else if (activeSort === "urgency"){
                return (a.urgency - b.urgency);
            } else {
                return 0;
            }
        });
    }

    //Pinaltan ko yung displayedTasks neto para default nalang na magdidisplay yung displayedTask pag walang sort na pinili
    const sortedTasks = eisenSort(tasks.filter(task => activeDisplay === "to-do" ? !task.completed : task.completed), activeSort);

    // Dinagdagan ko ng scale yung setTasks para yun gagamitin sa importance-urgency sorting.
    const addTask = () => {
        if (newTask.trim()) {

            let taskScale = 4;

            if(importance === 1 && urgency === 1){
                taskScale = 1;
            } else if (importance === 2 && urgency === 1){
                taskScale = 2;
            } else if (importance === 1 && urgency === 2){
                taskScale = 3;
            } else {
                taskScale = 4;
            }
            
            setTasks([...tasks, {
                id: Date.now(),
                text: newTask,
                completed: false,
                importance,
                urgency,
                scale: taskScale

            }]);
            
            setNewTask("");
            setImportance(2);
            setUrgency(2);
        }
    };

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
                        {sortedTasks.map(task => (
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

                <button className="add-task" onClick={toggleActive}>+</button>
            </div>

            {isActive && (
                <div className="pop-up">
                    <input id="task-input"
                        type="text"
                        placeholder="Enter a new task..."
                        className="task-textbox"
                        value={newTask}
                        onChange={handleInputChange}
                    />

                    {/*Binago ko value ng option sa importance at urgency*/}

                    <div className="pop-up-container">
                        <select className="option-container" value={importance} onChange={handleImportanceChange} id="importance-select" name="importance">
                            <option value={1}>Important</option>
                            <option value={2}>Not Important</option>
                        </select>
                        <select className="option-container" value={urgency} onChange={handleUrgencyChange} id="urgency-select" name="urgency">
                            <option value={1}>Urgent</option>
                            <option value={2}>Not Urgent</option>
                        </select>
                        <button className="add-button" onClick={addTask}>+</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ToDoList;
