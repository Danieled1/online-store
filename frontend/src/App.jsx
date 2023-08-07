import LandingPage from "./components/pages/LandingPage";
import AuthPage from "./components/pages/AuthPage/AuthPage";
import AboutUs from "./components/pages/AboutUs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./components/pages/ShopPage";
import { faker } from "@faker-js/faker";
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
      title: faker.lorem.sentence(),
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
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LandingPage posts={fakePosts} products={fakeProducts} />}
        />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/shop" element={<Shop products={fakeProducts} />} />
        {/* ... other routes */}
      </Routes>
    </Router>
  );
}

export default App;
