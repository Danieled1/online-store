import React from "react";
import { Link, useColorModeValue, VStack, Box } from "@chakra-ui/react";

const ToggleAuth = ({ isRegistering, toggleForm }) => {
  const linkColor = useColorModeValue("blue.500", "blue.200");
  return (
    <VStack align="start" width="full" mt={3}>
      <Box>
        {isRegistering ? "Already have an account? " : "Don't have an account? "}
        <Link color={linkColor} onClick={toggleForm}>
          {isRegistering ? "Log in" : "Sign up"}
        </Link>
      </Box>
    </VStack>
  );
};

export default ToggleAuth;
