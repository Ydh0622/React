import React, { useEffect, useState, useRef } from "react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import CategoryButton from "@/components/CategoryButton";
import SortItem from "@/components/SortItem";
import css from "./MusicalsPage.module.css"; // CSS 파일명 사용

const MusicalsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDown, setIsDown] = useState(false);
  const searchInputRef = useRef(null);

  // 검색어 상태 추가
  const [searchTerm, setSearchTerm] = useState("");

  const initProductsData = useLoaderData();
  const currentCategory = searchParams.get("category");
  const sortCase = searchParams.get("_sort");

  // URL의 'q' 파라미터가 있으면 검색어 상태에 반영
  const currentQuery = searchParams.get("q");
  const shouldFocus = searchParams.get("focus") === "true";

  // 검색 추가
  useEffect(() => {
    if (currentQuery) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchTerm(currentQuery);
    } else {
      setSearchTerm("");
    }
  }, [currentQuery]);

  // focus 파라미터가 있으면 검색창에 포커스
  useEffect(() => {
    if (shouldFocus && searchInputRef.current) {
      searchInputRef.current.focus();
      //focus 파라미터 제거
      const params = new URLSearchParams(searchParams);
      params.delete("focus");
      setSearchParams(params, { replace: true });
    }
  }, [shouldFocus, searchParams, setSearchParams]);

  const data = initProductsData.products.data;
  const { per_page } = initProductsData;

  // 검색 핸들러 함수 추가하기
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

    navigate(`/stage/?${params}`);
  };

  const handleCategoryFilter = (category) => {
    const params = new URLSearchParams(searchParams);
    params.set("_page", 1);
    params.set("_per_page", per_page);
    category ? params.set("category", category) : params.delete("category");

    navigate(`/stage/?${params}`);
  };

  const handleSort = (sortOption) => {
    const params = new URLSearchParams(searchParams);
    params.set("_page", 1);
    params.set("_sort", sortOption);
    setIsDown(false);

    navigate(`/stage/?${params}`);
  };

  // 정렬 텍스트 매핑 (뮤지컬 테마)
  const sortTextMap = {
    id: "최신 오픈순",
    price: "낮은 가격순",
    "-price": "높은 가격순",
    discount: "낮은 할인순",
    "-discount": "높은 할인율순",
  };

  const getSortText = () => {
    return sortTextMap[sortCase] || "최신 오픈순";
  };

  // 정렬 옵션
  const sortOptions = [
    { option: "id", label: "최신 오픈순" },
    { option: "price", label: "낮은 가격순" },
    { option: "-price", label: "높은 가격순" },
    { option: "discount", label: "낮은 할인순" },
    { option: "-discount", label: "높은 할인율순" },
  ];

  // 카테고리 버튼
  const categories = [
    { id: "", label: "전체 공연" },
    { id: "musical", label: "뮤지컬" },
    { id: "concert", label: "콘서트" },
    { id: "classic", label: "클래식/무용" },
  ];

  return (
    <main className={css.musicalsPageContainer}>
      {" "}
      {/* 새로운 메인 컨테이너 클래스 */}
      <h2 className={css.pageTitle}>전체 공연 예매</h2>
      {/* 1. [구조 변경] 검색, 카테고리, 정렬 통합 상단 바 */}
      <div className={css.topFilterSortBar}>
        {/* 1A. 검색 입력창 (왼쪽 배치) */}
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

        {/* 1B. 카테고리 버튼 및 정렬 드롭다운 그룹  */}
        <div className={css.categorySortWrapper}>
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
      </div>
      {/* 2. 공연 리스트 영역 (필터 밑에 넓게 배치) */}
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
      <Pagination initProductsData={initProductsData}></Pagination>
    </main>
  );
};

export default MusicalsPage;
