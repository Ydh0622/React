import React, { useState } from "react";

const Lesson1_CORS = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // CORS 에러를 시뮬레이션하기 위한 다른 도메인 API 호출
  const testCORS = async () => {
    setLoading(true);
    setResult("요청 중...");

    try {
      // 실제로는 CORS 에러가 발생할 수 있는 외부 API
      const response = await fetch("https://api.github.com/users/octocat");
      const data = await response.json();
      setResult(`성공! 응답 데이터 ${JSON.stringify(data, null, 2)}`);
    } catch (err) {
      setResult(`에러 발생!! ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 같은 출처 요청 사례
  const testSameOrigin = async () => {
    setLoading(true);
    setResult("요청 중...");

    try {
      // 같은 출처 요청 (성공)
      const response = await fetch("/vite.svg");
      if (response.ok) {
        setResult("같은 출처 요청 성공");
      }
    } catch (err) {
      setResult("err", err);
    } finally {
      setLoading(false);
    }
  };

  // CORS 실패 사례 시뮬레이션
  const testCORSFailure = async () => {
    setLoading(true);
    setResult("요청 중...");

    try {
      // 다른 포트 (localhost:3000)에서 실행 중인 서버에 요청
      // 서버가 CORS 헤더를 설정하지 않으면 에러 발생
      const response = await fetch("http://localhost:3000/api/data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setResult(`요청 성공 ${JSON.stringify(data, null, 2)}`);
      }
    } catch (err) {
      setResult(`에러 발생 ${err}`);
    } finally {
      setLoading(false);
    }
  };

  // CORS 허용 서버 테스트
  const testCORSAllowed = async () => {
    setLoading(true);
    setResult("요청 중...");

    try {
      // CORS 헤더를 설정한 서버에 요청
      const response = await fetch("http://localhost:3000/api/data-cors", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setResult(`CORS 허용 서버 요청 성공 ${JSON.stringify(data, null, 2)}`);
      }
    } catch (err) {
      setResult(`에러 발생`, err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="lesson-section">
        <h2>1. CORS (Cross-Origin Resource Sharing) 기본 개념</h2>

        <div className="info-box">
          <strong>학습 목표</strong>
          <ul style={{ textAlign: "left", marginTop: "10px" }}>
            <li>CORS의 기본 개념 이해</li>
            <li>Same - Origin Policy 동일 출처 정책 이해</li>
            <li>Cross-Origin 요청의 제한과 해결</li>
          </ul>
        </div>

        <h3>CORS란?</h3>
        <p>
          CORS는 Cross-origin- Resource Sharing의 약자로, 브라우저가 한
          출처(origin)에서 실행 중인 웹 애플리케이션이 다른 출처의 리소스에
          접근할 수 있도록 허용하는 매커니즘입니다.
        </p>

        <h3>동일 출처 정책</h3>
        <p>
          브라우저는 보안을 위해 Same - Origin Policy 를 적용합니다. 두 url이
          다음 세 가지가 모두 같아야 같은 출처로 간주됩니다.
        </p>
        <ul style={{ textAlign: "left" }}>
          <li>프로토콜 : (http or https)</li>
          <li>도메인 : (naver.com, google.com)</li>
          <li>포트 : (3000 or 5173)</li>
        </ul>

        <h3> 실습 : CORS 테스트</h3>
        <div className="button-group">
          <button onClick={testCORS} disabled={loading}>
            다른 출처 요청 테스트 (GitHub API - CORS 허용)
          </button>
          <button onClick={testSameOrigin} disabled={loading}>
            같은 출처 요청 테스트
          </button>
          <button onClick={testCORSFailure} disabled={loading}>
            다른 포트 서버 요청 (CORS 실패)
          </button>
          <button onClick={testCORSAllowed} disabled={loading}>
            CORS 허용 서버 요청
          </button>
        </div>

        {result && (
          <div
            className={`result-box ${
              result.includes("성공")
                ? "success"
                : result.includes("에러")
                ? "error"
                : ""
            }`}
          >
            <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{result}</pre>
          </div>
        )}
        <div className="warning-box">
          <strong>주의사항!</strong>
          <ul style={{ textAlign: "left", marginTop: "10px" }}>
            <li>
              CORS는 브라우저의 보안 정책입니다. 서버 간 통신에는 적용되지
              않습니다.
            </li>
            <li>
              서버에서 적절한 CORS 헤더를 설정해야 다른 출처에서의 요청을 허용할
              수 있습니다.
            </li>
            <li>
              개발 환경에서는 프록시를 사용하여 CORS 문제를 우회할 수 있습니다.
            </li>
            <li>
              CORS 에러를 확인하려면 브라우저 개발자 도구의 콘솔 or 네트워크
              탭을 확인하세요
            </li>
            <li>
              서버를 실행한 후 CORS동작을 실행하면 됩니다. IDE 서버 수정이
              있을시 서버를 재시작 해야합니다.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Lesson1_CORS;
