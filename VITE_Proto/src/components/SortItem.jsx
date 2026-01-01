import React from "react";

const SortItem = ({ option, handleSort, currentSort, label }) => {
  const isActive = currentSort === option || (!currentSort && option === "id");

  return (
    <li
      onClick={() => handleSort(option)}
      style={{
        padding: "8px 16px",
        listStyle: "none",
        cursor: "pointer",
        backgroundColor: isActive ? "#3498db" : "white",
        color: isActive ? "white" : "black",
      }}
    >
      {label}
    </li>
  );
};

export default SortItem;
