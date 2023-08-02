import { useState } from "react";
import LandingPage from "./components/pages/LandingPage";
import AuthPage from "./components/pages/AuthPage/AuthPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
        {/* ... other routes */}
      </Routes>
    </Router>
  );
}

export default App;
