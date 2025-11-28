import React, { useEffect, useState } from "react";
import css from "./AboutPage.module.css";

// 딜레이 함수
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const AboutPage = () => {
  const [loading, setLoading] = useState(true);

  // 스켈레톤을 쓰기 위한 useEffect -> 실제 프로젝트에서는 사용 x 확인용 o

  useEffect(() => {
    const wait = async () => {
      try {
        // 스켈레톤 효과를 주기 위해 3초 대기
        // 실제 서비스에서는 사용 x 확인용 o
        await delay(3000);
        setLoading(false);
      } catch (err) {
        console.log("err", err);
        setLoading(false);
      }
    };
    wait();
  }, []);

  return (
    <main className={css.aboutContainer}>
      {/* 페이지 헤더 */}
      <section className={css.header}>
        <h2 className={css.title}> About LUX SHOP</h2>
        <p className={css.subtitle}>
          시간이 흘러도 변치 않는 가치, 당신의 일상에 특별함을 더합니다.
        </p>
      </section>

      <section className={css.storySection}>
        {loading ? (
          // 로딩 중 스켈레톤 UI
          <>
            {/* 이미지 영역 스켈레톤 */}
            {/* 기존 레이아웃 클래스 (css.imgWrap)와 스켈레톤 효과(css.skeleton)를 같이 씀 */}
            <div className={`${css.imgWrap} ${css.skeleton}`}></div>

            {/* 텍스트 영역 스켈레톤 */}
            <div className={css.textWrap}>
              {/* 제목 h3 크기 */}
              <div
                className={css.skeleton}
                style={{ width: "60%", height: "35px", marginBottom: "20px" }}
              ></div>

              {/* 본문 p 크기 */}
              <div
                className={css.skeleton}
                style={{ width: "100%", height: "18px", marginBottom: "10px" }}
              ></div>
              <div
                className={css.skeleton}
                style={{ width: "85%", height: "16px", marginBottom: "10px" }}
              ></div>
              <div
                className={css.skeleton}
                style={{ width: "60%", height: "14px", marginBottom: "10px" }}
              ></div>
            </div>
          </>
        ) : (
          // 로딩 완료 후 UI
          <>
            <div className={css.imgWrap}>
              <img src="/public/img/Img_bg1.jpg" alt="Brand Story"></img>
            </div>
            <div className={css.textWrap}>
              <h3>Timeless Elegance</h3>
              <p>
                LUX SHOP은 단순한 장신구를 넘어, 착용하는 사람의 품격을 높여주는
                프리미엄 주얼리 브랜드입니다.
              </p>
              <p>
                엄선된 재료와 장인의 섬세한 세공으로 완성된 우리의 컬렉션은
                유행을 타지 않는 클래식함과 현대적인 감각이 조화를 이룹니다.
                가장 빛나는 순간, LUX SHOP이 함께하겠습니다.
              </p>
            </div>
          </>
        )}
      </section>

      {/* 핵심 가치 섹션 - 3단 그리드 */}
      <section className={css.valueSection}>
        <div className={css.valueItem}>
          <i className="bi bi-gem"></i>
          <h4>Premium Quality</h4>
          <p>
            최상급 원석과 금속만을 사용하여 <br />
            변하지 않는 퀄리티를 보장합니다.
          </p>
        </div>
        <div className={css.valueItem}>
          <i className="bi bi-hammer"></i>
          <h4>Handcrafted</h4>
          <p>
            숙련된 장인의 손길을 거쳐 <br />
            섬세하고 완벽한 마감을 자랑합니다.
          </p>
        </div>
        <div className={css.valueItem}>
          <i className="bi bi-heart"></i>
          <h4>Customer Care</h4>
          <p>
            구매 후에도 지속적인 관리 서비스로 <br />
            고객님의 만족을 최우선으로 합니다.
          </p>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
