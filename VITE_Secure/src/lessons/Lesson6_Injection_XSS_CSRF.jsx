import React, { useState } from "react";

const Lesson6_Injection_XSS_CSRF = () => {
  // SQL Injection , XSS , CSRF 각 상황에 필요한 상태 관리를 만듦
  // SQL Injection 상태관리
  const [sqlInput, setSqlInput] = useState("' OR '1'='1");
  const [sqlResult, setSqlResult] = useState("");
  const [sqlSafeResult, setSqlSafeResult] = useState("");

  // XSS 상태관리
  const [xssInput, setXssInput] = useState('<script>alert("XSS!")</script>');
  const [xssResult, setXssResult] = useState("");
  const [xssSafe, setXssSafe] = useState("");

  // CSRF
  const [csrfToken, setCsrfToken] = useState("");
  const [csrfResult, setCsrfResult] = useState("");

  // --- SQL Injection 시뮬레이션 ---
  // SQL Injection 공격이 성공한 경우 -> 보안 실패
  const testSQLInjection = () => {
    // 취약한 쿼리 (실제로는 금지)
    const vulnerableQuery = `SELECT * FROM users WHERE username = '${sqlInput}' AND password = '...'`;

    if (sqlInput.includes("' OR '1'='1") || sqlInput.includes("' OR 1=1")) {
      setSqlResult(
        `SQL Injection 성공 실행된 쿼리 : ${vulnerableQuery} 결과 :  모든 사용자 정보가 노출되었습니다!`
      );
    } else {
      setSqlResult(`안전한 쿼리! 실행된 쿼리 : ${vulnerableQuery}`);
    }
    setSqlSafeResult("");
  };

  // SQL Injection 방어 예시 -> 보안 성공
  const testSQLInjectionSafe = () => {
    const preparedQuery =
      "SELECT * FROM users WHERE username = ? AND password = ?";
    const boundParams = [sqlInput, "사용자가 입력한 비밀번호"];

    setSqlSafeResult(
      `준비된 쿼리 적용! ${preparedQuery} 바인딩 된 값 ${JSON.stringify(
        boundParams,
        null,
        2
      )} 
        \n 결과 : 입력값이 이스케이프되어 Injection 공격이 차단됩니다. `
    );
  };

  // XSS 공격 시뮬레이션
  const testXSS = () => {
    if (xssSafe) {
      // 안전한 방법 : HTML 이스케이프 g -> global (전부 다 바꿔라)
      const safeText = xssInput
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;");

      setXssResult(`안전하게 처리됨 (이스케이프) : ${safeText}`);
    } else {
      // 취약한 방법 : 직접 렌더링
      setXssResult(
        `XSS 공격 가능! 입력된 내용의 기능이 그대로 실행됩니다. ${xssInput}`
      );
    }
  };

  // CSRF 공격 시뮬레이션 - 토큰을 먼저 생성
  const generateCSRFToken = () => {
    const token =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    setCsrfToken(token);
    setCsrfResult(
      "CSRF 토큰이 생성되었습니다. 이 토큰을 요청과 함께 보내야 합니다."
    );
  };

  const testCSRF = (withToken) => {
    if (withToken && csrfToken) {
      setCsrfResult("CSRF 토큰이 검증되었습니다. 요청이 처리됩니다.");
    } else {
      setCsrfResult("CSRF 공격 차단! 토큰이 없거나 유효하지 않습니다.");
    }
  };

  return (
    <div>
      <div className="lesson-section">
        <h2>6. SQL Injection , XSS , CSRF</h2>

        <div className="info-box">
          <strong>학습 목표</strong>
          <ul style={{ textAlign: "left", marginTop: "10px" }}>
            <li>SQL Injection 공격 원리와 방어 방법</li>
            <li>XSS 의 공격 원리와 방어 방법</li>
            <li>CSRF 의 공격 원리와 방어 방법</li>
          </ul>
        </div>

        {/* SQL Injection */}
        <h3> SQL Injection</h3>
        <p>
          {" "}
          SQL Injection은 악의적인 SQL 코드를 입력하여 데이터베이스를 조작하는
          공격입니다.
        </p>

        <div className="input-group">
          <label>SQL Injection 테스트 입력 </label>
          <input
            type="text"
            value={sqlInput}
            onChange={(e) => setSqlInput(e.target.value)}
            placeholder="' OR '1'=1"
          ></input>
        </div>

        <div className="button-group">
          <button onClick={testSQLInjection}>
            SQL Injection 취약점 테스트
          </button>
          <button onClick={testSQLInjectionSafe}>
            SQL Injection 보안 테스트
          </button>
        </div>

        {sqlResult && (
          <div
            className={`result-box ${
              sqlResult.includes("성공") ? "error" : "success"
            }`}
          >
            <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{sqlResult}</pre>
          </div>
        )}

        {sqlSafeResult && (
          <div className="result-box success">
            <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
              {" "}
              {sqlSafeResult}
            </pre>
          </div>
        )}

        <div className="warning-box">
          <strong>방어 방법</strong>
          <ul style={{ textAlign: "left", marginTop: "10px" }}>
            <li>Prepared Statement 또는 Parameterized Query 사용</li>
            <li>입력값 검증 및 화이트리스트 적용</li>
            <li>최소 권한 원칙 (DB 계정에 최소한의 권한만 부여)</li>
            <li>에러 메시지에 민감한 정보 노출 금지</li>
          </ul>
        </div>

        {/* XSS */}
        <h3> XSS (Cross-Site-Scripting)</h3>
        <p>
          {" "}
          XSS 악의적인 스크립트를 웹 페이지에 삽입하여 사용자의 브라우저에서
          실행하는 공격입니다.
        </p>

        <div className="input-group">
          <label> XSS 테스트 입력</label>
          <input
            type="text"
            value={xssInput}
            onChange={(e) => setXssInput(e.target.value)}
            placeholder="<script>('XSS')</script>"
          ></input>
        </div>

        <div className="button-group">
          <button
            onClick={() => {
              setXssSafe(false);
              testXSS();
            }}
          >
            취약한 렌더링 테스트
          </button>
          <button
            onClick={() => {
              setXssSafe(true);
              testXSS();
            }}
          >
            안전한 렌더링 테스트
          </button>
        </div>

        {xssResult && (
          <div
            className={`result-box ${
              xssResult.includes("공격") ? "error" : "success"
            }`}
          >
            <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{xssResult}</pre>
          </div>
        )}

        <div className="warning-box">
          <strong>방어 방법:</strong>
          <ul style={{ textAlign: "left", marginTop: "10px" }}>
            <li>모든 사용자 입력을 HTML 이스케이프로 처리</li>
            <li>
              React, Vue 등 특정 프레임워크, 라이브러리는 기본적으로 XSS 방어
              기능 제공
            </li>
            <li>innerHTML 대신 textContent 사용</li>
          </ul>
        </div>

        {/* CSRF */}
        <h3>CSRF (Cross-Site Request Forgery)</h3>
        <p>
          CSRF 는 사용자가 의도하지 않은 요청을 강제로 실행하게 만드는
          공격입니다.
        </p>

        <div className="button-group">
          <button onClick={generateCSRFToken}>CSRF 토큰 생성</button>
          <button onClick={() => testCSRF(false)}>
            CSRF 토큰 없이 요청 (공격 시뮬레이션)
          </button>
          <button onClick={() => testCSRF(true)}>
            CSRF 토큰과 함께 요청 (안전한 요청)
          </button>
        </div>

        {csrfToken && (
          <div className="result-box" style={{ marginTop: "10px" }}>
            <strong>생성된 토큰 : {csrfToken}</strong>
          </div>
        )}

        {csrfToken && (
          <div
            className={`result-box ${
              csrfResult.includes("차단") ? "error" : "success"
            }`}
          >
            <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
              {csrfResult}
            </pre>
          </div>
        )}

        <div className="warning-box">
          <strong>방어 방법:</strong>
          <ul style={{ textAlign: "left", marginTop: "10px" }}>
            <li>CSRF 토큰 (임의로 만들거나, JWT 토큰 등을 가져와 사용) 적용</li>
            <li>SameSite 쿠키 속성 설정</li>
            <li>중요한 작업(민감한 작업)에 재인증 요구</li>
          </ul>
        </div>

        {/* 인증 및 세션 관리 */}
        <h3> 인증 및 세션 관리</h3>
        <div className="info-box">
          <strong>보안 모범 사례:</strong>
          <ul style={{ textAlign: "left", marginTop: "10px" }}>
            <li>
              비밀번호 : bcrypt , Argon2 등 강력한 해시 알고리즘 사용, 솔트(반복
              횟수) 추가
            </li>
            <li>
              세션 : 안전한 세션 ID 생성, 적절한 만료 시간 설정, HTTPS 사용
            </li>
            <li>
              토큰 : JWT 사용 시 서명 검증, 짧은 만료 시간, Refresh Token 분리
            </li>
            <li>다단계 인증 : 2FA/MFA 구현으로 보안 강화</li>
            <li>계정 잠금 : 무차별 대입 공격 방지를 위한 계정 잠금 기능</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Lesson6_Injection_XSS_CSRF;
