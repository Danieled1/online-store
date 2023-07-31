{/* Product Catalog Preview */}
<Box p={5}>
<Heading size="md">Top Products</Heading>
<SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
  {/* Replace these with actual product data */}
  {/* Product 1 */}
  <Box
    maxW="sm"
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    _hover={{ transform: "scale(1.02)" }}
  >
    <Image src="https://via.placeholder.com/200" alt="Product 1" />
    <Box p="6">
      <Box d="flex" alignItems="baseline">
        <Text>Product 1</Text>
      </Box>
      <Text>Description for Product 1</Text>
    </Box>
  </Box>
  {/* Product 2 */}
  <Box
    maxW="sm"
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    _hover={{ transform: "scale(1.02)" }}
  >
    <Image src="https://via.placeholder.com/200" alt="Product 2" />
    <Box p="6">
      <Box d="flex" alignItems="baseline">
        <Text>Product 2</Text>
      </Box>
      <Text>Description for Product 2</Text>
    </Box>
  </Box>
  {/* Product 3 */}
  <Box
    maxW="sm"
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    _hover={{ transform: "scale(1.02)" }}
  >
    <Image src="https://via.placeholder.com/200" alt="Product 3" />
    <Box p="6">
      <Box d="flex" alignItems="baseline">
        <Text>Product 3</Text>
      </Box>
      <Text>Description for Product 3</Text>
    </Box>
  </Box>
</SimpleGrid>
<Button
  colorScheme="blue"
  size="lg"
  mt={5}
  _hover={{ transform: "scale(1.02)" }}
>
  Load More
</Button>
</Box>

{/* About Section */}
<Box p={5} bg="blue.100">
<Heading size="md">About Our Company</Heading>
<Text>
  Your company is a leading online retailer of high-quality products.
  Our mission is to provide our customers with the best online shopping
  experience.
</Text>
</Box>

{/* Blog Preview */}
<Box p={5}>
<Heading size="md">Latest Blog Posts</Heading>
<VStack spacing={4} align="stretch">
  {/* Replace with actual blog posts */}
  <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
    <Heading size="sm" p={5}>
      Blog Post 1
    </Heading>
    <Text p={5}>Intro to Blog Post 1</Text>
    <Button
      as={Link}
      colorScheme="blue"
      href="#"
      rightIcon={<ExternalLinkIcon />}
      p={5}
    >
      Read More
    </Button>
  </Box>
  <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
    <Heading size="sm" p={5}>
      Blog Post 2
    </Heading>
    <Text p={5}>Intro to Blog Post 2</Text>
    <Button
      as={Link}
      colorScheme="blue"
      href="#"
      rightIcon={<ExternalLinkIcon />}
      p={5}
    >
      Read More
    </Button>
  </Box>
</VStack>
</Box>

{/* Support Section */}
<VStack textAlign="center" p={5} spacing={5} bg="blue.100">
<Heading size="md">Need help?</Heading>
<Text>We're here to support you</Text>
<Button colorScheme="blue" size="lg">
  Contact Support
</Button>
</VStack>

{/* Footer */}
<Box p={5} bg="blue.500" color="white">
<VStack spacing={4} align="stretch">
  <Heading size="lg">Company Name</Heading>
  <HStack spacing={5}>
    <Link color="white">Home</Link>
    <Link color="white">Catalog</Link>
    <Link color="white">Blog</Link>
    <Link color="white">About</Link>
    <Link color="white">Support</Link>
  </HStack>
  <Text>&copy; 2023 Company Name. All rights reserved.</Text>
</VStack>
</Box> 