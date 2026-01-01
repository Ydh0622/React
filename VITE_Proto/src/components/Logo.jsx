import React from "react";
import css from "../css/Logo.module.css";

const Logo = () => {
  return (
    <div className={css.logo}>
      <svg viewBox="0 0 240 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 12C10 9.2 12.2 7 15 7H45C47.8 7 50 9.2 50 12V38C50 40.8 47.8 43 45 43H15C12.2 43 10 40.8 10 38V12ZM15 12V38H45V12H15Z"
          fill="#fa2828"
        />
        <text
          x="60"
          y="34"
          fill="#222222"
          fontSize="22"
          fontWeight="900"
          fontFamily="sans-serif"
          letterSpacing="-1"
        >
          Muse TICKET
        </text>
      </svg>
    </div>
  );
};

export default Logo;
