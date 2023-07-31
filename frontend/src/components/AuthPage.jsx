import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext"; // Assuming you have an Auth context to manage authentication

export function AuthPage() {
  const { login, register } = useAuth(); // Retrieve login and register functions from context
  const [isRegistering, setIsRegistering] = useState(false); // State to switch between register and login
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = event.target.elements;

    try {
      if (isRegistering) {
        await register(email.value, password.value);
        toast({
          title: "Account created.",
          description: "You've successfully signed up.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        await login(email.value, password.value);
        toast({
          title: "Logged in.",
          description: "You've successfully logged in.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error occurred.",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
      p={8}
    >
      <Stack spacing={4}>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input type="email" name="email" />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" name="password" />
        </FormControl>
        <Button
          bg={"blue.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
          onClick={handleSubmit}
        >
          {isRegistering ? "Sign Up" : "Log In"}
        </Button>
        <Button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering
            ? "Already have an account? Log in!"
            : "Don’t have an account? Sign up!"}
        </Button>
      </Stack>
    </Box>
  );
}
