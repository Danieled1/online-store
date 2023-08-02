import { useState } from "react";
import {
  Box,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Checkbox,
  Text,
  useColorModeValue,
  Center,
  InputRightElement,
  IconButton,
  InputGroup,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useResponsiveContext } from "../../../contexts/ResponsiveContext";
import Layout from "../../layouts/Layout";
import ToggleAuth from "./ToggleAuth";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Password is too short").required("Required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  phone: Yup.string().required("Required"),
});

const RegisterForm = ({ isRegistering, toggleForm }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { isMobile } = useResponsiveContext();
  const buttonHoverBg = useColorModeValue("brand.primary", "brand.secondary");

  const handleClick = () => setShowPassword(!showPassword);
  return (
    <Layout isMobile={isMobile}>
      <Box>
        <Helmet>
          <title>Register - Company Name</title>
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
              Create Your Account
            </Heading>
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                passwordConfirm: "",
                phone: "",
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
                    <Field name="name">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                        >
                          <FormLabel htmlFor="name">Name</FormLabel>
                          <Input {...field} id="name" placeholder="Your name" />
                          <ErrorMessage name="name" component="div" />
                        </FormControl>
                      )}
                    </Field>
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
                    <Field name="passwordConfirm">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.passwordConfirm &&
                            form.touched.passwordConfirm
                          }
                        >
                          <FormLabel htmlFor="passwordConfirm">
                            Confirm Password
                          </FormLabel>
                          <Input
                            {...field}
                            id="passwordConfirm"
                            type="password"
                            placeholder="Confirm your password"
                          />
                          <ErrorMessage
                            name="passwordConfirm"
                            component="div"
                          />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="phone">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.phone && form.touched.phone}
                        >
                          <FormLabel htmlFor="phone">Phone Number</FormLabel>
                          <Input
                            {...field}
                            id="phone"
                            placeholder="Your phone number"
                          />
                          <ErrorMessage name="phone" component="div" />
                        </FormControl>
                      )}
                    </Field>
                    <Checkbox colorScheme="blue" mb={4}>
                      I agree to the Terms of Service and Privacy Policy
                    </Checkbox>
                    <Button
                      type="submit"
                      colorScheme="blue"
                      size="lg"
                      _hover={{ bg: buttonHoverBg }}
                      alignSelf="start"
                      width="full"
                      isLoading={isSubmitting}
                    >
                      Register
                    </Button>
                  </VStack>
                </Form>
              )}
            </Formik>
            <ToggleAuth isRegistering={isRegistering} toggleForm={toggleForm} />
          </Box>
        </Center>
      </Box>
    </Layout>
  );
};

export default RegisterForm;
