import React from "react";
import css from "./BlogPage.module.css";

const BlogPage = () => {
  // 임시 블로그 데이터 (나중에 API로 대체 가능)
  const blogPosts = [
    {
      id: 1,
      category: "STYLING TIP",
      title: "올바른 주얼리 레이어드 가이드",
      date: "2024. 03. 15",
      desc: "반지와 목걸이를 세련되게 매치하는 방법을 소개합니다. 과하지 않으면서도 스타일리시한 룩을 완성해보세요.",
      img: "/public/img/product01.jpg", // 이미지가 없으면 회색 박스로 나옵니다
    },
    {
      id: 2,
      category: "CARE GUIDE",
      title: "변색 없이 주얼리 오래 보관하는 법",
      date: "2024. 03. 10",
      desc: "소중한 주얼리의 반짝임을 잃지 않으려면 관리가 중요합니다. 소재별 세척법과 보관 꿀팁을 알아봅니다.",
      img: "/public/img/product02.jpg",
    },
    {
      id: 3,
      category: "NEW ARRIVAL",
      title: "2024 Spring Collection 런칭",
      date: "2024. 02. 28",
      desc: "봄의 화사함을 담은 새로운 컬렉션을 공개합니다. 자연에서 영감을 받은 유기적인 곡선의 아름다움을 만나보세요.",
      img: "/public/img/product03.jpg",
    },
    {
      id: 4,
      category: "GIFT GUIDE",
      title: "기념일에 선물하기 좋은 아이템 BEST 5",
      date: "2024. 02. 14",
      desc: "사랑하는 사람에게 마음을 전하고 싶다면? 실패 없는 선물 추천 리스트를 확인하세요.",
      img: "/public/img/product04.jpg",
    },
  ];
  return (
    <main className={css.container}>
      {/* 페이지 헤더 */}
      <section className={css.header}>
        <h2 className={css.title}>LUX Journal</h2>
        <p className={css.subtitle}>
          주얼리에 담긴 이야기와 스타일링 팁을 전해드립니다.
        </p>
      </section>

      {/* 블로그 포스트 그리드 */}
      <section className={css.blogGrid}>
        {blogPosts.map((post) => (
          <article key={post.id} className={css.card}>
            <div className={css.imgWrap}>
              <img src={post.img} alt={post.title}></img>
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

export default BlogPage;
