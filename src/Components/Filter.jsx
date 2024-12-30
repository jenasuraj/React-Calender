// components/Filter.js
import React from "react";

const Filter = ({ onFilterChange }) => {
  const handleInputChange = (e) => {
    onFilterChange(e.target.value);
  };

  return (
    <div className="filter">
      <input
        type="text"
        placeholder="Search events..."
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Filter;
