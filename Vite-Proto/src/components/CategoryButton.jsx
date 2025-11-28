import React from "react";

const CategoryButton = ({
  cate,
  label,
  handleCategoryFilter,
  currentCategory,
}) => {
  const isActive =
    (cate === "" && currentCategory === null) || cate === currentCategory;

  return (
    <button
      onClick={() => handleCategoryFilter(cate)}
      style={{
        padding: "8px 16px",
        marginRight: "8px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        backgroundColor: isActive ? "#3498db" : "white",
        color: isActive ? "white" : "black",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
};

export default CategoryButton;
