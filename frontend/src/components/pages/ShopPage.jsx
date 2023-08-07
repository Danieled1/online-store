import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  SimpleGrid,
  Image,
  Grid,
  GridItem,
  Button,
  Select,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Input,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
  Divider,
} from "@chakra-ui/react";
import Layout from "../layouts/Layout";
import { useResponsiveContext } from "../../contexts/ResponsiveContext";
import { motion } from "framer-motion";
import { StarIcon } from "@chakra-ui/icons";

const MotionBox = motion(Box);

// Product sorting function
const sortProducts = (products, sortOrder) => {
  if (sortOrder === "price-asc") {
    return [...products].sort((a, b) => a.price - b.price);
  }
  if (sortOrder === "price-desc") {
    return [...products].sort((a, b) => b.price - a.price);
  }
  return products;
};

const ShopPage = ({products}) => {
  const { isMobile } = useResponsiveContext();
  const [sortOrder, setSortOrder] = useState("price-asc");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const sortedProducts = sortProducts(products, sortOrder);

  const handleAddToCart = (product) => {
    // Add the product to the cart (you'll need to implement this function yourself)
    addToCart(product);

    // Show a success toast
    toast({
      title: "Product added to cart.",
      description: `${product.name} has been added to your cart.`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <Layout isMobile={isMobile}>
      <Box bg={useColorModeValue("brand.lightBg", "brand.darkBg")} p={8}>
        <Grid templateColumns="repeat(12, 1fr)" gap={6}>
          {/* ... */}
          <GridItem colSpan={9}>
            <Flex justify="space-between" align="center" mb={4}>
              <Heading>Products</Heading>
              <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </Select>
            </Flex>
            <SimpleGrid columns={3} spacing={10}>
              {sortedProducts.map((product) => (
                <MotionBox key={product.id} bg="white" rounded="lg" overflow="hidden" boxShadow="lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image src={product.image} alt={product.name} />
                  <Box p={6}>
                    <Text fontWeight="bold" fontSize="lg" isTruncated>
                      {product.name}
                    </Text>
                    <Text>${product.price}</Text>
                    <Box d="flex" mt="2">
                      {Array(5)
                        .fill("")
                        .map((_, i) => (
                          <StarIcon
                            key={i}
                            color={i < product.rating ? "teal.500" : "gray.300"}
                          />
                        ))}
                    </Box>
                    <Button mt="4" colorScheme="teal" onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </Button>
                    <Button mt="4" onClick={() => {setSelectedProduct(product); onOpen();}}>
                      Quick View
                    </Button>
                  </Box>
                </MotionBox>
              ))}
            </SimpleGrid>
          </GridItem>
        </Grid>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedProduct?.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image src={selectedProduct?.image} alt={selectedProduct?.name} />
              <Text fontWeight="bold" fontSize="lg">
                {selectedProduct?.name}
              </Text>
              <Text>${selectedProduct?.price}</Text>
              <Box d="flex" mt="2">
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                    <StarIcon
                      key={i}
                      color={i < selectedProduct?.rating ? "teal.500" : "gray.300"}
                    />
                  ))}
              </Box>
              <Divider />
              <Text mt="4">{selectedProduct?.description}</Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Layout>
  );
};

export default ShopPage;
