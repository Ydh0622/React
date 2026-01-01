import React, { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { formatCurrency } from "@/utils/features";
import { updateCartItemCount, removeFromCart } from "@/api/cartApi";
import css from "../css/CartPage.module.css";
import ConfirmModal from "@/components/ConfirmModal";

const CartPage = () => {
  const cartList = useLoaderData();
  const [items, setItems] = useState(Array.isArray(cartList) ? cartList : []);

  // 총 예매 매수 계산
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  // 총 결제 예정 금액 계산
  const totalSum = items.reduce(
    (sum, item) =>
      sum +
      Math.round(item.price * item.count * (1 - (item.discount || 0) / 100)),
    0
  );

  // 티켓 매수 증가
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

  // 티켓 매수 감소
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

  // 예매 취소 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setItems((prev) => prev.filter((item) => item.id !== deleteId));
      removeFromCart(deleteId).catch((err) => console.log("err", err));
    }
    setIsModalOpen(false);
    setDeleteId(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDeleteId(null);
  };

  return (
    <main className={css.cartContainer}>
      {/* 타이틀 변경: My Cart -> My Tickets */}
      <h2 className={css.pageTitle}>My Tickets</h2>

      {items.length === 0 ? (
        <div className={css.emptyCart}>
          <p>예매 대기 중인 티켓이 없습니다.</p>
          <p>보고 싶은 공연을 찾아 좌석을 선택해주세요.</p>
        </div>
      ) : (
        <>
          {/* 요약 정보 문구 변경 */}
          <p className={css.infoText}>
            선택한 공연은 <strong>{items.length}</strong> 건 이고, 총 티켓
            매수는 <strong>{totalCount}</strong> 매 입니다.
          </p>

          {/* 예매 리스트 */}
          <div className={css.cartList}>
            {items.map((item) => (
              <div key={item.id} className={css.cartItem}>
                {/* 1. 포스터 이미지  */}
                <div className={css.imgWrap}>
                  <Link to={`/detail/${item.id}`}>
                    {item.img ? (
                      <img src={`/img/${item.img}`} alt={item.title} />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          background: "#eee",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                        }}
                      >
                        No Img
                      </div>
                    )}
                  </Link>
                </div>

                {/* 2. 공연 정보 (장소, 날짜 추가) */}
                <div className={css.itemInfo}>
                  <p className={css.itemTitle}>{item.title}</p>
                  {/* 장소와 날짜가 데이터에 있다면 출력 */}
                  {item.place && (
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#666",
                        marginTop: "4px",
                      }}
                    >
                      장소: {item.place}
                    </p>
                  )}
                  {item.date && (
                    <p style={{ fontSize: "13px", color: "#888" }}>
                      일정: {item.date}
                    </p>
                  )}
                </div>

                {/* 3. 티켓 가격 */}
                <div className={css.itemPrice}>
                  {formatCurrency(item.price)}
                </div>

                {/* 4. 매수 조절 */}
                <div className={css.countControl}>
                  <button onClick={() => decrease(item.id)}>-</button>
                  <span>{item.count}</span>
                  <button onClick={() => increase(item.id)}>+</button>
                </div>

                {/* 5. 할인율 표시 */}
                <div>
                  {item.discount > 0 ? (
                    <span style={{ color: "#fa2828", fontSize: "14px" }}>
                      ▼{item.discount}%
                    </span>
                  ) : (
                    <span style={{ color: "#ccc", fontSize: "14px" }}>-</span>
                  )}
                </div>

                {/* 6. 최종 금액  */}
                <div className={css.totalPrice}>
                  {formatCurrency(
                    Math.round(
                      item.price * item.count * (1 - (item.discount || 0) / 100)
                    )
                  )}
                </div>

                {/* 7. 예매 취소 버튼 */}
                <button
                  onClick={() => handleDeleteClick(item.id)}
                  className={css.deleteBtn}
                  title="선택 취소"
                >
                  X
                </button>
              </div>
            ))}
          </div>

          {/* 총 결제 예정 금액 */}
          <div className={css.cartPrice}>
            <p>
              총 결제 예정 금액 :
              <strong className={css.finalPrice}>
                {" "}
                {formatCurrency(totalSum)}
              </strong>
            </p>
          </div>
        </>
      )}

      {/* 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={isModalOpen}
        message="선택하신 공연을 예매 목록에서 삭제하시겠습니까?"
        onConfirm={confirmDelete}
        onCancel={closeModal}
      />
    </main>
  );
};

export default CartPage;
