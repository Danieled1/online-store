import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Box,
  Heading,
  Button,
  Text,
  VStack,
  HStack,
  IconButton,
  useColorModeValue,
  useBreakpointValue,
  SimpleGrid,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { PhoneIcon, EmailIcon, StarIcon } from "@chakra-ui/icons";
import { Helmet } from "react-helmet-async";

import Layout from "../layouts/Layout";
import { useResponsiveContext } from "../../contexts/ResponsiveContext";
import { Link, Outlet } from "react-router-dom";
import ItemSlider from "../partials/ItemSlider/ItemSlider";
import ResponsiveContainer from "../common/ResponsiveContainer";

const LandingPage = ({ posts, products }) => {
  const buttonHoverBg = useColorModeValue("blue.600", "blue.300");

  const { isMobile } = useResponsiveContext();
  return (
    <Layout isMobile={isMobile}>
      <ResponsiveContainer>
        <Box>
          <Helmet>
            <title>Welcome to [CompanyName] Store!</title>
          </Helmet>
          {/* Hero Section */}
          <Box
            w='full'
            h={{ sm: "70vh", md: "50vh", xl: "60vh" }} // Adjust the height based on breakpoints
            position='relative'
            mt={{ base: 4, sm: 6, md: 8, xl: 10 }}
            px={{ base: 4, sm: 6, md: 8, xl: 10 }} // Adjust padding based on breakpoints
            _before={{
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundImage: "url(https://via.placeholder.com/1920x1080)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              boxShadow: "xl",
              zIndex: -999,
            }}
          >
            <Box
              position='absolute'
              top={0}
              right={0}
              bottom={0}
              left={0}
              bgGradient='linear(to-t, rgba(0,0,0,0.6), rgba(0,0,0,0.6))'
              borderColor={useColorModeValue("gray.200", "gray.700")}
            />
            <VStack
              h='full'
              justifyContent='center'
              px={{ base: 4, sm: 6, md: 8, xl: 12 }} // Adjust padding based on breakpoints
              spacing={10}
              align='start'
              cursor={"default"}
            >
              <Heading
                as='h1'
                fontSize={{ sm: "3xl", md: "7xl", lg: "7xl", xl: "7xl" }}
                color='white'
                transition='opacity 0.5s ease-in-out'
                _hover={{ opacity: 0.6 }}
                zIndex={1}
              >
                Welcome to Our Online Store!
              </Heading>
              <Heading
                as={"h2"}
                fontSize={{ sm: "md", md: "2xl", lg: "2xl", xl: "3xl" }}
                color='white'
                transition='opacity 0.5s ease-in-out'
                _hover={{ opacity: 0.6 }}
                zIndex={1}
              >
                Discover exclusive deals and fantastic products tailored just
                for you.
              </Heading>
              {/* <Button
                colorScheme='blue'
                size={{ base: "lg"}} // Adjust button size based on breakpoints
                fontSize={{ base: "md", sm: "lg", md: "xl", xl: "2xl" }} // Adjust font size based on breakpoints
                _hover={{ transform: "scale(1.02)" }}
                alignSelf={{ base: "center", sm: "start" }} // Adjust alignment based on breakpoints
                as={Link}
                to={"/shop"}
              >
                Explore Catalog
              </Button> */}
            </VStack>
          </Box>
          {/* Product Catalog Preview */}
          <Box
            bg={useColorModeValue("gray.50", "gray.800")}
            my={{ sm: 6, md: 8, xl: 10 }} // Adjust margin based on breakpoints
            p={{ sm: 6, md: 8, xl: 10 }} // Adjust padding based on breakpoints
            borderBottomWidth='2px'
            borderColor={useColorModeValue("gray.200", "gray.700")}
            borderRadius='lg'
            boxShadow='rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px'
          >
            <Heading
              as={"h3"}
              fontSize={{ sm: "2xl", md: "3xl", lg: "4xl", xl: "4xl" }}
              mb={2}
            >
              Our Top Picks For You
            </Heading>
            <Text color={useColorModeValue("gray.600", "gray.400")} mb={4}>
              Check out our selection of top quality products tailored to your
              needs.
            </Text>
            <ItemSlider data={products} isProduct={true} />
            <Button
              colorScheme='blue'
              size={{ base: "lg" }}
              mt={4} // Adjust margin based on breakpoints
              fontSize={{ base: "md", sm: "lg", md: "xl", xl: "xl" }} // Adjust font size based on breakpoints
              _hover={{ transform: "scale(1.02)" }}
              alignSelf={{ base: "center", sm: "start" }} // Adjust alignment based on breakpoints
              as={Link}
              to={"/shop"}
            >
              Go To Store
            </Button>
          </Box>

          {/* About Section */}
          <Box
            my={{ sm: 6, md: 8, xl: 10 }} // Adjust margin based on breakpoints
            p={{ sm: 6, md: 8, xl: 10 }} // Adjust padding based on breakpoints
            borderBottomWidth='2px'
            bg={useColorModeValue("gray.50", "gray.800")}
            borderRadius='lg'
            boxShadow='rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px'
          >
            <Heading as={"h3"} size='lg' mb={5}>
              About Our Company
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              <Box>
                <Text
                  color={useColorModeValue("gray.600", "gray.400")}
                  fontSize={"lg"}
                  mb={6}
                >
                  Your company is a leading online retailer of high-quality
                  products.
                  <br /> Our mission is to provide our customers with the best
                  online shopping experience.
                  <br />
                  <br /> Our products are sourced directly from brands and
                  suppliers.
                  <br /> They are thoroughly checked for quality and
                  authenticity.
                </Text>
                <Button
                  colorScheme='blue'
                  size='lg'
                  mt={5}
                  _hover={{ transform: "scale(1.02)" }}
                  as={Link}
                  to={"/about"}
                >
                  Learn More
                </Button>
              </Box>
            </SimpleGrid>
          </Box>
          {/* Blog Preview */}
          <Box
            my={{ sm: 6, md: 8, xl: 10 }} // Adjust margin based on breakpoints
            p={{ sm: 6, md: 8, xl: 10 }} // Adjust padding based on breakpoints
            bg={useColorModeValue("gray.50", "gray.800")}
            boxShadow='rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px'
            borderBottomWidth='2px'
            borderRadius='lg'
          >
            <Heading size='lg' mb={5}>
              Latest Blog Posts
            </Heading>
            <ItemSlider data={posts} isProduct={false} />
          </Box>
          {/* Support Section */}
          <Box
            bg={useColorModeValue("gray.50", "gray.800")}
            my={{ sm: 6, md: 8, xl: 10 }} // Adjust margin based on breakpoints
            p={{ sm: 6, md: 8, xl: 10 }} // Adjust padding based on breakpoints
            borderBottomWidth='2px'
            borderColor={useColorModeValue("gray.200", "gray.700")}
            borderRadius='lg'
            boxShadow='rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px'
          >
            <Heading size='lg' mb={2}>
              Need Help? Contact Support
            </Heading>
            <Text color={useColorModeValue("gray.600", "gray.400")} mb={6}>
              We're here to help you. Please provide your information and
              problem details.
            </Text>

            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              spacing={10}
              fontSize={{ base: "md", sm: "lg", md: "3xl", xl: "2xl" }} // Adjust font size based on breakpoints
            >
              <Box>
                <FormControl id='email' isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input type='email' placeholder='Your email' />
                </FormControl>
                <FormControl id='issue' isRequired mt={5}>
                  <FormLabel>Issue</FormLabel>
                  <Input
                    type='text'
                    placeholder='Briefly describe your issue'
                  />
                </FormControl>

                <Button
                  colorScheme='blue'
                  size='lg'
                  mt={5}
                  leftIcon={<EmailIcon />}
                  _hover={{ transform: "scale(1.02)" }}
                >
                  Submit
                </Button>
              </Box>
              <Box>
                <Text
                  fontSize='lg'
                  color={useColorModeValue("gray.600", "gray.400")}
                >
                  Or reach us directly at:
                </Text>
                <HStack mt={5}>
                  <IconButton
                    variant='outline'
                    colorScheme='blue'
                    aria-label='Call'
                    fontSize='20px'
                    icon={<PhoneIcon />}
                  />
                  <Text fontSize='lg'>+1 (234) 567-890</Text>
                </HStack>
                <HStack mt={5}>
                  <IconButton
                    variant='outline'
                    colorScheme='blue'
                    aria-label='Email'
                    fontSize='20px'
                    icon={<EmailIcon />}
                  />
                  <Text fontSize='lg'>support@company.com</Text>
                </HStack>
              </Box>
            </SimpleGrid>
          </Box>
          {/* <Footer isMobile={isMobile} /> */}
        </Box>
      </ResponsiveContainer>
    </Layout>
  );
};

export default LandingPage;
