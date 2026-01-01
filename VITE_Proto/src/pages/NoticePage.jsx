import React from "react";
import css from "../css/NoticePage.module.css";

const NoticePage = () => {
  const blogPosts = [
    {
      id: 1,
      category: "NOTICE",
      title: "티켓 오픈 일정 안내 (2026년 1분기)",
      date: "2025. 11. 20",
      desc: "내년 1월부터 3월까지의 주요 기대작 티켓 오픈 일정을 확인하세요. 미리미리 준비하세요!",
      img: "/public/img/poster_1.img",
    },
    {
      id: 2,
      category: "CASTING NEWS",
      title: "뮤지컬 '데스노트' 주연 배우 교체 안내",
      date: "2025. 11. 15",
      desc: "12월 공연 일부 회차 캐스팅 변경 사항을 알려드립니다. 자세한 내용은 본문을 확인해 주세요.",
      img: "/public/img/poster_2.img",
    },
    {
      id: 3,
      category: "EVENT",
      title: "할인 쿠폰 증정! 재관람 고객 대상 이벤트",
      date: "2025. 11. 10",
      desc: "지난 1년 간 뮤즈티켓을 이용해주신 고객님들께 감사드립니다. 재관람 할인 혜택을 놓치지 마세요.",
      img: "/public/img/poster_3.img",
    },
    {
      id: 4,
      category: "GUIDE",
      title: "현장 티켓 수령 시 유의사항",
      date: "2025. 11. 01",
      desc: "공연 당일 티켓 수령을 위한 매표소 운영 시간 및 신분증 지참 여부를 안내합니다.",
      img: "/public/img/poster_4.img",
    },
    {
      id: 5,
      category: "EVENT",
      title: "친구 초대하면 할인 쿠폰! 1+1 이벤트",
      date: "2025. 10. 25",
      desc: "함께 공연을 보러 갈 친구를 초대하고 최대 2만원의 할인 쿠폰을 받아가세요. 자세한 참여 방법은 본문에서 확인 가능합니다.",
      img: "/public/img/poster_5.img",
    },
    {
      id: 6,
      category: "SYSTEM NOTICE",
      title: "결제 시스템 점검 안내 (2025년 12월 5일)",
      date: "2025. 10. 20",
      desc: "더 안정적인 서비스 제공을 위해 결제 시스템을 점검할 예정입니다. 점검 시간 동안은 티켓 구매 및 취소가 제한됩니다. 이용에 불편을 드려 죄송합니다.",
      img: "/public/img/poster_6.img",
    },
  ];
  return (
    <main className={css.container}>
      {/* 페이지 헤더 */}
      <section className={css.header}>
        <h2 className={css.title}>TICKET NEWS & NOTICE</h2>
        <p className={css.subtitle}>
          티켓 오픈 소식, 캐스팅 변경, 이벤트 정보 등 전해드립니다.
        </p>
      </section>

      {/* 공지 포스트*/}
      <section className={css.blogGrid}>
        {blogPosts.map((post) => (
          <article key={post.id} className={css.card}>
            <div className={css.imgWrap}>
              <img
                src={post.img}
                alt={post.title}
                className={css.postImage}
              ></img>
            </div>
            <div className={css.textWrap}>
              <span className={css.category}>{post.category}</span>
              <h3 className={css.postTitle}>{post.title}</h3>
              <p className={css.postDesc}>{post.desc}</p>
              <span className={css.date}>{post.date}</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default NoticePage;
