import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Popular from "./components/Popular";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Header />
    <Popular />
  </React.StrictMode>
);
