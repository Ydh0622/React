import React from "react";
import ProductCard from "@/components/ProductCard";
import css from "../css/SimilarProducts.module.css";

const SimilarProducts = ({ relatedProducts }) => {
  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className={css.similarContainer}>
      <h3 className={css.title}>유사 상품 추천</h3>
      <div className={css.productList}>
        {relatedProducts.slice(0, 4).map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
