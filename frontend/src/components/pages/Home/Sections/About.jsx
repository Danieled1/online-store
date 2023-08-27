import SectionBox from "../../../common/Section/SectionBox";
import SectionGrid from "../../../common/Section/SectionGrid";
import Head3 from "../../../common/Heading/Head3";
import SubHead from "../../../common/Heading/SubHead";
import ButtonSection from "../../../common/Button/ButtonSection";
import { Box } from "@chakra-ui/react";

const About = () => {
  return (
    <SectionBox>
      <Head3> About Our Company </Head3>
      <SectionGrid>
        <Box>
          <SubHead>
            Your company is a leading online retailer of high-quality products.
            <br /> Our mission is to provide our customers with the best online
            shopping experience.
            <br />
            <br /> Our products are sourced directly from brands and suppliers.
            <br /> They are thoroughly checked for quality and authenticity.
          </SubHead>
        </Box>
      </SectionGrid>
      <ButtonSection path={"/about"}> Learn More </ButtonSection>
    </SectionBox>
  );
};

export default About;
