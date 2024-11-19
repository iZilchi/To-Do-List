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
            console.log("Logged out successfully!");
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
                try{
                    const tasksData = snapshot.val();
                    const tasksList = tasksData
                        ? Object.keys(tasksData).map(key => ({
                            id: key,
                            ...tasksData[key],
                        }))
                        : [];
                    
                    // Sort tasks by the 'order' property
                    tasksList.sort((a, b) => a.order - b.order);
                    setTasks(tasksList);
                } catch (error) {
                    console.error("Error Fetching Tasks: ", error.message);
                }
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
            } else {
                return a.initialOrder - b.initialOrder;
            }
        });
    };

    const sortedTasks = eisenSort(tasks.filter(task => activeDisplay === "to-do" ? !task.completed : task.completed), activeSort);

    // Save order to Firebase when sorting changes
    useEffect(() => {
        const userUid = auth.currentUser?.uid;
        if (userUid && sortedTasks.length) {
            sortedTasks.forEach((task, index) => {
                try{
                    const taskRef = ref(database, `users/${userUid}/tasks/${task.id}`);
                    update(taskRef, { order: index });
                }catch(error){
                    console.error("Error Updating Order: ", error.message);
                }
            });
        }
    }, [sortedTasks, auth.currentUser, database]);

    // Add a new task for the authenticated user
    const addTask = (text, importance, urgency) => {
        if (text.trim()) {
            const userUid = auth.currentUser?.uid;
            if (userUid) {
                const taskScale = (importance === 1 && urgency === 1) ? 1 : 
                                  (importance === 2 && urgency === 1) ? 2 : 
                                  (importance === 1 && urgency === 2) ? 3 : 4;
                try {
                    const newTaskRef = push(ref(database, `users/${userUid}/tasks`));
                    set(newTaskRef, {
                        text,
                        completed: false,
                        importance,
                        urgency,
                        scale: taskScale,
                        order: tasks.length,
                        initialOrder: tasks.length,
                    });
                }catch (error) {
                    console.error("Error Adding Tasks: ", error.message);
                }
            }
        }
    };
    

    // Toggle task completion status
    const completeTask = (id) => {
        const userUid = auth.currentUser?.uid;
        if (userUid) {
            try {
                const taskRef = ref(database, `users/${userUid}/tasks/${id}`);
                const updatedTask = tasks.find(task => task.id === id);
                if (updatedTask) {
                    update(taskRef, { completed: !updatedTask.completed });
                }
            } catch (error) {
                console.error("Error Updating Completed Tasks: ", error.message);
            }
        }
    };

    const moveTaskUp = (id) => {
        // const index = tasks.findIndex(task => task.id === id);
        // if (index > 0) {
        //     const updatedTasks = [...tasks];
            
        //     const tempOrder = updatedTasks[index].initialOrder;
        //     updatedTasks[index].initialOrder = updatedTasks[index - 1].initialOrder;
        //     updatedTasks[index - 1].initialOrder = tempOrder;

        //     // Swap order values
        //     [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
        //     updatedTasks[index].order = index;
        //     updatedTasks[index - 1].order = index - 1;
    
        //     // Update tasks locally
        //     setTasks(updatedTasks);
    
        //     // Update in Firebase
        //     const userUid = auth.currentUser?.uid;
        //     if (userUid) {
        //         try {
        //             const taskRef1 = ref(database, `users/${userUid}/tasks/${updatedTasks[index].id}`);
        //             const taskRef2 = ref(database, `users/${userUid}/tasks/${updatedTasks[index - 1].id}`);
        //             update(taskRef1, { order: updatedTasks[index].order, initialOrder: updatedTasks[index].initialOrder });
        //             update(taskRef2, { order: updatedTasks[index - 1].order, initialOrder: updatedTasks[index - 1].initialOrder });
        //         }catch(error){
        //             console.error("Error Updating Order: ", error.message);
        //         }
        //     }
        // }
        const displayedTasks = eisenSort(
            tasks.filter(task => activeDisplay === "to-do" ? !task.completed : task.completed),
            activeSort
        );
        const index = displayedTasks.findIndex(task => task.id === id);
    
        if (index > 0) {
            const updatedDisplayedTasks = [...displayedTasks];
    
            // Swap the `order` and `initialOrder` values
            const tempOrder = updatedDisplayedTasks[index].order;
            const tempInitialOrder = updatedDisplayedTasks[index].initialOrder;
    
            updatedDisplayedTasks[index].order = updatedDisplayedTasks[index - 1].order;
            updatedDisplayedTasks[index].initialOrder = updatedDisplayedTasks[index - 1].initialOrder;
    
            updatedDisplayedTasks[index - 1].order = tempOrder;
            updatedDisplayedTasks[index - 1].initialOrder = tempInitialOrder;
    
            // Update the tasks array
            const updatedTasks = tasks.map(task => {
                const updatedTask = updatedDisplayedTasks.find(updated => updated.id === task.id);
                return updatedTask || task;
            });
            setTasks(updatedTasks);
    
            // Update Firebase
            const userUid = auth.currentUser?.uid;
            if (userUid) {
                try {
                    const taskRef1 = ref(database, `users/${userUid}/tasks/${updatedDisplayedTasks[index].id}`);
                    const taskRef2 = ref(database, `users/${userUid}/tasks/${updatedDisplayedTasks[index - 1].id}`);
                    update(taskRef1, { order: updatedDisplayedTasks[index].order, initialOrder: updatedDisplayedTasks[index].initialOrder });
                    update(taskRef2, { order: updatedDisplayedTasks[index - 1].order, initialOrder: updatedDisplayedTasks[index - 1].initialOrder });
                } catch (error) {
                    console.error("Error Updating Order: ", error.message);
                }
            }
        }
    };
    
    const moveTaskDown = (id) => {
        // const index = tasks.findIndex(task => task.id === id);
        // if (index < tasks.length - 1) {
        //     const updatedTasks = [...tasks];
            
        //     const tempOrder = updatedTasks[index].initialOrder;
        //     updatedTasks[index].initialOrder = updatedTasks[index + 1].initialOrder;
        //     updatedTasks[index + 1].initialOrder = tempOrder;

        //     // Swap order values
        //     [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
        //     updatedTasks[index].order = index;
        //     updatedTasks[index + 1].order = index + 1;
    
        //     // Update tasks locally
        //     setTasks(updatedTasks);
    
        //     // Update in Firebase
        //     const userUid = auth.currentUser?.uid;
        //     if (userUid) {
        //         try {
        //             const taskRef1 = ref(database, `users/${userUid}/tasks/${updatedTasks[index].id}`);
        //             const taskRef2 = ref(database, `users/${userUid}/tasks/${updatedTasks[index + 1].id}`);
        //             update(taskRef1, { order: updatedTasks[index].order, initialOrder: updatedTasks[index].initialOrder });
        //             update(taskRef2, { order: updatedTasks[index + 1].order, initialOrder: updatedTasks[index + 1].initialOrder });
        //         }catch(error){
        //             console.error("Error Updating Order: ", error.message);
        //         }
        //     }
        // }
        const displayedTasks = eisenSort(
            tasks.filter(task => activeDisplay === "to-do" ? !task.completed : task.completed),
            activeSort
        );
        const index = displayedTasks.findIndex(task => task.id === id);
    
        if (index < displayedTasks.length - 1) {
            const updatedDisplayedTasks = [...displayedTasks];
    
            // Swap the `order` and `initialOrder` values
            const tempOrder = updatedDisplayedTasks[index].order;
            const tempInitialOrder = updatedDisplayedTasks[index].initialOrder;
    
            updatedDisplayedTasks[index].order = updatedDisplayedTasks[index + 1].order;
            updatedDisplayedTasks[index].initialOrder = updatedDisplayedTasks[index + 1].initialOrder;
    
            updatedDisplayedTasks[index + 1].order = tempOrder;
            updatedDisplayedTasks[index + 1].initialOrder = tempInitialOrder;
    
            // Update the tasks array
            const updatedTasks = tasks.map(task => {
                const updatedTask = updatedDisplayedTasks.find(updated => updated.id === task.id);
                return updatedTask || task;
            });
            setTasks(updatedTasks);
    
            // Update Firebase
            const userUid = auth.currentUser?.uid;
            if (userUid) {
                try {
                    const taskRef1 = ref(database, `users/${userUid}/tasks/${updatedDisplayedTasks[index].id}`);
                    const taskRef2 = ref(database, `users/${userUid}/tasks/${updatedDisplayedTasks[index + 1].id}`);
                    update(taskRef1, { order: updatedDisplayedTasks[index].order, initialOrder: updatedDisplayedTasks[index].initialOrder });
                    update(taskRef2, { order: updatedDisplayedTasks[index + 1].order, initialOrder: updatedDisplayedTasks[index + 1].initialOrder });
                } catch (error) {
                    console.error("Error Updating Order: ", error.message);
                }
            }
        }
    };
    

    // Delete a task
    const deleteTask = (id) => {
        const userUid = auth.currentUser?.uid;
        if (userUid) {
            try{
                const taskRef = ref(database, `users/${userUid}/tasks/${id}`);
                remove(taskRef);
            } catch (error) {
                console.error("Error Deleting Task: ", error.message);
            }
        }
    };

    return (
        <div className="container">
            <h1 className="header">To-Do List</h1>
            <button className="logout-button" onClick={handleLogout}>Logout</button>

            <div className="container-outline">
                <ProgressBar progress={progress} />
                <DisplayButton activeDisplay={activeDisplay} setActiveDisplay={setActiveDisplay} />
                <TaskList tasks={sortedTasks} completeTask={completeTask} moveTaskUp={moveTaskUp} moveTaskDown={moveTaskDown} deleteTask={deleteTask} />
                <SortButton activeSort={activeSort} setActiveSort={setActiveSort} />
                <button className="add-task" onClick={() => setisActive(prev => !prev)}>+</button>
            </div>
            <AddTaskForm addTask={addTask} isActive={isActive} setisActive={setisActive} />
        </div>
    );
}

export default ToDoList;
