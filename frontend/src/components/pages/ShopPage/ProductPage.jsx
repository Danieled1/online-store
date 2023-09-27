import React, { useState, useEffect } from "react";
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
import useFetch from "../../../hooks/useFetch";

const ProductPage = ({ products }) => {
  const { isMobile } = useResponsiveContext();
  const { model_id } = useParams();
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null); // State to store the productId
  const toast = useToast();
  const baseURL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3000";
  const productEndpoint = `${baseURL}/api/products/product/${model_id}`;
  const [product, isLoadingProduct, productError] = useFetch(
    productEndpoint,
    "GET"
  );
  // Fetch related products using the same useFetch mechanism
  const relatedProductsEndpoint = `${baseURL}/api/products/`;
  const [relatedProducts, isLoadingRelatedProducts, relatedProductsError] =
    useFetch(relatedProductsEndpoint, "GET");

  const slicedRelatedProducts =
    relatedProducts && relatedProducts.length > 4
      ? relatedProducts.slice(0, 4)
      : relatedProducts;

  const openImageModal = () => {
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
  };

  const handleAddToCart = () => {
    // Create this addToCart function when connecting the backend
    // addToCart(item);
    console.log(product);
    toast({
      title: "Product added to cart.",
      description: `${product.product_name} - ${product.product_price} has been added to your cart.`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };
  useEffect(() => {
    console.log(product);
    setSelectedProductId(model_id);
  }, [model_id, product]);
  return (
    <Layout isMobile={isMobile}>
      <ResponsiveContainer>
        <Container
          maxW='container.lg'
          py={10}
          bg={useColorModeValue("white", "gray.800")} // Changed background color
          my={4}
          p={8}
          borderBottomWidth='2px'
          borderColor={useColorModeValue("gray.200", "gray.700")}
          borderRadius='lg'
        >
          <Box mb={4}>
            <Link to='/shop'>
              <Button
                leftIcon={<AiOutlineArrowLeft />}
                variant='outline' // Changed button style
                colorScheme='teal'
              >
                Back
              </Button>
            </Link>
          </Box>
          {isLoadingProduct ? (
            // Display a loading indicator for the main product
            <p>Loading product...</p>
          ) : productError ? (
            // Display an error message for the main product
            <p>Error loading product.</p>
          ) : product ? (
            <Grid
              templateColumns={{ base: "1fr", md: "1fr 2fr" }}
              gap={10}
              overflow='hidden'
            >
              <GridItem>
                <Image
                  src={product.product_image}
                  alt={product.product_name}
                  borderRadius='8px'
                  border='1.5px solid'
                  cursor='pointer'
                  onClick={openImageModal}
                  boxSize='350px' // Set image size
                />
              </GridItem>
              <GridItem>
                <Box bg='white' p={6} borderRadius='8px' boxShadow='md'>
                  <Heading as='h1' size='xl' mb={4}>
                    {product.product_name}
                  </Heading>
                  <Text fontSize='2xl' fontWeight='semibold' mt={4}>
                    ${product.product_price}
                  </Text>
                  <Text fontSize='lg' mt={4}>
                    {product.product_description}
                  </Text>
                  <Button
                    leftIcon={<AiOutlineShoppingCart />}
                    colorScheme='teal'
                    size='lg'
                    mt={4}
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                  <Divider my={4} />
                  <Flex justifyContent='space-between' w='100%'>
                    <HStack alignItems='center'>
                      <Text fontSize='sm' color='gray.500'>
                        Rating:
                      </Text>
                      <Box as='span' color='yellow.500'>
                        {Array.from({ length: product.product_rating }).map(
                          (_, index) => (
                            <StarIcon key={index} boxSize={4} />
                          )
                        )}
                      </Box>
                    </HStack>
                    <Text fontSize='lg'>
                      In Stock: {product.inStock ? "Yes" : "No"}
                    </Text>
                  </Flex>
                </Box>
              </GridItem>
            </Grid>
          ) : null}
          <Box
            bg={useColorModeValue("white", "gray.800")} // Changed background color
            my={4}
            p={8}
            borderBottomWidth='2px'
            borderColor={useColorModeValue("gray.200", "gray.700")}
            borderRadius='lg'
          >
            <Heading as='h2' size='lg' mb={4}>
              Related Products
            </Heading>
            {isLoadingRelatedProducts ? (
              // Display a loading indicator for related products
              <p>Loading related products...</p>
            ) : relatedProductsError ? (
              // Display an error message for related products
              <p>Error loading related products.</p>
            ) : (
              <ItemSlider data={slicedRelatedProducts} isProduct={true} />
            )}
          </Box>
          {/* Image Modal */}
          <Modal
            isOpen={isImageModalOpen}
            onClose={closeImageModal}
            size='xl'
            motionPreset='slideInBottom'
          >
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton color='teal.500' />{" "}
              {/* Changed close button color */}
              <Image
                src={product?.product_image}
                alt={product?.product_name}
                width='100%'
                maxHeight='100vh'
                objectFit='contain' // Changed object fit
                cursor='pointer'
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
