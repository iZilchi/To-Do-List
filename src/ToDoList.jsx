import { useState, useEffect } from 'react';
import { auth, database } from './firebase';
import { ref, onValue, push, set, update, remove } from 'firebase/database';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './components/ProgressBar';
import TaskList from './components/TaskList';
import DisplayButton from './components/DisplayButton';
import SortButton from './components/SortButton';
import AddTaskForm from './components/AddTaskForm';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
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
    const addTask = (text, importance, urgency) => {
        if (text.trim()) {
            const userUid = auth.currentUser?.uid;
            if (userUid) {
                const taskScale = (importance === 1 && urgency === 1) ? 1 : 
                                  (importance === 2 && urgency === 1) ? 2 : 
                                  (importance === 1 && urgency === 2) ? 3 : 4;
                const newTaskRef = push(ref(database, `users/${userUid}/tasks`));
                set(newTaskRef, {
                    text,
                    completed: false,
                    importance,
                    urgency,
                    scale: taskScale
                });
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
                <ProgressBar progress={progress} />
                <DisplayButton activeDisplay={activeDisplay} setActiveDisplay={setActiveDisplay} />
                <TaskList tasks={sortedTasks} completeTask={completeTask} deleteTask={deleteTask} />
                <SortButton activeSort={activeSort} setActiveSort={setActiveSort} />
                <button className="add-task" onClick={() => setisActive(prev => !prev)}>+</button>
            </div>
            <AddTaskForm addTask={addTask} isActive={isActive} setisActive={setisActive} />
        </div>
    );
}

export default ToDoList;
