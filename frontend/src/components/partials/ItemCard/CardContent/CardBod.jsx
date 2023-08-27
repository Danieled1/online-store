import { CardBody, Divider, Stack } from "@chakra-ui/react";
import React from "react";
import CardImage from "../CardImage";
import Head3 from "../../../common/Heading/Head3";
import SubHead from "../../../common/Heading/SubHead";
import ItemRating from "../ItemRating";

const CardBod = ({ item, isProduct }) => {
  return (
    <CardBody>
      <CardImage name={item.name} image={item.image} isProduct={isProduct} />
      <Stack mt='6' spacing={4}>
        {isProduct ? (
          <>
            <Head3>{item.name}</Head3>
            <SubHead>{item.description}</SubHead>
            <SubHead>{item.price}</SubHead>
            <ItemRating rating={item.rating} />
            <Divider />
          </>
        ) : (
          <>
            <Head3>{item.title}</Head3>
            <SubHead>{item.postStart}</SubHead>
            <Divider />
          </>
        )}
      </Stack>
    </CardBody>
  );
};

export default CardBod;
