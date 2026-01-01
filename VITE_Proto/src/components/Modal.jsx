import React from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "@/api/cartApi";

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
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "8px",
          maxWidth: "400px",
          width: "90%",
        }}
      >
        <h3 style={{ marginBottom: "16px" }}>장바구니에 추가하시겠습니다?</h3>
        <p style={{ marginBottom: "8px" }}>{product.title}</p>
        <p style={{ marginBottom: "20px" }}>수량 : {count} 개</p>
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "8px 16px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            취소
          </button>
          <button
            onClick={handleAddToCart}
            style={{
              padding: "8px 16px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
