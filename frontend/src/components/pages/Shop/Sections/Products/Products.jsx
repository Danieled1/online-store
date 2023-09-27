import React, { useState, useEffect } from "react";
import Search from "../Search";
import ProductCards from "../ProductCards";
import useFetch from "../../../../../hooks/useFetch";
import useSearch from "../../../../../hooks/useSearch";
import SectionBox from "../../../../common/Section/SectionBox";
import Sort from "../Sort/Sort";
import {
  sortByNewToOld,
  sortByOldToNew,
  sortByLowPrice,
  sortByHighPrice,
} from "../Sort/Functions"; // Import sort functions
import Categories from "../Categories/Categories";
import { useLocation } from "react-router-dom";
import ResponsiveContainer from "../../../../common/ResponsiveContainer";
import Hero from "../../../Home/Sections/Hero";
import { Image } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import Head2 from "../../../../common/Heading/Head2";
import Head3 from "../../../../common/Heading/Head3";

const Products = () => {
  const baseURL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3000";
  const productsEndpoint = `${baseURL}/api/products/`;
  const [products, isLoadingProducts, productsError] = useFetch(
    productsEndpoint,
    "GET"
  );
  const { searchedProducts, searchTerm, handleSearch } = useSearch([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const location = useLocation();
  useEffect(() => {
    if (products && products.length > 0) {
      handleSearch(searchTerm);
      setSortedProducts(products); // Initialize sorted products with the fetched products
    }
  }, [searchTerm, products]);
  const sortingOptions = {
    "new-to-old": sortByNewToOld,
    "old-to-new": sortByOldToNew,
    "low-price": sortByLowPrice,
    "high-price": sortByHighPrice,
  };
  const handleSortChange = (selectedOption) => {
    if (sortingOptions[selectedOption]) {
      const sortingFunction = sortingOptions[selectedOption];
      const sorted = sortingFunction(
        searchedProducts.length > 0 ? searchedProducts : sortedProducts
      );
      setSortedProducts(sorted);
    }
  };
  useEffect(() => {
    // Filter products based on the category parameter in the URL
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get("category");

    if (categoryId) {
      const filteredProducts = products.filter(
        (product) => product.category === categoryId
      );
      setSortedProducts(filteredProducts);
    }
  }, [location.search, products]);
  useEffect(() => {
    //Update displayedProducts based on searchedProducts or sortedProducts
    setDisplayedProducts(
      searchedProducts && searchedProducts.length > 0
        ? searchedProducts
        : sortedProducts
    );
  }, [searchedProducts, sortedProducts]);
  return (
    <>
      <ResponsiveContainer>
        {/* <SectionBox> */}
          <Hero
            bgImage={"https://via.placeholder.com/200x800"}
            headerText={"Check Out Our Holiday Deals!"}
            subHeaderText={"50% Off For Limited Time Only!"}
            height={"240px"}
          />
        {/* </SectionBox> */}
        <SectionBox>
          <Categories />
        </SectionBox>

        <SectionBox>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            h={"100%"}
            w={"100%"}
          >
            <Box>
              <Search
                searchTerm={searchTerm}
                onSearch={handleSearch}
                productsError={productsError}
                isLoadingProducts={isLoadingProducts}
              />
            </Box>
            <Box>
              <Sort onSortChange={handleSortChange} />
            </Box>
          </Box>
        </SectionBox>
        <SectionBox>
          <ProductCards
            products={displayedProducts}
            isLoadingProducts={isLoadingProducts}
            productsError={productsError}
          />
        </SectionBox>
      </ResponsiveContainer>
    </>
  );
};

export default Products;
