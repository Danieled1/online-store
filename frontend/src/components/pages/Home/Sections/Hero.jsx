import React from "react";
import SectionHeroBox from "../../../common/Section/SectionHeroBox";
import Head1 from "../../../common/Heading/Head1";
import Head2 from "../../../common/Heading/Head2";

const Hero = () => {
  return (
    <SectionHeroBox backgroundImage={"https://via.placeholder.com/1920x1080"}>
      <Head1> Welcome to Our Online Store!</Head1>
      <Head2>
        Discover exclusive deals and fantastic products tailored just for you.
      </Head2>
    </SectionHeroBox>
  );
};

export default Hero;
