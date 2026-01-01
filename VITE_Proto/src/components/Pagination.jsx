import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Pagination = ({ initProductsData }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { first, last, prev, next, pages } = initProductsData.products;
  const currentPage = Number(searchParams.get("_page") || "1");

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("_page", page);
    navigate(`/musicals/?${params}`);
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
    <div
      style={{
        display: "flex",
        gap: "8px",
        justifyContent: "center",
        marginTop: "40px",
      }}
    >
      <button
        onClick={() => handlePageChange(first)}
        disabled={currentPage === first}
        style={{
          padding: "8px 12px",
          cursor: currentPage === first ? "not-allowed" : "pointer",
        }}
      >
        처음
      </button>
      <button
        onClick={() => handlePageChange(prev)}
        disabled={prev === null}
        style={{
          padding: "8px 12px",
          cursor: prev === null ? "not-allowed" : "pointer",
        }}
      >
        이전
      </button>
      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => handlePageChange(num)}
          style={{
            padding: "8px 12px",
            backgroundColor: num === currentPage ? "#3498db" : "white",
            color: num === currentPage ? "white" : "black",
            border: "1px solid #ddd",
            cursor: "pointer",
          }}
        >
          {num}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(next)}
        disabled={next === null}
        style={{
          padding: "8px 12px",
          cursor: next === null ? "not-allowed" : "pointer",
        }}
      >
        다음
      </button>
      <button
        onClick={() => handlePageChange(last)}
        disabled={currentPage === last}
        style={{
          padding: "8px 12px",
          cursor: currentPage === last ? "not-allowed" : "pointer",
        }}
      >
        마지막
      </button>
    </div>
  );
};

export default Pagination;
