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
import { useAuth } from "../../../contexts/AuthContext"; // Import the useAuth hook
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  user_email: Yup.string().email("Invalid email").required("Required"),
  user_password: Yup.string().required("Required"),
});

const LoginForm = ({ isRegistering, toggleForm }) => {
  const buttonHoverBg = useColorModeValue("brand.secondary", "brand.secondary");
  const { isMobile } = useResponsiveContext();
  const auth = useAuth(); // Use the useAuth hook to access authentication functions
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      console.log(values);
  
      await auth.login(values.user_email, values.user_password);
      navigate(-1);
      
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

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
                user_email: "",
                user_password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {({ isSubmitting }) => (
                <Form>
                  <VStack spacing={4}>
                    <Field name="user_email">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.user_email && form.touched.user_email}
                        >
                          <FormLabel htmlFor="user_email">Email address</FormLabel>
                          <Input
                            {...field}
                            id="user_email"
                            placeholder="Your email"
                          />
                          <ErrorMessage name="user_email" component="div" />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="user_password">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.user_password && form.touched.user_password
                          }
                        >
                          <FormLabel htmlFor="user_password">Password</FormLabel>
                          <InputGroup size="md">
                            <Input
                              {...field}
                              id="user_password"
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
                          <ErrorMessage name="user_password" component="div" />
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
