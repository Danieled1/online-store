import { Heading } from "@chakra-ui/react";
import React from "react";

const Head3 = ({ children, color="white" }) => {
  return (
    <Heading
      as={"h3"}
      fontSize={{ sm: "2xl", md: "3xl", lg: "4xl", xl: "4xl" }}
      mb={2}
      color={color ? "black" : "white"}
    >
      {children}
    </Heading>
  );
};

export default Head3;
