import React from "react";

import '../styles/SortButton.css';

function SortButton ({activeSort, setActiveSort}){
    return (
        <div className="sort-container">
            {["importance-urgency", "importance", "urgency"].map(sortType => (
                <button key={sortType}
                        className={`${sortType}-sort ${activeSort === sortType ? 'active' : ''}`}
                        onClick={() => setActiveSort(prev => (prev === sortType ? null : sortType))}>
                    {sortType.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                </button>
            ))}
        </div>
    );
}

export default SortButton;