import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createStore } from "redux";
import rootReducer from "./modules/index.jsx";
import { Provider } from "react-redux";
import { devToolsEnhancer } from "@redux-devtools/extension";

const store = createStore(rootReducer, devToolsEnhancer());

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
