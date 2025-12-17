import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import BrandDashboard from "./pages/BrandDashboard";
import CategoryManagement from "./pages/CategoryManagement";
import BrandProfile from "./pages/BrandProfile";
import "./App.css";
import BrandDetail from "./pages/BrandDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/brand_dashboard" element={<BrandDashboard />} />
        <Route path="/brand_profile" element={<BrandProfile />} />
        <Route path="/category_management" element={<CategoryManagement />} />
        <Route path="/brand_detail" element={<BrandDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
