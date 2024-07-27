import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Popular from "./components/Popular";
import SearchRecipe from "./components/SeacrhRecipe";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Header />
    <Popular />
    <SearchRecipe />
  </React.StrictMode>
);
