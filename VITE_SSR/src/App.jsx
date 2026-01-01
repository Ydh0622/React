// import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg"; // ㄷ
import "./App.css";
// Suspense 와 lazy 를 가져옵니다. 이들은 컴포넌트를 지연 로딩{Lazy Loading}하는 데 사용
import { Suspense, lazy } from "react";

//1 .lazy 함수를 사용하여 Card 컴포넌트를 비동기적(지연하여)으로  로드하도록 설정합니다.
// 이렇게 하면 Card 컴포넌트의 코드가 초기 JavaScript 번들에서 분리되어 별도의 파일로 로드됩니다 (코드 분할 split)
const Card = lazy(() => import("./Card"));

function App() {
  return (
    <main>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + asdkjfhasdfkljhReact</h1>

      {/* 2. Suspense 컴포넌트는 lazy로 로드되는 컴포넌트(Card)를 감싸줍니다. */}
      {/* Card 컴포넌트가 로드되는 동안 사용자에게 보여줄 'fallback' UI를 정의합니다. */}
      <Suspense fallback={<p>Loading card component</p>}>
        <Card />
      </Suspense>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </main>
  );
}

export default App;
