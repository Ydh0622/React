import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/utils/features";
import css from "./ProductCard.module.css";

const ProductCard = ({ data }) => {
  return (
    <Link
      to={`/detail/${data.id}`}
      className={css.cardLink} // 링크 전체에 스타일 적용
    >
      <div className={css.card}>
        <div className={css.imgWrap}>
          {/* 할인율 뱃지 */}
          {data.discount > 0 && (
            <div className={css.discountBadge}>{data.discount}%</div>
          )}

          {/* 이미지 */}
          <img
            src={`/public/img/${data.img}`}
            alt={data.title}
            className={css.productImage}
          ></img>
        </div>

        {/* 상품명, 가격 */}
        <h4 className={css.title}>{data.title}</h4>
        <p className={css.price}>{formatCurrency(data.price)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
