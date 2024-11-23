import React, { useEffect, useState } from "react";
import '../styles/SortButton.css';

function SortButton({ activeSort, setActiveSort, isSortActive, setIsSortActive }) {
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
    }

    const handleClose = () => {
        setIsSortActive(false);
    };

    const sortImages = {
        "importance-urgency": "../src/assets/Imp-Urg.png",
        "importance": "../src/assets/Importance.png",
        "urgency": "../src/assets/Urgency.png",
    };

    return (
        isSortActive && (
            <div className="background-opacity">
                <div className="main-container">
                    <h3 className="sort-header">Sort By</h3>
                    <div className="sort-container">
                        {["importance-urgency", "importance", "urgency"].map((sortType) => (
                            <button
                                key={sortType}
                                className={`${sortType}-sort ${activeSort === sortType ? "active" : ""}`}
                                onClick={() => {
                                    setActiveSort((prev) => (prev === sortType ? null : sortType));
                                    handleClose();
                                }}
                            >
                                <img src={sortImages[sortType]} alt={sortType} className="sort-image" />
                            </button>
                        ))}
                    </div>
                    <button className="sort-button" onClick={handleSortTask}>Sort</button>
                    <button className="back-sort-button" onClick={handleClose}>✖</button>
                </div>
            </div>
        )
    );
}

export default SortButton;
