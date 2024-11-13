import React, { useEffect } from "react";
import '../styles/SortButton.css';

function SortButton({ activeSort, setActiveSort }) {
    // Load the initial state from localStorage if available
    useEffect(() => {
        const savedSort = localStorage.getItem("activeSort");
        if (savedSort) {
            setActiveSort(savedSort);
        }
    }, [setActiveSort]);

    // Save the activeSort to localStorage whenever it changes
    useEffect(() => {
        if (activeSort) {
            localStorage.setItem("activeSort", activeSort);
        } else {
            localStorage.removeItem("activeSort"); // Clear if sort is set to null
        }
    }, [activeSort]);

    return (
        <div className="sort-container">
            {["importance-urgency", "importance", "urgency"].map((sortType) => (
                <button
                    key={sortType}
                    className={`${sortType}-sort ${activeSort === sortType ? "active" : ""}`}
                    onClick={() => setActiveSort((prev) => (prev === sortType ? null : sortType))}
                >
                    {sortType
                        .split("-")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                </button>
            ))}
        </div>
    );
}

export default SortButton;
