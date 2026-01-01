import React, { useState, useEffect } from "react";
import { authAPI } from "../utils/api";
import "./Auth.css";

const UserInfo = ({ userId, onLogout }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userId) {
      fetchUserInfo();
    }
  }, [userId]);

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await authAPI.getMe(userId);
      if (result.success) {
        setUser(result.user);
      } else {
        setError(result.message || "사용자 정보를 불러올 수 없습니다.");
      }
    } catch (err) {
      setError("서버 연결 오류가 발생했습니다.");
      console.error("사용자 정보 조회 오류 : ", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="user-info">로딩 중...</div>;
  }
  if (error) {
    return <div className="user-info">오류 : {error}</div>;
  }
  if (!user) {
    return null;
  }

  return (
    <div className="user-info">
      <h3>사용자 정보</h3>
      <p>
        <strong>사용자명 : </strong> {user.username}
      </p>
      <p>
        <strong>이메일 : </strong> {user.email}
      </p>
      <p>
        {/* createdAt(d 추가) 및 따옴표/괄호 수정 */}
        <strong>가입일 : </strong>{" "}
        {new Date(user.createdAt).toLocaleDateString("ko-KR")}
      </p>

      {/* 닫는 소괄호 ) 추가 */}
      {onLogout && (
        <button onClick={onLogout} className="logout-button">
          로그아웃
        </button>
      )}
    </div>
  );
};

export default UserInfo;
