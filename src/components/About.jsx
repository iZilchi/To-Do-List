import React, { useState } from 'react';
import '../styles/About.css';

function About({ activeDisplay, isAboutActive, setIsAboutActive }) {
    const [fadeInBackground, setFadeInBackground] = useState(false);

    const handleClose = () => {
        setFadeInBackground(true);
        setTimeout(() => {
            setIsAboutActive(false);
            setFadeInBackground(false);
        }, 500);
    };

    return (
        isAboutActive && (
            <div className={`background-opacity ${fadeInBackground ? "fade-in" : ""}`}>
                <div className="about-container">
                    <h3 className={`about-header ${activeDisplay === "completed" ? "completed-active" : ""}`}>About ProcrastiMate</h3>
                    <button className="about-close-button" onClick={handleClose}>✖</button>
                    <div className={`about-content ${activeDisplay === "completed" ? "completed-active" : ""}`}></div>
                </div>
            </div>
        )
    );
}

export default About;