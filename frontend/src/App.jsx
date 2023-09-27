import { Routes, Route, Navigate, Outlet } from "react-router-dom";
// import { faker } from "@faker-js/faker";
import LandingPage from "./components/pages/LandingPage";
import AuthPage from "./components/pages/AuthPage/AuthPage";
import AboutUs from "./components/pages/AboutUs";
import ShopPage from "./components/pages/ShopPage/ShopPage";
import ProductPage from "./components/pages/ShopPage/ProductPage";
import BlogPage from "./components/pages/BlogPage/BlogPage";
import HomePage from "./components/pages/HomePage";
import Home from "./components/pages/Home/Home";
import React from "react";
import { useAuth } from "./contexts/AuthContext";
import Shop from "./components/pages/Shop/Shop";

function ProtectedRoute({ element }) {
  const { isAuthenticated } = useAuth();

  
  if (isAuthenticated()) {
    return element;
  } else {
    // Redirect to the login page or an authentication page
    return <Navigate to="/login" />;
  }
}
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<AuthPage />} />
      <Route path='/about' element={<AboutUs />} />
      <Route path='/shop2' element={<Shop />} />
      <Route
        path="/shop"
        element={<ProtectedRoute element={<ShopPage />} />}
      />
      <Route
        path="/shop/product/:model_id"
        element={<ProtectedRoute element={<ProductPage />} />}
      />
      <Route
        path="/blog"
        element={<ProtectedRoute element={<BlogPage />} />}
      />
      {/* ... other routes */}
    </Routes>
  );
}

export default App;
