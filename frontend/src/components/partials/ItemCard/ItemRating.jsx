import { Box, HStack } from "@chakra-ui/react";
import SubHead from "../../common/Heading/SubHead";
import { StarIcon } from "@chakra-ui/icons";

const ItemRating = ({ rating }) => {
  return (
    <HStack alignItems={"center"} mt={2}>
      <SubHead> Rating: </SubHead>
      <Box as='span' color='yellow.500'>
        {Array.from({ length: rating }).map((_, index) => (
          <StarIcon key={index} boxSize={4} />
        ))}
      </Box>
    </HStack>
  );
};

export default ItemRating;
