import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import HeroSlider from "@/organism/HeroSlider";
import { getProductsData } from "@/api/productsApi";
import css from "../css/MainPage.module.css";

// Swiper 요소 import
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const MainPage = () => {
  const [products, setProducts] = useState([]);

  // 데이터 가져오기
  useEffect(() => {
    getProductsData()
      .then((data) => setProducts(data.slice(0, 10))) // 10개만 자르기
      .catch((err) => console.error("데이터 로딩 실패:", err));
  }, []);

  return (
    <main>
      {/* 1. 상단 배너 */}
      <HeroSlider />

      {/* 2. 공연 리스트 (슬라이드) */}
      <section className={css.productSection}>
        <div className={css.sectionHeader}>
          <h3 className={css.sectionTitle}>이번주 인기 뮤지컬</h3>
          <Link to="/musicals" className={css.viewAllLink}>
            전체보기
          </Link>
        </div>

        <div className={css.swiperWrapper}>
          <Swiper
            modules={[Navigation]}
            navigation={true}
            spaceBetween={20}
            slidesPerView={4} // 한 줄에 4개의 포스터만 보임
            className={css.listSwiper}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className={css.slideItem}>
                <ProductCard data={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </main>
  );
};

export default MainPage;
