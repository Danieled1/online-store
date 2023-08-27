import { Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const SubHead = ({ children }) => {
  return (
    <Text
      color={useColorModeValue("gray.600", "gray.400")}
      mb={4}
      fontSize={{ sm: "md", md: "xl", xl: "2xl" }}
    >
      {children}
    </Text>
  );
};

export default SubHead;
