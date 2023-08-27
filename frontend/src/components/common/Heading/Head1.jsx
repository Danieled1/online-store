import { Heading } from "@chakra-ui/react";
import React from "react";

const Head1 = ({ children }) => {
  return (
    <Heading
      as='h1'
      fontSize={{ sm: "3xl", md: "4xl", lg: "7xl", xl: "7xl" }}
      color='white'
      transition='opacity 0.5s ease-in-out'
      _hover={{ opacity: 0.6 }}
      zIndex={1}
    >
      {children}
    </Heading>
  );
};

export default Head1;
