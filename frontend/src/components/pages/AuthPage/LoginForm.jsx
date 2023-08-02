import React, { useState } from "react";
import {
  Box,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Checkbox,
  Link,
  Center,
  useColorModeValue,
  InputRightElement,
  IconButton,
  InputGroup,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { FaGoogle, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import Layout from "../../layouts/Layout";
import { useResponsiveContext } from "../../../contexts/ResponsiveContext";
import ToggleAuth from "./ToggleAuth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const LoginForm = ({ isRegistering, toggleForm }) => {
  const buttonHoverBg = useColorModeValue("brand.secondary", "brand.secondary");
  const { isMobile } = useResponsiveContext();

  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);

  return (
    <Layout isMobile={isMobile}>
      <Box>
        <Helmet>
          <title>Login - Company Name</title>
        </Helmet>
        <Center>
          <Box
            bg={useColorModeValue("brand.lightBg", "brand.darkBg")}
            p={8}
            m={8}
            w={{ base: "90%", md: "60%", lg: "40%" }}
            borderRadius="lg"
          >
            <Heading size="lg" mb={6}>
              Login to Your Account
            </Heading>
            <Button
              leftIcon={<FaGoogle />}
              colorScheme="red"
              variant="outline"
              width="full"
              mb={4}
            >
              Continue with Google
            </Button>
            <Button
              leftIcon={<FaFacebookF />}
              colorScheme="facebook"
              variant="outline"
              width="full"
              mb={4}
            >
              Continue with Facebook
            </Button>
            <Button
              leftIcon={<FaLinkedinIn />}
              colorScheme="linkedin"
              variant="outline"
              width="full"
              mb={6}
            >
              Continue with LinkedIn
            </Button>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <VStack spacing={4}>
                    <Field name="email">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.email && form.touched.email}
                        >
                          <FormLabel htmlFor="email">Email address</FormLabel>
                          <Input
                            {...field}
                            id="email"
                            placeholder="Your email"
                          />
                          <ErrorMessage name="email" component="div" />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="password">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.password && form.touched.password
                          }
                        >
                          <FormLabel htmlFor="password">Password</FormLabel>
                          <InputGroup size="md">
                            <Input
                              {...field}
                              id="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Your password"
                            />
                            <InputRightElement>
                              <IconButton
                                bg="transparent !important"
                                variant="ghost"
                                aria-label={
                                  showPassword
                                    ? "Mask password"
                                    : "Show password"
                                }
                                icon={
                                  showPassword ? <ViewOffIcon /> : <ViewIcon />
                                }
                                onClick={handleClick}
                              />
                            </InputRightElement>
                          </InputGroup>
                          <ErrorMessage name="password" component="div" />
                        </FormControl>
                      )}
                    </Field>
                    <Checkbox colorScheme="blue">Remember me</Checkbox>
                    <Button
                      type="submit"
                      colorScheme="blue"
                      size="lg"
                      _hover={{ bg: buttonHoverBg }}
                      alignSelf="start"
                      width="full"
                      isLoading={isSubmitting}
                    >
                      Login
                    </Button>
                    <Link color="blue.500" alignSelf="start">
                      Forgot password?
                    </Link>
                  </VStack>
                </Form>
              )}
            </Formik>
            <Box mt={6}>
              <ToggleAuth
                isRegistering={isRegistering}
                toggleForm={toggleForm}
              />
            </Box>
          </Box>
        </Center>
      </Box>
    </Layout>
  );
};
export default LoginForm;
