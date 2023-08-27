import { Routes, Route } from "react-router-dom";
import { faker } from "@faker-js/faker";
import LandingPage from "./components/pages/LandingPage";
import AuthPage from "./components/pages/AuthPage/AuthPage";
import AboutUs from "./components/pages/AboutUs";
import ShopPage from "./components/pages/ShopPage/ShopPage";
import ProductPage from "./components/pages/ShopPage/ProductPage";
import BlogPage from "./components/pages/BlogPage/BlogPage";
import HomePage from "./components/pages/HomePage";
import Home from "./components/pages/Home/Home";

const productData = (count) => {
  let products = [];
  for (let i = 0; i < count; i++) {
    products.push({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      image: faker.image.url(),
      price: faker.commerce.price(),
      rating: faker.number.int({ min: 1, max: 5 }),
      description: faker.commerce.productDescription(),
    });
  }
  return products;
};
const postGenerator = (count) => {
  let posts = [];
  for (let i = 0; i < count; i++) {
    posts.push({
      id: faker.string.uuid(),
      title: faker.lorem.sentence(),
      author: faker.person.fullName(),
      image: faker.image.url(),
      description: faker.lorem.sentence(),
      postStart: faker.lorem.paragraph(),
    });
  }
  return posts;
};
let fakePosts = postGenerator(15);
let fakeProducts = productData(15);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home posts={fakePosts} products={fakeProducts} />}/>
      <Route path="/login" element={<AuthPage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/shop" element={<ShopPage products={fakeProducts} />} />
      <Route path="/shop/product/:productId" element={<ProductPage products={fakeProducts}/>} />
      <Route path="/blog" element={<BlogPage posts={fakePosts}/>}/>
      {/* ... other routes */}
    </Routes>
  );
}

export default App;
