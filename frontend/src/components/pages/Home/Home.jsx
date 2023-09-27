import React from "react";
import Layout from "../../layouts/Layout";
import ResponsiveContainer from "../../common/ResponsiveContainer";
import { useResponsiveContext } from "../../../contexts/ResponsiveContext";
import { Helmet } from "react-helmet-async";

import { Hero, About, Blog, ProductPreview, Support } from "./Sections";

const Home = () => {
  const { isMobile } = useResponsiveContext();
  return (
    <Layout isMobile={isMobile}>
      <ResponsiveContainer>
        <Helmet>
          <title>Welcome to [CompanyName] Store!</title>
        </Helmet>
        <Hero
          bgImage={"https://via.placeholder.com/1920x1080"}
          headerText={" Welcome to Our Online Store!"}
          subHeaderText={
            "Discover exclusive deals and fantastic products tailored just for you"
          }
        />
        <ProductPreview />
        <About />
        <Blog />
        <Support />
      </ResponsiveContainer>
    </Layout>
  );
};

/**
 *  
 */

export default Home;
