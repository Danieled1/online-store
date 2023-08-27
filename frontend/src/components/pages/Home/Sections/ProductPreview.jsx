import SectionBox from "../../../common/Section/SectionBox";
import Head3 from "../../../common/Heading/Head3";
import SubHead from "../../../common/Heading/SubHead";
import ItemSlider from "../../../partials/ItemSlider/ItemSlider";
import ButtonSection from "../../../common/Button/ButtonSection";

const ProductPreview = ({ products }) => {
  // Use the dyanmic hook to fetch products
  return (
    <SectionBox>
      <Head3> Our Top Picks For You </Head3>
      <SubHead>
        Check out our selection of top quality products tailored to your needs.
      </SubHead>
      <ItemSlider data={products} isProduct={true} />
      <ButtonSection path={"/shop"}> Go To Store </ButtonSection>
    </SectionBox>
  );
};

export default ProductPreview;
