import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { sendToVercelAnalytics } from "./vitals";
import "./variables.css";
import { Provider } from "react-redux";
import { store } from "./store"; // Make sure you import the Redux store

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// reportWebVitals(sendToVercelAnalytics);
