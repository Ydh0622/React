import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { formatCurrency } from "@/utils/features";
import DetailTabInfo from "@/organism/DetailTabInfo";
import SimilarProducts from "@/organism/SimilarProducts";
import Modal from "@/components/Modal";
import css from "./DetailPage.module.css";

const getImageSrc = (img) => {
  if (!img) return "/img/product01.jpg";
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
      <main style={{ padding: "40px", textAlign: "center" }}>
        <p>상품을 찾을 수 없습니다.</p>
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
    <main>
      {/* 상품 상세 정보 */}
      <div className={css.detailCon}>
        {/* 상품 이미지 */}
        <div className={css.imgWrap}>
          <img src={getImageSrc(product.img)}></img>

          {product.discount > 0 && (
            <span className={css.discount}>{product.discount}% 할인</span>
          )}
        </div>

        {/* 상품 정보 */}
        <div className={css.infoWrap}>
          <h2 className={css.title}>{product.title}</h2>
          <p className={css.price}>{formatCurrency(product.price)}</p>

          {/* 수량 선택 및 장바구니 버튼 */}
          <div className={css.btnWrap}>
            <div className={css.counterArea}>
              <button onClick={decrease}>-</button>
              <span>{count}</span>
              <button onClick={increase}>+</button>
            </div>
            <button onClick={handleAddToCart} className={css.addBtn}>
              장바구니 담기
            </button>
          </div>
          <div className={css.detailInfo}>
            이 곳은 상품에 대한 상세한 정보가 표시됩니다.
          </div>
        </div>
      </div>
      {/* 탭 정보 */}
      <DetailTabInfo />

      {/* 유사 상품 */}
      <SimilarProducts relatedProducts={filteredRelatedProducts} />

      {/* 모달 */}
      {isModalOpen && (
        <Modal product={product} count={count} onClose={closeModal} />
      )}
    </main>
  );
};

export default DetailPage;
