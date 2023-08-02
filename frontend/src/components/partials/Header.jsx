import { Flex, Heading } from "@chakra-ui/react";
import NavigationMenu from "../partials/NavigationMenu";

const Header = ({ isMobile }) => {
  return (
    <Flex
      justifyContent="space-between"
      p={5}
      bg="blue.500"
      alignItems="center"
      position="sticky"
      top={0}
      zIndex={1}
    >
      <Heading
        size="2xl"
        color="white"
        fontFamily="'Pacifico', cursive"
        whiteSpace="nowrap"
        marginBottom={2}
      >
        Company Name
      </Heading>
      <NavigationMenu isMobile={isMobile} />
    </Flex>
  );
};

export default Header;
