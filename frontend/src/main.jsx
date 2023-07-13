import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App.jsx";
import "./index.css";
import "@babel/polyfill";
import { ToastContainer, ToastContainer as tc } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer />
    <App />
  </React.StrictMode>
);
