import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);
const CardBox = ({ children, isProduct, id }) => {
  const navigate = useNavigate();
  const handleOpenSpecificPage = () => {
    navigate(isProduct ? `/shop/product/${id}` : `/post/${id}`);
  };
  return (
    <MotionBox
      onClick={isProduct ? handleOpenSpecificPage : null}
      key={id}
      bg='white'
      rounded='lg'
      overflow='hidden'
      boxShadow='lg'
      marginX={4}
      whileHover={{ scale: 1.08 }}
      transition={{ duration: 0.3 }}
      width={isProduct ? "280px" : "250px"} // Adjust card width
      height={isProduct ? "400px" : "auto"} // Adjust card height
    >
      {children}
    </MotionBox>
  );
};

export default CardBox;
