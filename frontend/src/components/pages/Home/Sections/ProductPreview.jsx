import SectionBox from "../../../common/Section/SectionBox";
import Head3 from "../../../common/Heading/Head3";
import SubHead from "../../../common/Heading/SubHead";
import ItemSlider from "../../../partials/ItemSlider/ItemSlider";
import ButtonSection from "../../../common/Button/ButtonSection";
import React, { useEffect } from "react";
import useFetch from "../../../../hooks/useFetch";
import Head2 from "../../../common/Heading/Head2";

const ProductPreview = () => {
  const baseURL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3000";

  const productsEndpoint = `${baseURL}/api/products/`;
  const [products, isLoadingProducts, productsError] = useFetch(
    productsEndpoint,
    "GET"
  );

  useEffect(() => {
    console.log("ITEMS_REVIEW: ", products);
  }, [products]);
  console.log("Rendering ProductPreview component"); // Add this line

  return (
    <SectionBox>
      <Head3> Our Top Picks For You </Head3>
      <SubHead>
        Check out our selection of top-quality products tailored to your needs.
      </SubHead>
      {productsError && (
        <Head3>Error loading products: {productsError.message}</Head3>
      )}
      {isLoadingProducts ? (
        <Head2>Loading ...</Head2>
      ) : (
        <>
          {products ? (
            <ItemSlider data={products} isProduct={true} />
          ) : (
            <div>No products available.</div>
          )}
          <ButtonSection path={"/shop"}> Go To Store </ButtonSection>
        </>
      )}
    </SectionBox>
  );
};

export default ProductPreview;
