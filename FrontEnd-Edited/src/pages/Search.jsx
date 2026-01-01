import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, Heart, ShoppingCart, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import axios from 'axios';
import './Search.css';

const API_BASE_URL = 'http://localhost:5033/api/Brand';

const categories = [
  'Accessories',
  'Art & Collectibles',
  'Baby',
  'Bags & Purses',
  'Bath & Beauty',
  'Books, Movies & Music',
  'Clothing',
  'Craft Supplies & Tools',
  'Electronics & Accessories',
  'Gifts',
  'Home & Living',
  'Jewelry',
  'Paper & Party Supplies',
  'Pet Supplies',
  'Shoes',
  'Toys & Games',
  'Weddings'
];

const Search = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 6 items per page

  // Search function
  const searchBrands = async (query) => {
    if (!query.trim()) {
      setBrands([]);
      setCurrentPage(1); // Reset to first page on new search
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/search/${encodeURIComponent(query)}`);
      setBrands(response.data || []);
      setCurrentPage(1); // Reset to first page on new search
    } catch (err) {
      console.error('Error searching brands:', err);
      setError('Failed to fetch search results. Please try again.');
      setBrands([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      searchBrands(searchQuery);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    searchBrands(searchQuery);
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to top when changing pages
  };

  // Get current brands for pagination
  const getCurrentBrands = () => {
    const indexOfLastBrand = currentPage * itemsPerPage;
    const indexOfFirstBrand = indexOfLastBrand - itemsPerPage;
    return brands.slice(indexOfFirstBrand, indexOfLastBrand);
  };

  if (isLoading) {
    return (
      <div className="search-container">
        <Navbar />
        <div className="loading">Searching for brands...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-container">
        <Navbar />
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="search-container">
      <Navbar />

      {/* Tagline */}
      <div className="search-header">
        <p className="tagline">Shop wholesale online from over 100,000 brands</p>
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <div className="categories-wrapper">
          <button 
            className="categories-button"
            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
            Categories
          </button>
          
          {isCategoriesOpen && (
            <div className="categories-dropdown">
              {categories.map((category, index) => (
                <div key={index} className="category-item">
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSearch} className="search-form">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for Products, Brands"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">
              <SearchIcon className="search-icon" size={20} />
            </button>
          </div>
        </form>

        <div className="header-icons">
          <Link to="/wishlist" className="icon-link">
            <Heart size={28} strokeWidth={2} />
          </Link>
          <Link to="/cart" className="icon-link">
            <ShoppingCart size={28} strokeWidth={2} />
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="search-main">
        <div className="content-header">
          <h1 className="search-title">SEARCH RESULTS</h1>
          {searchQuery && (
            <p className="search-subtitle">Showing results for: {searchQuery}</p>
          )}
        </div>

        {searchQuery && (
          <div className="filter-section">
            <button className="filter-button">
              <SlidersHorizontal size={20} />
              All Filters
            </button>
            <div className="items-count">
              {brands.length} {brands.length === 1 ? 'item' : 'items'} Found
            </div>
          </div>
        )}

        {/* Brand Cards Grid */}
        <div className="brands-grid">
          {getCurrentBrands().length > 0 ? (
            getCurrentBrands().map((brand) => (
              <div key={brand.id} className="brand-card">
                <div className="brand-info">
                  {brand.logoUrl ? (
                    <img src={brand.logoUrl} alt={brand.name} className="brand-logo" />
                  ) : (
                    <div className="avatar">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                  )}
                  <div>
                    <div className="brand-name">{brand.name}</div>
                    {brand.websiteUrl && (
                      <a 
                        href={brand.websiteUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="brand-website"
                      >
                        {new URL(brand.websiteUrl).hostname.replace('www.', '')}
                      </a>
                    )}
                  </div>
                </div>
                {brand.description && (
                  <p className="brand-description">
                    {brand.description.length > 150 
                      ? `${brand.description.substring(0, 150)}...` 
                      : brand.description}
                  </p>
                )}
                {brand.categories && brand.categories.length > 0 && (
                  <div className="tags">
                    {brand.categories.slice(0, 3).map((category, idx) => (
                      <span 
                        key={idx} 
                        className={`tag tag-${idx === 0 ? 'orange' : idx === 1 ? 'purple' : 'teal'}`}
                      >
                        {category}
                      </span>
                    ))}
                    {brand.categories.length > 3 && (
                      <span className="tag">+{brand.categories.length - 3} more</span>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : searchQuery ? (
            <div className="no-results">
              No brands found matching "{searchQuery}"
            </div>
          ) : null}
        </div>


        {/* Add this right before the pagination div to test if the condition is being met */}
      {console.log('Total brands:', brands.length, 'Items per page:', itemsPerPage)}

      {/* Pagination */}
      {brands.length > itemsPerPage && (
        <div style={{border: '2px solid red', padding: '10px'}}> {/* Temporary border for visibility */}
          <div className="pagination">
            <button 
              className="page-button" 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronDown className="chevron-left" size={20} />
            </button>
            
            {Array.from({ length: Math.ceil(brands.length / itemsPerPage) }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                className={`page-button ${currentPage === number ? 'page-button-active' : ''}`}
                onClick={() => handlePageChange(number)}
              >
                {number}
              </button>
            ))}
            
            <button 
              className="page-button" 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === Math.ceil(brands.length / itemsPerPage)}
            >
              <ChevronDown className="chevron-right" size={20} />
            </button>
          </div>
        </div>
      )}
        {/* Pagination */}
        {brands.length > 0 && (
          <div className="pagination">
            <button 
              className="page-button" 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronDown className="chevron-left" size={20} />
            </button>
            
            {Array.from({ length: Math.ceil(brands.length / itemsPerPage) }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                className={`page-button ${currentPage === number ? 'page-button-active' : ''}`}
                onClick={() => handlePageChange(number)}
              >
                {number}
              </button>
            ))}
            
            <button 
              className="page-button" 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === Math.ceil(brands.length / itemsPerPage)}
            >
              <ChevronDown className="chevron-right" size={20} />
            </button>
          </div>
        )}
      </main>
      <Footer showCTA={false} />
    </div>
  );
};

export default Search;