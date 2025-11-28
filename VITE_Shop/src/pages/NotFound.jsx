import React from "react";
import { Link } from "react-router-dom";
import css from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={css.notContainer}>
      <div className={css.content}>
        <h1 className={css.errorCode}>404</h1>
        <h2 className={css.title}>페이지를 찾을 수 없습니다.</h2>
        <p className={css.desc}>
          죄송합니다. 요청하신 페이지가 사라졌거나 잘못된 경로입니다.
          <br />
          입력하신 주소가 정확한지 다시 한번 확인해 주세요.
        </p>
        <Link to="/" className={css.homeBtn}>
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
