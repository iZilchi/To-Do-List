import React, { useState, useEffect } from 'react';
import '../styles/Help.css';

function Help({ activeDisplay, isHelpActive, setIsHelpActive }) {
    const [fadeInBackground, setFadeInBackground] = useState(false);

    const handleClose = () => {
        setFadeInBackground(true);
        setTimeout(() => {
            setIsHelpActive(false);
            setFadeInBackground(false);
        }, 500);
    };

    return (
        isHelpActive && (
            <div className={`background-opacity ${fadeInBackground ? "fade-in" : ""}`}>
                <div className="help-container">
                    <h3 className={`help-header ${activeDisplay === "completed" ? "completed-active" : ""}`}>Help</h3>
                    <button className="help-close-button" onClick={handleClose}>✖</button>
                    <div className={`help-content-container ${activeDisplay === "completed" ? "completed-active" : ""}`}>
                        <div className='addTaskForm'>
                            <h2 className='help-title'>Task Creation</h2>
                            <div className='help-description'>
                            <p>To create a task, in your To-Do List page, clickc on the <strong>+ button</strong> to open the Add Task Form</p>
                            <img className='help-img-button' src='../src/assets/Help/add-button.png' alt='Add Button'></img>
                            <p>The Add Task Form will pop up when the <strong>+ button</strong> is clicked.</p>
                            <img className='help-img' src='../src/assets/Help/add-task-form.png' alt='Add Task Form'></img>
                            <p>The Add Task Form contains the following components:</p>
                            <ul>
                                <li>
                                    <strong>Task Name:</strong> 
                                    <p>This field is required, this is where you input the title of your task.</p>
                                </li>
                                <li>
                                    <strong>Importance:</strong> 
                                    <p>Assign the importance of the task by choosing between <strong>Important or Not Important Buttons</strong>.</p>
                                </li>
                                <li>
                                    <strong>Urgency:</strong> 
                                    <p>Assign the urgency of the task by choosing between <strong>Urgent or Not Urgent Buttons</strong>.</p>
                                </li>
                                <li>
                                    <strong>Description:</strong> 
                                    <p>This field is where you input the description of your tasks to elaborate them. This is optional and can be left empty.</p>
                                </li>
                            </ul>
                            </div>
                        </div>
                        <div className='editTaskForm'>
                            <h2 className='help-title'>Editing Tasks</h2>
                            <div className='help-description'>
                                <p>To edit a task, make sure to select a task that you want to edit and it should navigate you to the task information page. In the task info page, you can select the edit button located at the bottom of the container.</p>
                                <img className='help-img-button' src='../src/assets/Help/edit-button.png' alt='Edit Button'></img>
                                <p>The Edit Task Form will pop up when the <strong>edit button</strong> is clicked.</p>
                                <img className='help-img' src='../src/assets/Help/edit-task-form.png' alt='Edit Task Form'></img>
                                <p>You can edit your task in the edit task form. Change the value of the Task Name, Importance, Urgency, or Description that you want to be changed. You can leave the field as it is if you don't want to change the value of that field.</p>
                            </div>
                        </div>
                        <div className='sortTask'>
                            <h2 className='help-title'>Sorting Tasks</h2>
                            <div className='help-description'>
                                <p>There are 2 ways to sort a task: Manual Sorting & Automated Sorting.</p>
                                <h3>Manual Sorting:</h3>
                                <div className='help-manual-sort'>
                                    <p>To manually sort the order of the task, you can click the <strong>▲ and ▼</strong> buttons.</p>
                                    <img className='help-img-button' src='../src/assets/Help/move-button.png' alt='Sort Button'></img>
                                    <p>These buttons move the tasks either up or down by 1 place from the list.</p>
                                </div>
                                <h3>Automated Sorting:</h3>
                                <div className='help-auto-sort'>
                                    <p>To automate the sort in the list, you can click the <strong>Sort button</strong> beside the + button located in the To-Do List page.</p>
                                    <img className='help-img-button' src='../src/assets/Help/sort-button.png' alt='Sort Button'></img>
                                    <div className='help-sort-buttons'>
                                        <p>You can choose into three options based on how you want to sort your tasks:</p>
                                        <ul>
                                            <li>
                                                <img className='help-sort-img' src='../src/assets/Imp-Urg.png' alt='EisenSort Button'></img>
                                                <p><strong>The Eisen Sort</strong> prioritizes the tasks that are <strong>Important & Urgent</strong>.</p>
                                            </li>
                                            <li>
                                                <img className='help-sort-img' src='../src/assets/Importance.png' alt='Importance Button'></img>
                                                <p><strong>The Importance Sort</strong> prioritizes the tasks that are <strong>Important</strong>.</p>
                                            </li>
                                            <li>
                                                <img className='help-sort-img' src='../src/assets/Urgency.png' alt='Urgency Button'></img>
                                                <p><strong>The Urgency Sort</strong> prioritizes the tasks that are <strong>Urgent</strong>.</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        )
    );
}

export default Help;
