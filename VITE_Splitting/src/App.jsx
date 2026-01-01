import viteLogo from "/vite.svg";
import "./App.css";
import React from "react";
// import notify from "./notify";
import { useState, Suspense } from "react";
import loadable from "@loadable/component";

// const SplitMe = React.lazy(() => import("./SplitMe"));
const SplitMe = loadable(() =>
  import("./SplitMe", {
    fallback: <div>loading...</div>,
  })
);

const App = () => {
  const [visible, setVisible] = useState(false);
  // const onClick = () => {
  //   import("./notify").then((result) => result.default());
  // };

  const onClick = () => {
    setVisible(true);
  };

  const onMouseOver = () => {
    SplitMe.preload();
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={viteLogo} className="App-logo" alt="logo"></img>
        <p onClick={onClick} onMouseOver={onMouseOver}>
          Hello React!
        </p>

        {visible && <SplitMe />}
      </header>
    </div>
  );
};

export default App;
