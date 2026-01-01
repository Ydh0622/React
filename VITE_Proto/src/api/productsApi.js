import axios from "axios";

// 모든 작품 데이터 가져오기 (쿼리 파라미터 지원)
export const getProductsData = async (query = "") => {
  try {
    const res = await axios.get(`/api/products/?${query}`);
    return res.data;
  } catch (err) {
    console.log("productApi.js : getProductsData -err", err);
    return [];
  }
};

// 특정 작품 ID로 상품 정보 가져오기
export const getProductsById = async (id) => {
  try {
    const res = await axios.get(`/api/products/${id}`);
    return res.data;
  } catch (err) {
    console.log("productApi.js : getProductsById -err", err);
    return null;
  }
};

// 장소별 작품 가져오기
export const getProductsByPlace = async (place, limit = 10) => {
  try {
    const res = await axios.get(`/api/products/`, {
      params: {
        place,
        _limit: limit,
      },
    });
    return res.data;
  } catch (err) {
    console.log("productApi.js : getProductsByPlace -err", err);
    return [];
  }
};

// 상품 추가하기 - POSt
export const addProduct = async (productData) => {
  try {
    //  /api/products 경로로 POST 요청 전송
    const res = await axios.post("./api/products", productData);
    return res.data;
  } catch (err) {
    console.log("productApi.js : addProduct -err", err);
    throw err; // 에러를 컴포넌트에서 처리할 수 있도록 throw
  }
};

// 상품 삭제하기 - DELETE
export const deleteProduct = async (id) => {
  try {
    // /api/products 경로로 DELETE 요청 전송
    const res = await axios.delete(`/api/products/${id}`);
    return res.data;
  } catch (err) {
    console.log("productAPI.js : deleteProduct -err", err);
    throw err;
  }
};
