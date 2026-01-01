import React, { useState } from "react";

const Lesson2_XHR_Fetch = () => {
  const [xhrResult, setXhrResult] = useState("");
  const [fetchResult, setFetchResult] = useState("");
  const [promiseResult, setPromiseResult] = useState("");

  // 1 . XMLHttpRequest 예제
  // 과거 이전에 쓰이던 방식
  const testXMLHttpRequest = () => {
    setXhrResult("요청 중...");

    // xhr 객체 생성
    const xhr = new XMLHttpRequest();
    // xhr open (메소드, URL , 동기 or 비동기)
    // 세 번쨰 인자를 true로 주면 비동기(기본값) , false 면 동기로 작동합니다.
    xhr.open("GET", "https://api.github.com/users/octocat");

    // xhr 응답 대기
    // 서버로부터 응답이 왔을 때 처리 -> 서버까지는 도달
    xhr.onload = function () {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        setXhrResult(`성공! ${JSON.stringify(data, null, 2)}`);
      } else {
        setXhrResult(`실패! ${xhr.status} ${xhr.statusText}`);
      }
    };

    // 네트워크 에러  -> 서버까지 도달하지 못함.
    xhr.onerror = function () {
      setXhrResult("네트워크 에러 발생");
    };

    // xhr send 위에서 만든 거 요청 전송
    xhr.send();
  };

  // 2 . Fetch API 예제 (async/await) 사용
  // 최근에 쓰이는 방식

  const testFetchAPI = async () => {
    setFetchResult("요청 중...");

    try {
      // fetch 함수 호출 (기본은 GET 요청)
      // await 키워드를 써서 비동기 응답을 기다립니다.
      const response = await fetch("https://api.github.com/users/octocat");

      // http 에러 체크
      // fetch 는 404 or 500 에러가 나도 catch 로 빠지지 않습니다.
      // response.ok 가 true인지 확인해서 수동으로 에러를 던져야 합니다.
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // json 변환
      // .json() 또한 Promise를 반환하므로 await가 필요합니다.
      // xhr 과는 달리 내부에서 자동으로 parse 해줍니다.
      const data = await response.json();
      setFetchResult(`성공!  ${JSON.stringify(data, null, 2)}`);
    } catch (err) {
      setFetchResult(`err ${err.message}`);
    }
  };

  // 3 . Promise 체이닝 예제
  // async/ await 가 나오기 전에 쓰이던 .then() 방식입니다.
  // 흐름을 보기 좋다

  const testPromiseChaining = () => {
    setPromiseResult("요청 중...");

    fetch("https://api.github.com/users/octocat")
      .then((response) => {
        // 첫 번째 .then: 응답 객체(response)를 받음
        if (!response.ok) {
          throw new Error("네트워크 에러");
        }
        // 다음 .then으로 JSON 파싱된 Promise 를 넘김
        return response.json();
      })
      .then((data) => {
        // 두 번째 .then : 실제 데이터(Data)를 받음
        setPromiseResult(
          `성공! 이름 : ${data.login}, ID : ${data.id} data : ${data}`
        );
      })
      .catch((err) => {
        // 체인 중 (.then 과정 중) 어디서든 에러가 나면 수행됨
        setPromiseResult(`에러! ${err.message}`);
      });
  };

  return (
    <div>
      <div className="lesson-section">
        <h2> 2. XMLHttprequest 및 Fetch API 활용</h2>

        <div className="info-box">
          <strong>학습 목표 </strong>
          <ul style={{ textAlign: "left", marginTop: "10px" }}>
            <li>XMLHttpRequest (XHR) 의 기본 사용법</li>
            <li>Fetch API의 사용법과 장점</li>
            <li>Promise 와 async/await를 이용한 비동기 처리</li>
            <li>Ajax를 이용한 비동기 통신</li>
          </ul>
        </div>

        {/* XHR  */}
        <h3> XMRHttpRequest (XHR)</h3>
        <p>
          XHR은 브라우저에서 서버와 비동기적으로 데이터를 교환할 수 있게 해주는
          전통적인 방법입니다.
        </p>

        <div className="button-group">
          <button onClick={testXMLHttpRequest}>XMLHttpRequest 테스트</button>
        </div>

        {xhrResult && (
          <div
            className={`result-box ${
              xhrResult.includes("성공") ? "success" : "error"
            }`}
          >
            <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{xhrResult}</pre>
          </div>
        )}

        {/* Fetch API  */}
        <h3> Fetch API</h3>
        <p>
          {" "}
          Fetch API는 XMLHttpRequest 의 현대적인 대안으로, Promise 기반이며 더
          간결하고 사용하기 쉬운 API를 제공합니다.
        </p>

        <div className="button-group">
          <button onClick={testFetchAPI}>Fetch API 테스트 (async/await)</button>
        </div>

        {fetchResult && (
          <div
            className={`result-box ${
              fetchResult.includes("성공") ? "success" : "error"
            }`}
          >
            <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
              {fetchResult}
            </pre>
          </div>
        )}

        {/* Promise Chaining */}
        <h3> Promise 체이닝</h3>
        <p>
          Promise는 비동기 작업의 결과를 나타내는 객체입니다. .then()과 .catch를
          사용하여 체이닝할 수 있습니다. 데이터의 흐름을 보기에 수월합니다.
        </p>

        <div className="button-group">
          <button onClick={testPromiseChaining}>Promise 체이닝 테스트</button>
        </div>

        {promiseResult && (
          <div
            className={`result-box ${
              promiseResult.includes("성공") ? "success" : "error"
            }`}
          >
            <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
              {promiseResult}
            </pre>
          </div>
        )}

        <div className="warning-box">
          <ul style={{ textAlign: "left", marginTop: "10px" }}>
            <li>
              Fetch API : Promise 기반, 더 간결한 문법, 모던 브라우저 지원
            </li>
            <li>
              XHR : 전통적인 방법, 진행률 추적 등 부가기능 수행 가능, 레거시
              브라우저 지원
            </li>
            <li>대부분의 경우 Fetch API 를 사용하는 것을 권장합니다.</li>
            <li>Promise 체이닝 방식의 경우 데이터 흐름을 보기에 수월하다</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Lesson2_XHR_Fetch;
