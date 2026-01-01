import React from "react";
import css from "../css/GuidePage.module.css"; // CSS 파일 경로

const GuidePage = () => {
  return (
    <main className={css.guideContainer}>
      {/* 페이지 헤더 */}
      <section className={css.header}>
        <h2 className={css.title}>MUSE TICKET GUIDE</h2>
        <p className={css.subtitle}>
          예매부터 관람까지, 당신의 즐거운 문화생활을 위한 안내서입니다.
        </p>
      </section>

      {/*  섹션 1: 예매 프로세스 */}
      <section className={css.storySection}>
        <div className={css.stepGrid}>
          <div className={css.stepItem}>
            <div className={css.numberBox}>01</div>
            <h4>공연 선택</h4>
            <p>
              원하는 공연/일정을 <br />
              확인 후 선택하세요.
            </p>
          </div>

          <div className={css.stepItem}>
            <div className={css.numberBox}>02</div>
            <h4>좌석 지정</h4>
            <p>
              등급별 잔여석 확인 및 <br />
              좌석을 선점하세요.
            </p>
          </div>

          <div className={css.stepItem}>
            <div className={css.numberBox}>03</div>
            <h4>결제 진행</h4>
            <p>
              신용카드, 간편결제 등<br />
              다양한 수단 지원.
            </p>
          </div>

          <div className={css.stepItem}>
            <div className={css.numberBox}>04</div>
            <h4>예매 완료</h4>
            <p>
              예매 내역 확인 후 <br />
              티켓 수령 대기!
            </p>
          </div>
        </div>
      </section>

      {/* 섹션 2: 핵심 안내 사항 */}
      <section className={css.valueSection}>
        {/* 1. 취소/환불 규정 */}
        <div className={css.valueItem}>
          <div className={css.iconPlaceholder}>취소</div>
          <h4>취소/환불 규정</h4>
          <p>
            관람일 기준 기간별 수수료 확인
            <br />
            당일 취소 및 변경은 불가능합니다.
          </p>
        </div>

        {/* 2. 현장 수령 안내 */}
        <div className={css.valueItem}>
          <div className={css.iconPlaceholder}>수령</div>
          <h4>현장 티켓 수령</h4>
          <p>
            공연 시작 1시간 30분 전부터
            <br />
            매표소에서 예매 내역 확인 후 발권.
          </p>
        </div>

        {/* 3. 관람 유의 사항 */}
        <div className={css.valueItem}>
          <div className={css.iconPlaceholder}>주의</div>
          <h4>관람 유의 사항</h4>
          <p>
            공연 시작 후 입장이 제한될 수 있으며,
            <br />
            음식물 반입은 엄격히 금지됩니다.
          </p>
        </div>
      </section>
    </main>
  );
};

export default GuidePage;
