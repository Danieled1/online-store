import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { ResponsiveProvider } from "./contexts/ResponsiveContext";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <ChakraProvider theme={theme}>
      <ResponsiveProvider>
        <Router>
          <App />
        </Router>
      </ResponsiveProvider>
    </ChakraProvider>
  </HelmetProvider>
);
