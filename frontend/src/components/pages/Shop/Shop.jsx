import React from "react";
import { useResponsiveContext } from "../../../contexts/ResponsiveContext";
import { Helmet } from "react-helmet-async";
import Layout from "../../layouts/Layout";
import ResponsiveContainer from "../../common/ResponsiveContainer";
import { Box, useColorModeValue } from "@chakra-ui/react";
import Search from "./Sections/Search";
import Products from "./Sections/Products/Products";

const Shop = () => {
  const { isMobile } = useResponsiveContext();
  return (
    <Layout isMobile={isMobile}>
      <ResponsiveContainer>
        <Helmet>
          <title>Store</title>
        </Helmet>
        <Products/>
      </ResponsiveContainer>
    </Layout>
  );
};

export default Shop;
