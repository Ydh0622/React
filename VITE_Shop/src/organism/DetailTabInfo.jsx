import React, { useState } from "react";
import css from "./DetailTabInfo.module.css";

const DetailTabInfo = () => {
  const [activeTab, setActive] = useState(0);
  const tabTitles = ["상품정보", "리뷰", "배송/교환/반품"];

  return (
    <div className={css.tabContainer}>
      {/* 탭 헤더 */}
      <div className={css.tabHeader}>
        {tabTitles.map((title, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`${css.tabBtn} ${activeTab === i ? css.active : ""}`}
          >
            {title}
          </button>
        ))}
      </div>
      {/* 탭 내용 */}
      <div className={css.tabContent}>
        {activeTab === 0 && (
          <div className={css.tabPane}>
            <h3>상품 정보</h3>
            <p>
              본 상품은 엄선된 14K/18K 골드로 제작되었으며, 섬세한 세공이
              돋보이는 프리미엄 주얼리입니다.
              <br />
              <br />
              (여기에 상세 이미지나 구체적인 스펙이 들어갑니다.)
            </p>
          </div>
        )}
        {activeTab === 1 && (
          <div className={css.tabPane}>
            <h3>리뷰</h3>
            <p className={css.emptyText}>아직 작성된 리뷰가 없습니다.</p>
          </div>
        )}
        {activeTab === 2 && (
          <div className={css.tabPane}>
            <h3>배송/교환/반품 안내</h3>
            <ul className={css.guideList}>
              <li>
                배송 기간: 주문 제작 상품으로 주말/공휴일 제외 7~10일 소요
              </li>
              <li>
                교환/반품: 상품 수령 후 7일 이내 (단, 주문 제작 상품은 단순 변심
                반품 불가)
              </li>
              <li>
                A/S: 구매일로부터 1년 무상 수리 (부속품 분실 및 고객 과실 제외)
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailTabInfo;
