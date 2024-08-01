import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Account from "./components/Account";
import App from "./App";
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/account", element: <Account /> },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
