import React from 'react';
import '../styles/Help.css';

function Help ({ isHelpActive, setIsHelpActive }) {
    return (
        isHelpActive && (
            <div className="help-container">
                <h3 className="help-header">Help</h3>
                <button className="help-close-button" onClick={() => setIsHelpActive(false)}>✖</button>
                <div className="help-content">
                    
                </div>
            </div>
        )
    );
};

export default Help;
