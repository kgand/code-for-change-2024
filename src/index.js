import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { FilterProvider } from "./FilterContext";

ReactDOM.render(
  <AuthProvider>
    <FilterProvider>
    <App />
    </FilterProvider>
  </AuthProvider>,

document.getElementById("root")
);