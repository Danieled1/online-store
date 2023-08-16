import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ModalQuickView from "../common/ModalQuickView";

const MotionBox = motion(Box);

const handleAddToCart = (product) => {
  // Add the product to the cart (you'll need to implement this function yourself)
  addToCart(product);

  // Show a success toast
  // toast({
  //   title: "Product added to cart.",
  //   description: `${product.name} has been added to your cart.`,
  //   status: "success",
  //   duration: 9000,
  //   isClosable: true,
  // });
};
const ItemCard = ({ item, isProduct = true }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id, name, image, price, rating, description, title, postStart } =
    item;
  return (
    <MotionBox
      key={id}
      bg="white"
      rounded="lg"
      overflow="hidden"
      boxShadow="lg"
      marginX={4}
      whileHover={{ scale: 1.08 }}
      transition={{ duration: 0.3 }}
      width="280px" // Adjusted width for App Store style cards
      height="400px" // Adjusted height for App Store style cards
    >
      <Image
        src={image}
        alt={name}
        height="180px"
        objectFit="cover"
        width="100%"
      />
      <Box p={4} flex={1}>
        {isProduct ? (
          <>
            <Text fontWeight="bold" fontSize="xl" mt={2} isTruncated>
              {name}
            </Text>
            <Text fontSize="sm" color="gray.500" mt={2} noOfLines={2}>
              {description}
            </Text>
            <Text fontSize="lg" fontWeight="semibold" mt={2}>
              {price} $
            </Text>
            <HStack alignItems="center" mt={2}>
              <Text fontSize="sm" color="gray.500">
                Rating:
              </Text>
              <Box as="span" color="yellow.500">
                {Array.from({ length: rating }).map((_, index) => (
                  <StarIcon key={index} boxSize={4} />
                ))}
              </Box>
            </HStack>
            <Flex mt={2} justifyContent="space-between">
              <Button
                size="sm"
                colorScheme="teal"
                onClick={() => handleAddToCart(product)}
                width="48%"
              >
                Add to Cart
              </Button>
              <Button
                size="sm"
                colorScheme="gray"
                onClick={() => {
                  setSelectedProduct(item);
                  onOpen();
                }}
                width="48%"
              >
                Quick View
              </Button>
            </Flex>
          </>
        ) : (
          <>
            <Text fontWeight="bold" fontSize="xl" isTruncated mt={-4}>
              {title}
            </Text>
            <Text fontSize="sm" color="gray.500" noOfLines={4} py={2}>
              {postStart}
            </Text>
            <Link to={`/post/${id}`}>Read More</Link>
          </>
        )}
      </Box>
      {/* Quick View Modal */}
      <ModalQuickView
        selectedProduct={selectedProduct}
        handleAddToCart={handleAddToCart}
        isOpen={isOpen}
        onClose={onClose}
      />
    </MotionBox>
  );
};
export default ItemCard;