import React, { useState } from "react";
import { authAPI } from "../utils/api";
import "./Auth.css";

const Register = ({ onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 비밀번호 일치 확인
    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      setLoading(false);
      return;
    }

    try {
      const result = await authAPI.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        alert("회원가입이 완료되었습니다!");
        if (onRegisterSuccess) {
          onRegisterSuccess(result.user);
        }

        // 입력 폼 초기화
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setError(result.message || "회원가입에 실패했습니다.");
      }
    } catch (err) {
      setError("서버에 연결 오류가 발생했습니다.");
      console.error("회원가입 오류 : ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="username">사용자명</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            minLength={3}
            maxLength={20}
            placeholder="3자 이상 20자이하 입력하세요"
          />
        </div>

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
            minLength={6}
            placeholder="6자 이상 입력하세요"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength={6}
            placeholder="비밀번호를 다시 입력해주세요"
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "처리 중..." : "회원가입"}
        </button>
      </form>
    </div>
  );
};

export default Register;
