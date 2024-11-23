import React from 'react';
import '../styles/About.css';

function About ({ isAboutActive, setIsAboutActive }) {
    return (
        isAboutActive && (
            <div className="about-container">
                <h3 className="about-header">About ProcrastiMate</h3>
                <button className="about-close-button" onClick={() => setIsAboutActive(false)}>✖</button>
                <div className="about-content">
                    
                </div>
            </div>
        )
    );
};

export default About;
