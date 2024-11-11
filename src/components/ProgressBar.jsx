import React from "react";

import '../styles/ProgressBar.css';

function ProgressBar ({progress}){
    return(
        <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}>
                {Math.round(progress)}%
            </div>
        </div>
    );
}

export default ProgressBar;