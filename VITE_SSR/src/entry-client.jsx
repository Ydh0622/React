import "./index.css";
import { StrictMode } from "react";
// React 18부터 클라이언트에서 서버 렌더링된 콘텐츠를 처리하기 위해 "hydrateRoot"를 사용합니다.
import { hydrateRoot } from "react-dom/client";
import App from "./App";

// ===
// SSR에서 가장 중요한 부분 : hydrateRoot 함수
// ===

// hydrateRoot 함수를 호출합니다.
// 이 함수는 'createRoot' 대신 사용되며, SSR환경에서 특별한 역할(유저 상호작용)을 합니다.
hydrateRoot(
  // 첫 번째 인자 : 서버에서 렌더링된 HTML이 들어있는 최상위 DOM 요소 (일반적으로 <div id="root"></div>)
  // hydrateRoot는 이 DOM 요소와 그 자식들을 완전히 제거하고 새로 렌더링하는 대신,
  // 이미 존재하는 서버 렌더링된 HTML 마크업을 유지하고,
  // 거기에 이벤트 리스너 등의 React의 기능을 '연결(attach)'하여 애플리케이션을 '활성화(hydrate)'시킵니다.

  document.getElementById("root"),
  // 두 번째 인자 : 클라이언트 측에서 렌더링할 React 엘리먼트 (최상위 컴포넌트)
  <StrictMode>
    <App />
  </StrictMode>
);

// 이 과정이 성공적으로 완료되면, 이제 사용자는 정적인 HTML이 아닌
// 상호작용이 가능한 완전 React 애플리케이션을 경험하게 됩니다.
