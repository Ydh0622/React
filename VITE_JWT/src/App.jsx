// JWT 토큰 사용 프론트 화면 구성

import { useState, useEffect } from "react";
import "./App.css";
import {
  login,
  getProfile,
  getAdminData,
  refreshToken,
  decodeToken,
  getToken,
  logout,
  getStorageType,
  setStorageType,
} from "./utils/api";

function App() {
  // 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [tokenInfo, setTokenInfo] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [storageType, setStorageTypeState] = useState(getStorageType());

  // 컴포넌트 마운트 시 토큰 확인
  useEffect(() => {
    //localStorage 방식인 경우에만 토큰 확인
    if (storageType === "localStorage") {
      const token = getToken();
      if (token) {
        checkAuth();
      }
    } else {
      // 쿠키 방식은 항상 서버에 확인 요청
      checkAuth();
    }
  }, [storageType]);

  // 인증 상태 확인
  const checkAuth = async () => {
    // 쿠키 방식이거나 로컬스토리지에 토큰이 있는 경우
    if (storageType === "cookie" || getToken()) {
      const result = await getProfile();
      if (result.success) {
        setIsLoggedIn(true);
        setUser(result.user);
        setMessage("인증 성공! 토큰이 유효합니다.");
      } else {
        setIsLoggedIn(false);
        setUser(null);
        setMessage("인증 실패! 토큰이 만료되었거나 유효하지 않습니다.");
      }
    }
  };

  // 로그인 처리
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("로그인 중...");

    const result = await login(username, password, storageType);

    if (result.success) {
      setIsLoggedIn(true);
      setUser(result.user);
      const storageMsg =
        storageType === "cookie"
          ? "로그인 성공! JWT 토큰이 쿠키에 저장되었습니다."
          : "로그인 성공! JWT 토큰이 로컬 스토리지에 저장되었습니다.";
      setMessage(storageMsg);
      setUsername("");
      setPassword("");

      // 로컬 스토리지 방식인 경우에만 토큰 정보 표시
      if (result.token) {
        await showTokenInfo(result.token);
      } else {
        // 쿠키 방식은 토큰을 바로 가져올 수는 없음
        setTokenInfo(null);
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
      setMessage(`로그인 실패! ${result.message}`);
    }
  };

  // 로그아웃 처리
  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    setUser(null);
    setTokenInfo(null);
    setProfileData(null);
    setAdminData(null);
    setMessage("로그아웃되었습니다.");
  };

  // 저장 방식 변경
  const handleStorageTypeChange = (type) => {
    if (isLoggedIn) {
      setMessage("저장 방식을 변경하려면 먼저 로그아웃하세요.");
      return;
    }
    setStorageType(type);
    setStorageTypeState(type);
    setMessage(
      `저장 방식이 ${
        type === "cookie" ? "HttpOnly 쿠키" : "localStorage"
      }로 변경되었습니다.`
    );
  };

  // 토큰 정보 표시
  const showTokenInfo = async (token) => {
    const result = await decodeToken(token || getToken());
    if (result.success) {
      setTokenInfo(result.decoded);
    }
  };

  // 프로필 조회
  const handleGetProfile = async () => {
    setMessage("프로필 조회 중...");
    const result = await getProfile();

    if (result.success) {
      setProfileData(result.user);
      setMessage("프로필 조회 성공!");
    } else {
      setMessage("프로필 조회 실패");
      if (result.message.includes("만료")) {
        setIsLoggedIn(false);
        setUser(null);
      }
    }
  };

  // 관리자 페이지 접근
  const handleGetAdmin = async () => {
    setMessage("관리자 페이지 접근 중...");
    const result = await getAdminData();

    if (result.success) {
      setAdminData(result.data);
      setMessage("관리자 페이지에 접근했습니다");
    } else {
      setMessage(`접근 실패! ${result.message}`);
    }
  };

  // 토큰 갱신
  const handleRefreshToken = async () => {
    setMessage("토큰 갱신 중...");
    const result = await refreshToken();

    if (result.success) {
      setMessage("토큰이 갱신되었습니다.");
      await showTokenInfo(result.token);
    } else {
      setMessage(`토큰 갱신 실패! ${result.message}`);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>JWT 인증 시스템</h1>
        <p>JWT 토큰을 사용한 웹 보안 인증 예시</p>
      </header>

      <main className="app-main">
        {/* 저장 방식 선택 */}
        {!isLoggedIn && (
          <section className="storage-selection">
            <h2>토큰 저장 방식 선택</h2>
            <div className="storage-options">
              <label className="storage-option">
                <input
                  type="radio"
                  name="storageType"
                  value="localStorage"
                  checked={storageType === "localStorage"}
                  onChange={(e) => handleStorageTypeChange(e.target.value)}
                />
                <div className="storage-info">
                  <h3>localStorage 방식</h3>
                  <p>클라이언트에서 직접 관리 (개발/테스트용)</p>
                  <ul>
                    <li>Javascript 로 접근 가능</li>
                    <li>개발자 도구에서 확인 가능</li>
                    <li>XSS 공격에 취약</li>
                  </ul>
                </div>
              </label>
              <label className="storage-option">
                <input
                  type="radio"
                  name="storageType"
                  value="cookie"
                  checked={storageType === "cookie"}
                  onChange={(e) => handleStorageTypeChange(e.target.value)}
                />
                <div className="storage-info">
                  <h3>Http Only 쿠키 방식</h3>
                  <p>서버에서 관리 (프로덕션 용)</p>
                  <ul>
                    <li>XSS 공격 방어</li>
                    <li>Javascript 접근 불가</li>
                    <li>자동으로 요청에 포함</li>
                  </ul>
                </div>
              </label>
            </div>
          </section>
        )}

        {/* 로그인 섹션 */}

        {!isLoggedIn ? (
          <section className="login-section">
            <h2> 1단계 :로그인 </h2>
            <p className="explanation">
              사용자 이름과 비밀번호를 입력하고 요청하면 서버에서 JWT토큰을
              발급받습니다.
              {storageType === "cookie" && (
                <span className="highlight">
                  현재 선택된 방식 : HttpOnly 쿠키 방식
                </span>
              )}
            </p>
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label>사용자 이름 : </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="student1 또는 teacher"
                  required
                ></input>
              </div>
              <div className="form-group">
                <label>비밀 번호 : </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password123 또는 teacher123"
                  required
                ></input>
              </div>
              <button type="submit" className="btn btn-primary">
                로그인
              </button>
            </form>
            <div className="test-accounts">
              <h3>테스트 계정 :</h3>
              <ul>
                <li>학생 : student1 / password123</li>
                <li>교사 : teacher / teacher123</li>
              </ul>
            </div>
          </section>
        ) : (
          <section className="authenticated-section">
            <div className="user-info">
              <h2>인증완료</h2>
              <p>환영합니다. {user?.username} 님!</p>
              <p>역할 : {user?.role}</p>
              <button onClick={handleLogout} className="btn btn-secondary">
                로그아웃
              </button>
            </div>

            {/* 토큰 정보 표시 */}
            <div className="token-section">
              <h3>JWT 토큰 정보</h3>
              {storageType === "localStorage" ? (
                <>
                  <button
                    onClick={() => showTokenInfo()}
                    className="btn btn-info"
                  >
                    토큰 내용 확인
                  </button>
                  {tokenInfo && (
                    <div className="token-display">
                      <div className="token-part">
                        <h4>헤더</h4>
                        <pre> {JSON.stringify(tokenInfo.header, null, 2)}</pre>
                        <p className="token-explanation">
                          알고리즘 정보가 포함되어 있습니다.
                        </p>
                      </div>
                      <div className="token-part">
                        <h4>페이로드</h4>
                        <pre>{JSON.stringify(tokenInfo.payload, null, 2)}</pre>
                        <p className="token-explanation">
                          사용자 정보, 발급 시간, 만료 시간이 포함되어 있습니다.
                        </p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="cookie-info">
                  <p>쿠키 방식에서는 Javascript로 접근할 수 없습니다.</p>
                  <p>이것이 XSS 방어하는 핵심 매커니즘입니다.</p>
                  <p className="tip">
                    개발자 도구의 애플리케이션 - 쿠키 에서 확인할 수 있습니다.
                  </p>
                </div>
              )}
            </div>

            {/* API 테스트 섹션 */}
            <div className="api-section">
              <h3>API 테스트</h3>
              <div className="api-buttons">
                <button onClick={handleGetProfile} className="btn btn-primary">
                  프로필 조회
                </button>
                <button onClick={handleGetAdmin} className="btn btn-primary">
                  관리자 페이지 접근
                </button>
                <button
                  onClick={handleRefreshToken}
                  className="btn btn-primary"
                >
                  토큰 갱신
                </button>
              </div>

              {profileData && (
                <div className="api-result">
                  <h4>프로필 데이터</h4>
                  <pre>{JSON.stringify(profileData, null, 2)}</pre>
                </div>
              )}

              {adminData && (
                <div className="api-result">
                  <h4>관리자 데이터</h4>
                  <pre>{JSON.stringify(adminData, null, 2)}</pre>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 메시지 표시 */}
        {message && (
          <div
            className={`message ${
              message.includes("성공") ? "success" : "error"
            }`}
          >
            {message}
          </div>
        )}

        <div className="tip-item">
          <h3>프로덕션 체크리스트</h3>
          <div className="tip-detail">
            <ul>
              <li>HttpOnly 쿠키 사용</li>
              <li>HTTPS 사용 (Secure 적용하자)</li>
              <li>SamSite 속성 설정(CSRF 방어)</li>
              <li>토큰 만료 시간 적절히 설정</li>
              <li>민감한 정보는 토큰에 포함하지 않기</li>
              <li>CORS 정책 적절히 설정</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
