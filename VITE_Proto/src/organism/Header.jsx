import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "@/components/Logo";
import css from "../css//Header.module.css";

const Header = () => {
  const [isOn, setIsOn] = useState(false);
  const location = useLocation();

  const addClassOn = () => {
    setIsOn(!isOn);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOn(false);
  }, [location.pathname]);

  return (
    <header className={css.hd}>
      <div className={css.con}>
        <h1 className={css.logo}>
          <Link to={"/"}>
            <Logo />
          </Link>
        </h1>
        <div className={isOn ? `${css.gnb} ${css.on}` : css.gnb}>
          <nav>
            <CustomNavLink to={"/musicals"} label={"musicals"} />
            <CustomNavLink to={"/guide"} label={"guide"} />
            <CustomNavLink to={"/notice"} label={"notice"} />
          </nav>
          <div className={css.icon}>
            <CustomIconLink to={"/musicals?focus=true"} icon={"bi-search"} />
            <CustomIconLink to={"/mypage"} icon={"bi-person"} />
            <CustomIconLink to={"/cart"} icon={"bi-ticket-perforated"} />
          </div>
        </div>
        <i
          className={`${css.ham} bi bi-list`}
          title="전체작품 보기버튼"
          onClick={addClassOn}
        ></i>
      </div>
    </header>
  );
};

const CustomNavLink = ({ to, label }) => (
  <NavLink
    className={({ isActive }) => (isActive ? `${css.active}` : "")}
    to={to}
  >
    {label}
  </NavLink>
);
const CustomIconLink = ({ to, icon }) => (
  <NavLink
    className={({ isActive }) => (isActive ? `${css.active}` : "")}
    to={to}
  >
    <i className={`bi ${icon}`}></i>
  </NavLink>
);

export default Header;
