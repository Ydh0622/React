import React from "react";
import css from "./SortItem.module.css";

const SortItem = ({ option, handleSort, currentSort, label }) => {
  const isActive = currentSort === option || (!currentSort && option === "id");

  const classNames = [css.list];

  if (isActive) {
    classNames.push(css.active);
  }

  return (
    <li onClick={() => handleSort(option)} className={classNames.join(" ")}>
      {label}
    </li>
  );
};

export default SortItem;
