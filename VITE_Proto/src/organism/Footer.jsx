import React from "react";
import css from "../css/Footer.module.css";

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.footContainer}>
        {/* 상단 영역 : 서비스 소개 & 고객센터 */}
        <div className={css.top}>
          {/* 1. 서비스 소개 */}
          <div className={css.brand}>
            <h2 className={css.footLogo}>MUSE TICKET</h2>
            <p className={css.desc}>
              무대 위 감동의 순간을 함께합니다.
              <br />
              당신의 인생작을 뮤즈티켓에서 예매하세요.
            </p>
          </div>

          {/* 2. 고객센터 및 운영시간 정보 */}
          <div className={css.contact}>
            <h4>Ticket Customer Center</h4>
            <p className={css.phone}>1544-0000</p>
            <p className={css.info}>
              평일 09:00 - 18:00 (점심시간 12:00 - 13:00)
              <br />
              주말 및 공휴일은 운영하지 않습니다.
              <br />
              help@museticket.com
            </p>
          </div>
        </div>

        {/* 하단 영역 : 저작권 & SNS 링크 */}
        <div className={css.bottom}>
          <p className={css.copyright}>
            &copy; {new Date().getFullYear()} MUSE TICKET Corp. All rights
            reserved.
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
