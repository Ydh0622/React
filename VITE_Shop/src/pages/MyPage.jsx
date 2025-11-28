import React, { useState, useEffect } from "react";
import { getProductsData, addProduct, deleteProduct } from "@/api/productsApi";
import { formatCurrency } from "@/utils/features";
import css from "./MyPage.module.css";

const MyPage = () => {
  const [products, setProducts] = useState([]);

  // 1. 입력 폼 상태 관리
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    discount: 0,
    category: "new",
    img: "",
  });

  // 초기 데이터 로딩
  useEffect(() => {
    const loadData = async () => {
      const data = await getProductsData();
      setProducts(Array.isArray(data) ? data : []);
    };
    loadData();
  }, []);

  // 2. 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "discount" ? Number(value) : value,
    }));
  };

  // 3. [POST] 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault(); // 페이지 새로고침 방지

    // 간단한 유효성 검사
    if (!formData.title || !formData.price || !formData.img) {
      alert("상품명, 가격, 이미지 파일명은 필수입니다.");
      return;
    }

    const newProduct = {
      id: String(Date.now()), // 고유 id 생성
      ...formData,
    };

    if (window.confirm("상품을 등록하시겠습니까?")) {
      try {
        const savedItem = await addProduct(newProduct);
        setProducts((prev) => [...prev, savedItem]); // 화면에 추가

        // 폼 초기화
        setFormData({
          title: "",
          price: "",
          discount: 0,
          category: "new",
          img: "",
        });
        alert("상품이 등록되었습니다.");
      } catch (err) {
        alert("등록 실패!", err);
      }
    }
  };

  // 4. [DELETE] 상품 삭제
  const handleDelete = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteProduct(id);
        setProducts((prev) => prev.filter((item) => item.id !== id));
      } catch (err) {
        alert("삭제 실패!", err);
      }
    }
  };

  return (
    <main className={css.container}>
      <div className={css.header}>
        <h2 className={css.title}>상품 관리 (Admin) </h2>
      </div>

      {/* 상품 등록 폼 영역 */}

      <section className={css.formSection}>
        <h3>새 상품 등록</h3>
        <form onSubmit={handleSubmit} className={css.form}>
          <div className={css.inputGroup}>
            <label>상품명</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="예 : 14k 골드 링"
            ></input>
          </div>

          <div className={css.row}>
            <div className={css.inputGroup}>
              <label>가격 (원)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="숫자만 입력"
              ></input>
            </div>
            <div className={css.inputGroup}>
              <label>할인율 (%)</label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                placeholder="0"
              ></input>
            </div>
          </div>

          <div className={css.row}>
            <div className={css.inputGroup}>
              <label>카테고리</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="new">신상품 (new)</option>
                <option value="top">인기상품 (top)</option>
                <option value="">일반</option>
              </select>
            </div>
            <div className={css.inputGroup}>
              <label>이미지 파일명</label>
              <input
                type="text"
                name="img"
                value={formData.img}
                onChange={handleChange}
                placeholder="예 : image1.jpg (public/img 폴더 내)"
              />
            </div>
          </div>
          <button type="submit" className={css.submitBtn}>
            상품 등록하기
          </button>
        </form>
      </section>

      <hr></hr>

      {/* 상품 목록 그리드 */}
      <h3 className={css.listTitle}>등록된 상품 목록</h3>
      <div className={css.grid}>
        {products.map((item) => (
          <div key={item.id} className={css.card}>
            <div className={css.imgWrap}>
              <img
                src={
                  item.img.startsWith("http") ? item.img : `/img/${item.img}`
                }
                alt={item.title}
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/150")
                } // 이미지 없을 때 대체
              ></img>
              {item.discount > 0 && (
                <span className={css.badge}>{item.discount}%</span>
              )}
            </div>
            <div className={css.info}>
              <h4 className={css.productTitle}>{item.title}</h4>
              <p className={css.price}>{formatCurrency(item.price)}</p>
              <button
                className={css.deleteBtn}
                onClick={() => handleDelete(item.id)}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MyPage;
