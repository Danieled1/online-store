import { Button, ButtonGroup, CardFooter } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CardFoot = ({isProduct, handleAddToCart, handleQuickView, id }) => {
  return (
    <CardFooter>
      {isProduct ? (
        <ButtonGroup spacing={2}>
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
        </ButtonGroup>
      ) : (
        <Button
          size='sm'
          colorScheme='gray'
          width='full'
          as={Link}
          to={`/post/${id}`}
        >
          Read More
        </Button>
      )}
    </CardFooter>
  );
};

export default CardFoot;
