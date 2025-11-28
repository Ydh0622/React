import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import css from "./Pagination.module.css";

const Pagination = ({ initProductsData }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { first, last, prev, next, pages } = initProductsData.products;
  const currentPage = Number(searchParams.get("_page") || "1");

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("_page", page);
    navigate(`/shop/?${params}`);
  };

  // 페이지 번호 계산 (ex.최대 5~10개)
  const getPageNumbers = () => {
    const maxPageNumbers = 5;
    if (pages <= maxPageNumbers) {
      return Array.from({ length: pages }, (_, i) => i + 1);
    }

    let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
    let endPage = Math.min(pages, startPage + maxPageNumbers - 1);

    if (endPage > pages) {
      endPage = pages;
      startPage = Math.max(1, endPage - maxPageNumbers + 1);
    }
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={css.paginationArea}>
      <button
        onClick={() => handlePageChange(first)}
        disabled={currentPage === first}
      >
        처음
      </button>
      <button onClick={() => handlePageChange(prev)} disabled={prev === null}>
        이전
      </button>
      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => handlePageChange(num)}
          className={num === currentPage ? css.active : undefined}
        >
          {num}
        </button>
      ))}
      <button onClick={() => handlePageChange(next)} disabled={next === null}>
        다음
      </button>
      <button
        onClick={() => handlePageChange(last)}
        disabled={currentPage === last}
      >
        마지막
      </button>
    </div>
  );
};

export default Pagination;
