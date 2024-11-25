import React, { useState } from 'react';
import '../styles/About.css';

function About({ activeDisplay, isAboutActive, setIsAboutActive }) {
    const [isExiting, setIsExiting] = useState(false);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsExiting(false);
            setIsAboutActive(false);
        }, 300);
    };

    return (
        <div className={`about-container ${isAboutActive && !isExiting ? 'show' : 'hide'}`}>
            <h3 className={`about-header ${activeDisplay === "completed" ? "completed-active" : ""}`}>About ProcrastiMate</h3>
            <button className="about-close-button" onClick={handleClose}>✖</button>
            <div className={`about-content ${activeDisplay === "completed" ? "completed-active" : ""}`}></div>
        </div>
    );
}

export default About;
