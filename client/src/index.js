import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AppContextProvider from "./components/context/AppContext";
import { AuthContextProvider } from "./components/context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <div>
    <AuthContextProvider>
    <AppContextProvider>
        <App />
      </AppContextProvider>
    </AuthContextProvider>
      
  </div>
);
