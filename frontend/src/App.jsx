import { useState } from "react";
import LandingPage from "./components/LandingPage";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { AuthPage } from "./components/AuthPage";

function App() {
  return (
    <LandingPage />
    // <Router>
    //   <Routes>
    //     {/* <Route path="/" element={<LandingPage />} />{" "} */}
    //     {/* This is your default route now */}
    //     {/* <Route path="/login" element={<AuthPage />} /> */}
    //     {/* ... other routes */}
    //   </Routes>
    // </Router>
  );
}

export default App;
