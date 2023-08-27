import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineArrowLeft, AiOutlineShoppingCart } from "react-icons/ai";
import Layout from "../../layouts/Layout";
import { useResponsiveContext } from "../../../contexts/ResponsiveContext";
import ResponsiveContainer from "../../common/ResponsiveContainer";
import ItemSlider from "../../partials/ItemSlider/ItemSlider";
import { StarIcon } from "@chakra-ui/icons";

const ProductPage = ({ products }) => {
  const { isMobile } = useResponsiveContext();
  const { productId } = useParams();
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null); // State to store the productId
  const toast = useToast();
  const selectedProduct = products.find((product) => product.id === selectedProductId);
  // Simulated related products (for demo purposes)
  const relatedProducts = products.slice(0, 4);
  const openImageModal = () => {
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
  };
  const handleAddToCart = () => {
    // Create this addToCart function when connecting the backend
    // addToCart(item);
    console.log(selectedProduct);
    toast({
      title: "Product added to cart.",
      description: `${selectedProduct.name} - ${selectedProduct.price} has been added to your cart.`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };
  useEffect(() => {
    setSelectedProductId(productId);
  }, [productId]);
  return (
    <Layout isMobile={isMobile}>
    <ResponsiveContainer>
      <Container
        maxW="container.lg"
        py={10}
        bg={useColorModeValue("white", "gray.800")} // Changed background color
        my={4}
        p={8}
        borderBottomWidth="2px"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        borderRadius="lg"
      >
        <Box mb={4}>
          <Link to="/shop">
            <Button
              leftIcon={<AiOutlineArrowLeft />}
              variant="outline" // Changed button style
              colorScheme="teal"
            >
              Back
            </Button>
          </Link>
        </Box>
        {selectedProduct && (
          <Grid
            templateColumns={{ base: "1fr", md: "1fr 2fr" }}
            gap={10}
            overflow="hidden"
          >
            <GridItem>
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.name}
                borderRadius="8px"
                border="1.5px solid"
                cursor="pointer"
                onClick={openImageModal}
                boxSize="350px" // Set image size
              />
            </GridItem>
            <GridItem>
              <Box bg="white" p={6} borderRadius="8px" boxShadow="md">
                <Heading as="h1" size="xl" mb={4}>
                  {selectedProduct.name}
                </Heading>
                <Text fontSize="2xl" fontWeight="semibold" mt={4}>
                  ${selectedProduct.price}
                </Text>
                <Text fontSize="lg" mt={4}>
                  {selectedProduct.description}
                </Text>
                <Button
                  leftIcon={<AiOutlineShoppingCart />}
                  colorScheme="teal"
                  size="lg"
                  mt={4}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Divider my={4} />
                <Flex justifyContent="space-between" w="100%">
                  <HStack alignItems="center">
                    <Text fontSize="sm" color="gray.500">
                      Rating:
                    </Text>
                    <Box as="span" color="yellow.500">
                      {Array.from({ length: selectedProduct.rating }).map((_, index) => (
                        <StarIcon key={index} boxSize={4} />
                      ))}
                    </Box>
                  </HStack>
                  <Text fontSize="lg">
                    In Stock: {selectedProduct.inStock ? "Yes" : "No"}
                  </Text>
                </Flex>
              </Box>
            </GridItem>
          </Grid>
        )}
        <Box
          bg={useColorModeValue("white", "gray.800")} // Changed background color
          my={4}
          p={8}
          borderBottomWidth="2px"
          borderColor={useColorModeValue("gray.200", "gray.700")}
          borderRadius="lg"
        >
          <Heading as="h2" size="lg" mb={4}>
            Related Products
          </Heading>
          <ItemSlider data={relatedProducts} isProduct={true} /> {/* Changed data source */}
        </Box>
        {/* Image Modal */}
        <Modal
          isOpen={isImageModalOpen}
          onClose={closeImageModal}
          size="xl"
          motionPreset="slideInBottom"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton color="teal.500" /> {/* Changed close button color */}
            <Image
              src={selectedProduct?.image}
              alt={selectedProduct?.name}
              width="100%"
              maxHeight="100vh"
              objectFit="contain" // Changed object fit
              cursor="pointer"
              onClick={closeImageModal}
            />
          </ModalContent>
        </Modal>
      </Container>
    </ResponsiveContainer>
  </Layout>
  );
};

export default ProductPage;
