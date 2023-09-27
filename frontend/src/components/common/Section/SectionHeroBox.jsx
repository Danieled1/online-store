import { Box, VStack, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const HeroSection = ({ children, backgroundImage, height }) => {
  return (
    <Box
      w='full'
      h={height ? height : { sm: "70vh", md: "50vh", xl: "60vh" }}
      position='relative'
      mt={{ base: 4, sm: 6, md: 8, xl: 10 }}
      px={{ base: 4, sm: 6, md: 8, xl: 10 }}
      _before={{
        content: '""',
        display: "block",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        boxShadow: "xl",
        zIndex: -999,
      }}
    >
      <Box
        position='absolute'
        top={0}
        right={0}
        bottom={0}
        left={0}
        bgGradient='linear(to-t, rgba(0,0,0,0.6), rgba(0,0,0,0.6))'
        borderColor={useColorModeValue("gray.200", "gray.700")}
      />
      <VStack
        h='full'
        justifyContent='center'
        px={{ base: 4, sm: 6, md: 8, xl: 12 }} // Adjust padding based on breakpoints
        spacing={height ? "0" : "10" }
        align='start'
        cursor={"default"}
      >
        {children}
      </VStack>
    </Box>
  );
};

export default HeroSection;
