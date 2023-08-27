import { SimpleGrid } from "@chakra-ui/react";
import React from "react";

const SectionGrid = ({ children }) => {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      spacing={10}
      fontSize={{ base: "md", sm: "lg", md: "3xl", xl: "2xl" }} // Adjust font size based on breakpoints
    >
      {children}
    </SimpleGrid>
  );
};

export default SectionGrid;
