import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Search } from "./pages/Search";
import { RegisterBrand } from "./pages/RegisterBrand";    
import { CategoryPage } from "./pages/CategoryPage";
import CustProfile from "./pages/CustProfile";
import CategoryManagement from "./pages/CategoryManagement";
import BrandDashboard from "./pages/BrandDashboard";
import BrandDetail from "./pages/BrandDetail";
import BrandProfile from "./pages/BrandProfile";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/register-brand" element={<RegisterBrand />} />
        <Route path="/customer-profile" element={<CustProfile />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/category-management" element={<CategoryManagement />} />
        <Route path="/brand-dashboard" element={<BrandDashboard />} />
        <Route path="/brand-detail" element={<BrandDetail />} />
        <Route path="/brand-profile" element={<BrandProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
