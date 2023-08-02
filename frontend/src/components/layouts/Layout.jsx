import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";

const Layout = ({ children, isMobile }) => (
  <Flex direction="column" minHeight="100vh">
    <Header isMobile={isMobile} />
    <Box flex="1" d="flex" justifyContent="center" alignItems="center">
      {children}
    </Box>
    <Footer isMobile={isMobile} />
  </Flex>
);

export default Layout;
