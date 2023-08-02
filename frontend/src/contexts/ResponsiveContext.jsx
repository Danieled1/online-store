import { useBreakpointValue } from "@chakra-ui/react";
import React, { createContext, useContext, useState, useEffect } from "react";

const ResponsiveContext = createContext();

export const ResponsiveProvider = ({ children }) => {
  const isMobile = useBreakpointValue({
    base: true,
    sm: true,
    md: true,
    lg: true,
    xl: false,
  });
  return (
    <ResponsiveContext.Provider value={{ isMobile }}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export const useResponsiveContext = () => useContext(ResponsiveContext);
