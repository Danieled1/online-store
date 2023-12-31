import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  SimpleGrid,
  Image,
  Grid,
  GridItem,
  Button,
  Select,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  useDisclosure,
  CheckboxGroup,
  Checkbox,
  Input,
  InputGroup,
  InputLeftElement,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Flex,
  Stack,
} from "@chakra-ui/react";
import Layout from "../../layouts/Layout";
import { useResponsiveContext } from "../../../contexts/ResponsiveContext";
import { SearchIcon } from "@chakra-ui/icons";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ItemCard from "../../partials/ItemCard";
import ResponsiveContainer from "../../common/ResponsiveContainer";
import { Outlet } from "react-router-dom";
import Head3 from "../../common/Heading/Head3";
import Head2 from "../../common/Heading/Head2";
import useFetch from "../../../hooks/useFetch";

// const sortProducts = (products, sortOrder) => {
//   if (sortOrder === "price-asc") {
//     return [...products].sort((a, b) => a.price - b.price);
//   }
//   if (sortOrder === "price-desc") {
//     return [...products].sort((a, b) => b.price - a.price);
//   }
//   return products;
// };
// Create a state for products that fetched from the backend and update it after a search
const ShopPage = () => {
  const baseURL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3000";

  const productsEndpoint = `${baseURL}/api/products/`;
  const [products, isLoadingProducts, productsError] = useFetch(
    productsEndpoint,
    "GET"
  );
  const [fetchedProducts, setFetchedProducts] = useState(products);

  console.log("Rendering ShopPage component"); // Add this line
  const [searchTerm, setSearchTerm] = useState("");

  // const [productsData, setProductsData] = useState([...products]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { isMobile } = useResponsiveContext();

  const [sortOrder, setSortOrder] = useState("price-asc");
  const [selectedCompany, setSelectedCompany] = useState(""); // Placeholder for selected company
  const [priceRange, setPriceRange] = useState([20, 80]);
  const [rating, setRating] = useState(3);
  const handleSearch = (event) => {
    const input = event.target.value;
    setSearchTerm(input);
  };
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  useEffect(() => {
    
    console.log("SEARCHED PRODUCTS", products);
    console.log("FETCHED PRODUCTS", fetchedProducts);
    const filteredProducts = products?.filter((product) =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log("FILTERED PRODUCTS", filteredProducts);
    setFetchedProducts(filteredProducts);
  }, [searchTerm,products]);

  return (
    <Layout isMobile={isMobile}>
      <ResponsiveContainer>
        <Box bg={useColorModeValue("brand.lightBg", "brand.darkBg")} p={8}>
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(6, 1fr)",
              md: "1fr 3fr 1fr",
              lg: "1fr 3fr 1fr",
              xl: "1fr 3fr 1fr",
            }}
            gap={6}
          >
            <GridItem colSpan={{ base: 1, sm: 6, md: 1 }}>
              <Accordion allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton
                      onClick={() => setFiltersOpen(!filtersOpen)}
                    >
                      <Box flex='1' textAlign='left'>
                        Filters
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <CheckboxGroup colorScheme='green'>
                      <VStack align='start'>
                        <Checkbox>Option 1</Checkbox>
                        <Checkbox>Option 2</Checkbox>
                        <Checkbox>Option 3</Checkbox>
                      </VStack>
                    </CheckboxGroup>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton
                      onClick={() => setCategoriesOpen(!categoriesOpen)}
                    >
                      <Box flex='1' textAlign='left'>
                        Categories
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <CheckboxGroup colorScheme='green'>
                      <VStack align='start'>
                        <Checkbox>Category 1</Checkbox>
                        <Checkbox>Category 2</Checkbox>
                        <Checkbox>Category 3</Checkbox>
                      </VStack>
                    </CheckboxGroup>
                  </AccordionPanel>
                </AccordionItem>
                {moreFiltersOpen && (
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex='1' textAlign='left'>
                          More Filters
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Stack spacing={4}>
                        {/* Price Range Filter */}
                        <Box>
                          <Text mb='2'>Price Range:</Text>
                          <Slider
                            defaultValue={[20, 80]}
                            min={0}
                            max={100}
                            onChangeEnd={(values) => {
                              // You can handle the change here
                              console.log(values);
                            }}
                          >
                            <SliderTrack bg='red.100'>
                              <SliderFilledTrack bg='tomato' />
                            </SliderTrack>
                            <SliderThumb>
                              <Box
                                position='absolute'
                                top='-8px'
                                color='tomato'
                              >
                                {/* Displaying the slider's start value */}
                                Value 1
                              </Box>
                            </SliderThumb>
                            <SliderThumb>
                              <Box
                                position='absolute'
                                top='-8px'
                                color='tomato'
                              >
                                {/* Displaying the slider's end value */}
                                Value 2
                              </Box>
                            </SliderThumb>
                          </Slider>
                        </Box>

                        {/* Filter by Company */}
                        <Box>
                          <Text mb='2'>By Company:</Text>
                          <Select placeholder='Select company'>
                            {/* You'll replace this with dynamic data fetching */}
                            <option value='company1'>Company 1</option>
                            <option value='company2'>Company 2</option>
                            <option value='company3'>Company 3</option>
                          </Select>
                        </Box>

                        {/* Filter by Rating */}
                        <Box>
                          <Text mb='2'>Minimum Rating:</Text>
                          <Slider
                            defaultValue={3}
                            min={1}
                            max={5}
                            onChangeEnd={(value) => {
                              // You can handle the change here
                              console.log(value);
                            }}
                          >
                            <SliderTrack bg='yellow.100'>
                              <SliderFilledTrack bg='yellow.400' />
                            </SliderTrack>
                            <SliderThumb>
                              <Box
                                position='absolute'
                                top='-8px'
                                color='yellow.400'
                              >
                                {/* Displaying the slider value */}
                                Value
                              </Box>
                            </SliderThumb>
                          </Slider>
                        </Box>
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                )}
              </Accordion>
              <Button
                mt='4'
                onClick={() => setMoreFiltersOpen(!moreFiltersOpen)}
              >
                {moreFiltersOpen ? "Less Filters" : "More Filters"}
              </Button>
            </GridItem>
            <GridItem colSpan={{ base: 1, sm: 4, md: 3 }}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<SearchIcon color='gray.300' />}
                />
                <Input
                  placeholder='Search for a product'
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </InputGroup>
              {/* Cart & Deals Section */}
              <VStack align='start' spacing={4} mt={6}>
                <Button leftIcon={<AiOutlineShoppingCart />}>Cart</Button>
                <Box w='100%' h='2px' bg='gray.200' />
                {/* <Heading size="md">Deals</Heading>
                <Button variant="outline" leftIcon={<BiCheckboxChecked />}>
                  Deal 1
                </Button>
                <Button variant="outline" leftIcon={<BiCheckbox />}>
                  Deal 2
                </Button>
                <Button variant="outline" leftIcon={<BiCheckbox />}>
                  Deal 3
                </Button> */}
              </VStack>
              {/* PRODUCT CARDS */}
              <SimpleGrid
                columns={{ base: 1, sm: 2, md: 3 }}
                spacing={8}
                my={4}
                p={4}
              >
                {productsError && (
                  <Head3>Error loading products: {productsError.message}</Head3>
                )}
                {isLoadingProducts ? (
                  <Head2>Loading ...</Head2>
                ) : (
                  fetchedProducts &&
                  fetchedProducts.map((product, index) => (
                    <ItemCard
                      key={index}
                      item={product}
                      isProduct={true}
                      onSelectProduct={handleSelectProduct}
                    />
                  ))
                )}
              </SimpleGrid>
            </GridItem>
          </Grid>
        </Box>
      </ResponsiveContainer>
      <Outlet />
    </Layout>
  );
};

export default ShopPage;
