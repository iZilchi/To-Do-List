import { useState, useEffect } from 'react';
import { database } from './firebase';
import { ref, onValue, push, set, update, remove } from 'firebase/database';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [importance, setImportance] = useState(2);
    const [urgency, setUrgency] = useState(2);
    const [isActive, setisActive] = useState(false);
    const [activeDisplay, setActiveDisplay] = useState("to-do");
    const [activeSort, setActiveSort] = useState(null);
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    // Logout function
    const handleLogout = async () => {
        try {
            await signOut(auth);  
            alert("Logged out successfully!");
            navigate('/');  
        } catch (error) {
            console.error("Error logging out: ", error.message);
        }
    };

    // Fetch tasks for the logged-in user
    useEffect(() => {
        const userUid = auth.currentUser?.uid;
        if (userUid) {
            const tasksRef = ref(database, `users/${userUid}/tasks`);
            onValue(tasksRef, (snapshot) => {
                const tasksData = snapshot.val();
                const tasksList = tasksData
                    ? Object.keys(tasksData).map(key => ({
                          id: key,
                          ...tasksData[key],
                      }))
                    : [];
                setTasks(tasksList);
            });
        } else {
            navigate('/');  // Redirect to login if the user is not authenticated
        }
    }, [navigate]);

    // Calculate progress based on completed tasks
    const calculateProgress = () => {
        const completedTasks = tasks.filter(task => task.completed).length;
        return tasks.length ? (completedTasks / tasks.length) * 100 : 0;
    };

    // Update progress whenever tasks change
    useEffect(() => {
        setProgress(calculateProgress());
    }, [tasks]);

    // Sort tasks by importance and urgency
    const eisenSort = (tasks, activeSort) => {
        return tasks.slice().sort((a, b) => {
            if (activeSort === "importance-urgency") {
                return a.scale - b.scale;
            } else if (activeSort === "importance") {
                return a.importance - b.importance;
            } else if (activeSort === "urgency") {
                return a.urgency - b.urgency;
            }
            return 0;
        });
    };

    const sortedTasks = eisenSort(tasks.filter(task => activeDisplay === "to-do" ? !task.completed : task.completed), activeSort);

    // Add a new task for the authenticated user
    const addTask = () => {
        if (newTask.trim()) {
            const userUid = auth.currentUser?.uid;
            if (userUid) {
                const taskScale = (importance === 1 && urgency === 1) ? 1 : 
                                  (importance === 2 && urgency === 1) ? 2 : 
                                  (importance === 1 && urgency === 2) ? 3 : 4;
                const newTaskRef = push(ref(database, `users/${userUid}/tasks`));
                set(newTaskRef, {
                    text: newTask,
                    completed: false,
                    importance,
                    urgency,
                    scale: taskScale
                });
                setNewTask("");
                setImportance(2);
                setUrgency(2);
            } else {
                alert("User not authenticated.");
                navigate('/');  
            }
        }
    };

    // Toggle task completion status
    const completeTask = (id) => {
        const userUid = auth.currentUser?.uid;
        if (userUid) {
            const taskRef = ref(database, `users/${userUid}/tasks/${id}`);
            const updatedTask = tasks.find(task => task.id === id);
            if (updatedTask) {
                update(taskRef, { completed: !updatedTask.completed });
            }
        }
    };

    // Delete a task
    const deleteTask = (id) => {
        const userUid = auth.currentUser?.uid;
        if (userUid) {
            const taskRef = ref(database, `users/${userUid}/tasks/${id}`);
            remove(taskRef);
        }
    };

    return (
        <div className="container">
            <h1 className="header">To-Do List</h1>
            <button className="logout-button" onClick={handleLogout}>Logout</button>

            <div className="container-outline">
                <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${progress}%` }}>
                        {Math.round(progress)}%
                    </div>
                </div>

                <div className="view-container">
                    {["to-do", "completed"].map(view => (
                        <button key={view}
                                className={`${view}-view ${activeDisplay === view ? 'active' : ''}`}
                                onClick={() => setActiveDisplay(view)}>
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
                        <button key={sortType}
                                className={`${sortType}-sort ${activeSort === sortType ? 'active' : ''}`}
                                onClick={() => setActiveSort(prev => (prev === sortType ? null : sortType))}>
                            {sortType.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                        </button>
                    ))}
                </div>

                <button className="add-task" onClick={() => setisActive(prev => !prev)}>+</button>
            </div>

            {isActive && (
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
                        <button className="add-button" onClick={addTask}>+</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ToDoList;
