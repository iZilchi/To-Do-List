import React from "react";

import '../styles/DisplayButton.css';

function DisplayButton ({activeDisplay, setActiveDisplay}){
    return (
        <div className="view-container">
            {["to-do", "completed"].map(view => (
                    <button key={view}
                        className={`${view}-view ${activeDisplay === view ? 'active' : ''}`}
                        onClick={() => setActiveDisplay(view)}>
                    {view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
            ))}
        </div>
    );
}

export default DisplayButton;