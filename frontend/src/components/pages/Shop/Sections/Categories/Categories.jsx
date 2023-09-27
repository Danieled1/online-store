import React, { useEffect } from "react";
import useFetch from "../../../../../hooks/useFetch";
import { Box } from "@chakra-ui/react";
import Head3 from "../../../../common/Heading/Head3";
import CategoriesList from "./CategoriesList";

const Categories = () => {
  const baseURL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3000";
  const categoriesEndpoint = `${baseURL}/api/categories/`;
  const [categories, isLoadingCategories, categoriesError] = useFetch(
    categoriesEndpoint,
    "GET"
  );
  useEffect(() => {
    console.log("CATEGORIES: ", categories);
  }, [categories]);
  return (
    <Box sx={{ maxH: "70vh", overflowY: "auto" }}>
      
      <CategoriesList categories={categories} />{" "}
      
      {/* Use the custom CategoriesList component */}
    </Box>
  );
};

export default Categories;
