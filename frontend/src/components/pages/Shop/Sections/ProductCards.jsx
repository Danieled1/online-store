import React, { useEffect } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import Head3 from "../../../common/Heading/Head3";
import Head2 from "../../../common/Heading/Head2";
import ItemCard from "../../../partials/ItemCard";
import useFetch from "../../../../hooks/useFetch";

const ProductCards = ({ products, isLoadingProducts, productsError }) => {
  useEffect(() =>{
    console.log("ProductCards PRODUCTS:",products);
  },[products])
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8} my={4} p={4}>
      {productsError && (
        <Head3>Error loading products: {productsError.message}</Head3>
      )}
      {isLoadingProducts ? (
        <Head2>Loading ...</Head2>
      ) : (
        products &&
        products.map((product, index) => (
          <ItemCard
            key={index}
            item={product}
            isProduct={true}
            onSelectProduct={handleSelectProduct}
          />
        ))
      )}
    </SimpleGrid>
  );
};

export default ProductCards;
