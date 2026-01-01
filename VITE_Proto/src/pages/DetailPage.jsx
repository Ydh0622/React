import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { formatCurrency } from "@/utils/features";
import DetailTabInfo from "@/organism/DetailTabInfo";
import SimilarProducts from "@/organism/SimilarProducts";
import Modal from "@/components/Modal";
import css from "../css/DetailPage.module.css";

const getImageSrc = (img) => {
  if (!img) return "/img/default_poster.jpg";
  if (img.startsWith("http")) return img;
  return img.startsWith("/")
    ? img.replace(/^\/public/, "")
    : `/img/${img}`.replace("//", "/");
};

const DetailPage = () => {
  const { product, filteredRelatedProducts } = useLoaderData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [count, setCount] = useState(1);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCount(1);
  }, [product.id]);

  if (!product) {
    return (
      <main className={css.mainContainer}>
        <p className={css.notFoundText}>작품을 찾을 수 없습니다.</p>
      </main>
    );
  }

  const decrease = () => {
    setCount((prev) => (prev > 1 ? prev - 1 : 1));
  };
  const increase = () => {
    setCount((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className={css.mainContainer}>
      {/* 작품 상세 정보 */}
      <div className={css.detailCon}>
        {/* 작품 이미지 */}
        <div className={css.imgWrap}>
          {/* 이미지 경로 처리 함수 적용 */}
          <img
            src={getImageSrc(product.img)}
            alt={product.title}
            className={css.poster}
          ></img>

          {product.discount > 0 && (
            <span className={css.discount}>{product.discount}% 할인</span>
          )}
        </div>

        {/* 작품 정보 */}
        <div className={css.infoWrap}>
          <h2 className={css.title}>{product.title}</h2>

          {/* 가격 */}
          <p className={css.price}>{formatCurrency(product.price)}</p>

          {/*  장소와 기간 정보 삽입 */}
          <div className={css.metaInfo}>
            <p className={css.metaItem}>
              <strong>장소 |</strong> {product.place}
            </p>
            <p className={css.metaItem}>
              <strong>기간 |</strong> {product.date}
            </p>
          </div>

          {/* 수량 선택 및 예매하기 버튼 */}
          <div className={css.btnWrap}>
            <div className={css.counterArea}>
              <button onClick={decrease}>-</button>
              <span>{count}</span>
              <button onClick={increase}>+</button>
            </div>

            {/* '예매하기' */}
            <button onClick={handleAddToCart} className={css.addBtn}>
              예매하기
            </button>
          </div>

          {/* 추가 상세 정보 placeholder */}
          <div className={css.detailInfo}>
            이 곳은 공연에 대한 상세한 정보가 표시됩니다.
          </div>
        </div>
      </div>

      {/* 탭 정보  */}
      <DetailTabInfo product={product} />

      {/* 유사 작품 */}
      <SimilarProducts relatedProducts={filteredRelatedProducts} />

      {/* 모달 */}
      {isModalOpen && (
        <Modal product={product} count={count} onClose={closeModal} />
      )}
    </main>
  );
};

export default DetailPage;
