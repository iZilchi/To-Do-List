import React, { useEffect, useState } from "react";
import "../styles/SortButton.css";

function SortButton({ activeDisplay, setActiveSort, isSortActive, setIsSortActive, activeSort }) {
    const [fadeInBackground, setFadeInBackground] = useState(false);

    useEffect(() => {
        const savedSort = localStorage.getItem("activeSort");
        if (savedSort) {
            setActiveSort(savedSort);
        }
    }, [setActiveSort]);

    useEffect(() => {
        if (activeSort) {
            localStorage.setItem("activeSort", activeSort);
        } else {
            localStorage.removeItem("activeSort");
        }
    }, [activeSort]);

    const handleSortTask = () => {
        setIsSortActive(true);
        setFadeInBackground(false);
    };

    const handleClose = () => {
        setFadeInBackground(true);
        setTimeout(() => {
            setIsSortActive(false);
            setFadeInBackground(false);
        }, 500);
    };

    const sortImages = {
        "importance-urgency": "../src/assets/Imp-Urg.png",
        "importance": "../src/assets/Importance.png",
        "urgency": "../src/assets/Urgency.png",
    };

    return (
        isSortActive && (
            <div className={`background-opacity ${fadeInBackground ? "fade-in" : ""}`}>
                <div className="main-container">
                    <h3 className={`sort-header ${activeDisplay === "completed" ? "completed-active" : ""}`}>Sort By</h3>
                    <div className="sort-container">
                        {["importance-urgency", "importance", "urgency"].map((sortType) => (
                            <button
                                key={sortType}
                                onClick={() => {
                                    setActiveSort((prev) => (prev === sortType ? null : sortType));
                                }}
                            >
                                <img
                                    src={sortImages[sortType]}
                                    alt={sortType}
                                    className={`sort-image ${activeSort === sortType ? "active" : ""} ${activeDisplay === "completed" ? "completed-active" : ""}`}
                                />
                            </button>
                        ))}
                    </div>
                    <button className="back-sort-button" onClick={handleClose}>✖</button>
                </div>
            </div>
        )
    );
}

export default SortButton;
