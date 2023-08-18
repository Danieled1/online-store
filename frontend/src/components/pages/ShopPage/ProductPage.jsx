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
  Text,
  VStack,
} from "@chakra-ui/react";
import { AiOutlineArrowLeft, AiOutlineShoppingCart } from "react-icons/ai";
import Layout from "../../layouts/Layout";
import { useResponsiveContext } from "../../../contexts/ResponsiveContext";
import ResponsiveContainer from "../../common/ResponsiveContainer";

const ProductPage = ({ products }) => {
  const { isMobile } = useResponsiveContext();
  const { productId } = useParams();

  // Find the selected product based on the productId
  const selectedProduct = products.find((product) => product.id === productId);

  // Simulated related products (for demo purposes)
  const relatedProducts = products.slice(0, 4);

  return (
    <Layout isMobile={isMobile}>
      <ResponsiveContainer>
        <Container maxW="container.lg" py={10}>
          {selectedProduct && (
            <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={8}>
              <GridItem>
                <Image src={selectedProduct.image} alt={selectedProduct.name} />
              </GridItem>
              <GridItem>
                <VStack spacing={4} align="start">
                  <Link to="/shop">
                    <Button
                      leftIcon={<AiOutlineArrowLeft />}
                      variant="link"
                      colorScheme="teal"
                    >
                      Back to Shop
                    </Button>
                  </Link>
                  <Heading as="h1" size="xl">
                    {selectedProduct.name}
                  </Heading>
                  <Text fontSize="2xl" fontWeight="semibold">
                    ${selectedProduct.price}
                  </Text>
                  <Text fontSize="lg">{selectedProduct.description}</Text>
                  <Button leftIcon={<AiOutlineShoppingCart />} colorScheme="teal" size="lg">
                    Add to Cart
                  </Button>
                  <Divider />
                  <Flex justifyContent="space-between" w="100%">
                    <Text fontSize="lg">
                      Rating: {selectedProduct.rating}/5
                    </Text>
                    <Text fontSize="lg">
                      In Stock: {selectedProduct.inStock ? "Yes" : "No"}
                    </Text>
                  </Flex>
                </VStack>
              </GridItem>
            </Grid>
          )}
          <Box mt={10}>
            <Heading as="h2" size="lg" mb={4}>
              Related Products
            </Heading>
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={8}>
              {relatedProducts.map((product) => (
                <Box key={product.id}>
                  <Image src={product.image} alt={product.name} />
                  <Text fontSize="lg" fontWeight="semibold" mt={2}>
                    {product.name}
                  </Text>
                  <Text fontSize="md">${product.price}</Text>
                </Box>
              ))}
            </Grid>
          </Box>
        </Container>
      </ResponsiveContainer>
    </Layout>
  );
};

export default ProductPage;
