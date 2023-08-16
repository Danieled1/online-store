import { StarIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Image,
  Text,
  Divider,
  Button,
} from "@chakra-ui/react";
import React from "react";

function ModalQuickView({ selectedProduct, handleAddToCart, isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{selectedProduct?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image src={selectedProduct?.image} alt={selectedProduct?.name} />
          <Text fontWeight='bold' fontSize='lg'>
            {selectedProduct?.name}
          </Text>
          <Text>${selectedProduct?.price}</Text>
          <Box d='flex' mt='2'>
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
          <Text mt='4'>{selectedProduct?.description}</Text>
          <Button
            mt='2'
            colorScheme='teal'
            onClick={() => handleAddToCart(selectedProduct)}
          >
            Add to Cart
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalQuickView;
