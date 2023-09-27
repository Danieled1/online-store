import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import ModalQuickView from "../common/ModalQuickView";

const MotionBox = motion(Box);
const ItemCard = ({ item, isProduct = true, isPost = false }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const handleAddToCart = () => {
    // Create this addToCart function when connecting the backend
    // addToCart(item);
    console.log(item);
    toast({
      title: "Product added to cart.",
      description: `${item.product_name} - ${item.product_price} has been added to your cart.`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };
  const handleQuickView = () => {
    setSelectedProduct(item);
    onOpen();
  };

  const handleOpenSpecificPage = () => {
    navigate(isProduct ? `/shop/product/${item._id}` : `/post/${item._id}`);
  };

  return (
    <MotionBox
      onClick={isProduct ? handleOpenSpecificPage : null}
      key={item._id}
      bg='white'
      rounded='lg'
      overflow='hidden'
      boxShadow='lg'
      marginX={4}
      whileHover={{ scale: 1.08 }}
      transition={{ duration: 0.3 }}
      width={isProduct ? "280px" : "250px"} // Adjust card width
      height={isProduct ? "400px" : "250px"} // Adjust card height
    >
      <Image
        src={isProduct ? item.product_image : item.post_image}
        alt={isProduct ? item.product_name : item.post_name}
        height={isProduct ? "180px" : "120px"} // Adjust image height
        objectFit='cover'
        width='100%'
      />
      <Box p={4} flex={1}>
        {isProduct ? (
          <>
            <Text fontWeight='bold' fontSize='xl' mt={2} isTruncated>
              {item.product_name}
            </Text>
            <Text fontSize='sm' color='gray.500' mt={2} noOfLines={2}>
              {item.product_description}
            </Text>
            <Text fontSize='lg' fontWeight='semibold' mt={2}>
              {item.product_price} $
            </Text>
            <HStack alignItems='center' mt={2}>
              <Text fontSize='sm' color='gray.500'>
                Rating:
              </Text>
              <Box as='span' color='yellow.500'>
                {Array.from({ length: item.rating }).map((_, index) => (
                  <StarIcon key={index} boxSize={4} />
                ))}
              </Box>
            </HStack>
            <Flex mt={2} justifyContent='space-between'>
              <Button
                size='sm'
                colorScheme='teal'
                onClick={handleAddToCart}
                width='48%'
              >
                Add to Cart
              </Button>
              <Button
                size='sm'
                colorScheme='gray'
                onClick={handleQuickView}
                width='48%'
              >
                Quick View
              </Button>
            </Flex>
          </>
        ) : (
          <>
            <Text fontWeight='bold' fontSize='xl' isTruncated mt={-4}>
              {item.post_name}
            </Text>
            <Text fontSize='sm' color='gray.500' noOfLines={3} py={2}>
              {item.post_description}
            </Text>
            <Link to={`/post/${item._id}`}>Read More</Link>
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
