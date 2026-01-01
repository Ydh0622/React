import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./modules/index.jsx";
import { Provider } from "react-redux";
// import loggerMiddleware from "./lib/loggerMiddleware.jsx";
import { createLogger } from "redux-logger";
import { thunk } from "redux-thunk";

const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(logger, thunk));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
