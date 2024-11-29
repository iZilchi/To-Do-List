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
import Help from './components/Help';
import About from './components/About';
import TaskInfo from './components/TaskInfo';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [isAddActive, setIsAddActive] = useState(false);
    const [isToEdit, setIsToEdit] = useState(false); //Para malaman kung naka edit mode
    const [editedTaskId, setEditedTaskId] = useState(null); // Track task being edited
    const [isSortActive, setIsSortActive] = useState(false);
    const [isHelpActive, setIsHelpActive] = useState(false);
    const [isAboutActive, setIsAboutActive] = useState(false);
    const [isTaskInfoActive, setIsTaskInfoActive] = useState(false);
    const [activeDisplay, setActiveDisplay] = useState("to-do");
    const [activeSort, setActiveSort] = useState(null);
    const [progress, setProgress] = useState(0);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
    const navigate = useNavigate();

    const sortImages = {
        "importance-urgency": "../src/assets/Imp-Urg.png",
        importance: "../src/assets/Importance.png",
        urgency: "../src/assets/Urgency.png",
    };

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
                try {
                    const tasksData = snapshot.val();
                    const tasksList = tasksData
                        ? Object.keys(tasksData).map(key => ({
                            id: key,
                            ...tasksData[key],
                        }))
                        : [];
                    
                    tasksList.sort((a, b) => a.order - b.order);
                    setTasks(tasksList);
                } catch (error) {
                    console.error("Error Fetching Tasks: ", error.message);
                    setTasks([]); // Ensure tasks is reset to an empty array if there's an error
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
    const addTask = (text, description, importance, urgency) => {
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
                  description,
                  completed: false,
                  importance,
                  urgency,
                  scale: taskScale,
                  order: tasks.length,
                  initialOrder: tasks.length,
                });
              } catch (error) {
                console.error("Error Adding Tasks: ", error.message);
              }
            
          }
        }
      };

      // Edit an existing task
    const editTask = (id, text, description, importance, urgency) => {
        if (text.trim()){
            const userUid = auth.currentUser?.uid;
            if (userUid && id) {
                const taskRef = ref(database, `users/${userUid}/tasks/${id}`);
                const taskScale = (importance === 1 && urgency === 1) ? 1 : 
                                (importance === 2 && urgency === 1) ? 2 : 
                                (importance === 1 && urgency === 2) ? 3 : 4;

                try {
                    update(taskRef, {
                        text,
                        description,
                        importance,
                        urgency,
                        scale: taskScale,
                    });
                } catch (error) {
                    console.error("Error Editing Task: ", error.message);
                }
            }
        }
    };

    const taskToEdit = isToEdit ? tasks.find(task => task.id === editedTaskId) : null;
    
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
            try {
                const taskRef = ref(database, `users/${userUid}/tasks/${id}`);
                remove(taskRef);
            } catch (error) {
                console.error("Error Deleting Task: ", error.message);
            }
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleOpenDrawer = () => {
        setDrawerOpen(true);
        setIsClosing(false);
    };

    const handleCloseDrawer = () => {
        setIsClosing(true);
        setTimeout(() => {
            setDrawerOpen(false);
            setIsClosing(false);
        }, 800);
    };


    const toggleSortMenu = () => {
        setIsSortActive((prev) => !prev);
    };

    return (
        <>
            <button 
                className={`burger-button ${activeDisplay === "completed" ? "completed-active" : ""}`}
                onClick={handleOpenDrawer} 
                style={{ display: drawerOpen ? 'none' : 'block' }}
            >
                ☰
            </button>
            {drawerOpen && (
                <div className={`drawer ${isClosing ? 'slide-out' : ''}`}>
                    <div className={`drawer ${activeDisplay === "completed" ? "completed-active" : ""}`}>
                        <div className="drawer-container">
                            <h2 className="drawer-header">ProcrastiMate</h2>
                            <button className="close-button" onClick={handleCloseDrawer}>✖</button>
                        </div>
                        <button className={`to-do-drawer ${activeDisplay === "completed" ? "completed-active" : ""}`} onClick={() => { navigate('/todo'); handleCloseDrawer(); }}>
                            <span>My Task</span>
                        </button>
                        <button className={`help-drawer ${activeDisplay === "completed" ? "completed-active" : ""}`} onClick={() => { setIsHelpActive(prev => !prev); handleCloseDrawer(); }}>
                            <span>Help</span>
                        </button>
                        <button className={`about-drawer ${activeDisplay === "completed" ? "completed-active" : ""}`} onClick={() => { setIsAboutActive(prev => !prev); handleCloseDrawer(); }}>
                            <span>About</span>
                        </button>
                        <button className={`logout-drawer ${activeDisplay === "completed" ? "completed-active" : ""}`} onClick={() => { handleLogout(); handleCloseDrawer(); }}>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            )}

            <h1 className={`header ${activeDisplay === "completed" ? "completed-active" : ""}`}>To-Do List</h1>
            <div className="container">
                <div className="container-outline">
                    <ProgressBar progress={progress} activeDisplay={activeDisplay} tasks={tasks} />
                    <DisplayButton activeDisplay={activeDisplay} setActiveDisplay={setActiveDisplay} />
                    <TaskList tasks={sortedTasks} completeTask={completeTask} moveTaskUp={moveTaskUp} moveTaskDown={moveTaskDown} deleteTask={deleteTask} setIsToEdit={setIsToEdit} setEditedTaskId={setEditedTaskId} />
                    <div className="sort-add-container">
                    <button
                        className={`filter-task ${activeDisplay === "completed" ? "completed-active" : ""}`}
                        onClick={toggleSortMenu}
                    >
                        <img
                            src={sortImages[activeSort] || "../src/assets/Sort.png"}
                            alt="Filter"
                        />
                    </button>
                        <button className={`add-task ${activeDisplay === "completed" ? "completed-active" : ""}`} onClick={() => setIsAddActive(prev => !prev)}>+</button>
                    </div>
                </div>
                <AddTaskForm addTask={addTask} editTask={editTask} isAddActive={isAddActive} setIsAddActive={setIsAddActive} activeDisplay={activeDisplay} isToEdit={isToEdit} setIsToEdit={setIsToEdit} editedTaskId={editedTaskId} taskToEdit={taskToEdit}/>
                <SortButton isSortActive={isSortActive} setIsSortActive={setIsSortActive} activeSort={activeSort} setActiveSort={setActiveSort} activeDisplay={activeDisplay}/>
                <Help isHelpActive={isHelpActive} setIsHelpActive={setIsHelpActive} activeDisplay={activeDisplay}/>
                <About isAboutActive={isAboutActive} setIsAboutActive={setIsAboutActive} activeDisplay={activeDisplay}/>
                <TaskInfo isTaskInfoActive={isTaskInfoActive} setIsTaskInfoActive={setIsTaskInfoActive} tasks={tasks} activeDisplay={activeDisplay} deleteTask={deleteTask} />
            </div>
        </>
    );    
}

export default ToDoList;