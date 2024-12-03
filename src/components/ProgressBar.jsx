import React, { useState, useEffect } from "react";
import "../styles/ProgressBar.css";

function ProgressBar({ progress, activeDisplay, tasks }) {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    let totalTasks = tasks.length;
    let completedTasks = tasks.filter((task) => task.completed).length;

    let newProgress = 0;

    if (activeDisplay === "to-do") {
      newProgress = ((totalTasks - completedTasks) / totalTasks) * 100;
    } else {
      newProgress = (completedTasks / totalTasks) * 100;
    }
    setAnimating(true);
    
    setTimeout(() => {
      setAnimating(false);
    }, 100);

  }, [activeDisplay, tasks]);

  const progressBarColor = activeDisplay === "to-do" 
    ? "var(--secondary-color)"
    : "var(--completed-color)";

  return (
    <div className="progress-bar">
      <div
        className={`progress-bar-fill ${animating ? "animating" : ""}`}
        style={{
          width: `${progress}%`,
          backgroundColor: progressBarColor,
        }}
      >
        {Math.round(progress)}%
      </div>
    </div>
  );
}

export default ProgressBar;

