import { StarIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
const ItemCard = ({
  id,
  name,
  image,
  price,
  rating,
  description,
  title,
  postStart,
  isProduct = true,
  setSelectedProduct,
  product,
  onOpen
}) => {
  return (
    <MotionBox
      key={id}
      bg='white'
      rounded='lg'
      overflow='hidden'
      boxShadow='lg'
      opacity={0.8}
      marginX={4}
      whileHover={{ scale: 1.08, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Image src={image} alt={name} />
      <Box p={6}>
        {isProduct && (
          <Box>
            <Text fontWeight='bold' fontSize='lg' mt={2} isTruncated>
              {name}
            </Text>
            <Text fontSize='sm' color='gray.500' mt={2} noOfLines={2}>
              {description}
            </Text>
            <Text fontSize='lg' fontWeight='semibold' mt={2}>
              {price} $
            </Text>
            <HStack alignItems='center'>
              <Text fontSize='sm' color='gray.500' mt={2}>
                Rating:
              </Text>
              <Box as='span' color='yellow.500'>
                {Array.from({ length: rating }).map((_, index) => (
                  <StarIcon key={index} boxSize={3.5} />
                ))}
              </Box>
            </HStack>

            <Flex
              width='full'
              height='50px'
              borderRadius='md'
              overflow='hidden'
              boxShadow='sm'
              mt='4'
              position='relative'
              _hover={{ boxShadow: "xl" }}
            >
              <Box
                flex='1'
                display='flex'
                alignItems='center'
                justifyContent='center'
                bg='teal'
                color='white'
                fontWeight='bold'
                _hover={{
                  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                  bg: "white",
                  color: "teal.500",
                }}
                onClick={() => handleAddToCart(product)}
                transition='all 0.4s'
              >
                Add to Cart
              </Box>

              <Box
                flex='1'
                display='flex'
                alignItems='center'
                justifyContent='center'
                bg='gray.300'
                color='white'
                fontWeight='bold'
                _hover={{
                  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                  bg: "white",
                  color: "gray.700",
                }}
                onClick={() => {
                  setSelectedProduct(product);
                  onOpen();
                }}
                transition='all ease 0.4s'
              >
                Quick View
              </Box>
            </Flex>
          </Box>
        )}

        {!isProduct && (
          <Box
            height={"100px"}
            display={"flex"}
            justifyContent={"space-between"}
            flexDir={"column"}
          >
            <Text fontWeight='bold' fontSize='lg' isTruncated mt={-4}>
              {title}
            </Text>
            <Text fontSize='sm' color='gray.500'  noOfLines={4} py={2}>
              {postStart}
            </Text>
            <Button as={Link} colorScheme='blue' size='sm' >
              Read More
            </Button>
          </Box>
        )}
      </Box>
    </MotionBox>
  );
};
export default ItemCard;
