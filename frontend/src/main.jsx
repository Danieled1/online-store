import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { ResponsiveProvider } from "./contexts/ResponsiveContext";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <ResponsiveProvider>
          <Router>
            <App />
          </Router>
        </ResponsiveProvider>
      </AuthProvider>
    </ChakraProvider>
    <ToastContainer />
  </HelmetProvider>
);
