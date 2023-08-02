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
import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import { Helmet } from "react-helmet-async";
import Slider from "react-slick";
import Layout from "../layouts/Layout";
import { useResponsiveContext } from "../../contexts/ResponsiveContext";

const productData = [
  {
    title: "Product 1",
    description: "Description for Product 1",
    image: "https://fakeimg.pl/350x200/ff9100/000",
  },
  {
    title: "Product 2",
    description: "Description for Product 2",
    image: "https://fakeimg.pl/350x200/ff8900/000",
  },
  {
    title: "Product 3",
    description: "Description for Product 3",
    image: "https://fakeimg.pl/350x200/ff7800/000",
  },
  {
    title: "Product 4",
    description: "Description for Product 3",
    image: "https://fakeimg.pl/350x200/ff6700/000",
  },
  {
    title: "Product 5",
    description: "Description for Product 3",
    image: "https://fakeimg.pl/350x200/ff5600/000",
  },
  {
    title: "Product 6",
    description: "Description for Product 3",
    image: "https://fakeimg.pl/350x200/ff4500/000",
  },
  {
    title: "Product 7",
    description: "Description for Product 3",
    image: "https://fakeimg.pl/350x200/ff3400/000",
  },
  {
    title: "Product 8",
    description: "Description for Product 3",
    image: "https://fakeimg.pl/350x200/ff1200/000",
  },
  // more products...
];
const posts = [
  {
    title: "Blog Post 1",
    image: "https://fakeimg.pl/350x200/ddd100/000",
    description: "A brief intro about Blog Post 1",
    postStart:
      "This is the beginning of the blog post. It will continue until it maximizes the space on the right side of the card...",
  },
  {
    title: "Blog Post 2",
    image: "https://fakeimg.pl/350x200/ddd112/000",
    description: "A brief intro about Blog Post 2",
    postStart:
      "This is the start of another engaging blog post. The text will continue to fill the space on the right...",
  },
  {
    title: "Blog Post 3",
    image: "https://fakeimg.pl/350x200/ddd123/000",
    description: "A brief intro about Blog Post 3",
    postStart:
      "This is the start of another engaging blog post. The text will continue to fill the space on the right...",
  },
  {
    title: "Blog Post 4",
    image: "https://fakeimg.pl/350x200/ddd134/000",
    description: "A brief intro about Blog Post 4",
    postStart:
      "This is the start of another engaging blog post. The text will continue to fill the space on the right...",
  },
  {
    title: "Blog Post 5",
    image: "https://fakeimg.pl/350x200/ddd145/000",
    description: "A brief intro about Blog Post 5",
    postStart:
      "This is the start of another engaging blog post. The text will continue to fill the space on the right...",
  },
];

// ItemCard Component - BUG : When there are less then the slides to show it will duplicate it
const ItemCard = ({
  image,
  title,
  description,
  postStart,
  isProduct = true,
}) => (
  <Box
    width={{ base: "75vw", sm: "40vw", md: "20vw" }} // Adjusted width for responsiveness
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    _hover={{ transform: "scale(1.01)" }}
  >
    <Image src={image} alt={title} width="100%" />
    <Box p="6">
      <Box d="flex" alignItems="baseline">
        <Text>{title}</Text>
      </Box>
      <Box>
        <Text fontSize="sm" isTruncated>
          {description}
        </Text>
        <Text mt={2}>{postStart}</Text>
      </Box>
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

const LandingPage = () => {
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
          <ItemSlider data={productData} />
          <Button
            colorScheme="blue"
            size="lg"
            mt={5}
            _hover={{ transform: "scale(1.02)" }}
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
