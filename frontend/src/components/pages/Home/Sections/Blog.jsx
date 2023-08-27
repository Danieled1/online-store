import React from "react";
import SectionBox from "../../../common/Section/SectionBox";
import Head3 from "../../../common/Heading/Head3";
import ItemSlider from "../../../partials/ItemSlider/ItemSlider";
import ButtonSection from "../../../common/Button/ButtonSection";

const Blog = ({ posts }) => {
  return (
    <SectionBox>
      <Head3> Latest Blog Posts </Head3>
      <ItemSlider data={posts} isProduct={false} />
      <ButtonSection path={"/blog"}> Go To Blog </ButtonSection>
    </SectionBox>
  );
};

export default Blog;
