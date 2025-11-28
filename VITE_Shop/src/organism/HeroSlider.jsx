import React, { useState, useEffect } from "react";
import { getBannerData } from "@/api/bannerApi";
import css from "./HeroSlider.module.css";

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  // 배너 데이터 가져오기
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await getBannerData();
        setBanners(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  // 자동 슬라이드
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [banners.length]);

  // 로딩 또는 데이터 없을 때 표시
  if (loading || banners.length === 0) {
    return (
      <section className={css.mainSlider}>
        <p>로딩 중...</p>
      </section>
    );
  }

  const currentBanner = banners[currentIndex]; // 현재 배너 데이터

  return (
    <section className={css.mainSlider}>
      {/* 1. 배경 이미지 */}
      {/* 이미지는 배경으로 깔리므로 z-index를 낮게 설정해야 합니다 */}
      <img
        src={currentBanner.img}
        alt={currentBanner.title}
        className={css.bannerImage}
      ></img>

      {/* 2. 슬라이드 텍스트 콘텐츠 (이미지 위에 겹쳐셔 표시) */}
      <div className={css.sliderContent}>
        {/* 제목 */}
        <h2 className={css.title}>{currentBanner.title}</h2>
        {/* 설명 */}
        <p className={css.description}>{currentBanner.description}</p>
      </div>

      {/* 3. 인디케이터 */}
      <div className={css.indicatorContainer}>
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`${css.indicatorButton} ${
              currentIndex === index ? css.active : ""
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
