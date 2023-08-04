import React from "react";
import { Box, Heading, Text, VStack, useColorModeValue, Image, Grid, GridItem } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Layout from "../layouts/Layout";
import { useResponsiveContext } from "../../contexts/ResponsiveContext";
const MotionBox = motion(Box);

const AboutUs = () => {
    const { isMobile } = useResponsiveContext();
    return (
        <Layout isMobile={isMobile}>
            <Helmet>
                <title>About Us - Company Name</title>
                <meta name="description" content="Learn about our company's dedication to providing quality products and exceptional service. Our mission is to enhance the lives of customers with an unrivaled lifestyle experience." />
                <meta name="keywords" content="Company Name, quality products, exceptional service, lifestyle experience" />
            </Helmet>

            <Box bg={useColorModeValue("brand.lightBg", "brand.darkBg")} p={8} borderRadius="lg" position="relative">
                <div style={{ zIndex: -1, position: "absolute", top: "-50px", left: "-50px" }}>
                    <Image boxSize="100px" objectFit="cover" src="https://via.placeholder.com/150" alt="Blob 1" borderRadius="full" />
                </div>
                <div style={{ zIndex: -1, position: "absolute", top: "50%", right: "-80px", transform: "translateY(-50%)" }}>
                    <Image boxSize="120px" objectFit="cover" src="https://via.placeholder.com/150" alt="Blob 2" borderRadius="full" />
                </div>
                <div style={{ zIndex: -1, position: "absolute", bottom: "-80px", right: "-50px" }}>
                    <Image boxSize="90px" objectFit="cover" src="https://via.placeholder.com/150" alt="Blob 3" borderRadius="full" />
                </div>
                <VStack spacing={4} align="start">
                    <Heading>About Us</Heading>
                    <Text>
                        Welcome to Company Name, where quality meets innovation. Since our founding in 20XX, we have been dedicated to providing the best products, value, and service to meet our customers’ needs. Our journey is fueled by vigor, enthusiasm, and passion for excellence.
                    </Text>
                </VStack>
                <VStack spacing={4} align="start" mt={10}>
                    <Heading>Our Team</Heading>
                    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                        <GridItem>
                            <MotionBox
                                whileHover={{ scale: 1.1, y: -5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Image boxSize="100px" objectFit="cover" src="https://via.placeholder.com/150" alt="Team member 1" borderRadius="full" />
                                <Text mt={4}>John Doe</Text>
                                <Text fontSize="sm">CEO</Text>
                            </MotionBox>
                        </GridItem>
                        <GridItem>
                            <MotionBox
                                whileHover={{ scale: 1.1, y: -5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Image boxSize="100px" objectFit="cover" src="https://via.placeholder.com/150" alt="Team member 2" borderRadius="full" />
                                <Text mt={4}>Jane Smith</Text>
                                <Text fontSize="sm">CTO</Text>
                            </MotionBox>
                        </GridItem>
                        <GridItem>
                            <MotionBox
                                whileHover={{ scale: 1.1, y: -5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Image boxSize="100px" objectFit="cover" src="https://via.placeholder.com/150" alt="Team member 3" borderRadius="full" />
                                <Text mt={4}>Alex Johnson</Text>
                                <Text fontSize="sm">Lead Designer</Text>
                            </MotionBox>
                        </GridItem>
                    </Grid>
                </VStack>
                <VStack spacing={4} align="start" mt={10}>
                    <Heading>Mission & Vision</Heading>
                    <Text>
                        Our mission is to be the leading provider of high-quality products in the industry and to enhance the lives of our customers by providing them with an unrivaled lifestyle experience. We envision a future where our company is synonymous with innovation, excellence, and customer satisfaction.
                    </Text>
                </VStack>
            </Box>
        </Layout>
    );
};

export default AboutUs;
