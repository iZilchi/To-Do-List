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
                <div className={`help-content ${activeDisplay === "completed" ? "completed-active" : ""}`}></div>
            </div>
            </div> 
        )
    );
}

export default Help;
