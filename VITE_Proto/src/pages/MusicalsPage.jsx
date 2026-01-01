import React, { useEffect, useState, useRef } from "react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import CategoryButton from "@/components/CategoryButton";
import SortItem from "@/components/SortItem";
import css from "../css/MusicalsPage.module.css";

const MusicalsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDown, setIsDown] = useState(false);
  const searchInputRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");

  const rawLoaderData = useLoaderData();
  const safeInitData = rawLoaderData || { products: { data: [] } };
  const productsData = safeInitData.products || { data: [] };

  const currentCategory = searchParams.get("category");
  const sortCase = searchParams.get("_sort");

  // URL의 'q' 파라미터가 있으면 검색어 상태에 반영
  const currentQuery = searchParams.get("q");
  const shouldFocus = searchParams.get("focus") === "true";

  // 검색어 상태 동기화
  useEffect(() => {
    if (currentQuery) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchTerm(currentQuery);
    } else {
      setSearchTerm("");
    }
  }, [currentQuery]);

  useEffect(() => {
    if (shouldFocus && searchInputRef.current) {
      searchInputRef.current.focus();
      const params = new URLSearchParams(searchParams);
      params.delete("focus");
      setSearchParams(params, { replace: true });
    }
  }, [shouldFocus, searchParams, setSearchParams]);

  const data = productsData.data;
  const { per_page } = safeInitData;

  // 1. 검색 핸들러
  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set("_page", 1);
    params.set("_per_page", per_page);

    if (searchTerm.trim()) {
      params.set("q", searchTerm.trim());
    } else {
      params.delete("q");
    }
    navigate(`/musicals/?${params}`);
  };

  // 2. 카테고리 필터링 핸들러
  const handleCategoryFilter = (category) => {
    const params = new URLSearchParams(searchParams);
    params.set("_page", 1);
    params.set("_per_page", per_page);
    category ? params.set("category", category) : params.delete("category");
    navigate(`/musicals/?${params}`);
  };

  // 3. 정렬 핸들러
  const handleSort = (sortOption) => {
    const params = new URLSearchParams(searchParams);
    params.set("_page", 1);
    params.set("_sort", sortOption);
    setIsDown(false);
    navigate(`/musicals/?${params}`);
  };

  const sortTextMap = {
    id: "최신 오픈순",
    price: "낮은 가격순",
    "-price": "높은 가격순",
    discount: "높은 할인율순",
    "-discount": "낮은 할인율순",
  };
  const getSortText = () => {
    return sortTextMap[sortCase] || "최신 오픈순";
  };

  const sortOptions = [
    { option: "id", label: "최신 오픈순" },
    { option: "price", label: "낮은 가격순" },
    { option: "-price", label: "높은 가격순" },
    { option: "discount", label: "높은 할인율순" },
    { option: "-discount", label: "낮은 할인율순" },
  ];

  const categories = [
    { id: "", label: "전체 공연" },
    { id: "musical", label: "인기 작품" },
    { id: "concert", label: "NEW 작품" },
  ];

  return (
    <main>
      <section className={css.musicalsPage}>
        <h2>전체 공연 예매</h2>

        {/* 1. 사이드바 영역 (searchFn) */}
        <div className={css.searchFn}>
          {/* 검색 입력창 영역 */}
          <form onSubmit={handleSearch} className={css.searchForm}>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="공연명 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={css.searchInput}
            ></input>
            <button type="submit" className={css.searchBtn}>
              <i className="bi bi-search"></i>
            </button>
          </form>

          {/* 카테고리 버튼 */}
          <div className={css.category}>
            {categories.map((cate) => (
              <CategoryButton
                key={cate.id}
                cate={cate.id}
                label={cate.label}
                handleCategoryFilter={handleCategoryFilter}
                currentCategory={
                  currentCategory === null && cate.id === ""
                    ? null
                    : currentCategory
                }
              />
            ))}
          </div>

          {/* 정렬 드롭다운 */}
          <div className={`${css.sort} ${isDown ? css.active : ""}`}>
            <button
              onClick={() => setIsDown(!isDown)}
              className={css.sortHeader}
            >
              <span className={css.sortLabel}>{getSortText()}</span>
              <i>{isDown ? "▲" : "▼"}</i>
            </button>
            {isDown && (
              <ul className={css.sortList}>
                {sortOptions.map((sortOpt) => (
                  <SortItem
                    key={sortOpt.option}
                    option={sortOpt.option}
                    handleSort={handleSort}
                    currentSort={sortCase}
                    label={sortOpt.label}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* 2. 상품 리스트 영역 */}
        <div className={css.productList}>
          {data.length === 0 ? (
            <p className={css.noResult}>예매 가능한 공연이 없습니다.</p>
          ) : (
            <>
              <div className={css.list}>
                {data.map((product) => (
                  <ProductCard key={product.id} data={product}></ProductCard>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* 3. 페이지네이션 ) */}
      <Pagination initProductsData={safeInitData}></Pagination>
    </main>
  );
};

export default MusicalsPage;
