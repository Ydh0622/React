import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import HeroSlider from "@/organism/HeroSlider";
import { getProductsData } from "@/api/productsApi";
import { Link } from "react-router-dom";
import css from "./MainPage.module.css";

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProductsData();
        // 6개만 보이게
        const limitedData = data.slice(0, 6);
        setProducts(limitedData);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <main className={css.mainContainer}>
        <p className={css.loading}>로딩 중...</p>
      </main>
    );
  }

  return (
    <main className={css.mainContainer}>
      {/* 배너 슬라이드 */}
      <HeroSlider />

      {/* 상품 리스트 */}
      <section className={css.productsSection}>
        <div className={css.sectionHeader}>
          <h3 className={css.sectionTitle}>Shop The Latest </h3>
          {/* 전체 상품 보기 링크 추가 */}
          <Link to="/shop" className={css.viewAllLink}>
            View All
          </Link>
        </div>

        {products.length === 0 ? (
          <p className={css.noProduct}>상품이 없습니다.</p>
        ) : (
          <div className={css.productGrid}>
            {products.map((product) => (
              <ProductCard key={product.id} data={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default MainPage;
