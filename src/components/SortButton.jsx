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

    const handleSortTask = (sortType) => {
        setActiveSort((prev) => (prev === sortType ? null : sortType));
        setFadeInBackground(false);
        handleClose();
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
            <>
                <div
                    className={`background-opacity ${fadeInBackground ? "fade-in" : ""}`}
                    onClick={handleClose}
                ></div>
                <div className={`main-container ${fadeInBackground ? "fade-in" : ""}`}>
                <h3
                    className={`sort-header ${
                        activeDisplay === "completed" ? "completed-active" : ""
                    }`}
                    >
                    Sort By:{" "}
                    <span
                        className={`active-sort-label ${
                        activeDisplay === "completed" ? "completed-active" : ""
                        }`}
                    >
                        {activeSort === "importance-urgency"
                        ? "Eisen Sort"
                        : activeSort
                        ? activeSort.charAt(0).toUpperCase() + activeSort.slice(1)
                        : "None"}
                    </span>
                </h3>
                    <div className="sort-container">
                        {["importance-urgency", "importance", "urgency"].map((sortType) => (
                            <button
                                key={sortType}
                                data-label={
                                    sortType === "importance-urgency"
                                    ? "Eisen Sort"
                                    : sortType.charAt(0).toUpperCase() + sortType.slice(1)
                                }
                                onClick={() => {
                                    handleSortTask(sortType);
                                }}
                                className={activeDisplay === "completed" ? "completed-active" : ""}
                                >
                                <img
                                    src={sortImages[sortType]}
                                    alt={sortType}
                                    className={`sort-image ${
                                    activeSort === sortType ? "active" : ""
                                    } ${activeDisplay === "completed" ? "completed-active" : ""}`}
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </>
        )
    );
}

export default SortButton;
