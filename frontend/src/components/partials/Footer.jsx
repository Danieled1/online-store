// Footer.jsx
import React from "react";
import { Flex, Heading, VStack, Text } from "@chakra-ui/react";

const Footer = ({ isMobile }) => {
  return (
    <Flex
      direction={isMobile ? "column" : "row"}
      justifyContent="space-between"
      p={5}
      bg="blue.500"
      alignItems="center"
      color="white"
    >
      <Heading
        size="2xl"
        color="white"
        fontFamily="'Pacifico', cursive"
        whiteSpace="nowrap"
        marginBottom={2}
        my={5}
      >
        Company Name
      </Heading>
      <VStack spacing={4} align="stretch">
        <Text fontSize="sm">
          &copy; 2023 Company Name. All rights reserved.
        </Text>
      </VStack>
    </Flex>
  );
};

export default Footer;
