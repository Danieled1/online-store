import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import ButtonCategory from "../../../../common/Button/ButtonCategory";
const CategoriesList = ({ categories }) => {
  const colorSchemes = [
    "blue",
    "red",
    "green",
    "purple",
    "pink",
    "teal",
    "orange",
  ];
  //  last value or start with 0
  const initialColorIndex =
    parseInt(localStorage.getItem("currentColorIndex")) || 0;

  const [currentColorIndex, setCurrentColorIndex] = useState(initialColorIndex);

  useEffect(() => {
    // Use a callback function to update the current color index
    setCurrentColorIndex(
      (prevColorIndex) => (prevColorIndex + 1) % colorSchemes.length
    );
  }, []);

  // Update local storage when the currentColorIndex changes
  useEffect(() => {
    localStorage.setItem("currentColorIndex", currentColorIndex.toString());
  }, [currentColorIndex]);
  return (
    <Box
      display='flex'
      flexWrap='nowrap' // Prevent buttons from wrapping to the next line
      overflowX='auto' // Enable horizontal scrolling when needed
      p={4} // Adjust padding as needed
    >
      {categories &&
        categories.map((category, index) => (
          <ButtonCategory
            key={category._id}
            path={`/products?category=${category._id}`}
            colorScheme={
              colorSchemes[(currentColorIndex + index) % colorSchemes.length]
            }
          >
            {category.category_name}
          </ButtonCategory>
        ))}
    </Box>
  );
};

export default CategoriesList;
