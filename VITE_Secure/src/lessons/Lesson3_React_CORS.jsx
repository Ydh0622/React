import React, { useState, useEffect } from "react";

const Lesson3_React_CORS = () => {
  // 상태 관리 : 비동기 통신 시 보통 3가지 상태 (데이터, 에러, 로딩)를 함께 관리합니다.
  const [data, setData] = useState(null); // 응답을 성공적으로 받아 온 데이터
  const [error, setError] = useState(null); // 응답이 실패했을 때의 에러 메시지
  const [loading, setLoading] = useState(false); // 로딩 중인지 여부 -> UI 처리

  // 사용자가 입력할 수 있는 URL ( 여기서는 기본값을 깃허브 API로 사용하겠다)
  const [customURL, setCustomURL] = useState(
    "https://api.github.com/users/octocat"
  );

  // GET 요청 함수 -> async / await

  const fetchData = async () => {
    // 요청 시작 전 상태 초기화 (로딩 시작, 기존 데이터/에러 지우기)
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(customURL);

      // fetch 는 404/500 에러도 catch로 가지 않으므로 수동 체크 필수
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData = await response.json();
      setData(jsonData); // 성공 시 데이터 상태 업데이트
    } catch (err) {
      setError(err.message); // 실패 시 에러 상태 업데이트
    } finally {
      // 성공하든 실패하든 로딩 상태는 끝내야 함
      setLoading(false);
    }
  };

  // useEffect
  useEffect(() => {
    fetchData();
  }, []);

  // POST 요청 함수 -> 데이터를 서버로 보낼 때 사용합니다.
  const sendPostRequest = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST", // 기본값은 GET 이므로 POST 명시
          headers: {
            // 서버에게 내가 보내는 데이터는 json이다라고 통보하는 뱃지
            "Content-Type": "application/json",
          },
          // 자바스크립트 객체를 json 문자열로 변환해서 전송
          body: JSON.stringify({
            title: "React CORS  테스트",
            body: "이것은 React에서 보내는 POST 요청입니다.",
            userId: 1,
          }),
        }
      );

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="lesson-section">
        <h2>3. React 프레임워크에서의 CORS 처리</h2>

        <div className="info-box">
          <strong>학습 목표</strong>
          <ul style={{ textAlign: "left", marginTop: "10px" }}>
            <li>React에서의 API 호출하는 방법</li>
            <li>useEffect를 이용한 데이터 로딩</li>
            <li>React에서의 CORS 문제 해결 방법</li>
            <li>Vite 프록시 설정을 통한 CORS 우회</li>
          </ul>
        </div>

        <h3>React에서의 API 호출하기</h3>
        <p>
          React에서는 주로 Fetch API 나 axios를 사용하여 API를 호출합니다 .
          useEffect 훅을 사용하여 컴포넌트가 마운트 될 때 데이터를 가져올 수
          있습니다.
        </p>

        <h3>실습 : GET 요청</h3>
        <div className="input-group">
          <label>API URL :</label>{" "}
          <input
            type="text"
            value={customURL}
            onChange={(e) => setCustomURL(e.target.value)}
            placeholder="https://api.github.com/user/octocat"
          ></input>
        </div>

        <div className="button-group">
          <button onClick={fetchData} disabled={loading}>
            {loading ? "로딩 중..." : "데이터 가져오기"}
          </button>
          <button onClick={sendPostRequest} disabled={loading}>
            POST 요청 보내기
          </button>
        </div>

        {/* 결과 영역 */}
        {loading && (
          <div className="result-box">
            <p>요청 중...</p>
          </div>
        )}

        {error && (
          <div className="result-box error">
            <strong>에러 발생!</strong>
            <pre style={{ whiteSpace: "pre-wrap", marginTop: "10px" }}>
              {error}
            </pre>
            <p style={{ marginTop: "10px", fontSize: "14px" }}>
              CORS 에러가 발생했다면, vite.config.js에서 프록시를 설정하거나
              서버에서 CORS 헤더를 설정해야 합니다.
            </p>
          </div>
        )}

        {/* 에러도 아니고 로딩도 끝났을 때 데이터 표시 */}
        {data && !loading && (
          <div className="result-box success">
            <strong>응답 데이터!</strong>
            <pre style={{ whiteSpace: "pre-wrap", marginTop: "10px" }}>
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}

        {/* vite proxy  */}
        <h3> Vite에서 CORS 문제 해결하기 (개발 환경용)</h3>
        <p>
          프론트엔드 서버 (localhost)가 백엔드 대신 요청을 보내주는
          중계소(proxy) 역할을 하여 CORS 정책을 우회하는 방법입니다.
        </p>

        <div className="code-example">
          <div> // vite.config.js 설정 파일</div>
          <div> export default</div>
          <div>server : </div>
          <div>proxy : </div>
          <div>
            // '/api'로 시작하는 요청이 오면 target 주소로 대신 요청을 보냄
          </div>
          <div> '/api' : </div>
          <div> target : 'http://localhost:3000',</div>
          <div> changeOrigin: true,</div>
          <div> rewrite : (path) = path.replace(/^\/api/, '')</div>
        </div>

        <div className="warning-box">
          <strong>주의사항!</strong>
          <ul style={{ textAlign: "left", marginTop: "10px" }}>
            <li>프록시는 개발 환경(npm run dev)에서만 작동합니다.</li>
            <li>
              실제 배포 (production) 환경에서는 백엔드 서버에서 CORS헤더
              (Access-Control-Allow-Origin)를 열어줘야 합니다.{" "}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Lesson3_React_CORS;
