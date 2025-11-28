import axios from "axios";

// 모든 상품 데이터 가져오기
// 검색 이후 수정
export const getProductsData = async (params = {}) => {
  try {
    const res = await axios.get(`/api/products/`, { params });
    // json.server 응답이 배열인 경우와 객체인 경우 모두 처리
    if (Array.isArray(res.data)) {
      return res.data; // 배열인 경우 그대로 반환 (MainPage용)
    }
    // 페이지네이션된 경우 객체 반환
    return res.data;
  } catch (err) {
    console.log("productApi.js : getProductsData -err", err);
    return [];
  }
};

// 특정 상품 ID로 상품 정보 가져오기
export const getProductsById = async (id) => {
  try {
    const res = await axios.get(`/api/products/${id}`);
    return res.data;
  } catch (err) {
    console.log("productApi.js : getProductsById -err", err);
    return null;
  }
};

// 카테고리별 상품 가져오기
export const getProductsByCategory = async (category, limit = 10) => {
  try {
    const res = await axios.get(`/api/products/`, {
      params: {
        category,
        _limit: limit,
      },
    });
    return res.data;
  } catch (err) {
    console.log("productApi.js : getProductsByCategory -err", err);
    return [];
  }
};

// 상품 추가하기 - POST
export const addProduct = async (productData) => {
  try {
    // /api/products 경로로 POST 요청 전송
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
    // /api/products/id 경로로 DELETE 요청 전송
    const res = await axios.delete(`/api/products/${id}`);
    return res.data;
  } catch (err) {
    console.log("productApi.js : deleteProduct -err", err);
    throw err;
  }
};
