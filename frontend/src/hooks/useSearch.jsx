import React, { useState, useEffect } from "react";
import useFetch from "./useFetch";

const useSearch = () => {
  const baseURL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3000";
  const productsEndpoint = `${baseURL}/api/products/`;

  const [products, isLoadingProducts, productsError] = useFetch(
    productsEndpoint,
    "GET"
  );
  const [searchedProducts, setSearchedProducts] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (products && products.length > 0) {
      const filteredProducts = products.filter((product) =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchedProducts(filteredProducts);
    }
  }, [searchTerm, products]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return { searchedProducts, searchTerm, handleSearch };
};

export default useSearch;
