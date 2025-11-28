import React from "react";
import css from "./CategoryButton.module.css";

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
      className={isActive ? `${css.active} ${css.btn}` : `${css.btn}`}
    >
      {label}
    </button>
  );
};

export default CategoryButton;
