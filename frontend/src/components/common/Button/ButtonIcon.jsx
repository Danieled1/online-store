import { HStack, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import SubHead from "../Heading/SubHead";

const ButtonIcon = ({ children, icon }) => {
  return (
    <HStack mt={5}>
      <IconButton
        variant='outline'
        colorScheme='blue'
        aria-label='Call'
        fontSize='20px'
        icon={icon}
      />
      <Text fontSize={{ sm: "md", md: "xl", xl: "2xl" }}>{children}</Text>
    </HStack>
  );
};

export default ButtonIcon;
