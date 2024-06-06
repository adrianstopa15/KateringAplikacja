import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from './AuthContext';
import { AlertModalProvider } from "./modalbutton/AlertModalContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AlertModalProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
    </AlertModalProvider>
  </React.StrictMode>
);
