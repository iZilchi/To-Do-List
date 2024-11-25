import React, { useState } from 'react';
import '../styles/Help.css';

function Help({ activeDisplay, isHelpActive, setIsHelpActive }) {
    const [isExiting, setIsExiting] = useState(false);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsExiting(false);
            setIsHelpActive(false);
        }, 300);
    };

    return (
        <div className={`help-container ${isHelpActive && !isExiting ? 'show' : 'hide'}`}>
            <h3 className={`help-header ${activeDisplay === "completed" ? "completed-active" : ""}`}>Help</h3>
            <button className="help-close-button" onClick={handleClose}>✖</button>
            <div className={`help-content ${activeDisplay === "completed" ? "completed-active" : ""}`}></div>
        </div>
    );
}

export default Help;
