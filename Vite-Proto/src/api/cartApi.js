import axios from "axios";

// 장바구니 목록 가져오기
export const getCartData = async () => {
  try {
    const res = await axios.get(`/api/cart/`);
    return res.data;
  } catch (err) {
    console.log("err cartApi.js", err);
    return [];
  }
};

// 장바구니에 상품을 추가하기
export const addToCart = async (cartItem) => {
  try {
    const cart = await getCartData();
    const existingItem = cart.find((item) => item.id === cartItem.id);

    if (existingItem) {
      // 이미 있으면 수량만 증가
      const updateItem = {
        ...existingItem,
        count: existingItem.count + cartItem.count,
      };
      const res = await axios.put(`/api/cart/${existingItem.id}`, updateItem);
      return res.data;
    } else {
      // 없으면 새로 추가
      const res = await axios.post(`/api/cart/`, cartItem);
      return res.data;
    }
  } catch (err) {
    console.log("err cartApi.js", err);
  }
};

// 장바구니 수량 업데이트
export const updateCartItemCount = async (id, count) => {
  try {
    const cartItem = await axios.get(`/api/cart/${id}`);
    const updateItem = { ...cartItem.data, count };
    const res = await axios.put(`/api/cart/${id}`, updateItem);
    return res.data;
  } catch (err) {
    console.log("err cartApi.js", err);
  }
};

// 장바구니에서 상품 삭제
export const removeFromCart = async (id) => {
  try {
    const res = await axios.delete(`/api/cart/${id}`);
    return res.data;
  } catch (err) {
    console.log("err cartApi.js", err);
  }
};
