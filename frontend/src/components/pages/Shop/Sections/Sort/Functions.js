// Sort by new to old
const sortByNewToOld = (products) => {
  console.log("byNewToOld PRODUCTS:", products);
  return [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

// Sort by old to new
const sortByOldToNew = (products) => {
  console.log("byOldToNew PRODUCTS:", products);
  return [...products].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
};

// Sort by low price to high price
const sortByLowPrice = (products) => {
  console.log("byLowPrice PRODUCTS:", products);
  return [...products].sort((a, b) => a.product_price - b.product_price);
};

// Sort by high price to low price
const sortByHighPrice = (products) => {
  console.log("byHighPrice PRODUCTS:", products);
  return [...products].sort((a, b) => b.product_price - a.product_price);
};

export { sortByNewToOld, sortByOldToNew, sortByLowPrice, sortByHighPrice };
