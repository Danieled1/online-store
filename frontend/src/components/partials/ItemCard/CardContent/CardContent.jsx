import {
  Card
} from "@chakra-ui/react";
import CardBod from "./CardBod";
import CardFoot from "./CardFoot";

const CardContent = ({ item, isProduct, addToCart, quickView }) => {

  return (
    <Card>
      <CardBod item={item} isProduct={isProduct}/>
      <CardFoot handleAddToCart={addToCart} handleQuickView={quickView} id={item.id}/>
    </Card>
  );
};

export default CardContent;
