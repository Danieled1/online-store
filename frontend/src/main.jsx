import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme.jsx";
import { ResponsiveProvider } from "./contexts/ResponsiveContext.jsx";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <ChakraProvider theme={theme}>
      <ResponsiveProvider>
        <App />
      </ResponsiveProvider>
    </ChakraProvider>
  </HelmetProvider>
);
