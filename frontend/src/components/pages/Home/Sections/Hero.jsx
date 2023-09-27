import React from "react";
import SectionHeroBox from "../../../common/Section/SectionHeroBox";
import Head1 from "../../../common/Heading/Head1";
import Head2 from "../../../common/Heading/Head2";

const Hero = ({ bgImage, headerText, subHeaderText, height}) => {
  return (
    <SectionHeroBox backgroundImage={bgImage} height={height}>
      <Head1>{headerText}</Head1>
      <Head2>{subHeaderText}</Head2>
    </SectionHeroBox>
  );
};

export default Hero;
