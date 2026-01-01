import {
  getProductsData,
  getProductsById,
  getProductsByPlace,
} from "@/api/productsApi";

// MusicalsPage loader
export const MusicalsPageLoader = async ({ request }) => {
  // URL에서 쿼리 파라미터 읽기
  const url = new URL(request.url);
  const page = url.searchParams.get("_page") || 1;
  const per_page = url.searchParams.get("_per_page") || 12;
  const place = url.searchParams.get("place") || "";
  const sort = url.searchParams.get("_sort") || "";

  // 쿼리 문자열 만들기
  let queryString = `_page=${page}&_per_page=${per_page}`;
  if (place) queryString += `&category=${place}`;
  if (sort) queryString += `&_sort=${sort}`;

  try {
    const products = await getProductsData(queryString);
    return { products, per_page };
  } catch (err) {
    console.log("err---- productsLoader.js", err);
    throw new Response("작품 데이터를 가져오는 중 오류 발생", {
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
      throw new Response("작품이 존재하지 않습니다.", {
        status: 404,
      });
    }

    // 같은 카테고리의 다른 작품들 가져오기
    const relatedProducts = await getProductsByPlace(product.place, 10);

    // 현재 작품 제외
    const filteredRelatedProducts = relatedProducts.filter(
      (p) => p.id !== product.id
    );

    return { product, filteredRelatedProducts };
  } catch (err) {
    console.log("err---- productsLoader.js", err);
    throw new Response("작품 데이터를 가져오는 중 오류 발생", {
      status: err.status || 500,
    });
  }
};
