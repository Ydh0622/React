import React, { useState } from "react";
import css from "../css/DetailTabInfo.module.css";

const DetailTabInfo = () => {
  const [activeTab, setActive] = useState(0);
  // 탭 메뉴
  const tabTitles = ["상세정보", "관람후기", "예매/취소안내"];

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
        {/* 1. 상세정보  */}
        {activeTab === 0 && (
          <div className={css.tabPane}>
            <h3>작품 설명</h3>
            <p>
              운명을 거스르는 위대한 사랑, 그 서막이 오른다!
              <br />
              전 세계 1억 명이 감동한 불멸의 명작.
              <br />
              <br />
              (이곳에 작품의 시놉시스, 캐스팅 정보, 공연장 좌석 배치도 등의 상세
              이미지가 들어갑니다.)
            </p>
          </div>
        )}

        {/* 2. 관람후기 */}
        {activeTab === 1 && (
          <div className={css.tabPane}>
            <h3>관람 후기</h3>
            <p className={css.emptyText}>아직 작성된 관람 후기가 없습니다.</p>
          </div>
        )}

        {/* 3. 예매/취소 안내 */}
        {activeTab === 2 && (
          <div className={css.tabPane}>
            <h3>예매 및 취소 유의사항</h3>
            <ul className={css.guideList}>
              <li>
                <strong>티켓 수령:</strong> 공연 시작 1시간 30분 전부터 매표소
                운영 (예매번호/신분증 지참)
              </li>
              <li>
                <strong>취소 마감:</strong> 관람일 전일 17시까지 취소 가능 (당일
                취소 불가)
              </li>
              <li>
                <strong>관람 안내:</strong> 공연 시작 후에는 입장이 제한될 수
                있으며, 지정된 시간에만 입장 가능합니다.
              </li>
              <li>
                <strong>취소 수수료:</strong> 예매 후 7일 이내 취소 시 없음
                (이후 기간별 수수료 부과)
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailTabInfo;
