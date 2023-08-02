import React from "react";
import { Box, Heading, Text, VStack, useColorModeValue, Image, Grid, GridItem } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Layout from "../layouts/Layout";
import { useResponsiveContext } from "../../contexts/ResponsiveContext";

const MotionBox = motion(Box);

const AboutUs = () => {
    const { isMobile } = useResponsiveContext();
    return (
        <Layout isMobile={isMobile}>
            <Box bg={useColorModeValue("brand.lightBg", "brand.darkBg")} p={8} borderRadius="lg">
                <VStack spacing={4} align="start">
                    <Heading>About Us</Heading>
                    <Text>
                        Company Name is dedicated to providing the best quality, value and service to meet our customers’ needs. Our story began in year, we have been moving forward with vigor, enthusiasm and passion.
                    </Text>
                </VStack>
                <VStack spacing={4} align="start" mt={10}>
                    <Heading>Our Team</Heading>
                    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                        <GridItem>
                            <MotionBox
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Image boxSize="100px" objectFit="cover" src="https://via.placeholder.com/150" alt="Team member 1" />
                                <Text mt={4}>Team member 1</Text>
                                <Text fontSize="sm">Role</Text>
                            </MotionBox>
                        </GridItem>
                        <GridItem>
                            <MotionBox
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Image boxSize="100px" objectFit="cover" src="https://via.placeholder.com/150" alt="Team member 2" />
                                <Text mt={4}>Team member 2</Text>
                                <Text fontSize="sm">Role</Text>
                            </MotionBox>
                        </GridItem>
                        {/* More team members */}
                    </Grid>
                </VStack>
                <VStack spacing={4} align="start" mt={10}>
                    <Heading>Mission & Vision</Heading>
                    <Text>
                        Our mission is to be the leading provider of high-quality products in the industry and to enhance the lives of our customers by providing them with an unrivaled lifestyle experience. Our vision is to be recognized as the company that revolutionizes the way people perceive quality in the industry.
                    </Text>
                </VStack>
            </Box>
        </Layout>
    );
};

export default AboutUs;