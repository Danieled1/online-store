import { Button } from "@chakra-ui/react";
import React from "react";

const ButtonAction = ({children, icon}) => {
  return (
    <Button
      colorScheme='blue'
      fontSize={{ base: "md", sm: "lg", md: "xl", xl: "xl" }} // Adjust font size based on breakpoints
      mt={5}
      leftIcon={icon}
      _hover={{ transform: "scale(1.02)" }}
    >
      {children}
    </Button>
  );
};

export default ButtonAction;
