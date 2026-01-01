import React, { useState } from "react";
import { authAPI } from "../utils/api";
import "./Auth.css";

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // [e.target.value]에서 수정
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await authAPI.login({
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        alert(`환영합니다, ${result.user.username}님!`);
        if (onLoginSuccess) {
          onLoginSuccess(result.user);
        }
        setFormData({
          email: "",
          password: "",
        });
      } else {
        setError(result.message || "로그인에 실패했습니다.");
      }
    } catch (err) {
      setError("서버 연결 오류가 발생했습니다.");
      console.error("로그인 오류 : ", err);
    } finally {
      setLoading(false);
    }
  }; // 함수가 여기서 닫혀야 합니다.

  // return 문이 컴포넌트 함수 안에 있어야 합니다.
  return (
    <div className="auth-container">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="example@email.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="비밀번호를 입력해주세요"
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
};

export default Login;
