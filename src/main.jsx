import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./style.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import ScreenGuard from "./components/ScreenGuard";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ScreenGuard>
          <App />
        </ScreenGuard>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
