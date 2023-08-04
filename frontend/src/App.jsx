import LandingPage from "./components/pages/LandingPage";
import AuthPage from "./components/pages/AuthPage/AuthPage";
import AboutUs from "./components/pages/AboutUs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from './components/pages/ShopPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/shop" element={<Shop/>}/>
        {/* ... other routes */}
      </Routes>
    </Router>
  );
}

export default App;
