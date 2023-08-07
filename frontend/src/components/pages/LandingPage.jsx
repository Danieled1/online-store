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
  SimpleGrid,
  Image,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { PhoneIcon, EmailIcon, StarIcon } from "@chakra-ui/icons";
import { Helmet } from "react-helmet-async";
import Slider from "react-slick";
import Layout from "../layouts/Layout";
import { useResponsiveContext } from "../../contexts/ResponsiveContext";
import { Link } from "react-router-dom";

// ItemCard Component - BUG : When there are less then the slides to show it will duplicate it
const ItemCard = ({
  id,
  name,
  image,
  price,
  rating,
  description,
  isProduct = true,
}) => (
  <Box
    width={{ base: "75vw", sm: "40vw", md: "20vw" }} // Adjusted width for responsiveness
    borderWidth="1px"
    borderRadius="lg"
    p={2}
    m={4}
    overflow="hidden"
    _hover={{ transform: "scale(1.01)" }}
  >
    <Box height="200px" position="relative">
      <Image
        src={image}
        alt={name}
        width="100%"
        height="100%"
        objectFit="cover"
        borderRadius="md"
      />
    </Box>

    <Box
      p="4"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100%"
    >
      <Box>
        <Text fontSize="lg" fontWeight="semibold" mb={1} isTruncated>
          {name}
        </Text>
        <Text fontSize="md" color="gray.600" noOfLines={2} mb={2}>
          {description}
        </Text>
      </Box>

      {isProduct && (
        <Box>
          <Text fontSize="lg" fontWeight="semibold">
            {price} $
          </Text>
          <HStack alignItems="center">
            <Text fontSize="sm" color="gray.500">
              Rating:
            </Text>
            <Box as="span" color="yellow.500" >
              {Array.from({ length: rating }).map((_, index) => (
                <StarIcon key={index} boxSize={3.5} />
              ))}
            </Box>
          </HStack>
        </Box>
      )}

      {!isProduct && (
        <Button colorScheme="blue" size="sm">
          Read More
        </Button>
      )}
    </Box>
  </Box>
);

// ItemSlider Component
const ItemSlider = ({ data, isProduct = true }) => {
  const slidesToShow = Math.min(4, data.length);
  const slidesToScroll = Math.min(4, data.length);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    swipe: true,
    slidesToScroll: slidesToScroll,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {data.map((item, index) => (
        <ItemCard key={index} {...item} isProduct={isProduct} />
      ))}
    </Slider>
  );
};

const LandingPage = ({ posts, products }) => {
  const buttonHoverBg = useColorModeValue("blue.600", "blue.300");
  const { isMobile } = useResponsiveContext();
  return (
    <Layout isMobile={isMobile}>
      <Box>
        <Helmet>
          <title>Welcome to [CompanyName] Store!</title>
        </Helmet>
        {/* Hero Section */}
        <Box
          w="full"
          h="60vh"
          position="relative"
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
            position="absolute"
            top={0}
            right={0}
            bottom={0}
            left={0}
            bgGradient="linear(to-t, rgba(0,0,0,0.6), rgba(0,0,0,0.6))"
          />
          <VStack
            h="full"
            justifyContent="center"
            px={{ base: 4, md: 8 }}
            spacing={5}
            align="start"
          >
            <Heading as="h1" size="3xl" color="white">
              Welcome to Our Online Store!
            </Heading>
            <Heading fontSize="2xl" color="white">
              Discover exclusive deals and fantastic products tailored just for
              you.
            </Heading>
            <Button
              colorScheme="blue"
              size="lg"
              _hover={{ bg: buttonHoverBg }}
              alignSelf="start"
            >
              Explore Catalog
            </Button>
          </VStack>
        </Box>
        {/* Product Catalog Preview */}
        <Box
          bg={useColorModeValue("gray.50", "gray.800")}
          my={5}
          p={8}
          borderBottomWidth="1px"
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          <Heading size="lg" mb={2}>
            Our Top Picks For You
          </Heading>
          <Text color={useColorModeValue("gray.600", "gray.400")} mb={6}>
            Check out our selection of top quality products tailored to your
            needs.
          </Text>
          <ItemSlider data={products} />
          <Button
            colorScheme="blue"
            size="lg"
            mt={5}
            _hover={{ transform: "scale(1.02)" }}
            as={Link}
            to={"/shop"}
          >
            Go To Store
          </Button>
        </Box>

        {/* About Section */}
        <Box
          p={8}
          bg={useColorModeValue("gray.50", "gray.800")}
          borderRadius="lg"
        >
          <Heading size="lg" mb={5}>
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
                products. Our mission is to provide our customers with the best
                online shopping experience. Our products are sourced directly
                from brands and suppliers. They are thoroughly checked for
                quality and authenticity.
              </Text>
              <Button
                colorScheme="blue"
                size="lg"
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
          p={8}
          bg={useColorModeValue("gray.50", "gray.800")}
          borderRadius="lg"
          my={5}
        >
          <Heading size="lg" mb={5}>
            Latest Blog Posts
          </Heading>
          <ItemSlider data={posts} isProduct={false} />
        </Box>
        {/* Support Section */}
        <Box
          bg={useColorModeValue("gray.50", "gray.800")}
          my={5}
          p={8}
          borderBottomWidth="1px"
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          <Heading size="lg" mb={2}>
            Need Help? Contact Support
          </Heading>
          <Text color={useColorModeValue("gray.600", "gray.400")} mb={6}>
            We're here to help you. Please provide your information and problem
            details.
          </Text>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <Box>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" placeholder="Your email" />
              </FormControl>
              <FormControl id="issue" isRequired mt={5}>
                <FormLabel>Issue</FormLabel>
                <Input type="text" placeholder="Briefly describe your issue" />
              </FormControl>

              <Button
                colorScheme="blue"
                size="lg"
                mt={5}
                leftIcon={<EmailIcon />}
                _hover={{ transform: "scale(1.02)" }}
              >
                Submit
              </Button>
            </Box>
            <Box>
              <Text
                fontSize="lg"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                Or reach us directly at:
              </Text>
              <HStack mt={5}>
                <IconButton
                  variant="outline"
                  colorScheme="blue"
                  aria-label="Call"
                  fontSize="20px"
                  icon={<PhoneIcon />}
                />
                <Text fontSize="lg">+1 (234) 567-890</Text>
              </HStack>
              <HStack mt={5}>
                <IconButton
                  variant="outline"
                  colorScheme="blue"
                  aria-label="Email"
                  fontSize="20px"
                  icon={<EmailIcon />}
                />
                <Text fontSize="lg">support@company.com</Text>
              </HStack>
            </Box>
          </SimpleGrid>
        </Box>
        {/* <Footer isMobile={isMobile} /> */}
      </Box>
    </Layout>
  );
};

export default LandingPage;
