import {
  getProductsData,
  getProductsById,
  getProductsByCategory,
} from "@/api/productsApi";

// ShopPage loader
export const shopPageLoader = async ({ request }) => {
  // URL에서 쿼리 파라미터 읽기
  const url = new URL(request.url);
  const page = url.searchParams.get("_page") || 1;
  const per_page = url.searchParams.get("_per_page") || 12;
  const category = url.searchParams.get("category") || "";
  const sort = url.searchParams.get("_sort") || "";

  // 검색 쿼리 or 파라미터
  const q = url.searchParams.get("q") || "";

  // axios params 객체 생성
  const params = {};

  // 카테고리 필터 추가
  if (category) {
    params.category = category;
  }

  // 정렬 옵션 추가
  if (sort) {
    params._sort = sort;
  }

  // 검색은 클라이언트 사이드에서 처리함 서버에서는 모든 데이터 가져오기
  // 페이지네이션도 클라이언트에서 처리

  try {
    // 모든 상품 데이터 가져오기 (필터링, 정렬 이전)
    const allProducts = await getProductsData(params);

    // getProductsData는 배열을 반환하므로 배열로 처리
    const productsArray = Array.isArray(allProducts) ? allProducts : [];

    // 검색어로 필터링 (클라이언트 사이드)
    let filteredData = productsArray;

    if (q && q.trim()) {
      const searchTerm = q.trim().toLowerCase();
      filteredData = filteredData.filter(
        (product) =>
          product.title && product.title.toLowerCase().includes(searchTerm)
      );
    }

    // 페이지네이션 처리
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / per_page);
    const startIndex = (page - 1) * per_page;
    const endIndex = startIndex + per_page;
    const paginationData = filteredData.slice(startIndex, endIndex);

    // json-server 형식에 맞춰 반환
    const products = {
      data: paginationData,
      total: totalItems,
      pages: totalPages,
      first: page === 1 ? null : 1,
      last: totalPages,
      prev: page > 1 ? page - 1 : null,
      next: page < totalPages ? page + 1 : null,
    };

    return { products, per_page };
  } catch (err) {
    console.log("err", err);
    throw new Response("상품 데이터를 가져오는 중 오류 발생", {
      status: err.status || 500,
    });
  }
};

// Loaders는 페이지 렌더링 전에 실행됨
// URL 쿼리 파라미터를 읽어서 필터링/정렬/페이지네이션 처리

// DetailPage Loader
export const detailPageLoader = async ({ params }) => {
  try {
    // 상품 ID로 상세 정보 가져오기
    const product = await getProductsById(params.productId);

    if (!product) {
      throw new Response("상품이 존재하지 않습니다.", {
        status: 404,
      });
    }

    // 같은 카테고리의 다른 상품들 가져오기
    const relatedProducts = await getProductsByCategory(product.category, 10);

    // 현재 상품 제외
    const filteredRelatedProducts = relatedProducts.filter(
      (p) => p.id !== product.id
    );

    return { product, filteredRelatedProducts };
  } catch (err) {
    console.log("err---- productsLoader.js", err);
    throw new Response("상품 데이터를 가져오는 중 오류 발생", {
      status: err.status || 500,
    });
  }
};
