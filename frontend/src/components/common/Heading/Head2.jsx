import { Heading } from "@chakra-ui/react";
import React from "react";

const Head2 = ({ children }) => {
  return (
    <Heading
      as={"h2"}
      fontSize={{ sm: "md", md: "2xl", lg: "2xl", xl: "3xl" }}
      color='white'
      transition='opacity 0.5s ease-in-out'
      _hover={{ opacity: 0.6 }}
      zIndex={1}
    >
      {children}
    </Heading>
  );
};

export default Head2;
