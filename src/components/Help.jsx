import React, { useState } from 'react';
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

    const getImageSrc = (baseName) => {
        return activeDisplay === 'completed' 
            ? `../src/assets/Help/${baseName}-completed.png` 
            : `../src/assets/Help/${baseName}.png`;
    };

    return (
        isHelpActive && (
            <>
                <div className={`background-opacity ${fadeInBackground ? "fade-in" : ""}`} onClick={handleClose}></div>
                <div className={`help-container ${fadeInBackground ? "fade-in" : ""}`}>
                    <h3 className={`help-header ${activeDisplay === "completed" ? "completed-active" : ""}`}>Help</h3>
                    <button className="help-close-button" onClick={handleClose}>✖</button>
                    <div className={`help-content-container ${activeDisplay === "completed" ? "completed-active" : ""}`}>
                        <div className='addTaskForm'>
                            <h2 className='help-title'>Task Creation</h2>
                            <div className='help-description'>
                                <p>To create a task, in your To-Do List page, click on the <strong>+ button</strong> to open the Add Task Form</p>
                                <img className='help-img-button' src={getImageSrc('add-button')} alt='Add Button'></img>
                                <p>The Add Task Form will pop up when the <strong>+ button</strong> is clicked.</p>
                                <img className='help-img' src={getImageSrc('add-task-form')} alt='Add Task Form'></img>
                            </div>
                        </div>
                        <div className='editTaskForm'>
                            <h2 className='help-title'>Editing Tasks</h2>
                            <div className='help-description'>
                                <p>To edit a task, make sure to select a task that you want to edit and it should navigate you to the task information page. In the task info page, you can select the edit button located at the bottom of the container.</p>
                                <img className='help-images' src='../src/assets/Edit.png' alt='Edit Button'></img>
                                <p>The Edit Task Form will pop up when the <strong>edit button</strong> is clicked.</p>
                                <img className='help-img' src={getImageSrc('edit-task-form')} alt='Edit Task Form'></img>
                            </div>
                        </div>
                        <div className='sortTask'>
                            <h2 className='help-title'>Sorting Tasks</h2>
                            <div className='help-description'>
                                <p>To automate the sort in the list, you can click the <strong>Sort button</strong> beside the + button located in the To-Do List page.</p>
                                <img className='help-images' src='../src/assets/Sort.png' alt='Sort Button'></img>
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
            </>
        )
    );
}

export default Help;
