import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

const Section = ({children}) => {
  return (
    <Box
      my={{ base: 6, md: 8, xl: 10 }} // Adjust margin based on breakpoints
      p={{ base: 6, md: 8, xl: 10 }} // Adjust padding based on breakpoints
      borderBottomWidth='2px'
      bg={useColorModeValue("gray.50", "gray.800")}
      borderRadius='lg'
      boxShadow='
      rgba(0, 0, 0, 0.07) 0px 1px 1px,
      rgba(0, 0, 0, 0.07) 0px 2px 2px,
      rgba(0, 0, 0, 0.07) 0px 4px 4px,
      rgba(0, 0, 0, 0.07) 0px 8px 8px,
      rgba(0, 0, 0, 0.07) 0px 16px 16px'
    >
      {children}
    </Box>
  );
};

export default Section;
