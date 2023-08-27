import React from "react";
import {
  Container,
  Heading,
  Text,
  Flex,
  Box,
  Divider,
  Image,
} from "@chakra-ui/react";
import ItemCard from "../../partials/ItemCard";
import Layout from "../../layouts/Layout";
import { useResponsiveContext } from "../../../contexts/ResponsiveContext";
import ResponsiveContainer from "../../common/ResponsiveContainer";

const BlogPage = ({ posts }) => {
  const { isMobile } = useResponsiveContext();

  return (
    <Layout isMobile={isMobile}>
      <ResponsiveContainer>
        <Container maxW='container.lg' py={10}>
          {/* Blog Page Header */}
          <Heading as='h1' size='xl' mb={6}>
            Welcome to Our Blog
          </Heading>
          <Text fontSize='lg' color='gray.500' mb={8}>
            Stay updated with the latest insights and news.
          </Text>

          {/* Blog Posts Section */}
          <Flex
            flexWrap='wrap'
            justifyContent='space-evenly'
            gap={10}
            m={4}
            p={4}
          >
            {posts.map((post) => (
              <ItemCard key={post.id} item={post} isProduct={false} />
            ))}
          </Flex>

          {/* Pagination Section */}
          {/* You can add pagination here if you have multiple pages of blog posts */}
          {/* Example: <Pagination currentPage={1} totalPages={5} /> */}

          {/* About the Blog Section */}
          <Box my={10}>
            <Divider />
            <Heading as='h2' size='xl' mt={6}>
              About Our Blog
            </Heading>
            <Text fontSize='lg' mt={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod justo nec ligula cursus, sed consequat erat faucibus.
            </Text>
          </Box>

          {/* Newsletter Signup Section */}
          <Box my={10}>
            <Divider />
            <Heading as='h2' size='xl' mt={6}>
              Subscribe to Our Newsletter
            </Heading>
            <Text fontSize='lg' mt={4}>
              Stay updated with our latest blog posts and news by subscribing to
              our newsletter.
            </Text>
            {/* Add a newsletter signup form here */}
          </Box>
        </Container>
      </ResponsiveContainer>
    </Layout>
  );
};

export default BlogPage;
