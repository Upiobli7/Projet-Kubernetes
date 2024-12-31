import React from "react";
import ReactDOM from "react-dom/client"; // pour React 18 et plus récent
import App from "./App";
import "./index.css"; 

// Créez un root et montez l'application
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
