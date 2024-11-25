import React, { useState, useEffect } from "react";
import "../styles/ProgressBar.css";

function ProgressBar({ progress, activeDisplay, tasks }) {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    // Calculate progress based on the active view
    let totalTasks = tasks.length;
    let completedTasks = tasks.filter((task) => task.completed).length;

    let newProgress = 0;

    if (activeDisplay === "to-do") {
      // Calculate progress for to-do tasks
      newProgress = ((totalTasks - completedTasks) / totalTasks) * 100;
    } else {
      // Calculate progress for completed tasks
      newProgress = (completedTasks / totalTasks) * 100;
    }

    // Start the progress bar animation
    setAnimating(true);
    
    // Animate progress change
    setTimeout(() => {
      setAnimating(false); // Stop the animation after the progress has been updated
    }, 100); // Delay before applying the new progress value

  }, [activeDisplay, tasks]);

  const progressBarColor = activeDisplay === "to-do" 
    ? "var(--secondary-color)" // Color for To-Do
    : "var(--completed-color)";  // Color for Completed

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

