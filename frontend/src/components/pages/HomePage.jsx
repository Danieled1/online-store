import SectionBox from "../common/Section/SectionBox";
import Layout from "../layouts/Layout";
import { useResponsiveContext } from "../../contexts/ResponsiveContext";
import ResponsiveContainer from "../common/ResponsiveContainer";
import { Helmet } from "react-helmet-async";
import SectionHeroBox from "../common/Section/SectionHeroBox";
import Head1 from "../common/Heading/Head1";
import Head2 from "../common/Heading/Head2";
import { Box } from "@chakra-ui/react";
import Head3 from "../common/Heading/Head3";
import SubHead from "../common/Heading/SubHead";
import ItemSlider from "../partials/ItemSlider/ItemSlider";
import ButtonSection from "../common/Button/ButtonSection";
import SectionGrid from "../common/Section/SectionGrid";
import FormField from "../partials/FormField";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import ButtonAction from "../common/Button/ButtonAction";
import ButtonIcon from "../common/Button/ButtonIcon";

const HomePage = ({ products, posts }) => {
  const { isMobile } = useResponsiveContext();
  return (
    <Layout isMobile={isMobile}>
      <ResponsiveContainer>
        <Box>
          <Helmet>
            <title>Welcome to [CompanyName] Store!</title>
          </Helmet>
          {/* Hero Section */}
          <SectionHeroBox
            backgroundImage={"https://via.placeholder.com/1920x1080"}
          >
            <Head1> Welcome to Our Online Store!</Head1>
            <Head2>
              Discover exclusive deals and fantastic products tailored just for
              you.
            </Head2>
          </SectionHeroBox>
          {/* Product Catalog Preview */}
          <SectionBox>
            <Head3> Our Top Picks For You </Head3>
            <SubHead>
              Check out our selection of top quality products tailored to your
              needs.
            </SubHead>
            <ItemSlider data={products} isProduct={true} />
            <ButtonSection path={"/shop"}> Go To Store </ButtonSection>
          </SectionBox>
          {/* About Section */}
          <SectionBox>
            <Head3> About Our Company </Head3>
            <SectionGrid>
              <Box>
                <SubHead>
                  Your company is a leading online retailer of high-quality
                  products.
                  <br /> Our mission is to provide our customers with the best
                  online shopping experience.
                  <br />
                  <br /> Our products are sourced directly from brands and
                  suppliers.
                  <br /> They are thoroughly checked for quality and
                  authenticity.
                </SubHead>
              </Box>
            </SectionGrid>
            <ButtonSection path={"/about"}> Learn More </ButtonSection>
          </SectionBox>
          {/* Blog Preview */}
          <SectionBox>
            <Head3> Latest Blog Posts </Head3>
            <ItemSlider data={posts} isProduct={false} />
            <ButtonSection path={"/blog"}> Go To Blog </ButtonSection>
          </SectionBox>
          {/* Support Section */}
          <SectionBox>
            <Head3> Need Help? Contact Support </Head3>
            <SubHead>
              We're here to help you. Please provide your information and
              problem details.
            </SubHead>
            <SectionGrid>
              <Box>
                <FormField
                  id='email'
                  isRequired={true}
                  type={"email"}
                  placeholder={"Your email"}
                >
                  Email Address
                </FormField>
                <FormField
                  id='issue'
                  isRequired={true}
                  type={"text"}
                  placeholder={"Briefly describe your issue"}
                >
                  Issue
                </FormField>
                <ButtonAction icon={<EmailIcon />}>Submit</ButtonAction>
              </Box>
              <Box>
                <SubHead>Or reach us directly at:</SubHead>
                <ButtonIcon icon={<PhoneIcon />}>+1 (234) 567-890</ButtonIcon>
                <ButtonIcon icon={<EmailIcon/>}>support@company.com</ButtonIcon>
              </Box>
            </SectionGrid>
          </SectionBox>
        </Box>
      </ResponsiveContainer>
    </Layout>
  );
};

export default HomePage;
