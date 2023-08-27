import {useState} from "react";
import CardBox from "./CardBox";
import CardContent from "./CardContent/CardContent";
import { useDisclosure, useToast } from "@chakra-ui/react";
import ModalQuickView from "../../common/ModalQuickView";

const ItemCard2 = ({ item, isProduct = true }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const handleAddToCart = () => {
    // Create this addToCart function when connecting the backend
    // addToCart(item);
    console.log(item);
    toast({
      title: "Product added to cart.",
      description: `${name} - ${price} has been added to your cart.`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };
  const handleQuickView = () => {
    setSelectedProduct(item);
    onOpen();
  };
  
  return (
    <CardBox id={item.id} isProduct={isProduct}>
      <CardContent
        item={item}
        isProduct={isProduct}
        addToCart={handleAddToCart}
        quickView={handleQuickView}
      />
      <ModalQuickView
        selectedProduct={selectedProduct}
        handleAddToCart={handleAddToCart}
        isOpen={isOpen}
        onClose={onClose}
      />
    </CardBox>
  );
};

export default ItemCard2;
