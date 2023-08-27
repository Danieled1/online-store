import React from "react";
import Layout from "../../layouts/Layout";
import ResponsiveContainer from "../../common/ResponsiveContainer";
import { useResponsiveContext } from "../../../contexts/ResponsiveContext";
import { Helmet } from "react-helmet-async";

import { Hero, About, Blog, ProductPreview, Support } from "./Sections";
const Home = ({ posts, products }) => {
  const { isMobile } = useResponsiveContext();
  return (
    <Layout isMobile={isMobile}>
      <ResponsiveContainer>
        <Helmet>
          <title>Welcome to [CompanyName] Store!</title>
        </Helmet>
        <Hero />
        <ProductPreview products={products} />
        <About />
        <Blog posts={posts} />
        <Support />
      </ResponsiveContainer>
    </Layout>
  );
};

export default Home;
