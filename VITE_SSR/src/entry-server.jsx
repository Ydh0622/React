import { StrictMode } from "react";
// 서버에서 React 컴포넌트를 스트림 가능한 형태로 HTML로 렌더링하는 함수입니다.
// React 18의 SSR 스트리밍을 위한 핵심 API입니다.
import { renderToPipeableStream } from "react-dom/server";
import App from "./App";

/*
서버에서 호출될 렌더링 함수를 정의합니다.
@param {srting} _url - 요청 URL (일반적인 SSR 함수 시그니처입니다.)
@param {import('react-dom/server).RenderToPipeableStreamOption} {options} 
- 스트림 옵션 (예 :onAllReady, onShellReady 등 콜백 포함)

*/

export function render(_url, options) {
  // renderToPipeableStream 함수를 반환합니다. 이 함수가 실제 스트리밍을 시작합니다.
  return renderToPipeableStream(
    //렌더링할 React 엘리먼트
    <StrictMode>
      <App />
      {/* 커스텀 엘리먼트 추가 : Vite 와 통합을 위한 핵심 해결책
        React의 스트리밍이 주 콘텐츠(APP) 렌더링을 마쳤음 감지하기 위한 역할 `마커(Marker)'역할.

*/}
      <vite-streaming-end></vite-streaming-end>
    </StrictMode>,
    // 렌더링 옵션 (콜백 함수 등을 포함할 수 있습니다.)
    options
  );
}
