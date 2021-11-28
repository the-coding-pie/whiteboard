import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ColorContextProvider from "./contexts/ColorContext";

ReactDOM.render(
  <ColorContextProvider>
    <App />
  </ColorContextProvider>,
  document.getElementById("root")
);
