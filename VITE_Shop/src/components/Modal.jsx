import React from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "@/api/cartApi";
import css from "./Modal.module.css";

const Modal = ({ product, count, onClose }) => {
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    const cartItem = {
      id: product.id,
      title: product.title,
      img: product.img,
      price: product.price,
      discount: product.discount,
      category: product.category,
      count: count,
    };

    await addToCart(cartItem);
    onClose();
    navigate("/cart");
  };

  return (
    <div className={`${css.modal} ${css.active}`} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className={css.modalContainer}>
        {/* 1. 닫기 버튼 (텍스트나 아이콘) */}
        <button className={css.btnClose} onClick={onClose}>
          {/*부트 스트랩 아이콘  */}
          <i className="bi bi-x-lg"></i>
        </button>

        {/* 2. 모달 내용 */}
        <div className={css.modalContent}>
          <h3 className={css.modalTitle}>장바구니에 추가하시겠습니까? </h3>

          {/* 2-1.상품 정보 요약 */}
          <div className={css.productSummary}>
            <p className={css.productTitle}>{product.title}</p>
            <p className={css.countText}>수량 : {count}</p>
          </div>
        </div>

        {/* 3. 하단 버튼 그룹 */}
        <div className={css.btnGroup}>
          <button className={css.cancelBtn} onClick={onClose}>
            취소
          </button>
          <button className={css.confirmBtn} onClick={handleAddToCart}>
            장바구니 추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
