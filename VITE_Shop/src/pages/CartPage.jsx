import React, { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { formatCurrency } from "@/utils/features";
import { updateCartItemCount, removeFromCart } from "@/api/cartApi";
import css from "./CartPage.module.css";
import ConfirmModal from "@/components/ConfirmModal";

const CartPage = () => {
  const cartList = useLoaderData();
  const [items, setItems] = useState(Array.isArray(cartList) ? cartList : []);

  // 총 수량 계산
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  // 총 금액 계산
  const totalSum = items.reduce(
    (sum, item) =>
      sum +
      Math.round(item.price * item.count * (1 - (item.discount || 0) / 100)),
    0
  );

  // 수량 증가
  const increase = (id) => {
    const currentItem = items.find((item) => item.id === id);
    if (!currentItem) return;

    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
    const newCount = currentItem.count + 1;
    updateCartItemCount(id, newCount).catch((err) => console.log("err", err));
  };

  // 수량 감소
  const decrease = (id) => {
    const currentItem = items.find((item) => item.id === id);
    if (!currentItem) return;

    if (currentItem.count > 1) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, count: item.count - 1 } : item
        )
      );
      const newCount = currentItem.count - 1;
      updateCartItemCount(id, newCount).catch((err) => console.log("err", err));
    }
  };

  // 장바구니에서 삭제 window 기능을 사용한 삭제 기능
  // const handleDelete = (id) => {
  //   if (window.confirm("정말 삭제하시겠습니까?")) {
  //     setItems((prev) => prev.filter((item) => item.id !== id));
  //     removeFromCart(id).catch((err) => console.log("err", err));
  //   }
  // };

  // 삭제 모달 추가
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // 1. 삭제 버튼 클릭 시 실행
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  // 2. 모달에서 '삭제' 클릭 시 실제 삭제 진행
  const confirmDelete = () => {
    if (deleteId) {
      setItems((prev) => prev.filter((item) => item.id !== deleteId));
      removeFromCart(deleteId).catch((err) => console.log("err", err));
    }
    setIsModalOpen(false);
    setDeleteId(null);
  };

  // 3. 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setDeleteId(null);
  };

  return (
    <main className={css.cartContainer}>
      <h2 className={css.pageTitle}>My Cart</h2>
      {items.length === 0 ? (
        <div className={css.emptyCart}>
          <p>장바구니가 비었습니다.</p>
          <p>신상품이나 인기상품을 찾아보세요. </p>
        </div>
      ) : (
        <>
          <p className={css.infoText}>
            장바구니 리스트는 <strong>{items.length}</strong> 개 이고 , 총 상품
            갯수는<strong>{totalCount}</strong> 개 입니다.
          </p>

          {/* 장바구니 아이템 리스트 */}
          <div className={css.cartList}>
            {items.map((item) => (
              <div key={item.id} className={css.cartItem}>
                {/* 이미지 */}
                <div className={css.imgWrap}>
                  <Link to={`/detail/${item.id}`}>
                    <img src={`/public/img/${item.img}`} alt={item.title} />
                  </Link>
                </div>

                {/* 상품명 */}
                <div className={css.itemInfo}>
                  <p className={css.itemTitle}>{item.title}</p>
                </div>

                {/* 가격 */}
                <div className={css.itemPrice}>
                  {formatCurrency(item.price)}
                </div>

                {/* 수량 조절 */}
                <div className={css.countControl}>
                  <button onClick={() => decrease(item.id)}>-</button>
                  <span>{item.count}</span>
                  <button onClick={() => increase(item.id)}>+</button>
                </div>

                {/* 할인율 */}
                <div>할인율 : {item.discount} %</div>

                {/* 소계 */}
                <div className={css.totalPrice}>
                  {formatCurrency(
                    Math.round(
                      item.price * item.count * (1 - (item.discount || 0) / 100)
                    )
                  )}
                </div>

                {/* 삭제 버튼 */}
                <button
                  onClick={() => handleDeleteClick(item.id)}
                  className={css.deleteBtn}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          {/* 총 금액 */}
          <div className={css.cartPrice}>
            <p>
              총금액 :
              <strong className={css.finalPrice}>
                {" "}
                {formatCurrency(totalSum)}
              </strong>
            </p>
          </div>
        </>
      )}
      {/* 삭제 모달 컴포넌트 */}
      <ConfirmModal
        isOpen={isModalOpen}
        message="정말 장바구니에서 삭제하시겠습니까?"
        onConfirm={confirmDelete}
        onCancel={closeModal}
      />
    </main>
  );
};

export default CartPage;
