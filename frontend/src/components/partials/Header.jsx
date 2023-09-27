import { Flex, Heading } from "@chakra-ui/react";
import NavigationMenu from "../partials/NavigationMenu";
import { Link } from "react-router-dom";
import React from "react";

const Header = ({ isMobile }) => {
  return (
    <Flex
      justifyContent="space-between"
      p={5}
      bg="blue.500"
      alignItems="center"
      position="sticky"
      top={0}
      zIndex={2}
    >
      <Heading
        size="2xl"
        color="white"
        fontFamily="'Pacifico', cursive"
        whiteSpace="nowrap"
        marginBottom={2}
        as={Link}
        to={"/"}
      >
        Company Name
      </Heading>
      <NavigationMenu isMobile={isMobile} />
    </Flex>
  );
};

export default Header;
