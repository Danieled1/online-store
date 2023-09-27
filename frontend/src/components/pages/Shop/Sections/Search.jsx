import { SearchIcon } from "@chakra-ui/icons";
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import React from "react";
import Head2 from "../../../common/Heading/Head2";
import Head3 from "../../../common/Heading/Head3";

const Search = ({ searchTerm, onSearch, productsError, isLoadingProducts }) => {
  return (
    <InputGroup >
    
      <InputLeftElement
        pointerEvents='none'
        children={<SearchIcon color='blue.400' />}
      />
      {productsError && (
        <Head3>Error loading products: {productsError.message}</Head3>
      )}
      {isLoadingProducts ? (
        <Head2>Loading ...</Head2>
      ) : (
        <Input
          placeholder='Search for a product'
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          w={"480px"}
          bg={"blue.50"} 
        />
      )}
    </InputGroup>
  );
};

export default Search;
