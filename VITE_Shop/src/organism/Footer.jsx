import React from "react";
import css from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.footContainer}>
        {/* 상단 영역 : 브랜드 정보 & 고객센터 */}
        <div className={css.top}>
          {/* 1. 브랜드 소개 */}
          <div className={css.brand}>
            <h2 className={css.footLogo}>LUX SHOP</h2>
            <p className={css.desc}>
              일상에 특별함 더하는 프리미엄 주얼리.
              <br />
              변하지 않는 가치를 선물합니다.
            </p>
          </div>

          {/* 2. 고객센터 정보 */}
          <div className={css.contact}>
            <h4>Customer Center</h4>
            <p className={css.phone}>00-0000-0000</p>
            <p className={css.info}>
              평일 10 : 00 - 17 : 00 (주말 / 공휴일 휴무)
              <br />
              help@luxshop.com
            </p>
          </div>
        </div>

        {/* 하단 영역 : 저작권 & 소셜 아이콘 */}
        <div className={css.bottom}>
          <p className={css.copyright}>
            &copy; {new Date().getFullYear()} LUX SHOP, All right reserved
          </p>
          <div className={css.socials}>
            <a href="">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="">
              <i className="bi bi-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
