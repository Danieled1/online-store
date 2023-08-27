import { Image } from "@chakra-ui/react";
import React from "react";

const CardImage = ({ name, image, isProduct }) => {
  return (
    <Image
      src={image}
      alt={name}
      height={isProduct ? "180px" : "120px"} // Adjust image height
      objectFit='cover'
      width='100%'
      
    />
  );
};

export default CardImage;
